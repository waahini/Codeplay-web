import React from 'react';
import { notFound } from 'next/navigation';
import ProblemDetailClient from './ProblemDetailClient';

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

export async function generateStaticParams() {
  return Object.keys(PROBLEMS).map((id) => ({
    id: id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProblemPage({ params }: PageProps) {
  const { id } = await params;
  const problemId = parseInt(id);
  const problem = PROBLEMS[problemId];

  if (!problem) {
    notFound();
  }

  return <ProblemDetailClient problem={problem} />;
}
