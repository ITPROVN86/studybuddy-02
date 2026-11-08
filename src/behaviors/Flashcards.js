export function initialize(){
 const intervals=[],timeouts=[],listeners=[];
 const setInterval=(fn,ms)=>{const id=window.setInterval(fn,ms);intervals.push(id);return id;};
 const setTimeout=(fn,ms)=>{const id=window.setTimeout(fn,ms);timeouts.push(id);return id;};
 const listen=(target,name,fn)=>{target.addEventListener(name,fn);listeners.push([target,name,fn]);};

    let isFlipped = false;
    let currentCardIndex = 4;
    const totalCards = 25;

    function toggleCardFlip() {
      const cardInner = document.getElementById('flashcard-inner');
      if (!cardInner) return;
      isFlipped = !isFlipped;
      cardInner.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
    }

    function resetFlip() {
      const cardInner = document.getElementById('flashcard-inner');
      if (!cardInner) return;
      isFlipped = false;
      cardInner.style.transform = 'rotateY(0deg)';
    }

    function updateProgress() {
      const fill = document.getElementById('progress-bar-fill');
      const text = document.getElementById('progress-indicator');
      const pct = Math.round((currentCardIndex / totalCards) * 100);
      if (fill) fill.style.width = pct + '%';
      if (text) text.innerText = 'Thẻ ' + currentCardIndex + ' / ' + totalCards + ' (' + pct + '%)';
    }

    function nextCard() {
      if (currentCardIndex < totalCards) {
        currentCardIndex++;
        resetFlip();
        updateProgress();
      }
    }

    function prevCard() {
      if (currentCardIndex > 1) {
        currentCardIndex--;
        resetFlip();
        updateProgress();
      }
    }

    function recordMastery(mastered) {
      const btn = mastered ? document.getElementById('btn-mastered') : document.getElementById('btn-review');
      if (btn) {
        btn.classList.add('scale-95');
        setTimeout(() => btn.classList.remove('scale-95'), 150);
      }
      setTimeout(nextCard, 200);
    }

    function toggleBookmark(btn) {
      const icon = btn.querySelector('.material-symbols-outlined');
      if (icon) {
        if (icon.innerText === 'bookmark_border') {
          icon.innerText = 'bookmark';
          icon.style.fontVariationSettings = "'FILL' 1";
          btn.classList.add('text-primary');
        } else {
          icon.innerText = 'bookmark_border';
          icon.style.fontVariationSettings = "'FILL' 0";
          btn.classList.remove('text-primary');
        }
      }
    }

    function scrollCarousel(dir) {
      const c = document.getElementById('deck-carousel');
      if (c) {
        c.scrollBy({ left: dir * 280, behavior: 'smooth' });
      }
    }

    // Keyboard Shortcuts Support
    listen(window,'keydown', function(e) {
      // Ignore if typing in an input field
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        toggleCardFlip();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        nextCard();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        prevCard();
      } else if (e.key === '1') {
        e.preventDefault();
        recordMastery(false);
      } else if (e.key === '2') {
        e.preventDefault();
        recordMastery(true);
      }
    });
  
return {handlers:{toggleCardFlip,resetFlip,updateProgress,nextCard,prevCard,recordMastery,toggleBookmark,scrollCarousel},cleanup(){intervals.forEach(window.clearInterval);timeouts.forEach(window.clearTimeout);listeners.forEach(([t,n,f])=>t.removeEventListener(n,f));}};
}
