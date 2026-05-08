'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

// Mock data to show when DB is not connected
const MOCK_PROBLEMS = [
  { id: 1000, title: 'A+B', info: 'Bronze V', correct_count: 452132, correct_rate: '44.123%' },
  { id: 2750, title: '수 정렬하기', info: 'Bronze I', correct_count: 85123, correct_rate: '55.821%' },
  { id: 1001, title: 'A-B', info: 'Bronze V', correct_count: 321452, correct_rate: '68.214%' },
  { id: 1002, title: '터렛', info: 'Silver III', correct_count: 42132, correct_rate: '22.145%' },
  { id: 1330, title: '두 수 비교하기', info: 'Bronze V', correct_count: 512341, correct_rate: '48.912%' },
];

export default function ProblemSetPage() {
  const [problems, setProblems] = useState<any[]>(MOCK_PROBLEMS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProblems() {
      setLoading(true);
      // Supabase URL/Key가 설정되지 않은 경우를 위해 에러 핸들링
      try {
        const { data, error } = await supabase.from('Problems').select('*');
        if (data && data.length > 0) {
          setProblems(data);
        }
      } catch (e) {
        console.log('Supabase not configured, using mock data');
      } finally {
        setLoading(false);
      }
    }

    fetchProblems();
  }, []);

  return (
    <div className="container-boj py-8">
      <div className="mb-6 border-b border-gray-200 pb-2">
        <h1 className="text-2xl font-normal text-gray-800">문제</h1>
      </div>

      <div className="mb-4 flex items-center justify-between text-sm">
        <div className="flex gap-4">
          <Link href="/problemset" className="font-bold text-gray-800 underline">전체 문제</Link>
          <Link href="/problemset/tag" className="text-boj-blue hover:underline">태그별 문제</Link>
        </div>
        <div className="text-gray-500">
          총 {problems.length}개의 문제가 있습니다.
        </div>
      </div>

      <div className="overflow-hidden border-t-2 border-gray-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 font-bold text-gray-600">
            <tr className="border-b border-boj-border">
              <th className="px-4 py-2 text-center w-20">번호</th>
              <th className="px-4 py-2">문제 제목</th>
              <th className="px-4 py-2">정보</th>
              <th className="px-4 py-2 text-center">맞힌 사람</th>
              <th className="px-4 py-2 text-center">정답 비율</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-20 text-center text-gray-400">데이터를 불러오는 중...</td>
              </tr>
            ) : (
              problems.map((prob) => (
                <tr key={prob.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-center font-mono text-gray-500">{prob.id}</td>
                  <td className="px-4 py-3">
                    <Link href={`/problem/${prob.id}`} className="text-boj-blue hover:underline font-bold">
                      {prob.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-[11px] font-bold text-gray-500">
                      {prob.info || prob.difficulty}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-gray-500">{prob.correct_count?.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center text-gray-500">{prob.correct_rate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Placeholder */}
      <div className="mt-8 flex justify-center gap-1">
        {[1, 2, 3, 4, 5].map(p => (
          <button key={p} className={`h-8 w-8 border text-xs font-bold ${p === 1 ? 'bg-boj-blue text-white border-boj-blue' : 'bg-white text-gray-400 border-boj-border hover:bg-gray-50'}`}>
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
