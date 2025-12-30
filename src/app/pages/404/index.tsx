import React from 'react';
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Ghost, ExternalLink } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen w-full bg-[#0f172a] relative overflow-hidden flex items-center justify-center p-4">
      {/* 1. Background Decor (Hiệu ứng nền giống trang Support) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]" />
      </div>

      {/* 2. Số 404 Chìm (Background Text) */}
      <div className="absolute select-none z-0 flex items-center justify-center w-full h-full opacity-5">
        <span className="text-[20vw] md:text-[30vw] font-black text-white leading-none tracking-tighter">
          404
        </span>
      </div>

      {/* 3. Main Content Card (Glassmorphism) */}
      <div className="relative z-10 w-full max-w-2xl">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl text-center">
          
          {/* Icon Ghost cute */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse"></div>
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl shadow-lg relative transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                <Ghost className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            404
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl mb-8 max-w-lg mx-auto leading-relaxed">
            Trang bạn tìm không tồn tại, vui lòng quay trở lại
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <Link to="/admin">
              <button className="group relative px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto flex items-center gap-2">
                <Home size={18} />
                <span>Về Trang Chủ</span>
              </button>
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-medium hover:bg-white/10 hover:text-white transition-all w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              <span>Quay lại</span>
            </button>
          </div>

          {/* Contact Footer */}
          <div className="pt-8 border-t border-white/5">
            <p className="text-slate-500 text-sm mb-3">
              Mọi thắc mình xin vui lòng liên hệ qua
            </p>
            <div className="flex justify-center gap-6">
              <a 
                href="https://zalo.me/0353123771" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
              >
                Zalo <ExternalLink size={12} />
              </a>
              <span className="text-slate-700">|</span>
              <a 
                href="https://facebook.com/huynhkha010" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
              >
                Facebook <ExternalLink size={12} />
              </a>
            </div>
          </div>

        </div>

        {/* Footer Branding */}
        <p className="text-center text-slate-600 text-xs mt-8">
          © 2025 Admin CMS. All rights reserved By Huynh Kha.
        </p>
      </div>
    </div>
  );
}