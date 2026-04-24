#!/usr/bin/env python3
"""
帮助文档组件批量注入脚本

功能：
1. 扫描指定目录下的所有 HTML 文件
2. 根据 manifest.json 匹配对应的帮助文档路径
3. 在 HTML 文件的 </body> 标签前自动注入帮助组件脚本

使用方法：
  python inject-help-widget.py [--dry-run] [--target-dir DIRECTORY]

选项：
  --dry-run       仅预览，不实际修改文件
  --target-dir    指定要扫描的目录（默认为 tools/）
  --remove        移除已注入的帮助组件

作者：AI Assistant
版本：1.0.0
"""

import os
import json
import re
import argparse
from pathlib import Path
from typing import Optional, Dict, List, Tuple

# ===================== 配置常量 =====================

# 项目根目录（脚本所在目录的父目录）
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent

# 帮助组件脚本标识（用于检测是否已注入以及移除）
HELP_WIDGET_MARKER_START = '<!-- HELP-WIDGET-START -->'
HELP_WIDGET_MARKER_END = '<!-- HELP-WIDGET-END -->'

# manifest.json 路径
MANIFEST_PATH = SCRIPT_DIR / 'manifest.json'

# 默认扫描目录
DEFAULT_TARGET_DIRS = ['tools']


def load_manifest() -> Optional[Dict]:
    """
    加载 manifest.json 文件
    
    返回：
        manifest 字典，加载失败返回 None
    """
    if not MANIFEST_PATH.exists():
        print(f"⚠️  警告: manifest.json 不存在: {MANIFEST_PATH}")
        return None
    
    try:
        with open(MANIFEST_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)
    except json.JSONDecodeError as e:
        print(f"❌ manifest.json 解析失败: {e}")
        return None


def build_source_to_doc_map(manifest: Dict) -> Dict[str, str]:
    """
    从 manifest 构建 source -> doc_path 的映射
    
    参数：
        manifest: manifest.json 的内容
        
    返回：
        {source_path: help_doc_path} 的字典
    """
    mapping = {}
    
    if not manifest or 'docs' not in manifest:
        return mapping
    
    for doc in manifest['docs']:
        source = doc.get('source', '')
        path = doc.get('path', '')
        if source and path:
            # 标准化路径（去除开头的 ./ 或 /）
            source = source.lstrip('./')
            mapping[source] = path
    
    return mapping


def get_script_depth(html_path: Path) -> int:
    """
    计算 HTML 文件相对于项目根目录的深度
    用于确定引用帮助组件脚本时的相对路径
    
    参数：
        html_path: HTML 文件路径
        
    返回：
        深度值（目录层级数）
    """
    try:
        relative = html_path.relative_to(PROJECT_ROOT)
        # 减去文件名本身，只算目录深度
        return len(relative.parts) - 1
    except ValueError:
        return 0


def generate_injection_code(html_path: Path, doc_path: Optional[str] = None) -> str:
    """
    生成要注入的帮助组件代码
    
    参数：
        html_path: HTML 文件路径
        doc_path: 帮助文档路径（可选，如果为 None 则使用自动匹配）
        
    返回：
        注入代码字符串
    """
    # 计算相对路径前缀
    depth = get_script_depth(html_path)
    relative_prefix = '../' * depth if depth > 0 else './'
    
    # 构建脚本标签
    script_tag = f'{relative_prefix}help/help-widget-v2.js'
    
    # 如果指定了文档路径，添加 data-help-doc 属性
    if doc_path:
        help_doc_attr = f' data-help-doc="{relative_prefix}docs/help/{doc_path}"'
    else:
        help_doc_attr = ''
    
    # 生成注入代码块
    injection_code = f'''
{HELP_WIDGET_MARKER_START}
<script src="{script_tag}"{help_doc_attr}></script>
{HELP_WIDGET_MARKER_END}'''
    
    return injection_code


def is_already_injected(content: str) -> bool:
    """
    检查 HTML 内容是否已经注入了帮助组件
    
    参数：
        content: HTML 文件内容
        
    返回：
        是否已注入
    """
    return HELP_WIDGET_MARKER_START in content


def remove_injection(content: str) -> str:
    """
    移除已注入的帮助组件代码
    
    参数：
        content: HTML 文件内容
        
    返回：
        移除后的内容
    """
    # 使用正则表达式匹配并移除注入代码块
    pattern = rf'\n?{re.escape(HELP_WIDGET_MARKER_START)}.*?{re.escape(HELP_WIDGET_MARKER_END)}\n?'
    return re.sub(pattern, '', content, flags=re.DOTALL)


def inject_into_html(content: str, injection_code: str) -> str:
    """
    将帮助组件代码注入到 HTML 内容中
    
    参数：
        content: HTML 文件内容
        injection_code: 要注入的代码
        
    返回：
        注入后的内容
    """
    # 如果已经注入，先移除旧的
    if is_already_injected(content):
        content = remove_injection(content)
    
    # 在 </body> 标签前插入
    # 使用正则表达式匹配 </body>（不区分大小写，可能有空格）
    pattern = r'([ \t]*)(</body>)'
    replacement = rf'{injection_code}\n\1\2'
    
    new_content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
    
    # 如果没有找到 </body>，则在文件末尾添加
    if new_content == content:
        new_content = content.rstrip() + injection_code + '\n'
    
    return new_content


def scan_html_files(target_dirs: List[str]) -> List[Path]:
    """
    扫描指定目录下的所有 HTML 文件
    
    参数：
        target_dirs: 要扫描的目录列表（相对于项目根目录）
        
    返回：
        HTML 文件路径列表
    """
    html_files = []
    
    for dir_name in target_dirs:
        target_path = PROJECT_ROOT / dir_name
        if not target_path.exists():
            print(f"⚠️  目录不存在，跳过: {target_path}")
            continue
        
        # 递归查找所有 .html 文件
        for html_file in target_path.rglob('*.html'):
            # 排除一些特殊文件
            if html_file.name.startswith('_') or 'template' in html_file.name.lower():
                continue
            html_files.append(html_file)
    
    return sorted(html_files)


def process_html_file(
    html_path: Path, 
    source_to_doc: Dict[str, str],
    dry_run: bool = False,
    remove: bool = False
) -> Tuple[bool, str]:
    """
    处理单个 HTML 文件
    
    参数：
        html_path: HTML 文件路径
        source_to_doc: source -> doc_path 的映射字典
        dry_run: 是否仅预览
        remove: 是否移除注入
        
    返回：
        (是否成功, 状态消息)
    """
    try:
        # 读取文件内容
        with open(html_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 计算相对于项目根目录的路径
        relative_path = str(html_path.relative_to(PROJECT_ROOT))
        
        # 查找对应的帮助文档
        doc_path = source_to_doc.get(relative_path)
        
        if remove:
            # 移除注入
            if not is_already_injected(content):
                return (True, '⏭️  未找到注入代码')
            
            new_content = remove_injection(content)
            
            if not dry_run:
                with open(html_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
            
            return (True, '🗑️  已移除' if not dry_run else '🗑️  将移除')
        else:
            # 注入代码
            if is_already_injected(content) and doc_path:
                # 更新已有的注入
                action = '🔄 更新'
            elif is_already_injected(content):
                return (True, '⏭️  已存在')
            else:
                action = '✅ 注入'
            
            injection_code = generate_injection_code(html_path, doc_path)
            new_content = inject_into_html(content, injection_code)
            
            if not dry_run:
                with open(html_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
            
            doc_info = f'(文档: {doc_path})' if doc_path else '(自动匹配)'
            return (True, f'{action} {doc_info}' if not dry_run else f'{action}预览 {doc_info}')
            
    except Exception as e:
        return (False, f'❌ 错误: {e}')


def main():
    """主函数"""
    # 解析命令行参数
    parser = argparse.ArgumentParser(
        description='帮助文档组件批量注入脚本',
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument(
        '--dry-run', 
        action='store_true',
        help='仅预览，不实际修改文件'
    )
    parser.add_argument(
        '--target-dir', 
        type=str,
        nargs='+',
        default=DEFAULT_TARGET_DIRS,
        help=f'指定要扫描的目录（默认: {DEFAULT_TARGET_DIRS}）'
    )
    parser.add_argument(
        '--remove',
        action='store_true',
        help='移除已注入的帮助组件'
    )
    parser.add_argument(
        '--file',
        type=str,
        help='仅处理指定的单个文件'
    )
    
    args = parser.parse_args()
    
    # 打印标题
    print('=' * 60)
    if args.remove:
        print('🗑️  帮助文档组件 - 批量移除')
    else:
        print('📖 帮助文档组件 - 批量注入')
    print('=' * 60)
    
    if args.dry_run:
        print('📋 模式: 仅预览（不会修改文件）\n')
    
    # 加载 manifest
    print('📂 加载 manifest.json...')
    manifest = load_manifest()
    source_to_doc = build_source_to_doc_map(manifest) if manifest else {}
    print(f'   找到 {len(source_to_doc)} 个文档映射\n')
    
    # 获取要处理的文件列表
    if args.file:
        file_path = Path(args.file)
        if not file_path.is_absolute():
            file_path = PROJECT_ROOT / file_path
        html_files = [file_path] if file_path.exists() else []
        if not html_files:
            print(f'❌ 文件不存在: {args.file}')
            return 1
    else:
        print(f'🔍 扫描目录: {args.target_dir}')
        html_files = scan_html_files(args.target_dir)
        print(f'   找到 {len(html_files)} 个 HTML 文件\n')
    
    if not html_files:
        print('⚠️  没有找到需要处理的 HTML 文件')
        return 0
    
    # 处理每个文件
    print('📝 处理文件:')
    print('-' * 60)
    
    success_count = 0
    error_count = 0
    skip_count = 0
    
    for html_path in html_files:
        relative_path = html_path.relative_to(PROJECT_ROOT)
        success, message = process_html_file(
            html_path, 
            source_to_doc, 
            dry_run=args.dry_run,
            remove=args.remove
        )
        
        # 统计
        if not success:
            error_count += 1
        elif '⏭️' in message:
            skip_count += 1
        else:
            success_count += 1
        
        # 输出结果
        print(f'  {relative_path}')
        print(f'      {message}')
    
    # 打印统计
    print('-' * 60)
    print(f'\n📊 统计:')
    print(f'   ✅ 成功: {success_count}')
    print(f'   ⏭️  跳过: {skip_count}')
    print(f'   ❌ 错误: {error_count}')
    
    if args.dry_run:
        print('\n💡 提示: 使用 --dry-run 模式，未实际修改任何文件')
        print('         移除 --dry-run 参数以执行实际操作')
    
    return 0 if error_count == 0 else 1


if __name__ == '__main__':
    exit(main())
