import React from 'react';
import {createRoot} from 'react-dom/client';
import {HashRouter,Routes,Route,Navigate,NavLink,useLocation} from 'react-router-dom';
import Home from './pages/Home';
import Flashcards from './pages/Flashcards';
import Quiz from './pages/Quiz';
import Chat from './pages/Chat';
import './styles.css';
const links=[['trang-chu','Trang chủ'],['the-ghi-nho','Thẻ ghi nhớ'],['trac-nghiem-quiz','Trắc nghiệm'],['tro-ly-ai-chat','Trợ lý AI'],['hoc-nhom','Học nhóm']];
function App(){const location=useLocation();React.useEffect(()=>{window.scrollTo(0,0);document.querySelectorAll('[data-path]').forEach(a=>{if('/'+a.dataset.path===location.pathname)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});},[location]);return <><nav className="mobile-nav" aria-label="Điều hướng di động">{links.map(([path,label])=><NavLink key={path} to={'/'+path}>{label}</NavLink>)}</nav><Routes><Route path="/" element={<Navigate to="/trang-chu" replace/>}/><Route path="/trang-chu" element={<Home/>}/><Route path="/the-ghi-nho" element={<Flashcards/>}/><Route path="/trac-nghiem-quiz" element={<Quiz/>}/><Route path="/tro-ly-ai-chat" element={<Chat/>}/><Route path="/hoc-nhom" element={<main className="min-h-screen bg-surface p-10"><h1 className="text-3xl font-bold text-primary">Học nhóm</h1><p className="my-6">File thiết kế nguồn chưa có trang Học nhóm. Chức năng này đang chờ phát triển.</p><NavLink to="/trang-chu" className="text-primary underline">Quay về trang chủ</NavLink></main>}/><Route path="*" element={<Navigate to="/trang-chu" replace/>}/></Routes></>}
createRoot(document.getElementById('root')).render(<HashRouter><App/></HashRouter>);
