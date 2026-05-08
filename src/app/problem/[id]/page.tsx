'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Editor from '@monaco-editor/react';
import Link from 'next/link';

// Mock data for BOJ Clone
const PROBLEMS: Record<number, any> = {
  1000: {
    id: 1000,
    title: "A+B",
    time_limit: "2 초",
    memory_limit: "128 MB",
    submit_count: "1023451",
    correct_count: "452132",
    correct_user: "382103",
    correct_rate: "44.123%",
    description: "두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.",
    input: "첫째 줄에 A와 B가 주어진다. (0 < A, B < 10)",
    output: "첫째 줄에 A+B를 출력한다.",
    sample_input: "1 2",
    sample_output: "3",
    difficulty: "Bronze V"
  },
  2750: {
    id: 2750,
    title: "수 정렬하기",
    time_limit: "1 초",
    memory_limit: "128 MB",
    submit_count: "152341",
    correct_count: "85123",
    correct_user: "62132",
    correct_rate: "55.821%",
    description: "N개의 수가 주어졌을 때, 이를 오름차순으로 정렬하는 프로그램을 작성하시오.",
    input: "첫째 줄에 수의 개수 N(1 ≤ N ≤ 1,000)이 주어진다. 둘째 줄부터 N개의 줄에는 수 주어진다. 이 수는 절댓값이 1,000보다 작거나 같은 정수이다. 수는 중복되지 않는다.",
    output: "첫째 줄부터 N개의 줄에 오름차순으로 정렬한 결과를 한 줄에 하나씩 출력한다.",
    sample_input: "5\n5\n2\n3\n4\n1",
    sample_output: "1\n2\n3\n4\n5",
    difficulty: "Bronze I"
  }
};

const LANGUAGE_TEMPLATES: Record<string, string> = {
  python: 'import sys\n\n# 입력을 받고 로직을 작성하세요\nline = sys.stdin.readline()',
  cpp: '#include <iostream>\n\nusing namespace std;\n\nint main() {\n    // 코드를 작성하세요\n    return 0;\n}',
  java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 코드를 작성하세요\n    }\n}',
  javascript: 'const fs = require(\'fs\');\nconst input = fs.readFileSync(\'/dev/stdin\').toString().trim().split(\'\\n\');\n\n// 코드를 작성하세요',
};

export default function ProblemDetail() {
  const params = useParams();
  const id = Number(params.id);
  const problem = PROBLEMS[id];

  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [toast, setToast] = useState<{ show: boolean, message: string }>({ show: false, message: '' });
  const [judging, setJudging] = useState({ isJudging: false, progress: 0, result: '' });

  // 언어 변경 시 템플릿 코드 적용
  useEffect(() => {
    setCode(LANGUAGE_TEMPLATES[language] || '');
  }, [language]);

  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 2000);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast('복사되었습니다!');
    });
  };

  const handleSubmit = () => {
    if (judging.isJudging) return;

    setJudging({ isJudging: true, progress: 0, result: '' });
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 20) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        // 가짜 채점 결과 생성
        const results = [
          { text: '맞았습니다!!', color: 'text-boj-green' },
          { text: '틀렸습니다', color: 'text-red-600' },
          { text: '런타임 에러', color: 'text-purple-600' },
          { text: '시간 초과', color: 'text-orange-600' },
        ];
        const finalResult = results[Math.floor(Math.random() * results.length)];
        
        setTimeout(() => {
          setJudging({ isJudging: false, progress: 100, result: finalResult.text });
        }, 500);
      } else {
        setJudging(prev => ({ ...prev, progress: currentProgress }));
      }
    }, 200);
  };

  if (!problem) {
    return (
      <div className="container-boj py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-400">문제를 찾을 수 없습니다.</h1>
        <Link href="/" className="mt-4 inline-block text-boj-blue hover:underline">홈으로 돌아가기</Link>
      </div>
    );
  }

  return (
    <div className="container-boj py-8 relative">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-gray-800 text-white px-4 py-2 rounded text-sm shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
          {toast.message}
        </div>
      )}

      {/* Problem Header */}
      <div className="mb-6 border-b border-gray-200 pb-2">
        <h1 className="text-2xl font-normal text-gray-800">
          <span className="mr-2">{problem.id}번 -</span>
          {problem.title}
          <span className="ml-4 rounded bg-orange-500 px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wider align-middle">
            {problem.difficulty}
          </span>
        </h1>
      </div>

      {/* Limits Table */}
      <div className="mb-10 overflow-hidden border border-boj-border">
        <table className="w-full text-center text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr className="border-b border-boj-border">
              <th className="border-r border-boj-border py-2 font-bold">시간 제한</th>
              <th className="border-r border-boj-border py-2 font-bold">메모리 제한</th>
              <th className="border-r border-boj-border py-2 font-bold">제출</th>
              <th className="border-r border-boj-border py-2 font-bold">정답</th>
              <th className="border-r border-boj-border py-2 font-bold">맞힌 사람</th>
              <th className="py-2 font-bold">정답 비율</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-gray-800">
              <td className="border-r border-boj-border py-2">{problem.time_limit}</td>
              <td className="border-r border-boj-border py-2">{problem.memory_limit}</td>
              <td className="border-r border-boj-border py-2">{problem.submit_count}</td>
              <td className="border-r border-boj-border py-2">{problem.correct_count}</td>
              <td className="border-r border-boj-border py-2">{problem.correct_user}</td>
              <td className="py-2">{problem.correct_rate}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Problem Content */}
      <div className="space-y-12">
        <section>
          <h2 className="mb-4 text-xl font-bold text-gray-800 border-l-4 border-boj-blue pl-3">문제</h2>
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{problem.description}</div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-gray-800 border-l-4 border-boj-blue pl-3">입력</h2>
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{problem.input}</div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-gray-800 border-l-4 border-boj-blue pl-3">출력</h2>
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{problem.output}</div>
        </section>

        {/* Sample Input/Output */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <section>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800 border-l-4 border-boj-blue pl-3">예제 입력 1</h2>
              <button 
                onClick={() => handleCopy(problem.sample_input)}
                className="text-xs text-boj-blue hover:underline"
              >
                복사
              </button>
            </div>
            <pre className="rounded border border-boj-border bg-boj-gray-bg p-4 font-mono text-sm text-gray-800">
              {problem.sample_input}
            </pre>
          </section>
          <section>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800 border-l-4 border-boj-blue pl-3">예제 출력 1</h2>
              <button 
                onClick={() => handleCopy(problem.sample_output)}
                className="text-xs text-boj-blue hover:underline"
              >
                복사
              </button>
            </div>
            <pre className="rounded border border-boj-border bg-boj-gray-bg p-4 font-mono text-sm text-gray-800">
              {problem.sample_output}
            </pre>
          </section>
        </div>

        {/* Editor Section */}
        <section className="pt-10">
          <div className="mb-4 flex items-center justify-between border-b-2 border-gray-800 pb-2">
            <h2 className="text-xl font-bold text-gray-800">소스 코드 작성</h2>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="rounded border border-boj-border bg-white px-2 py-1 text-sm focus:outline-none"
            >
              <option value="python">Python 3</option>
              <option value="cpp">C++ 17</option>
              <option value="java">Java 11</option>
              <option value="javascript">Node.js</option>
            </select>
          </div>
          <div className="mb-4 h-[400px] overflow-hidden rounded border border-boj-border">
            <Editor
              height="100%"
              language={language}
              theme="vs-light"
              value={code}
              onChange={(val) => setCode(val || '')}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                fontFamily: 'Consolas, "Courier New", monospace',
              }}
            />
          </div>
          <div className="flex items-center justify-end gap-6">
            {judging.isJudging && (
              <div className="text-lg font-bold text-gray-500 animate-pulse">
                채점 중 ({judging.progress}%)
              </div>
            )}
            {!judging.isJudging && judging.result && (
              <div className={`text-lg font-bold ${
                judging.result === '맞았습니다!!' ? 'text-boj-green' : 
                judging.result === '틀렸습니다' ? 'text-red-600' : 
                'text-purple-600'
              }`}>
                {judging.result}
              </div>
            )}
            <button 
              onClick={handleSubmit}
              disabled={judging.isJudging}
              className={`rounded px-10 py-2.5 text-lg font-bold text-white transition-colors ${
                judging.isJudging ? 'bg-gray-400 cursor-not-allowed' : 'bg-boj-blue hover:bg-blue-700'
              }`}
            >
              제출
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
