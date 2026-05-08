import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Supabase 클라이언트 초기화
// 실제 사용을 위해서는 .env.local 파일에 URL과 Key를 설정해야 합니다.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
