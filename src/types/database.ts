export interface User {
  id: string;
  email: string;
  nickname: string;
  tier: string;
  solved_count: number;
  created_at?: string;
}

export interface Problem {
  id: number; // 문제 번호
  title: string;
  description: string;
  time_limit: string;
  memory_limit: string;
  success_rate: string;
  difficulty?: string;
  input_desc?: string;
  output_desc?: string;
}

export type Database = {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'created_at'>;
        Update: Partial<Omit<User, 'id' | 'created_at'>>;
      };
      problems: {
        Row: Problem;
        Insert: Problem;
        Update: Partial<Problem>;
      };
    };
  };
};
