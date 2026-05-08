'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

const menuItems = [
  { name: '문제', href: '/problemset' },
  { name: '단계별로 풀어보기', href: '/step' },
  { name: '대회', href: '/contest' },
  { name: '채점 현황', href: '/status' },
  { name: '랭킹', href: '/rank' },
  { name: '게시판', href: '/board' },
  { name: '그룹', href: '/group' },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    // 1. 현재 세션 가져오기
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        fetchNickname(session.user.id);
      }
    };

    // 2. 닉네임 정보 가져오기
    const fetchNickname = async (userId: string) => {
      const { data, error } = await supabase
        .from('users')
        .select('nickname')
        .eq('id', userId)
        .single();
      
      if (data) setNickname(data.nickname);
    };

    getSession();

    // 3. 인증 상태 변경 구독
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchNickname(session.user.id);
      } else {
        setNickname('');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <header className="border-b border-boj-border bg-white">
      {/* Top Utility Bar */}
      <div className="border-b border-gray-100 bg-gray-50 py-1">
        <div className="container-boj flex justify-end gap-4 text-xs text-gray-500">
          {user ? (
            <>
              <span className="font-bold text-boj-blue">{nickname || user.email}</span>
              <Link href="/mypage" className="hover:underline">마이페이지</Link>
              <button 
                onClick={handleLogout}
                className="hover:underline"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline">로그인</Link>
              <Link href="/signup" className="hover:underline">회원가입</Link>
            </>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container-boj flex h-14 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-black text-boj-blue italic tracking-tighter">
            CodePlay<span className="text-gray-400 font-normal">.net</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold transition-colors hover:text-boj-blue ${
                  pathname === item.href ? 'text-boj-blue underline' : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden lg:block">
            <input
              type="text"
              placeholder="문제 번호, 제목"
              className="h-8 w-48 rounded border border-boj-border bg-gray-50 px-3 text-xs focus:border-boj-blue focus:outline-none"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
