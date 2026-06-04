# Fix Report

## Summary
- Total FAIL items: 4
- Fixed: 4
- Still failing: 0

## Fixes Applied

### V-013: progress.js getTrackStats + reset 单页重置
- **Root cause**: `getTrackStats()` 使用 `track.pages || track.items` 直接取页面列表，但 NAV_CONFIG 实际结构为 `tracks[].groups[].pages[]`（嵌套一层 groups），导致取不到页面，返回 `total:0`。此外 `reset()` 只支持清空全部（`removeItem`），不支持 `reset(pageId)` 单页重置。
- **Fix**: 
  1. 修改 `getTrackStats` 中页面收集逻辑：优先遍历 `track.groups.forEach(g => g.pages.forEach(...))`，fallback 保留旧兼容路径
  2. 页面 ID 提取增加 `pg.file.replace('.html', '')` 以匹配 NAV_CONFIG 中的 file 字段
  3. `reset(pageId)` 增加参数支持：传入 pageId 时仅删除该页记录，不传时保持原有清空全部行为
- **Files modified**: progress.js

### V-016: SA 侧边栏调用 renderSATip
- **Root cause**: `nav.js` 中 `window.renderSATip(currentFile, tips)` 已定义且逻辑正确（仅 Track A 渲染、含折叠功能），但 Track A 的 16 个页面没有任何一个实际调用它，运行时永远不会显示 SA 提示。
- **Fix**: 在 transformer.html、rag.html、inference.html 三个关键页面的末尾（`</body>` 前）追加 `<script>` 块，调用 `renderSATip` 并传入 2 条 SA 视角提示（每条关联一个学习步骤）。使用 `if (window.renderSATip)` 防御性检查。
- **Files modified**: transformer.html, rag.html, inference.html

### V-021: 相关专题链接 .related-topics
- **Root cause**: common.css 定义了 `.related-topics` 和 `.related-topic-link` 样式类，但项目中没有任何 HTML 页面使用这些类。验收要求"存在 .related-topics 区域"未满足。
- **Fix**: 在 b1-aws-ai-services.html 和 c1-multi-agent.html 底部（`</body>` 前）各追加一个 `.related-topics` 区块，包含 3 个 `.related-topic-link` 链接到相关专题页面，实现跨专题知识关联。
- **Files modified**: b1-aws-ai-services.html, c1-multi-agent.html

### V-022: quizScore 字段
- **Root cause**: quiz.js 的 `onPass` 回调（由 stepper.js 传入）仅调用 `Progress.markComplete(pageId)`，不记录 quiz 得分。localStorage schema 中 `pages['xxx']` 缺少 `quizScore` 字段。
- **Fix**:
  1. 在 progress.js 中新增 `setQuizScore(pageId, score, total)` 方法，将 `{ score, total, updatedAt }` 写入 `data.pages[pageId].quizScore`
  2. 在 `window.Progress` 导出中注册 `setQuizScore`
  3. 在 stepper.js 的 Quiz onPass 回调中，`markComplete` 之前调用 `Progress.setQuizScore(pageId, quizData.length, quizData.length)` 记录分数
- **Files modified**: progress.js, stepper.js

## Verification Notes
- 所有修复均为追加/最小改动，不影响已 PASS 的 25 项验收条目
- progress.js 保持 ES5 var/function 风格，与原代码一致
- stepper.js 修改在 Quiz.init 回调内部，仅在 Quiz 全通过后执行，不影响其他流程
- SA tip 调用使用 `if (window.renderSATip)` 防御性检查，nav.js 未加载时静默跳过
- related-topics 区块使用 common.css 已定义的样式类，无新增 CSS
