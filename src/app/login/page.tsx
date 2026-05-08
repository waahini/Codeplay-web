'use client';

import Link from 'next/link';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err.message || '로그인에 실패했습니다. 이메일과 비밀번호를 확인해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-boj flex min-h-[calc(100vh-100px)] items-center justify-center">
      <div className="w-full max-w-sm rounded border border-boj-border bg-white p-10 shadow-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="text-3xl font-black text-boj-blue italic tracking-tighter">
            CodePlay<span className="text-gray-400 font-normal">.net</span>
          </Link>
          <p className="mt-2 text-sm text-gray-500">알고리즘 트레이닝의 시작</p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          {error && (
            <div className="rounded bg-red-50 p-3 text-xs text-red-600 border border-red-100">
              {error}
            </div>
          )}
          <div>
            <label className="mb-1 block text-xs font-bold text-gray-600">이메일</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-boj-border p-3 text-sm focus:border-boj-blue focus:outline-none"
              placeholder="이메일을 입력하세요"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-gray-600">비밀번호</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-boj-border p-3 text-sm focus:border-boj-blue focus:outline-none"
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="keep" className="h-4 w-4 rounded border-gray-300 text-boj-blue focus:ring-boj-blue" />
            <label htmlFor="keep" className="text-xs text-gray-500 cursor-pointer">로그인 상태 유지</label>
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full rounded bg-boj-blue py-3 font-bold text-white hover:bg-blue-700 transition-colors shadow-sm disabled:bg-gray-400"
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-6 text-xs text-gray-500">
          <Link href="/register" className="text-boj-blue font-bold hover:underline">회원가입</Link>
          <div className="flex gap-3">
            <Link href="/find/id" className="hover:underline">아이디 찾기</Link>
            <Link href="/find/pw" className="hover:underline">비밀번호 찾기</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
