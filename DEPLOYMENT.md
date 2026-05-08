# AlgoNext Deployment & Architecture Guide

## 1. Project Overview
AlgoNext는 백준의 방대한 문제 데이터베이스와 정올의 체계적인 학습 로드맵을 결합한 차세대 온라인 저지 플랫폼입니다.

- **Frontend:** Next.js 15 (App Router), TypeScript
- **Styling:** Tailwind CSS v4 (Dark Theme)
- **Editor:** Monaco Editor (@monaco-editor/react)
- **Judge Engine:** Judge0 API (RapidAPI)

## 2. Environment Variables
Cloudflare Pages에 배포할 때 다음 환경 변수를 설정해야 합니다.

- `NEXT_PUBLIC_RAPIDAPI_KEY`: Judge0 API를 호출하기 위한 RapidAPI 키 (없을 경우 데모 모드로 동작)

## 3. Cloudflare Pages Deployment
1. **GitHub Repository 연결:** 이 프로젝트를 GitHub에 푸시합니다.
2. **Cloudflare Pages 대시보드:** "Direct Upload" 또는 "Connect to Git"을 선택합니다.
3. **Build Settings:**
   - **Framework Preset:** `Next.js`
   - **Build Command:** `npm run build`
   - **Build Output Directory:** `.next` (또는 `@cloudflare/next-on-pages` 어댑터 사용 시 `out`)
4. **Environment Variables:** 위에서 언급한 키를 추가합니다.

## 4. Database Schema (Supabase/PostgreSQL)
현재는 Mock Data를 사용 중이나, 실제 운영을 위해 다음 스키마를 Supabase에 적용할 수 있습니다.

```sql
-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nickname TEXT UNIQUE,
  tier TEXT DEFAULT 'Bronze V',
  exp INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Problems Table
CREATE TABLE problems (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  input_format TEXT,
  output_format TEXT,
  time_limit INTEGER, -- ms
  memory_limit INTEGER, -- MB
  difficulty TEXT
);

-- Submissions Table
CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  problem_id INTEGER REFERENCES problems(id),
  language TEXT,
  code TEXT,
  result TEXT,
  execution_time FLOAT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 5. Development
```bash
# 의존성 설치
npm install

# 로컬 개발 서버 실행
npm run dev
```
