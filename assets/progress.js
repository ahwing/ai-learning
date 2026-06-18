/**
 * Learning Progress Manager
 * 管理学习进度的持久化存储与查询
 */
(function() {
  'use strict';

  var STORAGE_KEY = 'llm_learning_progress';

  function createEmpty() {
    return { version: 1, lastUpdated: null, pages: {} };
  }

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return createEmpty();
      var data = JSON.parse(raw);
      if (!data || typeof data !== 'object' || !data.pages) return createEmpty();
      return data;
    } catch (e) {
      return createEmpty();
    }
  }

  function save(data) {
    try {
      data.lastUpdated = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      // localStorage 容量满时静默失败
    }
  }

  function getStatus(pageId) {
    var data = load();
    var entry = data.pages[pageId];
    return entry ? entry.status : 'not_started';
  }

  function markInProgress(pageId) {
    var data = load();
    var current = data.pages[pageId];
    // 只在 not_started 时生效，不降级 complete
    if (current && current.status !== 'not_started') return;
    data.pages[pageId] = { status: 'in_progress', updatedAt: new Date().toISOString() };
    save(data);
  }

  function markComplete(pageId) {
    var data = load();
    data.pages[pageId] = { status: 'complete', updatedAt: new Date().toISOString() };
    save(data);
  }

  function getTrackStats(trackId) {
    var empty = { total: 0, completed: 0, inProgress: 0, notStarted: 0, percentage: 0 };
    if (!window.NAV_CONFIG) return empty;

    var tracks = window.NAV_CONFIG.tracks || window.NAV_CONFIG;
    var track = null;

    // 支持数组或对象格式的 NAV_CONFIG.tracks
    if (Array.isArray(tracks)) {
      for (var i = 0; i < tracks.length; i++) {
        if (tracks[i].id === trackId) { track = tracks[i]; break; }
      }
    } else if (tracks[trackId]) {
      track = tracks[trackId];
    }

    if (!track) return empty;

    // NAV_CONFIG 结构为 tracks[].groups[].pages[]，需要遍历 groups
    var pages = [];
    if (track.groups && Array.isArray(track.groups)) {
      track.groups.forEach(function(g) {
        (g.pages || []).forEach(function(p) { pages.push(p); });
      });
    } else {
      pages = track.pages || track.items || [];
    }
    var total = pages.length;
    if (total === 0) return empty;

    var completed = 0, inProgress = 0, notStarted = 0;
    var data = load();

    for (var j = 0; j < pages.length; j++) {
      var pg = pages[j];
      var pid = typeof pg === 'string' ? pg : (pg.id || pg.pageId || pg.file.replace('.html', '') || '');
      var entry = data.pages[pid];
      var status = entry ? entry.status : 'not_started';
      if (status === 'complete') completed++;
      else if (status === 'in_progress') inProgress++;
      else notStarted++;
    }

    return {
      total: total,
      completed: completed,
      inProgress: inProgress,
      notStarted: notStarted,
      percentage: Math.round((completed / total) * 100)
    };
  }

  function getAll() {
    return load();
  }

  function reset(pageId) {
    if (pageId) {
      var data = load();
      if (data.pages[pageId]) {
        delete data.pages[pageId];
        save(data);
      }
      return;
    }
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // 静默失败
    }
  }

  function setQuizScore(pageId, score, total) {
    var data = load();
    if (!data.pages[pageId]) {
      data.pages[pageId] = { status: 'in_progress', updatedAt: new Date().toISOString() };
    }
    data.pages[pageId].quizScore = { score: score, total: total, updatedAt: new Date().toISOString() };
    save(data);
  }

  window.Progress = {
    getStatus: getStatus,
    markInProgress: markInProgress,
    markComplete: markComplete,
    getTrackStats: getTrackStats,
    getAll: getAll,
    reset: reset,
    setQuizScore: setQuizScore
  };
})();
// 验收条目: V-013, V-022
