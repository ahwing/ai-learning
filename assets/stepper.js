// Shared stepper logic for LLM Learning Path
// Include this in pages that use the standard stepper pattern
(function(){
  // This provides utility functions for stepper pages
  // Individual pages define their own stages array and call initStepper()
  
  window.initStepper = function(stages, options = {}) {
    let step = 0;
    let autoId = null;
    const autoInterval = options.interval || 4000;

    // New options: progress callback and quiz trigger
    const pageId = options.pageId || '';
    const onComplete = options.onComplete || null;
    const enableQuiz = options.enableQuiz || false;
    const quizData = options.quizData || [];
    
    function render() {
      const s = stages[step];
      let html = `<div class="stage"><div class="stage-header"><div class="stage-num">${step+1}</div><div class="stage-title">${s.title}</div></div><div class="stage-desc">${s.desc}</div><div class="viz">${s.viz()}</div></div>`;
      document.getElementById('content').innerHTML = html;
      document.getElementById('stepText').textContent = `${step+1} / ${stages.length}`;
      document.getElementById('progressBar').style.width = ((step+1)/stages.length*100)+'%';
      document.getElementById('btnPrev').disabled = step === 0;
      document.getElementById('btnNext').disabled = step === stages.length - 1;

      // Last step: trigger progress and quiz logic
      if (step === stages.length - 1) {
        // 标记为学习中
        if (pageId && window.Progress) {
          Progress.markInProgress(pageId);
        }

        // 触发 onComplete 回调
        if (onComplete) onComplete();

        // 如果启用 Quiz 且有题目数据
        if (enableQuiz && quizData.length > 0 && window.Quiz) {
          // 在 content 区域底部追加 quiz 容器
          const quizDiv = document.createElement('div');
          quizDiv.id = 'page-quiz';
          document.getElementById('content').appendChild(quizDiv);

          Quiz.init('page-quiz', quizData, function() {
            // Quiz 全部通过后标记页面完成
            if (pageId && window.Progress) {
              if (Progress.setQuizScore) {
                Progress.setQuizScore(pageId, quizData.length, quizData.length);
              }
              Progress.markComplete(pageId);
            }
          });
        }
      }
    }
    
    function next() { if(step < stages.length-1) { step++; render(); } }
    function prev() { if(step > 0) { step--; render(); } }
    
    function toggleAuto() {
      if(autoId) {
        clearInterval(autoId); autoId = null;
        document.getElementById('btnAuto').textContent = '▶ 自动播放';
      } else {
        autoId = setInterval(()=>{
          if(step >= stages.length-1) { clearInterval(autoId); autoId=null; document.getElementById('btnAuto').textContent='▶ 自动播放'; }
          else next();
        }, autoInterval);
        document.getElementById('btnAuto').textContent = '⏸ 暂停';
      }
    }
    
    // Arrow keys for step navigation
    document.addEventListener('keydown', function(e) {
      if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if(!e.altKey) {
        if(e.key === 'ArrowRight') next();
        if(e.key === 'ArrowLeft') prev();
      }
    });
    
    // Expose globally
    window.next = next;
    window.prev = prev;
    window.toggleAuto = toggleAuto;
    
    render();
    return { next, prev, toggleAuto, render };
  };
})();
