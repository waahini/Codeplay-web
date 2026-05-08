export interface Problem {
  id: number;
  title: string;
  description: string;
  input_format: string;
  output_format: string;
  time_limit: number;
  memory_limit: number;
  difficulty: string;
  initial_templates: Record<string, string>;
}

export const PROBLEMS: Record<number, Problem> = {
  1: {
    id: 1,
    title: "두 수 더하기",
    description: "두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.",
    input_format: "첫째 줄에 A와 B가 주어진다. (0 < A, B < 10)",
    output_format: "첫째 줄에 A+B를 출력한다.",
    time_limit: 1000,
    memory_limit: 128,
    difficulty: "Bronze V",
    initial_templates: {
      python: `import sys\n\n# 입력을 받고 A+B를 출력하세요\nA, B = map(int, sys.stdin.readline().split())\nprint(A + B)`,
      cpp: `#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b << endl;\n    return 0;\n}`,
      java: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a + b);\n    }\n}`,
      javascript: `const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin').toString().split(' ');\nconst a = parseInt(input[0]);\nconst b = parseInt(input[1]);\nconsole.log(a + b);`
    }
  },
  2: {
    id: 2,
    title: "수 정렬하기",
    description: "N개의 수가 주어졌을 때, 이를 오름차순으로 정렬하는 프로그램을 작성하시오.",
    input_format: "첫째 줄에 수의 개수 N(1 ≤ N ≤ 1,000)이 주어진다. 둘째 줄부터 N개의 줄에는 수가 주어진다.",
    output_format: "첫째 줄부터 N개의 줄에 오름차순으로 정렬한 결과를 한 줄에 하나씩 출력한다.",
    time_limit: 2000,
    memory_limit: 128,
    difficulty: "Silver V",
    initial_templates: {
      python: `import sys\n\nn = int(sys.stdin.readline())\nnums = [int(sys.stdin.readline()) for _ in range(n)]\nnums.sort()\nfor num in nums:\n    print(num)`,
      cpp: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false); cin.tie(NULL);\n    int n;\n    cin >> n;\n    vector<int> v(n);\n    for(int i=0; i<n; i++) cin >> v[i];\n    sort(v.begin(), v.end());\n    for(int i=0; i<n; i++) cout << v[i] << "\\n";\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        List<Integer> list = new ArrayList<>();\n        for(int i=0; i<n; i++) list.add(sc.nextInt());\n        Collections.sort(list);\n        for(int x : list) System.out.println(x);\n    }\n}`,
      javascript: `const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin').toString().trim().split('\\n');\nconst n = parseInt(input[0]);\nconst nums = input.slice(1).map(Number).sort((a, b) => a - b);\nconsole.log(nums.join('\\n'));`
    }
  },
  3: {
    id: 3,
    title: "괄호의 값",
    description: "4개의 기호 '(', ')', '[', ']'를 이용해서 만들어지는 올바른 괄호열의 값을 계산하시오.",
    input_format: "첫째 줄에 괄호열을 나타내는 문자열(길이 1~30)이 주어진다.",
    output_format: "첫째 줄에 그 괄호열의 값을 출력한다. 올바르지 않은 괄호열이면 0을 출력한다.",
    time_limit: 1000,
    memory_limit: 128,
    difficulty: "Gold V",
    initial_templates: {
      python: `import sys\n\ns = sys.stdin.readline().strip()\nstack = []\n# 코드를 작성하세요`,
      cpp: `#include <iostream>\n#include <string>\n#include <stack>\n\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    // 코드를 작성하세요\n    return 0;\n}`,
      java: `import java.io.BufferedReader;\nimport java.io.InputStreamReader;\nimport java.util.Stack;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String s = br.readLine();\n        // 코드를 작성하세요\n    }\n}`,
      javascript: `const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin').toString().trim();\n// 코드를 작성하세요`
    }
  },
  4: {
    id: 4,
    title: "파일 확장자 카운팅",
    description: "주어진 텍스트 데이터에서 확장자가 '.png'인 파일의 개수를 출력하시오.",
    input_format: "첫째 줄에 파일의 개수 N이 주어진다. 다음 N개의 줄에는 파일명이 주어진다.",
    output_format: "확장자가 .png인 파일의 개수를 출력한다.",
    time_limit: 1000,
    memory_limit: 128,
    difficulty: "Silver IV",
    initial_templates: {
      python: `import sys\n\nn = int(sys.stdin.readline())\ncount = 0\nfor _ in range(n):\n    filename = sys.stdin.readline().strip()\n    if filename.endswith('.png'):\n        count += 1\nprint(count)`,
      cpp: `#include <iostream>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int count = 0;\n    for(int i=0; i<n; i++) {\n        string s;\n        cin >> s;\n        if(s.length() >= 4 && s.substr(s.length()-4) == ".png") count++;\n    }\n    cout << count << endl;\n    return 0;\n}`,
      java: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = Integer.parseInt(sc.nextLine());\n        int count = 0;\n        for(int i=0; i<n; i++) {\n            if(sc.nextLine().endsWith(".png")) count++;\n        }\n        System.out.println(count);\n    }\n}`,
      javascript: `const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin').toString().trim().split('\\n');\nconst n = parseInt(input[0]);\nconst files = input.slice(1);\nconst count = files.filter(f => f.endsWith('.png')).length;\nconsole.log(count);`
    }
  }
};
