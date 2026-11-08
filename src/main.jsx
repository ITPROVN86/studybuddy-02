// studybuddy-music-update-v1
import MusicPlayer from './components/MusicPlayer';
import React from 'react';
import {createRoot} from 'react-dom/client';
import {HashRouter,Routes,Route,Navigate,NavLink,useLocation} from 'react-router-dom';
import Home from './pages/Home';
import Flashcards from './pages/Flashcards';
import Quiz from './pages/Quiz';
import Chat from './pages/Chat';
import './styles.css';
const links=[['trang-chu','Home'],['the-ghi-nho','Flashcards'],['trac-nghiem-quiz','Quiz'],['tro-ly-ai-chat','AI Chat'],['hoc-nhom','Study Groups']];
function App(){const location=useLocation();React.useEffect(()=>{window.scrollTo(0,0);document.querySelectorAll('[data-path]').forEach(a=>{if('/'+a.dataset.path===location.pathname)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});},[location]);return <><nav className="mobile-nav" aria-label="Mobile navigation">{links.map(([path,label])=><NavLink key={path} to={'/'+path}>{label}</NavLink>)}</nav><Routes><Route path="/" element={<Navigate to="/trang-chu" replace/>}/><Route path="/trang-chu" element={<Home/>}/><Route path="/the-ghi-nho" element={<Flashcards/>}/><Route path="/trac-nghiem-quiz" element={<Quiz/>}/><Route path="/tro-ly-ai-chat" element={<Chat/>}/><Route path="/hoc-nhom" element={<main className="min-h-screen bg-surface p-10"><h1 className="text-3xl font-bold text-primary">Study Groups</h1><p className="my-6">The Study Groups page is not yet designed. This feature is pending development.</p><NavLink to="/trang-chu" className="text-primary underline">Back to Home</NavLink></main>}/><Route path="*" element={<Navigate to="/trang-chu" replace/>}/></Routes></>}
createRoot(document.getElementById('root')).render(<><MusicPlayer /><HashRouter><App/></HashRouter></>);
