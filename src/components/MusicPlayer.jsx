import React, {useEffect,useRef,useState} from 'react';
import './MusicPlayer.css';
const format=(value)=>{const n=Number.isFinite(value)?Math.floor(value):0;return Math.floor(n/60)+':'+String(n%60).padStart(2,'0')};
export default function MusicPlayer(){
 const audio=useRef(null);
 const [playing,setPlaying]=useState(false),[open,setOpen]=useState(true),[volume,setVolume]=useState(()=>{try{const v=localStorage.getItem('studybuddy-music-volume');return v===null?.35:Math.max(0,Math.min(1,Number(v)||0))}catch{return .35}}),[current,setCurrent]=useState(0),[duration,setDuration]=useState(0),[error,setError]=useState('');
 useEffect(()=>{if(audio.current)audio.current.volume=volume;try{localStorage.setItem('studybuddy-music-volume',String(volume))}catch{}},[volume]);
 async function toggle(){const a=audio.current;if(!a)return;if(!a.paused){a.pause();return}setError('');try{await a.play()}catch{setError('Chưa phát được nhạc. Hãy thử lại hoặc kiểm tra tệp âm thanh.')}}
 function stop(){if(audio.current){audio.current.pause();audio.current.currentTime=0;setCurrent(0)}}
 return <section className="sb-music" aria-label="Trình phát nhạc"><audio ref={audio} src={import.meta.env.BASE_URL+'audio/khuc-ca-doi-minh.mp3'} preload="metadata" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onEnded={()=>setPlaying(false)} onLoadedMetadata={()=>setDuration(audio.current.duration)} onTimeUpdate={()=>setCurrent(audio.current.currentTime)} onError={()=>{setPlaying(false);setError('Không tải được bài nhạc. Vui lòng kiểm tra kết nối.')}}/>
 <div className="sb-music-heading"><span>♫ Khúc Ca Đôi Mình</span><button type="button" aria-expanded={open} aria-label={open?'Thu gọn trình phát':'Mở trình phát'} onClick={()=>setOpen(!open)}>{open?'−':'+'}</button></div>
 {open&&<><div className="sb-music-buttons"><button type="button" onClick={toggle} aria-label={playing?'Tạm dừng nhạc':'Phát nhạc'}>{playing?'❚❚ Tạm dừng':'▶ Phát nhạc'}</button><button type="button" onClick={stop}>■ Dừng</button><span className="sb-music-time">{format(current)} / {format(duration)}</span></div>
 <label className="sb-music-seek">Vị trí bài nhạc<input aria-label="Vị trí bài nhạc" type="range" min="0" max={duration||0} step=".1" value={Math.min(current,duration||0)} disabled={!duration} onChange={e=>{const n=Number(e.target.value);audio.current.currentTime=n;setCurrent(n)}}/></label>
 <div className="sb-music-volume"><button type="button" aria-label="Giảm âm lượng" onClick={()=>setVolume(v=>Math.max(0,v-.1))}>−</button><label>Âm lượng<input aria-label="Âm lượng" type="range" min="0" max="1" step=".01" value={volume} onChange={e=>setVolume(Number(e.target.value))}/></label><button type="button" aria-label="Tăng âm lượng" onClick={()=>setVolume(v=>Math.min(1,v+.1))}>+</button><span>{Math.round(volume*100)}%</span></div></>}
 {error&&<p role="status" className="sb-music-error">{error}</p>}
 </section>;
}
