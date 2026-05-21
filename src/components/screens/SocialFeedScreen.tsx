"use client";

import React from "react";
import { useReadoraStore } from "@/store/useReadoraStore";
import { Heart, MessageSquare, Share2, Bookmark, Feather } from "lucide-react";

interface ScreenProps {
  onNavigate: (screen: string) => void;
}

export const SocialFeedScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const { posts, likePost, saveQuote } = useReadoraStore();

  const handleLike = (postId: string) => {
    likePost(postId);
  };

  const handleSaveQuote = (bookTitle: string, author: string, text: string) => {
    saveQuote(bookTitle, author, text);
  };

  return (
    <div className="min-h-full bg-[#0F0F0F] text-[#F5F1E8] p-5 pb-28 bg-grain relative">
      {/* Cinematic Ambient Glow */}
      <div className="absolute top-[-5%] right-[-10%] w-[100%] h-[35%] bg-gradient-to-b from-[#7C2D12]/10 via-transparent to-transparent rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-center pt-2 mb-6 relative z-10">
        <div>
          <span className="text-[9px] uppercase tracking-widest text-[#A8A29E] font-semibold">
            Collective Mind
          </span>
          <h2 className="font-serif text-lg font-medium text-[#F5F1E8] mt-0.5 leading-tight">
            Resonances Feed
          </h2>
        </div>
        
        {/* Quick Read Button */}
        <button
          onClick={() => onNavigate("home")}
          className="text-[9px] uppercase tracking-widest text-[#C46A2D] font-bold border border-[#C46A2D]/20 bg-[#C46A2D]/5 px-3 py-1.5 rounded-full active:scale-[0.95] flex items-center gap-1 transition-all"
        >
          <Feather className="w-3.5 h-3.5" /> Read Today
        </button>
      </div>

      {/* Social Posts List */}
      <div className="space-y-6 relative z-10">
        {posts.map((post) => (
          <div
            key={post.id}
            className="glass-panel rounded-3xl p-5 border border-white/5 space-y-4 shadow-lg"
          >
            {/* User Profile Header */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full border border-white/10 overflow-hidden relative">
                  <img src={post.userAvatar} alt={post.userName} className="w-full h-full object-cover" />
                </div>
                {/* User Info */}
                <div>
                  <div className="text-xs font-bold text-[#F5F1E8] flex items-center gap-1.5">
                    {post.userName}
                    <span className="text-[8px] uppercase tracking-widest bg-[#C46A2D]/15 text-[#C46A2D] px-1.5 py-0.5 rounded-full font-bold">
                      {post.userRank}
                    </span>
                  </div>
                  <span className="text-[8px] text-[#A8A29E] font-light">
                    Shared reflection • {post.timestamp}
                  </span>
                </div>
              </div>
            </div>

            {/* Stylized Quote Card (Apple TV / Awwwards inspired) */}
            <div className="bg-[#151515] rounded-2xl p-4 border border-white/5 relative overflow-hidden group">
              <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-radial-gradient from-white/3 to-transparent pointer-events-none" />
              
              <span className="text-[8px] uppercase tracking-widest text-[#E6B566] font-bold block mb-2">
                Excerpt from {post.bookTitle}
              </span>
              
              <p className="font-serif text-xs sm:text-sm italic text-[#F5F1E8] leading-relaxed relative z-10 pr-6">
                &quot;{post.quote}&quot;
              </p>
              <span className="text-[9px] text-[#A8A29E] font-light block mt-1 relative z-10">
                — {post.bookAuthor}
              </span>

              {/* Bookmark Save action */}
              <button
                onClick={() => handleSaveQuote(post.bookTitle, post.bookAuthor, post.quote)}
                className="absolute right-3.5 bottom-3.5 p-1.5 rounded-lg bg-white/5 border border-white/5 text-[#A8A29E] hover:text-[#C46A2D] hover:border-[#C46A2D]/20 active:scale-[0.85] transition-all"
              >
                <Bookmark className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Personal User Reflection details */}
            <div className="space-y-1 pl-1">
              <span className="text-[8px] uppercase tracking-wider text-[#A8A29E] font-semibold">
                Reflection thoughts
              </span>
              <p className="text-[11px] sm:text-xs text-[#D6D3CE] leading-relaxed font-light">
                {post.reflection}
              </p>
            </div>

            {/* Interaction Buttons Bar */}
            <div className="flex items-center gap-6 pt-3 border-t border-white/5 pl-1">
              {/* Appreciate button (Like) */}
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-1.5 text-[10px] font-bold tracking-wide transition-all active:scale-[0.85] ${
                  post.liked ? "text-[#C46A2D]" : "text-[#A8A29E] hover:text-current"
                }`}
              >
                <Heart className={`w-4 h-4 ${post.liked ? "fill-current" : ""}`} />
                <span>{post.likes}</span>
              </button>

              {/* Comment button */}
              <button className="flex items-center gap-1.5 text-[10px] font-bold tracking-wide text-[#A8A29E] hover:text-[#C46A2D] active:scale-[0.85] transition-all">
                <MessageSquare className="w-4 h-4" />
                <span>{post.commentsCount}</span>
              </button>

              {/* Share button */}
              <button className="flex items-center gap-1.5 text-[10px] font-bold tracking-wide text-[#A8A29E] hover:text-[#C46A2D] active:scale-[0.85] transition-all ml-auto">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
