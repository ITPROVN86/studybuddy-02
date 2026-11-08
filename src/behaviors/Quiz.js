export function initialize(){
 const intervals=[],timeouts=[],listeners=[];
 const setInterval=(fn,ms)=>{const id=window.setInterval(fn,ms);intervals.push(id);return id;};
 const setTimeout=(fn,ms)=>{const id=window.setTimeout(fn,ms);timeouts.push(id);return id;};
 const listen=(target,name,fn)=>{target.addEventListener(name,fn);listeners.push([target,name,fn]);};

  let secondsRemaining = 865; // 14:25
  const timerElem = document.getElementById('timeString');

  setInterval(() => {
    if (secondsRemaining > 0) {
      secondsRemaining--;
      const mins = Math.floor(secondsRemaining / 60);
      const secs = secondsRemaining % 60;
      if (timerElem) {
        timerElem.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      }
    }
  }, 1000);

  function resetOptionStyles() {
    ['A', 'B', 'C', 'D'].forEach(letter => {
      const btn = document.getElementById('option-' + letter);
      if (btn) {
        btn.className = 'option-btn w-full p-space-md md:p-space-lg rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container transition-all flex items-center justify-between text-left group';
        const icon = btn.querySelector('.indicator-icon');
        if (icon) {
          icon.textContent = 'radio_button_unchecked';
          icon.className = 'indicator-icon material-symbols-outlined text-outline-variant text-[22px]';
        }
      }
    });
  }

  function selectAnswer(choice) {
    resetOptionStyles();
    const selectedBtn = document.getElementById('option-' + choice);
    const feedback = document.getElementById('feedbackBox');
    
    if (choice === 'B') {
      // Correct Option
      selectedBtn.className = 'option-btn w-full p-space-md md:p-space-lg rounded-xl bg-tertiary-fixed/30 text-on-tertiary-fixed-variant transition-all flex items-center justify-between text-left shadow-md transform scale-[1.01] duration-200';
      const icon = selectedBtn.querySelector('.indicator-icon');
      if (icon) {
        icon.textContent = 'check_circle';
        icon.className = 'indicator-icon material-symbols-outlined text-tertiary text-[24px]';
      }
      if (feedback) {
        feedback.classList.remove('hidden');
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } else {
      // Incorrect Option
      selectedBtn.className = 'option-btn w-full p-space-md md:p-space-lg rounded-xl bg-error-container/40 text-on-error-container transition-all flex items-center justify-between text-left shadow-sm animate-pulse';
      const icon = selectedBtn.querySelector('.indicator-icon');
      if (icon) {
        icon.textContent = 'cancel';
        icon.className = 'indicator-icon material-symbols-outlined text-error text-[24px]';
      }
      // Also highlight correct answer softly
      const correctBtn = document.getElementById('option-B');
      if (correctBtn) {
        correctBtn.className = 'option-btn w-full p-space-md md:p-space-lg rounded-xl bg-tertiary-fixed/20 text-tertiary font-medium flex items-center justify-between text-left';
      }
    }
  }

  function proceedNextQuestion() {
    alert('Chuyển tiếp sang Câu hỏi số 6!');
  }

  function retakeQuiz() {
    resetOptionStyles();
    alert('Đang làm mới bài trắc nghiệm với thứ tự câu hỏi ngẫu nhiên!');
  }

  function shareAchievement() {
    alert('Đã sao chép liên kết chứng nhận 90% (Master Algorithmic Mind) để gửi vào phòng học nhóm!');
  }

  // Auto-initialize option B demonstration state on first load
  selectAnswer('B');

return {handlers:{resetOptionStyles,selectAnswer,proceedNextQuestion,retakeQuiz,shareAchievement},cleanup(){intervals.forEach(window.clearInterval);timeouts.forEach(window.clearTimeout);listeners.forEach(([t,n,f])=>t.removeEventListener(n,f));}};
}
