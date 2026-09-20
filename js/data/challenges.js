// Edinburgh Quest — Coding Arena Challenges
export const CHALLENGES = [
  // ─── JAVASCRIPT ───
  {
    id: 'js_1', category: 'javascript', title: 'FizzBuzz', difficulty: 'beginner',
    xp: 50, description: 'Write a function that returns "Fizz" for multiples of 3, "Buzz" for multiples of 5, and "FizzBuzz" for both.',
    starterCode: `function fizzBuzz(n) {\n  // Your code here\n}`,
    hints: [
      'Think about the order you check conditions.',
      'Use the modulo operator (%) to check divisibility.',
      'Check for FizzBuzz (both 3 AND 5) first, before checking individually.',
    ],
    solution: `function fizzBuzz(n) {\n  if (n % 15 === 0) return 'FizzBuzz';\n  if (n % 3 === 0) return 'Fizz';\n  if (n % 5 === 0) return 'Buzz';\n  return String(n);\n}`,
    testCases: [{input: 3, expected: 'Fizz'}, {input: 5, expected: 'Buzz'}, {input: 15, expected: 'FizzBuzz'}, {input: 7, expected: '7'}],
    tags: ['loops', 'conditionals'],
  },
  {
    id: 'js_2', category: 'javascript', title: 'Reverse a String', difficulty: 'beginner',
    xp: 50, description: 'Write a function that takes a string and returns it reversed.',
    starterCode: `function reverseString(str) {\n  // Your code here\n}`,
    hints: [
      'Strings in JS have useful methods. Check .split(), .reverse(), .join().',
      'You can convert a string to an array, reverse it, then join it back.',
      '`str.split("").reverse().join("")`',
    ],
    solution: `function reverseString(str) {\n  return str.split('').reverse().join('');\n}`,
    testCases: [{input: 'hello', expected: 'olleh'}, {input: 'Edinburgh', expected: 'hgrubnidb E'.split('').reverse().join('')}],
    tags: ['strings', 'arrays'],
  },
  {
    id: 'js_3', category: 'javascript', title: 'Count Vowels', difficulty: 'beginner',
    xp: 50, description: 'Count the number of vowels (a,e,i,o,u) in a given string.',
    starterCode: `function countVowels(str) {\n  // Your code here\n}`,
    hints: ['Consider using a regex.', 'The match method returns an array of matches, or null.', '/[aeiou]/gi — the i flag is case-insensitive.'],
    solution: `function countVowels(str) {\n  const matches = str.match(/[aeiou]/gi);\n  return matches ? matches.length : 0;\n}`,
    testCases: [{input: 'hello', expected: 2}, {input: 'Edinburgh', expected: 4}],
    tags: ['strings', 'regex'],
  },
  {
    id: 'js_4', category: 'javascript', title: 'Find the Largest', difficulty: 'beginner',
    xp: 60, description: 'Write a function that returns the largest number in an array.',
    starterCode: `function findLargest(arr) {\n  // Your code here\n}`,
    hints: ['You can use Math.max()', 'Try the spread operator with Math.max.', 'Math.max(...arr)'],
    solution: `function findLargest(arr) {\n  return Math.max(...arr);\n}`,
    testCases: [{input: [1,5,3,9,2], expected: 9}],
    tags: ['arrays'],
  },
  {
    id: 'js_5', category: 'javascript', title: 'Palindrome Checker', difficulty: 'intermediate',
    xp: 80, description: 'Return true if the given string is a palindrome (reads the same forwards and backwards), ignoring case and spaces.',
    starterCode: `function isPalindrome(str) {\n  // Your code here\n}`,
    hints: ['First clean the string: lowercase + remove spaces.', 'Then compare it to its reverse.', 'cleaned === cleaned.split("").reverse().join("")'],
    solution: `function isPalindrome(str) {\n  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');\n  return clean === clean.split('').reverse().join('');\n}`,
    testCases: [{input: 'racecar', expected: true}, {input: 'hello', expected: false}, {input: 'A man a plan a canal Panama', expected: true}],
    tags: ['strings'],
  },

  // ─── DSA ───
  {
    id: 'dsa_1', category: 'dsa', title: 'Two Sum', difficulty: 'beginner',
    xp: 80, description: 'Given an array of numbers and a target, return indices of two numbers that add up to the target.',
    starterCode: `function twoSum(nums, target) {\n  // Your code here\n}`,
    hints: [
      'A brute-force nested loop works but is O(n²).',
      'Try a hash map: store each number and its index.',
      'For each number, check if (target - number) already exists in your map.',
    ],
    solution: `function twoSum(nums, target) {\n  const map = {};\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map[complement] !== undefined) return [map[complement], i];\n    map[nums[i]] = i;\n  }\n}`,
    testCases: [{input: [[2,7,11,15], 9], expected: [0,1]}],
    tags: ['hash map', 'arrays'],
    pattern: 'Hash Map',
  },
  {
    id: 'dsa_2', category: 'dsa', title: 'Valid Parentheses', difficulty: 'intermediate',
    xp: 100, description: 'Return true if the string of brackets is valid (every opener has a matching closer in the right order).',
    starterCode: `function isValid(s) {\n  // Your code here\n}`,
    hints: ['Use a stack.', 'Push opening brackets. When you see a closing bracket, pop from stack and check if it matches.', 'If the stack is empty at the end, it is valid.'],
    solution: `function isValid(s) {\n  const stack = [];\n  const map = {')':'(', '}':'{', ']':'['};\n  for (const c of s) {\n    if ('({['.includes(c)) stack.push(c);\n    else if (stack.pop() !== map[c]) return false;\n  }\n  return stack.length === 0;\n}`,
    testCases: [{input: '()', expected: true}, {input: '([{}])', expected: true}, {input: '(]', expected: false}],
    tags: ['stack'],
    pattern: 'Stack',
  },
  {
    id: 'dsa_3', category: 'dsa', title: 'Binary Search', difficulty: 'intermediate',
    xp: 100, description: 'Implement binary search. Return the index of the target in a sorted array, or -1 if not found.',
    starterCode: `function binarySearch(nums, target) {\n  // Your code here\n}`,
    hints: ['Use two pointers: left and right.', 'Calculate mid = Math.floor((left + right) / 2).', 'If nums[mid] === target return mid. Adjust left/right based on comparison.'],
    solution: `function binarySearch(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}`,
    testCases: [{input: [[1,3,5,7,9], 5], expected: 2}, {input: [[1,3,5,7,9], 6], expected: -1}],
    tags: ['binary search'],
    pattern: 'Binary Search',
  },

  // ─── SQL ───
  {
    id: 'sql_1', category: 'sql', title: 'SELECT Basics', difficulty: 'beginner',
    xp: 50, description: 'Write a query to select all users from a "users" table where age > 18.',
    starterCode: `-- Write your SQL here\nSELECT ...`,
    hints: ['Use SELECT * to get all columns.', 'Use WHERE to filter rows.', 'Numbers in WHERE clauses do not need quotes.'],
    solution: `SELECT * FROM users WHERE age > 18;`,
    testCases: [],
    tags: ['select', 'where'],
  },
  {
    id: 'sql_2', category: 'sql', title: 'JOIN Tables', difficulty: 'intermediate',
    xp: 80, description: 'Given a "users" table and an "orders" table (linked by user_id), write a query to get all users and their order counts.',
    starterCode: `-- Write your SQL here`,
    hints: ['Use JOIN to link the two tables.', 'Use COUNT() with GROUP BY to count orders per user.', 'LEFT JOIN ensures users with zero orders are included.'],
    solution: `SELECT u.name, COUNT(o.id) AS order_count\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nGROUP BY u.id, u.name;`,
    testCases: [],
    tags: ['join', 'group by'],
  },

  // ─── DEBUGGING ───
  {
    id: 'debug_1', category: 'debugging', title: 'Off-By-One', difficulty: 'beginner',
    xp: 60, description: 'This function is supposed to print numbers 1 to n, but it has a bug. Find and fix it.',
    starterCode: `function printNumbers(n) {\n  for (let i = 0; i < n; i++) {\n    console.log(i);\n  }\n}`,
    hints: ['Look at where the loop starts and ends.', 'Should i start at 0 or 1?', 'Also check the condition: < vs <='],
    solution: `function printNumbers(n) {\n  for (let i = 1; i <= n; i++) {\n    console.log(i);\n  }\n}`,
    testCases: [],
    tags: ['loops', 'off-by-one'],
  },
  {
    id: 'debug_2', category: 'debugging', title: 'Broken Promise', difficulty: 'intermediate',
    xp: 90, description: 'This async function should fetch and return user data, but it always returns undefined. Fix it.',
    starterCode: `async function getUser(id) {\n  const response = fetch(\`/api/users/\${id}\`);\n  const data = response.json();\n  return data.name;\n}`,
    hints: ['async/await — are you actually awaiting the promises?', 'fetch() returns a Promise. Without await, response is a Promise object, not the data.', 'Both fetch() and .json() need to be awaited.'],
    solution: `async function getUser(id) {\n  const response = await fetch(\`/api/users/\${id}\`);\n  const data = await response.json();\n  return data.name;\n}`,
    testCases: [],
    tags: ['async', 'promises'],
  },
];

export const getChallengesByCategory = (cat) => CHALLENGES.filter(c => c.category === cat);
export const getChallengeById = (id) => CHALLENGES.find(c => c.id === id);
