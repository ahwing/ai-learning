// Navigation System for LLM Learning Path
// Global config exported for other modules
window.NAV_CONFIG = {
  tracks: [
    {
      id: 'A',
      name: 'AI 基础能力',
      color: '#00d2ff',
      groups: [
        {
          name: 'AI 基础',
          pages: [
            { file: 'neural-network.html', title: '🧠 神经网络基础' },
            { file: 'transformer.html', title: '🧱 Transformer 架构' },
            { file: 'pre-training.html', title: '🔥 预训练' },
            { file: 'scaling-laws.html', title: '📈 Scaling Laws' }
          ]
        },
        {
          name: '模型训练',
          pages: [
            { file: 'sft.html', title: '📝 监督微调 (SFT)' },
            { file: 'rlhf.html', title: '🎯 对齐 (RLHF/DPO)' },
            { file: 'rl-reasoning.html', title: '🧠 推理强化 (RL)' }
          ]
        },
        {
          name: '部署应用',
          pages: [
            { file: 'bedrock-overview.html', title: '☁️ Amazon Bedrock 全景' },
            { file: 'inference.html', title: '⚡ 推理部署' },
            { file: 'rag.html', title: '🔍 RAG 检索增强生成' },
            { file: 'prompt-engineering.html', title: '✍️ Prompt Engineering' },
            { file: 'evaluation.html', title: '📊 Evaluation 评估' },
            { file: 'mcp.html', title: '🔌 MCP' }
          ]
        },
        {
          name: '进阶应用',
          pages: [
            { file: 'multimodal.html', title: '🌐 多模态 AI' },
            { file: 'agent.html', title: '🤖 AI Agent' },
            { file: 'guardrails.html', title: '🛡️ Guardrails & AI 安全' }
          ]
        }
      ]
    },
    {
      id: 'B',
      name: 'SA 能力',
      color: '#ffa500',
      groups: [
        {
          name: 'Solutions Architect',
          pages: [
            { file: 'b1-aws-ai-services.html', title: '☁️ AWS AI/ML 服务全景' },
            { file: 'b2-architecture-patterns.html', title: '🏗️ AI 架构模式' },
            { file: 'b3-cost-optimization.html', title: '💰 成本优化与选型' },
            { file: 'b4-security-compliance.html', title: '🔒 安全合规' }
          ]
        }
      ]
    },
    {
      id: 'C',
      name: 'Agent 能力',
      color: '#c864ff',
      groups: [
        {
          name: 'Agent 进阶',
          pages: [
            { file: 'c1-multi-agent.html', title: '🤝 Multi-Agent 架构' },
            { file: 'c2-agent-frameworks.html', title: '🔧 Agent 编排框架' },
            { file: 'c3-agent-evaluation.html', title: '📊 Agent 评估与可观测性' },
            { file: 'c4-enterprise-agent.html', title: '🏢 企业级 Agent 部署' }
          ]
        }
      ]
    }
  ]
};

(function() {
  'use strict';

  // ─── Helpers ───────────────────────────────────────────────────────────────

  function getCurrentFile() {
    var path = window.location.pathname;
    return path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  }

  /**
   * Look up the current file in NAV_CONFIG.
   * Returns { track, group, page, trackPages, indexInTrack } or null.
   */
  function findPage(file) {
    var tracks = window.NAV_CONFIG.tracks;
    for (var t = 0; t < tracks.length; t++) {
      var track = tracks[t];
      // Build flat list of pages in this track
      var trackPages = [];
      var groups = track.groups;
      for (var g = 0; g < groups.length; g++) {
        var grp = groups[g];
        for (var p = 0; p < grp.pages.length; p++) {
          trackPages.push({ page: grp.pages[p], group: grp });
        }
      }
      for (var i = 0; i < trackPages.length; i++) {
        if (trackPages[i].page.file === file) {
          return {
            track: track,
            group: trackPages[i].group,
            page: trackPages[i].page,
            trackPages: trackPages.map(function(tp) { return tp.page; }),
            indexInTrack: i
          };
        }
      }
    }
    return null;
  }

  // ─── 2.1 Breadcrumb ───────────────────────────────────────────────────────

  function renderBreadcrumb(currentFile) {
    // Don't render on index page
    if (currentFile === 'index.html' || currentFile === '' || currentFile === '/') {
      return;
    }

    var info = findPage(currentFile);
    if (!info) return; // Unknown page — silently skip

    var breadcrumb = document.createElement('div');
    breadcrumb.className = 'breadcrumb';
    breadcrumb.style.cssText = [
      'padding: 8px 20px',
      'font-size: 14px',
      'color: #aaa',
      'border-bottom: 1px solid rgba(255,255,255,0.06)',
      'background: rgba(0,0,0,0.2)'
    ].join(';');

    var trackSpan = document.createElement('span');
    trackSpan.style.color = info.track.color;
    trackSpan.textContent = info.track.name;

    var separator1 = document.createTextNode(' · ');
    var groupSpan = document.createElement('span');
    groupSpan.textContent = info.group.name;

    var separator2 = document.createTextNode(' › ');
    var titleSpan = document.createElement('span');
    titleSpan.style.color = '#fff';
    titleSpan.textContent = info.page.title;

    breadcrumb.appendChild(trackSpan);
    breadcrumb.appendChild(separator1);
    breadcrumb.appendChild(groupSpan);
    breadcrumb.appendChild(separator2);
    breadcrumb.appendChild(titleSpan);

    document.body.insertBefore(breadcrumb, document.body.firstChild);
  }

  // ─── 2.2 Keyboard Navigation ──────────────────────────────────────────────

  function registerKeyboardNav(currentFile) {
    var info = findPage(currentFile);

    document.addEventListener('keydown', function(e) {
      // Don't intercept when focused on input/textarea/contenteditable
      var tag = (e.target.tagName || '').toLowerCase();
      var isEditable = (tag === 'input' || tag === 'textarea' || e.target.isContentEditable);

      // H key — go home (only if not in editable)
      if (e.key === 'h' || e.key === 'H') {
        if (!isEditable && !e.ctrlKey && !e.metaKey && !e.altKey) {
          window.location.href = 'index.html';
          return;
        }
      }

      // Alt+← / Alt+→ — navigate within track
      if (e.altKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        if (!info) return; // Unknown page — do nothing

        var idx = info.indexInTrack;
        var pages = info.trackPages;

        if (e.key === 'ArrowLeft' && idx > 0) {
          e.preventDefault();
          window.location.href = pages[idx - 1].file;
        } else if (e.key === 'ArrowRight' && idx < pages.length - 1) {
          e.preventDefault();
          window.location.href = pages[idx + 1].file;
        }
      }
    });
  }

  // ─── 2.3 UI Elements ──────────────────────────────────────────────────────

  function renderHomeButton() {
    // Don't add if already exists
    if (document.querySelector('.nav-home-btn')) return;

    var btn = document.createElement('a');
    btn.className = 'nav-home-btn';
    btn.href = 'index.html';
    btn.textContent = '🏠';
    btn.title = '返回首页 (H)';
    btn.style.cssText = [
      'position: fixed',
      'top: 12px',
      'left: 12px',
      'z-index: 9999',
      'font-size: 20px',
      'text-decoration: none',
      'background: rgba(30,30,40,0.85)',
      'border: 1px solid rgba(255,255,255,0.1)',
      'border-radius: 8px',
      'padding: 6px 10px',
      'cursor: pointer',
      'transition: transform 0.2s, background 0.2s'
    ].join(';');

    btn.addEventListener('mouseenter', function() {
      btn.style.transform = 'scale(1.1)';
      btn.style.background = 'rgba(50,50,60,0.95)';
    });
    btn.addEventListener('mouseleave', function() {
      btn.style.transform = 'scale(1)';
      btn.style.background = 'rgba(30,30,40,0.85)';
    });

    document.body.appendChild(btn);
  }

  function renderNavHint() {
    // Don't add if already exists
    if (document.querySelector('.nav-hint')) return;

    var hint = document.createElement('div');
    hint.className = 'nav-hint';
    hint.style.cssText = [
      'position: fixed',
      'bottom: 16px',
      'left: 50%',
      'transform: translateX(-50%)',
      'z-index: 9998',
      'font-size: 12px',
      'color: #666',
      'background: rgba(20,20,30,0.9)',
      'border: 1px solid rgba(255,255,255,0.08)',
      'border-radius: 8px',
      'padding: 8px 16px',
      'display: flex',
      'gap: 12px',
      'align-items: center'
    ].join(';');

    hint.innerHTML = [
      '<span><kbd style="background:#333;padding:2px 6px;border-radius:3px;font-size:11px;">Alt+←→</kbd> 切换页面</span>',
      '<span><kbd style="background:#333;padding:2px 6px;border-radius:3px;font-size:11px;">H</kbd> 首页</span>'
    ].join('');

    document.body.appendChild(hint);
  }

  // ─── 2.4 SA Tip Sidebar ────────────────────────────────────────────────────

  /**
   * renderSATip(currentFile, tips)
   * Only renders for Track A pages.
   * tips: [{ step: Number, tip: String }, ...]
   */
  window.renderSATip = function(currentFile, tips) {
    if (!tips || !tips.length) return;

    var info = findPage(currentFile);
    // Only render for Track A
    if (!info || info.track.id !== 'A') return;

    // Don't duplicate
    if (document.querySelector('.sa-tip-sidebar')) return;

    var sidebar = document.createElement('div');
    sidebar.className = 'sa-tip-sidebar';
    sidebar.style.cssText = [
      'position: fixed',
      'top: 80px',
      'right: 0',
      'width: 280px',
      'max-height: calc(100vh - 120px)',
      'overflow-y: auto',
      'z-index: 9990',
      'background: rgba(25,25,35,0.95)',
      'border-left: 2px solid #ffa500',
      'border-radius: 8px 0 0 8px',
      'padding: 0',
      'font-size: 13px',
      'transition: transform 0.3s ease',
      'transform: translateX(0)'
    ].join(';');

    // Header with collapse toggle
    var header = document.createElement('div');
    header.style.cssText = [
      'padding: 12px 16px',
      'background: rgba(255,165,0,0.1)',
      'border-bottom: 1px solid rgba(255,165,0,0.2)',
      'cursor: pointer',
      'display: flex',
      'justify-content: space-between',
      'align-items: center',
      'user-select: none'
    ].join(';');
    header.innerHTML = '<span style="color:#ffa500;font-weight:600;">🎯 SA 视角</span><span class="sa-tip-toggle" style="color:#888;font-size:16px;">◂</span>';

    var content = document.createElement('div');
    content.className = 'sa-tip-content';
    content.style.cssText = 'padding: 12px 16px;';

    var collapsed = false;
    header.addEventListener('click', function() {
      collapsed = !collapsed;
      if (collapsed) {
        sidebar.style.transform = 'translateX(248px)';
        header.querySelector('.sa-tip-toggle').textContent = '▸';
      } else {
        sidebar.style.transform = 'translateX(0)';
        header.querySelector('.sa-tip-toggle').textContent = '◂';
      }
    });

    // Render tips
    var html = '';
    for (var i = 0; i < tips.length; i++) {
      html += '<div style="margin-bottom:12px;padding:8px 10px;background:rgba(255,255,255,0.03);border-radius:6px;border-left:3px solid rgba(255,165,0,0.4);">';
      html += '<div style="color:#ffa500;font-size:11px;margin-bottom:4px;font-weight:500;">Step ' + tips[i].step + '</div>';
      html += '<div style="color:#ccc;line-height:1.5;">' + tips[i].tip + '</div>';
      html += '</div>';
    }
    content.innerHTML = html;

    sidebar.appendChild(header);
    sidebar.appendChild(content);
    document.body.appendChild(sidebar);
  };

  // ─── 2.5 Init on DOMContentLoaded ─────────────────────────────────────────

  function init() {
    var currentFile = getCurrentFile();

    renderBreadcrumb(currentFile);
    registerKeyboardNav(currentFile);
    renderHomeButton();
    renderNavHint();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
