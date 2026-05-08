'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  Circle, 
  ArrowUpDown,
  ExternalLink
} from 'lucide-react';
import { PROBLEMS } from '@/lib/problems';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const problemList = Object.values(PROBLEMS);

export default function ProblemsPage() {
  const [search, setSearch] = useState('');

  const filteredProblems = problemList.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.id.toString().includes(search)
  );

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">문제 아카이브</h1>
          <p className="text-gray-400 mt-1">다양한 난이도의 문제를 풀고 실력을 쌓아보세요.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="문제 번호 또는 제목 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-64 rounded-lg border border-border-subtle bg-surface pl-10 pr-4 text-sm text-white focus:border-neon-blue focus:outline-none transition-all"
            />
          </div>
          <button className="flex h-10 items-center gap-2 rounded-lg border border-border-subtle bg-surface px-4 text-sm font-medium text-gray-300 hover:text-white transition-colors">
            <Filter className="h-4 w-4" />
            필터
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-2xl">
        <table className="w-full text-left text-sm">
          <thead className="bg-background/50 text-xs font-semibold uppercase text-gray-500">
            <tr>
              <th className="px-6 py-4">상태</th>
              <th className="px-6 py-4 flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                번호 <ArrowUpDown className="h-3 w-3" />
              </th>
              <th className="px-6 py-4">제목</th>
              <th className="px-6 py-4">난이도</th>
              <th className="px-6 py-4">정답률</th>
              <th className="px-6 py-4">태그</th>
              <th className="px-6 py-4 text-right">풀기</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filteredProblems.map((prob, idx) => (
              <motion.tr 
                key={prob.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group transition-colors hover:bg-white/5"
              >
                <td className="px-6 py-4">
                  {idx % 3 === 0 ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-green" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-700" />
                  )}
                </td>
                <td className="px-6 py-4 font-mono text-gray-400">#{prob.id}</td>
                <td className="px-6 py-4 font-bold text-white group-hover:text-neon-blue transition-colors">
                  <Link href={`/problem/${prob.id}`}>{prob.title}</Link>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                    prob.difficulty.includes('Bronze') ? "bg-orange-500/10 text-orange-500" :
                    prob.difficulty.includes('Silver') ? "bg-gray-400/10 text-gray-300" :
                    "bg-yellow-500/10 text-yellow-500"
                  )}>
                    {prob.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400">{(45 + idx * 7) % 100}%</td>
                <td className="px-6 py-4">
                  <div className="flex gap-1.5">
                    <span className="rounded-md bg-surface-light px-1.5 py-0.5 text-[10px] text-gray-500">그리디</span>
                    <span className="rounded-md bg-surface-light px-1.5 py-0.5 text-[10px] text-gray-500">정렬</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link 
                    href={`/problem/${prob.id}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-surface-light text-gray-400 transition-all hover:bg-neon-blue hover:text-white"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
