#!/usr/bin/env python3
"""Generate help markdown docs for tools using DeepSeek API."""

from __future__ import annotations

import argparse
import json
import os
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

import urllib.request

ROOT = Path(__file__).resolve().parents[1]
TOOLS_DIR = ROOT / "tools"

PROMPT_TEMPLATE = """
你现在的角色是：
一名精通 Web Coding、AI 应用设计、以及“从示例中教学”的导师。

我将提供给你：
1）一个 HTML 网页的源代码（可能包含 JS / API 调用）
2）（可选）该网页的截图或功能描述

你的任务不是“解释代码”，
而是为【学习者】撰写一份【帮助文档】。

这份文档的目标是：
让用户在阅读后，能够：
- 正确使用这个网页
- 理解它的核心结构与设计思路
- 模仿它，做出一个“属于自己的版本”
- 并能清楚地知道：可以从哪些地方继续改进

请严格按照以下结构输出文档内容：

--------------------------------
【一】这个网页解决了什么问题？
- 用“使用场景”的语言描述
- 不要复述代码功能
- 说明：它适合在什么情况下使用？不适合什么情况？

【二】使用方式（给第一次接触的人）
- 页面输入是什么？
- 用户通常会做哪几步操作？
- 输出结果长什么样？
- 有哪些容易忽略的使用细节？

【三】核心结构拆解（学习重点）
请用“模块化”的方式解释，而不是逐行讲代码：
- 页面由哪几个关键模块组成？
- 每个模块承担什么职责？
- 输入 → 处理 → 输出 的逻辑链路是怎样的？
- 哪一部分是“这个网页最值得学习的设计”？

【四】Prompt / AI 逻辑是如何被设计的？
- Prompt 在这个页面中扮演什么角色？
- 它解决的是“理解问题”还是“生成问题”？
- 哪些信息是 Prompt 中的关键变量？
- 如果只改 Prompt，不改代码，会发生什么变化？

【五】如何模仿它，做出你自己的版本？
请给出一个清晰的“模仿路径”，例如：
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
- 面向“想学会而不是只想用”的用户
- 不要炫技，不要假设读者是工程师
- 用清晰、可迁移的语言，而不是一次性说明
""".strip()


tool_pattern = re.compile(
    r"\{\s*id:\s*'(?P<id>[^']+)'\s*,\s*name:\s*'(?P<name>[^']+)'\s*,\s*desc:\s*'(?P<desc>[^']+)'\s*,\s*href:\s*'(?P<href>[^']+)'",
    re.S,
)


def iter_tool_entries() -> Iterable[dict]:
    for tools_file in TOOLS_DIR.rglob("tools.js"):
        text = tools_file.read_text(encoding="utf-8")
        for match in tool_pattern.finditer(text):
            data = match.groupdict()
            data["source"] = tools_file
            yield data


def classify_tool(html: str) -> list[str]:
    categories = []
    if re.search(r"fetch\(|axios|api\b|deepseek|openai|anthropic", html, re.I):
        categories.append("api")
    if re.search(r"生成|generate|prompt|completion|llm", html, re.I):
        categories.append("generation")
    if re.search(r"计算|calc|math|formula", html, re.I):
        categories.append("calculation")
    return categories


@dataclass
class ToolDoc:
    id: str
    title: str
    path: str
    source: str
    categories: list[str]


def call_deepseek(api_key: str, model: str, html: str) -> str:
    payload = json.dumps(
        {
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
    ).encode("utf-8")
    request = urllib.request.Request(
        "https://api.deepseek.com/v1/chat/completions",
        data=payload,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}",
        },
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=90) as response:
        data = json.loads(response.read().decode("utf-8"))
    return data["choices"][0]["message"]["content"]


def generate_docs(output_dir: Path, manifest_path: Path, model: str) -> None:
    api_key = os.getenv("DEEPSEEK_API_KEY")
    output_dir.mkdir(parents=True, exist_ok=True)

    docs: list[ToolDoc] = []

    for tool in iter_tool_entries():
        href = tool["href"]
        html_path = ROOT / href
        if not html_path.exists():
            continue

        html = html_path.read_text(encoding="utf-8")
        categories = classify_tool(html)
        if not categories:
            continue

        doc_id = tool["id"]
        doc_filename = f"{doc_id}.md"
        doc_path = output_dir / doc_filename
        if api_key:
            content = call_deepseek(api_key, model, html)
        else:
            content = (
                "# 待生成文档\n\n"
                "请设置环境变量 `DEEPSEEK_API_KEY` 后重新运行脚本，"
                "以生成完整的帮助文档。\n"
            )

        doc_path.write_text(content, encoding="utf-8")
        docs.append(
            ToolDoc(
                id=doc_id,
                title=tool["name"],
                path=doc_filename,
                source=str(href),
                categories=categories,
            )
        )

    manifest = {
        "docs": [
            {
                "id": doc.id,
                "title": doc.title,
                "path": doc.path,
                "source": doc.source,
                "categories": doc.categories,
            }
            for doc in docs
        ]
    }
    manifest_path.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate help docs for tools.")
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=ROOT / "help",
        help="Output directory for markdown files.",
    )
    parser.add_argument(
        "--manifest",
        type=Path,
        default=ROOT / "help" / "manifest.json",
        help="Manifest file to update.",
    )
    parser.add_argument(
        "--model",
        default="deepseek-chat",
        help="DeepSeek model name.",
    )
    args = parser.parse_args()

    generate_docs(args.output_dir, args.manifest, args.model)


if __name__ == "__main__":
    main()
