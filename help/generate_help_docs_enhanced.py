#!/usr/bin/env python3
"""
Enhanced help doc generator - 异步并行版本
扫描所有HTML文件并使用AI生成帮助文档
支持30个并发请求，大幅提升处理速度
"""

from __future__ import annotations

import argparse
import asyncio
import json
import os
import re
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable
import ssl

# 异步HTTP客户端
try:
    import aiohttp
except ImportError:
    print("⚠️  需要安装 aiohttp: pip install aiohttp")
    raise SystemExit(1)

# SSL证书支持（可选）
try:
    import certifi
    SSL_CONTEXT = ssl.create_default_context(cafile=certifi.where())
except ImportError:
    SSL_CONTEXT = None

# 项目根目录
ROOT = Path(__file__).resolve().parents[1]

# 默认并发数量
DEFAULT_CONCURRENCY = 30

# Prompt模板，用于指导AI生成帮助文档
PROMPT_TEMPLATE = """
你现在的角色是：
一名精通 Web Coding、AI 应用设计、以及"从示例中教学"的导师。

我将提供给你：
1）一个 HTML 网页的源代码（可能包含 JS / API 调用）
2）（可选）该网页的截图或功能描述

你的任务不是"解释代码"，
而是为【学习者】撰写一份【帮助文档】。

这份文档的目标是：
让用户在阅读后，能够：
- 正确使用这个网页
- 理解它的核心结构与设计思路
- 模仿它，做出一个"属于自己的版本"
- 并能清楚地知道：可以从哪些地方继续改进

请严格按照以下结构输出文档内容：

--------------------------------
【一】这个网页解决了什么问题？
- 用"使用场景"的语言描述
- 不要复述代码功能
- 说明：它适合在什么情况下使用？不适合什么情况？

【二】使用方式（给第一次接触的人）
- 页面输入是什么？
- 用户通常会做哪几步操作？
- 输出结果长什么样？
- 有哪些容易忽略的使用细节？

【三】核心结构拆解（学习重点）
请用"模块化"的方式解释，而不是逐行讲代码：
- 页面由哪几个关键模块组成？
- 每个模块承担什么职责？
- 输入 → 处理 → 输出 的逻辑链路是怎样的？
- 哪一部分是"这个网页最值得学习的设计"？

【四】Prompt / AI 逻辑是如何被设计的？
- Prompt 在这个页面中扮演什么角色？
- 它解决的是"理解问题"还是"生成问题"？
- 哪些信息是 Prompt 中的关键变量？
- 如果只改 Prompt，不改代码，会发生什么变化？

【五】如何模仿它，做出你自己的版本？
请给出一个清晰的"模仿路径"，例如：
- 第一步：保持结构不变，替换使用场景
- 第二步：调整输入字段或 Prompt
- 第三步：改变输出形式或展示方式

让学习者知道：**从哪里下手是最安全的。**

【六】3–5 个可直接尝试的改造方向（非常重要）
请给出具体、可操作的改进建议，例如：
- 可以增加哪些输入？
- 可以换成什么模型或 API？
- 可以如何拆成多个页面？
- 可以如何优化交互或体验？

【七】这个网页不适合做什么？（边界提醒）
- 明确指出它的局限性
- 说明：如果用户想做 X，应该换什么工具或方式

--------------------------------

整体语气要求：
- 面向"想学会而不是只想用"的用户
- 不要炫技，不要假设读者是工程师
- 用清晰、可迁移的语言，而不是一次性说明
""".strip()


@dataclass
class ToolDoc:
    """工具文档数据结构"""
    id: str           # 文档ID
    title: str        # 工具标题
    path: str         # 文档路径
    source: str       # 源HTML路径
    categories: list[str]  # 分类标签


@dataclass
class TaskResult:
    """异步任务结果数据结构"""
    success: bool         # 是否成功
    doc: ToolDoc | None   # 生成的文档对象
    error: str | None     # 错误信息


def is_tool_html(html_path: Path, html_content: str) -> bool:
    """
    判断是否是工具类HTML（而不是纯静态页面或索引页）
    
    Args:
        html_path: HTML文件路径
        html_content: HTML文件内容
    
    Returns:
        bool: 是否为工具类HTML
    """
    # 排除条件：索引页、指南页、测试页等
    exclude_patterns = [
        r'index\.html$',  # 索引页
        r'guide\.html$',  # 指南页
        r'test.*\.html$',  # 测试页
    ]

    for pattern in exclude_patterns:
        if re.search(pattern, str(html_path)):
            return False

    # 文件太小，可能是空页面
    if len(html_content) < 500:
        return False

    # 必须包含的特征（至少一个）：Vue框架、API调用或响应式特性
    has_vue = bool(re.search(r'Vue\.createApp|createApp|new Vue|x-data', html_content, re.I))
    has_api_call = bool(re.search(r'fetch\s*\(|axios|\.post\(|\.get\(|api\.|deepseek|openai', html_content, re.I))
    has_reactive = bool(re.search(r'\bref\(|\breactive\(|v-model|@click|x-model', html_content, re.I))

    # 如果有交互框架或API调用，认为是工具
    if has_vue or has_api_call or has_reactive:
        return True

    return False


def extract_title(html_content: str, html_path: Path) -> str:
    """
    从HTML中提取标题
    
    优先级：<title>标签 > <h1>标签 > 文件名
    
    Args:
        html_content: HTML文件内容
        html_path: HTML文件路径
    
    Returns:
        str: 提取的标题
    """
    # 尝试从<title>标签提取
    title_match = re.search(r'<title[^>]*>(.*?)</title>', html_content, re.I | re.S)
    if title_match:
        title = title_match.group(1).strip()
        # 清理标题中的网站名后缀
        title = re.sub(r'\s*[-|]\s*(Happy Spider|AI|工具).*$', '', title, flags=re.I)
        if title:
            return title

    # 尝试从h1标签提取
    h1_match = re.search(r'<h1[^>]*>(.*?)</h1>', html_content, re.I | re.S)
    if h1_match:
        title = re.sub(r'<[^>]+>', '', h1_match.group(1)).strip()
        if title:
            return title

    # 使用文件名作为标题
    return html_path.stem.replace('_', ' ').replace('-', ' ').title()


def classify_tool(html: str) -> list[str]:
    """
    根据HTML内容自动分类工具
    
    Args:
        html: HTML文件内容
    
    Returns:
        list[str]: 分类标签列表
    """
    categories = []

    # API调用类工具
    if re.search(r'fetch\(|axios|api\b|deepseek|openai|anthropic', html, re.I):
        categories.append("api")
    
    # 内容生成类工具
    if re.search(r'生成|generate|prompt|completion|llm|writer|创作', html, re.I):
        categories.append("generation")
    
    # 计算分析类工具
    if re.search(r'计算|calc|math|formula|统计|分析', html, re.I):
        categories.append("calculation")
    
    # 可视化类工具
    if re.search(r'图表|chart|可视化|visual|echarts|d3', html, re.I):
        categories.append("visualization")
    
    # 编辑修改类工具
    if re.search(r'编辑|edit|rewrite|润色|改写', html, re.I):
        categories.append("editing")

    return categories if categories else ["tool"]


def iter_all_html_files(include_tutorials: bool = False) -> Iterable[tuple[Path, str]]:
    """
    遍历所有HTML文件
    
    Args:
        include_tutorials: 是否包含教程目录
    
    Yields:
        tuple[Path, str]: (文件路径, 相对路径)
    """
    search_paths = [
        ROOT / "tools",
        ROOT / "book_planning",
    ]

    # 根目录下的单个HTML文件
    for html_file in ROOT.glob("*.html"):
        if html_file.name != "index.html":
            yield html_file, html_file.relative_to(ROOT).as_posix()

    if include_tutorials:
        search_paths.append(ROOT / "llm-tutorials")

    for base_path in search_paths:
        if not base_path.exists():
            continue

        for html_file in base_path.rglob("*.html"):
            # 跳过dist目录
            if "dist/" in str(html_file):
                continue

            rel_path = html_file.relative_to(ROOT).as_posix()
            yield html_file, rel_path


async def call_deepseek_async(
    session: aiohttp.ClientSession,
    api_key: str,
    model: str,
    html: str,
    semaphore: asyncio.Semaphore,
    ssl_context: ssl.SSLContext | bool = True,
    max_retries: int = 3
) -> str:
    """
    异步调用DeepSeek API生成文档
    
    Args:
        session: aiohttp会话对象
        api_key: DeepSeek API密钥
        model: 模型名称
        html: HTML源代码
        semaphore: 并发信号量，用于控制并发数
        max_retries: 最大重试次数
    
    Returns:
        str: AI生成的文档内容
    
    Raises:
        Exception: API调用失败时抛出
    """
    # 截取HTML内容（避免超过token限制）
    if len(html) > 50000:
        html = html[:50000] + "\n\n... (内容已截断)"

    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": PROMPT_TEMPLATE},
            {
                "role": "user",
                "content": f"HTML 源代码如下：\n\n```html\n{html}\n```",
            },
        ],
        "temperature": 0.4,
    }

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}",
    }

    # 使用信号量控制并发
    async with semaphore:
        for attempt in range(max_retries):
            try:
                async with session.post(
                    "https://api.deepseek.com/v1/chat/completions",
                    json=payload,
                    headers=headers,
                    timeout=aiohttp.ClientTimeout(total=120),
                    ssl=ssl_context
                ) as response:
                    if response.status != 200:
                        error_text = await response.text()
                        raise Exception(f"API返回错误状态 {response.status}: {error_text[:200]}")
                    
                    data = await response.json()
                    return data["choices"][0]["message"]["content"]

            except asyncio.TimeoutError:
                if attempt < max_retries - 1:
                    wait_time = 2 ** attempt
                    await asyncio.sleep(wait_time)
                else:
                    raise Exception("API调用超时")
            
            except aiohttp.ClientError as e:
                if attempt < max_retries - 1:
                    wait_time = 2 ** attempt
                    await asyncio.sleep(wait_time)
                else:
                    raise Exception(f"网络错误: {str(e)}")
            
            except Exception as e:
                if attempt < max_retries - 1:
                    wait_time = 2 ** attempt
                    await asyncio.sleep(wait_time)
                else:
                    raise


async def process_single_file(
    html_path: Path,
    rel_path: str,
    output_dir: Path,
    session: aiohttp.ClientSession,
    api_key: str | None,
    model: str,
    semaphore: asyncio.Semaphore,
    task_id: int,
    total_tasks: int,
    ssl_context: ssl.SSLContext | bool = True,
    dry_run: bool = False,
) -> TaskResult:
    """
    异步处理单个HTML文件
    
    Args:
        html_path: HTML文件路径
        rel_path: 相对路径
        output_dir: 输出目录
        session: aiohttp会话对象
        api_key: API密钥
        model: 模型名称
        semaphore: 并发信号量
        task_id: 任务编号
        total_tasks: 总任务数
        dry_run: 是否为测试模式
    
    Returns:
        TaskResult: 任务结果
    """
    try:
        # 读取HTML内容
        html_content = html_path.read_text(encoding="utf-8")
    except Exception as e:
        print(f"❌ [{task_id}/{total_tasks}] 读取失败: {rel_path} - {e}")
        return TaskResult(success=False, doc=None, error=str(e))

    # 判断是否是工具类HTML
    if not is_tool_html(html_path, html_content):
        return TaskResult(success=True, doc=None, error=None)  # 跳过，不是错误

    # 生成文档ID和文件名
    doc_id = html_path.stem
    # 如果在子目录中，添加父目录作为前缀
    if html_path.parent != ROOT:
        parent_name = html_path.parent.name
        if parent_name not in ["tools", "book_planning"]:
            doc_id = f"{parent_name}_{doc_id}"

    doc_filename = f"{doc_id}.md"
    doc_path = output_dir / doc_filename

    # 提取标题和分类
    title = extract_title(html_content, html_path)
    categories = classify_tool(html_content)

    print(f"📄 [{task_id}/{total_tasks}] {rel_path}")
    print(f"   标题: {title} | 分类: {', '.join(categories)}")

    if dry_run:
        print(f"   [DRY RUN] 将生成: {doc_filename}")
        doc = ToolDoc(
            id=doc_id,
            title=title,
            path=doc_filename,
            source=rel_path,
            categories=categories,
        )
        return TaskResult(success=True, doc=doc, error=None)

    # 生成文档内容
    if api_key:
        try:
            print(f"   🤖 调用AI生成文档...")
            content = await call_deepseek_async(session, api_key, model, html_content, semaphore, ssl_context)

            # 添加元数据头部
            header = f"""# {title}

> **源文件**: `{rel_path}`
> **分类**: {', '.join(categories)}
> **生成时间**: {time.strftime('%Y-%m-%d')}

---

"""
            content = header + content
            print(f"   ✅ 生成成功")

        except Exception as e:
            print(f"   ❌ 生成失败: {str(e)[:100]}")
            content = f"""# {title}

> **源文件**: `{rel_path}`
> **状态**: 生成失败

## 错误信息

```
{str(e)}
```

请检查API配置或稍后重试。
"""
            # 写入失败文档但标记为错误
            doc_path.write_text(content, encoding="utf-8")
            doc = ToolDoc(
                id=doc_id,
                title=title,
                path=doc_filename,
                source=rel_path,
                categories=categories,
            )
            return TaskResult(success=False, doc=doc, error=str(e))
    else:
        content = f"""# {title}

> **源文件**: `{rel_path}`
> **分类**: {', '.join(categories)}

## 待生成

请设置环境变量 `DEEPSEEK_API_KEY` 后重新运行脚本，以生成完整的帮助文档。

运行命令：
```bash
export DEEPSEEK_API_KEY="your-api-key"
python3 help/generate_help_docs_enhanced.py
```
"""
        print(f"   ⏭️  跳过生成（无API key）")

    # 写入文件
    doc_path.write_text(content, encoding="utf-8")

    # 创建文档对象
    doc = ToolDoc(
        id=doc_id,
        title=title,
        path=doc_filename,
        source=rel_path,
        categories=categories,
    )

    return TaskResult(success=True, doc=doc, error=None)


def load_env_file() -> None:
    """
    加载根目录下的.env文件（如果存在）
    用于读取API密钥等配置
    """
    env_path = ROOT / ".env"
    if not env_path.exists():
        return

    print(f"📄 发现配置文件: {env_path}")
    try:
        content = env_path.read_text(encoding="utf-8")
        count = 0
        for line in content.splitlines():
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            
            if "=" in line:
                key, value = line.split("=", 1)
                key = key.strip()
                value = value.strip().strip("'").strip('"')
                
                # 仅在未设置时加载，避免覆盖环境变量
                if key not in os.environ:
                    os.environ[key] = value
                    count += 1
        print(f"   已加载 {count} 个环境变量")
    except Exception as e:
        print(f"⚠️  加载 .env 失败: {e}")


async def generate_docs_async(
    output_dir: Path,
    manifest_path: Path,
    model: str,
    concurrency: int = DEFAULT_CONCURRENCY,
    include_tutorials: bool = False,
    no_ssl_verify: bool = False,
    dry_run: bool = False,
) -> None:
    """
    异步并行生成文档的主函数
    
    Args:
        output_dir: 输出目录
        manifest_path: 清单文件路径
        model: 模型名称
        concurrency: 并发数量（默认30）
        include_tutorials: 是否包含教程目录
        dry_run: 是否为测试模式
    """
    # 加载环境变量
    load_env_file()

    api_key = os.getenv("DEEPSEEK_API_KEY")
    output_dir.mkdir(parents=True, exist_ok=True)

    # 创建并发信号量
    semaphore = asyncio.Semaphore(concurrency)

    # 配置SSL上下文
    if no_ssl_verify:
        ssl_context = False  # 禁用SSL验证
        print("⚠️  SSL证书验证已禁用")
    elif SSL_CONTEXT:
        ssl_context = SSL_CONTEXT  # 使用certifi证书
        print("✅ 使用certifi SSL证书")
    else:
        ssl_context = True  # 使用系统默认证书

    print(f"\n{'='*60}")
    print(f"🚀 开始扫描HTML文件... (并发数: {concurrency})")
    print(f"{'='*60}\n")

    # 收集所有待处理的文件
    html_files = list(iter_all_html_files(include_tutorials))
    total_count = len(html_files)
    
    print(f"📊 发现 {total_count} 个HTML文件，开始并行处理...\n")

    # 创建aiohttp会话（使用连接池）
    connector = aiohttp.TCPConnector(limit=concurrency, limit_per_host=concurrency)
    timeout = aiohttp.ClientTimeout(total=180)
    
    async with aiohttp.ClientSession(connector=connector, timeout=timeout) as session:
        # 创建所有任务
        tasks = [
            process_single_file(
                html_path=html_path,
                rel_path=rel_path,
                output_dir=output_dir,
                session=session,
                api_key=api_key,
                model=model,
                semaphore=semaphore,
                task_id=idx + 1,
                total_tasks=total_count,
                ssl_context=ssl_context,
                dry_run=dry_run,
            )
            for idx, (html_path, rel_path) in enumerate(html_files)
        ]

        # 并行执行所有任务
        start_time = time.time()
        results = await asyncio.gather(*tasks, return_exceptions=True)
        elapsed_time = time.time() - start_time

    # 统计结果
    docs: list[ToolDoc] = []
    success_count = 0
    error_count = 0
    skipped_count = 0

    for result in results:
        if isinstance(result, Exception):
            error_count += 1
            print(f"❌ 任务异常: {result}")
        elif isinstance(result, TaskResult):
            if result.doc is None:
                skipped_count += 1  # 不是工具类HTML
            elif result.success:
                success_count += 1
                docs.append(result.doc)
            else:
                error_count += 1
                if result.doc:
                    docs.append(result.doc)  # 保留失败的文档记录

    # 生成manifest（清单文件）
    manifest = {
        "generated_at": time.strftime('%Y-%m-%d %H:%M:%S'),
        "total_scanned": total_count,
        "tools_found": len(docs),
        "docs_generated": success_count,
        "success_count": success_count,
        "error_count": error_count,
        "skipped_count": skipped_count,
        "concurrency": concurrency,
        "elapsed_seconds": round(elapsed_time, 2),
        "docs": [
            {
                "id": doc.id,
                "title": doc.title,
                "path": doc.path,
                "source": doc.source,
                "categories": doc.categories,
            }
            for doc in docs
        ],
    }

    manifest_path.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    # 打印统计信息
    print(f"\n{'='*60}")
    print(f"📊 生成统计")
    print(f"{'='*60}")
    print(f"总扫描文件数: {total_count}")
    print(f"识别工具数: {len(docs)}")
    print(f"跳过文件数: {skipped_count}")
    if api_key:
        print(f"成功生成: {success_count}")
        print(f"生成失败: {error_count}")
    else:
        print(f"⚠️  未设置API key，已生成占位文档")
    print(f"\n⏱️  总耗时: {elapsed_time:.2f} 秒")
    print(f"� 并发数: {concurrency}")
    if success_count > 0:
        print(f"📈 平均每个文档: {elapsed_time/success_count:.2f} 秒")
    print(f"\n�📁 输出目录: {output_dir}")
    print(f"📋 索引文件: {manifest_path}")
    print(f"{'='*60}\n")


def main() -> None:
    """主入口函数，解析命令行参数并启动异步任务"""
    parser = argparse.ArgumentParser(
        description="Enhanced help doc generator - 异步并行版本，支持高并发生成文档"
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=ROOT / "docs" / "help",
        help="输出目录，用于存放生成的Markdown文件",
    )
    parser.add_argument(
        "--manifest",
        type=Path,
        default=ROOT / "help" / "manifest.json",
        help="清单文件路径，记录所有生成的文档信息",
    )
    parser.add_argument(
        "--model",
        default="deepseek-chat",
        help="DeepSeek模型名称 (deepseek-chat 或 deepseek-reasoner)",
    )
    parser.add_argument(
        "--concurrency",
        "-c",
        type=int,
        default=DEFAULT_CONCURRENCY,
        help=f"并发请求数量 (默认: {DEFAULT_CONCURRENCY})",
    )
    parser.add_argument(
        "--include-tutorials",
        action="store_true",
        help="是否包含 llm-tutorials 目录 (默认: False)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="测试模式 - 仅扫描和报告，不实际生成文档",
    )
    parser.add_argument(
        "--no-ssl-verify",
        action="store_true",
        help="禁用SSL证书验证（解决macOS证书问题）",
    )

    args = parser.parse_args()

    # 运行异步主函数
    asyncio.run(
        generate_docs_async(
            output_dir=args.output_dir,
            manifest_path=args.manifest,
            model=args.model,
            concurrency=args.concurrency,
            include_tutorials=args.include_tutorials,
            no_ssl_verify=args.no_ssl_verify,
            dry_run=args.dry_run,
        )
    )


if __name__ == "__main__":
    main()
