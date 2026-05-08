'use client';

import Link from 'next/link';

const notices = [
  { id: 1, title: '[공지] 2026년 상반기 채점 서버 정기 점검 안내', date: '2026-05-01' },
  { id: 2, title: '[업데이트] Python 3.12 버전이 추가되었습니다.', date: '2026-04-25' },
  { id: 3, title: '[공지] 외부 API 연동 관련 보안 정책 강화 안내', date: '2026-04-20' },
];

const newProblems = [
  { id: 32001, title: '삼각형의 외심', category: '기하학' },
  { id: 32002, title: '문자열 압축 2', category: '문자열' },
  { id: 32003, title: '효율적인 네트워크', category: '그래프 이론' },
  { id: 32004, title: '카드 게임', category: '다이나믹 프로그래밍' },
  { id: 32005, title: '도시 계획', category: '그리디 알고리즘' },
];

export default function Home() {
  return (
    <div className="container-boj py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Main Content Area */}
        <div className="lg:col-span-8">
          {/* Welcome Message */}
          <section className="mb-10">
            <h1 className="mb-4 text-3xl font-normal text-gray-800">BOJ.Clone에 오신 것을 환영합니다.</h1>
            <p className="text-gray-600">
              이곳은 백준 온라인 저지의 클래식한 감성을 그대로 재현한 클론 프로젝트입니다.<br />
              다양한 알고리즘 문제를 풀고 실력을 쌓아보세요.
            </p>
          </section>

          {/* Notice Table */}
          <section className="mb-10">
            <div className="mb-2 flex items-center justify-between border-b-2 border-gray-800 pb-2">
              <h2 className="text-xl font-bold text-gray-800">공지사항</h2>
              <Link href="/board/notice" className="text-sm text-boj-blue hover:underline">더 보기</Link>
            </div>
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-gray-200">
                {notices.map((notice) => (
                  <tr key={notice.id} className="hover:bg-gray-50">
                    <td className="py-3 pr-4">
                      <Link href={`/board/notice/${notice.id}`} className="text-boj-blue hover:underline">
                        {notice.title}
                      </Link>
                    </td>
                    <td className="w-24 py-3 text-right text-gray-400">{notice.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* New Problems Table */}
          <section>
            <div className="mb-2 flex items-center justify-between border-b-2 border-gray-800 pb-2">
              <h2 className="text-xl font-bold text-gray-800">새로 추가된 문제</h2>
              <Link href="/problemset" className="text-sm text-boj-blue hover:underline">더 보기</Link>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 font-bold text-gray-600">
                <tr>
                  <th className="px-4 py-2">번호</th>
                  <th className="px-4 py-2">문제 제목</th>
                  <th className="px-4 py-2">분류</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {newProblems.map((prob) => (
                  <tr key={prob.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-gray-500">{prob.id}</td>
                    <td className="px-4 py-3">
                      <Link href={`/problem/${prob.id}`} className="text-boj-blue hover:underline">
                        {prob.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{prob.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>

        {/* Sidebar Area */}
        <div className="lg:col-span-4">
          <div className="rounded border border-boj-border bg-gray-50 p-6">
            <h3 className="mb-4 text-lg font-bold text-gray-800">로그인</h3>
            <form className="space-y-4">
              <input 
                type="text" 
                placeholder="아이디" 
                className="w-full rounded border border-boj-border p-2 text-sm focus:border-boj-blue focus:outline-none"
              />
              <input 
                type="password" 
                placeholder="비밀번호" 
                className="w-full rounded border border-boj-border p-2 text-sm focus:border-boj-blue focus:outline-none"
              />
              <button className="w-full rounded bg-boj-blue py-2 text-sm font-bold text-white hover:bg-blue-700">
                로그인
              </button>
            </form>
            <div className="mt-4 flex justify-center gap-4 text-xs text-gray-500">
              <Link href="/find/id" className="hover:underline">아이디 찾기</Link>
              <Link href="/find/pw" className="hover:underline">비밀번호 찾기</Link>
              <Link href="/register" className="hover:underline text-boj-blue font-bold">회원가입</Link>
            </div>
          </div>

          <div className="mt-6 rounded border border-boj-border p-6">
            <h3 className="mb-4 text-sm font-bold text-gray-500 uppercase tracking-wider">인기 태그</h3>
            <div className="flex flex-wrap gap-2">
              {['수학', '구현', '그리디', 'DP', '그래프', '문자열'].map(tag => (
                <span key={tag} className="rounded-full bg-blue-50 px-3 py-1 text-xs text-boj-blue border border-blue-100 cursor-pointer hover:bg-blue-100">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
