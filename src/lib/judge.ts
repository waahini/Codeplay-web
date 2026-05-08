import axios from 'axios';

// Judge0 API Configuration
// In a real app, these should be in environment variables
const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com';
const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '';

const languageMap: Record<string, number> = {
  'python': 71, // Python 3
  'cpp': 54,    // C++ (GCC 9.2.0)
  'java': 62,   // Java (OpenJDK 13.0.1)
  'javascript': 63, // JavaScript (Node.js 12.14.0)
};

export interface JudgeResult {
  stdout: string | null;
  time: string | null;
  memory: number | null;
  stderr: string | null;
  token: string;
  compile_output: string | null;
  message: string | null;
  status: {
    id: number;
    description: string;
  };
}

export const executeCode = async (source_code: string, language_id: string, stdin: string = ''): Promise<JudgeResult | any> => {
  try {
    const response = await axios.post(
      `${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`,
      {
        source_code,
        language_id: languageMap[language_id],
        stdin,
      },
      {
        headers: {
          'content-type': 'application/json',
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
          'x-rapidapi-key': RAPIDAPI_KEY,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Judge0 API Error:', error);
    return {
      status: { description: 'API Error' },
      stderr: error.message,
    };
  }
};
