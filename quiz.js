// Quiz 自测通用逻辑
// V-014
(function() {
  'use strict';

  function renderChoice(item, index, container, state) {
    var wrap = document.createElement('div');
    wrap.className = 'quiz-question';
    wrap.innerHTML = '<p><strong>' + (index + 1) + '. ' + item.question + '</strong></p>';

    var opts = document.createElement('div');
    opts.className = 'quiz-options';

    var explanation = document.createElement('div');
    explanation.className = 'quiz-explanation';
    explanation.style.display = 'none';
    explanation.textContent = item.explanation || '';

    var buttons = [];
    item.options.forEach(function(opt, i) {
      var btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.textContent = opt;
      btn.addEventListener('click', function() {
        if (state.passed[index]) return;
        // Reset previous attempt styles
        buttons.forEach(function(b) {
          b.classList.remove('correct', 'wrong');
        });
        if (i === item.answer) {
          btn.classList.add('correct');
          state.passed[index] = true;
          explanation.style.display = 'block';
          checkAll(state);
        } else {
          btn.classList.add('wrong');
          buttons[item.answer].classList.add('correct');
          explanation.style.display = 'block';
        }
      });
      buttons.push(btn);
      opts.appendChild(btn);
    });

    wrap.appendChild(opts);
    wrap.appendChild(explanation);
    container.appendChild(wrap);
  }

  function renderShort(item, index, container, state) {
    var wrap = document.createElement('div');
    wrap.className = 'quiz-question';
    wrap.innerHTML = '<p><strong>' + (index + 1) + '. ' + item.question + '</strong></p>';

    var input = document.createElement('textarea');
    input.className = 'quiz-input';
    input.rows = 3;

    var btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = '提交';

    var result = document.createElement('div');
    result.className = 'quiz-result';
    result.style.display = 'none';

    var explanation = document.createElement('div');
    explanation.className = 'quiz-explanation';
    explanation.style.display = 'none';
    explanation.textContent = item.explanation || '';

    btn.addEventListener('click', function() {
      if (state.passed[index]) return;
      var text = input.value.toLowerCase();
      var matched = 0;
      (item.keywords || []).forEach(function(kw) {
        if (text.indexOf(kw.toLowerCase()) !== -1) matched++;
      });
      var min = item.minKeywords || 1;
      if (matched >= min) {
        result.style.display = 'block';
        result.style.color = 'green';
        result.textContent = '✓ 回答正确！';
        state.passed[index] = true;
        explanation.style.display = 'block';
        checkAll(state);
      } else {
        result.style.display = 'block';
        result.style.color = 'red';
        result.textContent = '✗ 回答不完整，请重试。';
        explanation.style.display = 'block';
      }
    });

    wrap.appendChild(input);
    wrap.appendChild(btn);
    wrap.appendChild(result);
    wrap.appendChild(explanation);
    container.appendChild(wrap);
  }

  function checkAll(state) {
    for (var i = 0; i < state.total; i++) {
      if (!state.passed[i]) return;
    }
    if (typeof state.onPass === 'function') {
      state.onPass();
    }
  }

  window.Quiz = {
    init: function(containerId, quizData, onPass) {
      if (!quizData || quizData.length === 0) return;
      var container = document.getElementById(containerId);
      if (!container) return;

      var wrap = document.createElement('div');
      wrap.className = 'quiz-container';

      var state = {
        total: quizData.length,
        passed: [],
        onPass: onPass
      };
      for (var i = 0; i < quizData.length; i++) {
        state.passed.push(false);
      }

      quizData.forEach(function(item, idx) {
        if (item.type === 'choice') {
          renderChoice(item, idx, wrap, state);
        } else if (item.type === 'short') {
          renderShort(item, idx, wrap, state);
        }
      });

      container.appendChild(wrap);
    }
  };
})();
// V-014
