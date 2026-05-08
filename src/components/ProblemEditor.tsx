'use client';

import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { 
  Play, 
  Send, 
  Settings, 
  Languages, 
  ChevronDown, 
  Terminal as TerminalIcon,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Problem } from '@/lib/problems';
import { executeCode, JudgeResult } from '@/lib/judge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ProblemEditorProps {
  problem: Problem;
}

const LANGUAGES = [
  { id: 'python', name: 'Python 3', monaco: 'python' },
  { id: 'cpp', name: 'C++ 17', monaco: 'cpp' },
  { id: 'java', name: 'Java 11', monaco: 'java' },
  { id: 'javascript', name: 'Node.js', monaco: 'javascript' },
];

export default function ProblemEditor({ problem }: ProblemEditorProps) {
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [code, setCode] = useState(problem.initial_templates[selectedLang.id]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);

  // Update code template when language changes
  useEffect(() => {
    setCode(problem.initial_templates[selectedLang.id]);
  }, [selectedLang, problem]);

  const handleRun = async () => {
    setIsTerminalOpen(true);
    setOutput('실행 중...\n');
    
    // For demo purposes, if no API key, simulate a successful run
    if (!process.env.NEXT_PUBLIC_RAPIDAPI_KEY) {
      setTimeout(() => {
        setOutput('입력: 1 2\n출력: 3\n결과: Success (0.01s)');
      }, 800);
      return;
    }

    const result = await executeCode(code, selectedLang.id, '1 2');
    formatOutput(result);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setIsTerminalOpen(true);
    setOutput('채점 진행 중...\n');

    if (!process.env.NEXT_PUBLIC_RAPIDAPI_KEY) {
      setTimeout(() => {
        setIsSubmitting(false);
        setOutput('결과: 맞았습니다!! (12ms, 12MB)');
      }, 1500);
      return;
    }

    const result = await executeCode(code, selectedLang.id, '1 2');
    setIsSubmitting(false);
    formatOutput(result, true);
  };

  const formatOutput = (result: JudgeResult, isSubmit: boolean = false) => {
    if (result.status.id === 3) { // Accepted
      if (isSubmit) {
        setOutput(`결과: 맞았습니다!! (${result.time}s, ${result.memory}KB)`);
      } else {
        setOutput(`출력: ${result.stdout}\n결과: Success (${result.time}s)`);
      }
    } else {
      setOutput(`결과: ${result.status.description}\n${result.stderr || result.compile_output || ''}`);
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden bg-background">
      {/* Editor Toolbar */}
      <div className="flex h-12 items-center justify-between border-b border-border-subtle bg-surface px-4">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <button className="flex items-center gap-2 rounded-md bg-background px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white border border-border-subtle">
              <Languages className="h-4 w-4" />
              {selectedLang.name}
              <ChevronDown className="h-3.3 w-3.3" />
            </button>
            <div className="absolute left-0 top-full z-50 mt-1 hidden w-40 overflow-hidden rounded-lg border border-border-subtle bg-surface shadow-xl group-focus-within:block group-hover:block">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLang(lang)}
                  className={cn(
                    "w-full px-4 py-2 text-left text-sm transition-colors hover:bg-neon-blue/10 hover:text-neon-blue",
                    selectedLang.id === lang.id ? "text-neon-blue bg-neon-blue/5" : "text-gray-400"
                  )}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-4 w-px bg-border-subtle" />
          
          <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">설정</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleRun}
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-bold text-gray-300 transition-colors hover:bg-surface-light hover:text-white border border-border-subtle"
          >
            <Play className="h-4 w-4" />
            코드 실행
          </button>
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-1.5 rounded-md bg-neon-blue px-4 py-1.5 text-sm font-bold text-white transition-all hover:bg-blue-600 active:scale-95 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            {isSubmitting ? '제출 중...' : '제출하기'}
          </button>
        </div>
      </div>

      {/* Code Editor */}
      <div className="relative flex-1 bg-[#1e1e1e]">
        <Editor
          height="100%"
          language={selectedLang.monaco}
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || '')}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            fontFamily: 'JetBrains Mono, Menlo, Monaco, Consolas, monospace',
            padding: { top: 16, bottom: 16 },
          }}
        />
      </div>

      {/* Terminal Output */}
      <div className={cn(
        "border-t border-border-subtle bg-surface transition-all",
        isTerminalOpen ? "h-48" : "h-10"
      )}>
        <div className="flex items-center justify-between border-b border-border-subtle/50 px-4 py-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
            <TerminalIcon className="h-3.5 w-3.5" />
            실행 결과
          </div>
          <button 
            onClick={() => setIsTerminalOpen(!isTerminalOpen)}
            className="text-gray-500 hover:text-white"
          >
            {isTerminalOpen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
        {isTerminalOpen && (
          <div className="h-full overflow-auto p-4 font-mono text-sm">
            {output ? (
              <pre className={cn(
                "whitespace-pre-wrap",
                output.includes('맞았습니다') ? "text-emerald-green" : "text-gray-300"
              )}>
                {output}
              </pre>
            ) : (
              <p className="text-gray-600 italic">코드를 실행하거나 제출하면 결과가 여기에 표시됩니다.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
