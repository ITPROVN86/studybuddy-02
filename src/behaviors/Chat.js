export function initialize(){
 const intervals=[],timeouts=[],listeners=[];
 const setInterval=(fn,ms)=>{const id=window.setInterval(fn,ms);intervals.push(id);return id;};
 const setTimeout=(fn,ms)=>{const id=window.setTimeout(fn,ms);timeouts.push(id);return id;};
 const listen=(target,name,fn)=>{target.addEventListener(name,fn);listeners.push([target,name,fn]);};

  function insertPrompt(text) {
    const textarea = document.getElementById('chat-textarea');
    if (textarea) {
      textarea.value = text;
      textarea.focus();
    }
  }

  // Auto-scroll chat container to the bottom on view
  (() => {
    const container = document.getElementById('chat-messages-container');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  })();

return {handlers:{insertPrompt},cleanup(){intervals.forEach(window.clearInterval);timeouts.forEach(window.clearTimeout);listeners.forEach(([t,n,f])=>t.removeEventListener(n,f));}};
}
