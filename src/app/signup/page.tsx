'use client';

import Link from 'next/link';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      return;
    }

    setLoading(true);

    try {
      // 1. Supabase Auth 회원가입
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. public.users 테이블에 추가 정보 저장
        const { error: dbError } = await supabase
          .from('users')
          .insert([
            {
              id: authData.user.id,
              email: email,
              nickname: nickname,
              tier: 'Bronze V',
              solved_count: 0
            }
          ]);

        if (dbError) throw dbError;

        alert('회원가입이 완료되었습니다. 로그인해 주세요!');
        router.push('/login');
      }
    } catch (err: any) {
      setError(err.message || '회원가입 도중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-boj flex min-h-[calc(100vh-100px)] items-center justify-center py-10">
      <div className="w-full max-w-sm rounded border border-boj-border bg-white p-10 shadow-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="text-3xl font-black text-boj-blue italic tracking-tighter">
            CodePlay<span className="text-gray-400 font-normal">.net</span>
          </Link>
          <p className="mt-2 text-sm text-gray-500">새로운 계정 만들기</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded bg-red-50 p-3 text-xs text-red-600 border border-red-100">
              {error}
            </div>
          )}

          <div>
            <label className="mb-1 block text-xs font-bold text-gray-600">이메일 (아이디)</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-boj-border p-3 text-sm focus:border-boj-blue focus:outline-none"
              placeholder="example@codeplay.net"
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
              placeholder="6자 이상 입력하세요"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-gray-600">비밀번호 확인</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded border border-boj-border p-3 text-sm focus:border-boj-blue focus:outline-none"
              placeholder="비밀번호를 다시 입력하세요"
              required
            />
          </div>

          <div className="pb-2">
            <label className="mb-1 block text-xs font-bold text-gray-600">닉네임</label>
            <input 
              type="text" 
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full rounded border border-boj-border p-3 text-sm focus:border-boj-blue focus:outline-none"
              placeholder="사용하실 닉네임을 입력하세요"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full rounded bg-boj-blue py-3 font-bold text-white hover:bg-blue-700 transition-colors shadow-sm disabled:bg-gray-400"
          >
            {loading ? '가입 중...' : '회원가입'}
          </button>
        </form>

        <div className="mt-6 border-t border-gray-100 pt-6 text-center text-xs text-gray-500">
          이미 계정이 있으신가요? <Link href="/login" className="text-boj-blue font-bold hover:underline">로그인하기</Link>
        </div>
      </div>
    </div>
  );
}
