export function initialize(){
 const intervals=[],timeouts=[],listeners=[];
 const setInterval=(fn,ms)=>{const id=window.setInterval(fn,ms);intervals.push(id);return id;};
 const setTimeout=(fn,ms)=>{const id=window.setTimeout(fn,ms);timeouts.push(id);return id;};
 const listen=(target,name,fn)=>{target.addEventListener(name,fn);listeners.push([target,name,fn]);};

    let currentCategory = 'all';

    function filterCategory(cat) {
      currentCategory = cat;
      const buttons = document.querySelectorAll('.cat-pill');
      buttons.forEach(btn => {
        if (btn.getAttribute('data-cat') === cat) {
          btn.className = 'cat-pill px-space-md py-1.5 rounded-full bg-primary text-on-primary font-label-md text-label-md shadow-sm transition-all whitespace-nowrap';
        } else {
          btn.className = 'cat-pill px-space-md py-1.5 rounded-full bg-surface-container-lowest text-on-surface-variant hover:text-on-surface font-label-md text-label-md shadow-sm transition-all whitespace-nowrap';
        }
      });
      applyFilters();
    }

    function filterTopic(topic) {
      filterCategory(topic);
      const target = document.getElementById('danh-sach-bai-hoc');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }

    function handleSearch() {
      applyFilters();
    }

    function applyFilters() {
      const searchInput = document.getElementById('searchInput');
      const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
      const cards = document.querySelectorAll('.lesson-card');
      let visibleCount = 0;

      cards.forEach(card => {
        const topic = card.getAttribute('data-topic');
        const text = card.innerText.toLowerCase();
        
        const matchCategory = (currentCategory === 'all' || topic === currentCategory);
        const matchSearch = query === '' || text.includes(query);

        if (matchCategory && matchSearch) {
          card.classList.remove('hidden');
          card.classList.add('flex');
          visibleCount++;
        } else {
          card.classList.add('hidden');
          card.classList.remove('flex');
        }
      });

      const fallback = document.getElementById('noResultsState');
      if (fallback) {
        if (visibleCount === 0) {
          fallback.classList.remove('hidden');
          fallback.classList.add('flex');
        } else {
          fallback.classList.add('hidden');
          fallback.classList.remove('flex');
        }
      }
    }

    function resetFilters() {
      const searchInput = document.getElementById('searchInput');
      if (searchInput) searchInput.value = '';
      filterCategory('all');
    }
  
return {handlers:{filterCategory,filterTopic,handleSearch,applyFilters,resetFilters},cleanup(){intervals.forEach(window.clearInterval);timeouts.forEach(window.clearTimeout);listeners.forEach(([t,n,f])=>t.removeEventListener(n,f));}};
}
