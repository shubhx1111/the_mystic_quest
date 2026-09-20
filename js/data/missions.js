// Edinburgh Quest — Mission Content
// Level 01: FULLY WRITTEN (all 30 days)
// Levels 02–12: Stubs with day titles (expandable)

export const MISSIONS = {

  // ══════════════════════════════════════════════
  // LEVEL 01 — THE AWAKENING
  // ══════════════════════════════════════════════

  '1-1': {
    levelId: 1, day: 1, title: 'Programming Baseline',
    subtitle: 'What even IS programming?',
    difficulty: 'Beginner', estimatedTime: '2 hours', xp: 100,
    isBoss: false,
    concept: {
      simple: `Imagine you're giving directions to someone who has never walked before. You can't say "go to the kitchen." You have to say: "Stand up. Turn left. Take 3 steps. Open door." A computer is exactly like that person — incredibly literal, but incredibly fast. Programming is writing those step-by-step instructions.`,
      technical: `Programming is the process of writing instructions in a formal language (like JavaScript, Python, etc.) that a computer can interpret and execute. The instructions are deterministic — the same input always produces the same output. The computer does exactly what you tell it, no more, no less.`,
      interview: `"What is programming?" → "Programming is the process of translating human intent into machine-executable instructions using a formal language. It involves problem decomposition, algorithm design, and writing code that is both correct and maintainable."`,
    },
    learn: {
      points: [
        'A computer cannot think — it only follows instructions.',
        'Programs are lists of precise instructions called algorithms.',
        'Programming languages are the vocabulary we use to write those instructions.',
        'Every application you have ever used was built by someone writing these instructions.',
      ],
      codeExample: `// This is a comment — it's for humans, not the computer.
// This program tells the computer to display a message.

console.log("Hello! My Edinburgh Quest starts today.");

// The computer reads this top-to-bottom and executes each line.`,
      visual: `You → [Write Instructions] → Code → [Computer Reads] → Result`,
    },
    tryIt: {
      title: 'Your first program',
      instruction: 'Type the following in the editor and predict what will happen before running it.',
      starterCode: `console.log("Day 1 of Edinburgh Quest!");
console.log("Today I am learning what programming is.");
console.log("By Day 360, I will be Edinburgh-ready.");`,
      expectedOutput: `Day 1 of Edinburgh Quest!\nToday I am learning what programming is.\nBy Day 360, I will be Edinburgh-ready.`,
    },
    build: {
      title: 'Introduce yourself to the computer',
      description: 'Write a mini program that logs: your name, where you want to work, and one skill you want to learn.',
      starterCode: `// Replace the values below with your own answers
const name = "Shubhi";
const targetCity = "Edinburgh";
const skillToLearn = "React";

// Now print them in a sentence
// Hint: Use template literals: \`Hello, I am \${name}\``,
      hints: [
        'A variable stores a piece of information. Think of it as a labelled box.',
        'Use backticks (`) and ${} to embed variables inside strings — these are called template literals.',
        '`console.log(`My name is ${name}`)` — try this pattern.',
      ],
      solution: `const name = "Shubhi";\nconst targetCity = "Edinburgh";\nconst skillToLearn = "React";\nconsole.log(\`Hello! I am \${name}.\`);\nconsole.log(\`My target: \${targetCity}.\`);\nconsole.log(\`Skill I'm learning: \${skillToLearn}.\`);`,
    },
    quiz: [
      { id: 'q1', question: 'What does a computer do with instructions it cannot understand?', options: ['Guesses the best answer', 'Throws an error', 'Skips them silently', 'Asks you for help'], correct: 1, explanation: 'Computers throw errors when they encounter instructions they cannot parse. They never guess.' },
      { id: 'q2', question: 'What is the correct term for a step-by-step solution to a problem?', options: ['Function', 'Variable', 'Algorithm', 'Module'], correct: 2, explanation: 'An algorithm is a defined, step-by-step procedure to solve a problem. Functions implement algorithms.' },
      { id: 'q3', question: 'What does console.log() do in JavaScript?', options: ['Saves data to a database', 'Displays output in the console/terminal', 'Creates a new variable', 'Sends an HTTP request'], correct: 1, explanation: 'console.log() prints output to the browser\'s developer console or the terminal — essential for debugging.' },
      { id: 'q4', question: 'Which of these is a valid reason to use a comment in code?', options: ['To slow the program down', 'To explain why a decision was made', 'To make the file larger', 'To hide code from the computer'], correct: 1, explanation: 'Comments explain intent to other developers (or your future self). The computer ignores them completely.' },
    ],
    reflect: { prompt: 'In your own words: what is a program? What surprised you about how computers work?' },
    tags: ['foundations', 'mindset'],
  },

  '1-2': {
    levelId: 1, day: 2, title: 'Variables',
    subtitle: 'Storing information',
    difficulty: 'Beginner', estimatedTime: '2 hours', xp: 100,
    isBoss: false,
    concept: {
      simple: `A variable is like a labelled box. You can put something in it, look at what's inside, and change the contents later. The label is the variable name; what's inside is the value.`,
      technical: `Variables are named memory locations that store values. In JavaScript, you declare them with let (reassignable), const (fixed reference), or var (older, function-scoped — avoid). Values are stored by value for primitives and by reference for objects/arrays.`,
      interview: `"Explain let vs const vs var" → "let is block-scoped and reassignable. const is block-scoped but cannot be reassigned after declaration. var is function-scoped and hoisted — it's legacy and generally avoided in modern JS."`,
    },
    learn: {
      points: [
        'Use const when the value will not change.',
        'Use let when the value might change.',
        'Avoid var in modern JavaScript.',
        'Variable names should be descriptive: userAge not x.',
        'camelCase is the JS convention: firstName, totalScore.',
      ],
      codeExample: `const playerName = "Shubhi";   // Won't change — use const
let currentLevel = 3;          // Will change — use let
let xpPoints = 4820;

currentLevel = 4;              // ✅ OK — let can be reassigned
// playerName = "Someone";    // ❌ Error — const cannot be reassigned

console.log(\`\${playerName} is at Level \${currentLevel} with \${xpPoints} XP\`);`,
      visual: `const box 📦 → sealed after first use\nlet box   📤 → can be replaced anytime`,
    },
    tryIt: {
      title: 'Declare your quest stats',
      instruction: 'Declare variables for: your name, current level (3), current day (17), XP (4820), streak (12). Then print a summary.',
      starterCode: `const name = "";\nlet level = ;\nlet day = ;\nlet xp = ;\nlet streak = ;\n\nconsole.log(\`Quest summary for \${name}:\`);\n// Print the rest here`,
      expectedOutput: 'Quest summary for Shubhi:\nLevel: 3 | Day: 17 | XP: 4820 | Streak: 12',
    },
    build: {
      title: 'XP Calculator',
      description: 'Write a program that calculates how much XP is needed to reach Level 4 (assuming 100 XP per day, 30 days per level, starting from Day 17 of Level 3).',
      starterCode: `const xpPerDay = 100;\nconst daysPerLevel = 30;\nconst currentDay = 17;\nconst currentLevel = 3;\n\n// Calculate remaining days in current level\n// Calculate XP for next full level\n// Print the total XP needed`,
      hints: [
        'Remaining days in Level 3 = daysPerLevel - currentDay',
        'XP to finish Level 3 = remainingDays * xpPerDay',
        'Add that to Level 4 XP (30 * 100) for total to finish Level 4',
      ],
      solution: `const xpPerDay = 100;\nconst daysPerLevel = 30;\nconst currentDay = 17;\nconst remainingDays = daysPerLevel - currentDay;\nconst xpToFinishLevel3 = remainingDays * xpPerDay;\nconst xpForLevel4 = daysPerLevel * xpPerDay;\nconst totalXpNeeded = xpToFinishLevel3 + xpForLevel4;\nconsole.log(\`XP needed to complete Level 4: \${totalXpNeeded}\`);`,
    },
    quiz: [
      { id: 'q1', question: 'Which keyword should you use for a value that will not change?', options: ['let', 'var', 'const', 'fixed'], correct: 2, explanation: 'const declares a constant — the variable reference cannot be reassigned. It communicates to other developers that this value is intentionally fixed.' },
      { id: 'q2', question: 'What will this code print?\n\nlet score = 10;\nscore = score + 5;\nconsole.log(score);', options: ['10', '5', '15', 'Error'], correct: 2, explanation: '`score = score + 5` reads the current value (10), adds 5, then stores the result (15) back in score.' },
      { id: 'q3', question: 'Which variable name follows best practices?', options: ['x', 'UserAge', 'user_age', 'userAge'], correct: 3, explanation: 'JavaScript convention is camelCase: userAge. x is not descriptive. UserAge is PascalCase (used for classes). user_age is snake_case (common in Python/SQL).' },
      { id: 'q4', question: 'What happens if you try to reassign a const?', options: ['The value silently stays the same', 'It works fine', 'A TypeError is thrown', 'It becomes a let'], correct: 2, explanation: 'Attempting to reassign a const throws a TypeError at runtime: "Assignment to constant variable."' },
    ],
    reflect: { prompt: 'Why do you think naming variables clearly matters in a team environment?' },
    tags: ['variables', 'const', 'let'],
  },

  '1-3': {
    levelId: 1, day: 3, title: 'Data Types',
    subtitle: 'The different kinds of information',
    difficulty: 'Beginner', estimatedTime: '2 hours', xp: 100,
    isBoss: false,
    concept: {
      simple: `Not all information is the same. The number 42 is different from the word "hello" which is different from true/false. JavaScript has specific types for each kind of value.`,
      technical: `JavaScript has 7 primitive types: string, number, boolean, null, undefined, symbol, and bigint. Plus one complex type: object (including arrays). typeof operator reveals a value's type. JS is dynamically typed — variables can change type.`,
      interview: `"What is the difference between null and undefined?" → "undefined means a variable was declared but never assigned a value. null is an intentional absence of value — a programmer explicitly sets it to signal 'no value here'."`,
    },
    learn: {
      points: [
        'string: text, always in quotes — "hello", `world`',
        'number: integers and decimals — 42, 3.14',
        'boolean: true or false only',
        'null: intentional absence of a value',
        'undefined: variable declared but not yet assigned',
        'object: collection of key-value pairs',
        'array: ordered list (technically a special object)',
      ],
      codeExample: `const name = "Shubhi";          // string
const xp = 4820;                // number
const isLoggedIn = true;        // boolean
const favoriteColor = null;     // null (intentionally empty)
let nextMission;                // undefined (not yet assigned)

const stats = {                 // object
  level: 3,
  streak: 12
};

const skills = ["JS", "React"]; // array

console.log(typeof name);       // "string"
console.log(typeof xp);         // "number"
console.log(typeof isLoggedIn); // "boolean"
console.log(typeof null);       // "object" ← famous JS quirk!`,
      visual: `"text" → string\n42 → number\ntrue/false → boolean\n{key: val} → object\n[1,2,3] → array`,
    },
    tryIt: {
      title: 'Identify the types',
      instruction: 'Use typeof to log the type of each value below and predict the output before running.',
      starterCode: `console.log(typeof "Edinburgh");
console.log(typeof 360);
console.log(typeof true);
console.log(typeof null);
console.log(typeof undefined);
console.log(typeof { city: "Edinburgh" });
console.log(typeof [1, 2, 3]);`,
      expectedOutput: 'string\nnumber\nboolean\nobject\nundefined\nobject\nobject',
    },
    build: {
      title: 'Player Profile Object',
      description: 'Create a player profile object with: name (string), level (number), xp (number), isActive (boolean), skills (array), targetCity (string). Then log each property with its type.',
      starterCode: `const player = {\n  // Fill in your properties here\n};\n\n// Now log each property and its type\n// e.g. console.log(\`name: \${player.name} (type: \${typeof player.name})\`)`,
      hints: [
        'Object syntax: { key: value, key2: value2 }',
        'Access properties with dot notation: player.name',
        'Arrays are written as [item1, item2] and are a valid object property value.',
      ],
      solution: `const player = {\n  name: "Shubhi",\n  level: 3,\n  xp: 4820,\n  isActive: true,\n  skills: ["JavaScript", "HTML", "CSS"],\n  targetCity: "Edinburgh"\n};\n\nObject.entries(player).forEach(([key, val]) => {\n  console.log(\`\${key}: \${JSON.stringify(val)} (type: \${typeof val})\`);\n});`,
    },
    quiz: [
      { id: 'q1', question: 'What does typeof [] return in JavaScript?', options: ['"array"', '"object"', '"list"', '"undefined"'], correct: 1, explanation: 'Arrays are objects in JavaScript. typeof [] returns "object". To check specifically for an array, use Array.isArray([]).' },
      { id: 'q2', question: 'What is the difference between null and undefined?', options: ['They are identical', 'null is a bug; undefined is intentional', 'undefined means declared but unset; null is intentional absence', 'null is a number; undefined is a string'], correct: 2, explanation: 'undefined: JS assigned this automatically when you declare a variable without a value. null: You deliberately set this to say "there is no value here."' },
      { id: 'q3', question: 'Which of these is NOT a primitive type in JavaScript?', options: ['string', 'boolean', 'array', 'number'], correct: 2, explanation: 'Arrays are objects (complex types), not primitives. The 7 primitives are: string, number, boolean, null, undefined, symbol, bigint.' },
      { id: 'q4', question: 'What type is the value 3.14?', options: ['float', 'decimal', 'number', 'integer'], correct: 2, explanation: 'JavaScript has only one number type: number. It covers both integers and decimals (floats). There is no separate "float" or "integer" type in JS.' },
    ],
    reflect: { prompt: 'Why do you think knowing data types matters when building an API? Think about what happens when you send data across the internet.' },
    tags: ['data types', 'typeof', 'primitives'],
  },

  '1-4': {
    levelId: 1, day: 4, title: 'Conditions',
    subtitle: 'Making decisions in code',
    difficulty: 'Beginner', estimatedTime: '2 hours', xp: 100,
    isBoss: false,
    concept: {
      simple: `Conditions let your program make decisions. "If it's raining, bring an umbrella. Otherwise, wear sunglasses." Every app you use is full of conditions: if logged in → show dashboard, else → show login page.`,
      technical: `Conditional statements evaluate a boolean expression and execute different code blocks based on the result. JavaScript provides: if/else, else if, ternary operator (?:), and switch. Short-circuit evaluation (&&, ||) can also control flow.`,
      interview: `"When would you use a ternary over an if/else?" → "Ternaries are concise for simple single-expression conditionals. if/else is preferable when the branches contain multiple statements or when clarity is more important than brevity."`,
    },
    learn: {
      points: [
        'if: run this block IF the condition is true',
        'else: run this instead if the condition is false',
        'else if: check another condition',
        '=== is strict equality (checks type AND value)',
        '== is loose equality (avoid — causes bugs)',
        'Ternary: condition ? valueIfTrue : valueIfFalse',
      ],
      codeExample: `const xp = 4820;
const level = 3;

if (xp >= 5000) {
  console.log("Level up!");
} else if (xp >= 4000) {
  console.log("Getting close to level up!"); // This runs
} else {
  console.log("Keep going!");
}

// Ternary — one-line if/else
const status = level >= 10 ? "Senior" : "Junior";
console.log(status); // "Junior"`,
      visual: `if (condition) {\n  // runs if TRUE\n} else {\n  // runs if FALSE\n}`,
    },
    tryIt: {
      title: 'Quest difficulty check',
      instruction: 'Write a condition that logs "Easy Quest" if day <= 7, "Normal Quest" if day <= 21, and "Hard Quest" otherwise.',
      starterCode: `const day = 17;\n\n// Your if/else if/else here`,
      expectedOutput: 'Normal Quest',
    },
    build: {
      title: 'Adaptive Learning Check',
      description: 'Simulate the adaptive learning system: given a quiz score (0-100), log the appropriate message: <50 → REPAIR QUEST, 50-74 → Continue + extra practice, 75-84 → Continue normally, 85+ → Unlock bonus challenge.',
      starterCode: `const quizScore = 72; // Change this to test different values\n\n// Write your conditions here`,
      hints: [
        'Start with the lowest range first (or highest — pick one and be consistent).',
        'Use else if to chain multiple conditions.',
        'For ranges: use && to combine two comparisons: score >= 50 && score < 75',
      ],
      solution: `const quizScore = 72;\nif (quizScore < 50) {\n  console.log("⚠️ REPAIR QUEST — Review the concept before moving on.");\n} else if (quizScore < 75) {\n  console.log("✅ Continue, but add extra practice.");\n} else if (quizScore < 85) {\n  console.log("✅ Continue normally.");\n} else {\n  console.log("🌟 Excellent! Bonus challenge unlocked.");\n}`,
    },
    quiz: [
      { id: 'q1', question: 'What is the difference between == and ===?', options: ['No difference', '== checks value only; === checks value AND type', '=== checks value only; == checks type too', '=== is for strings; == is for numbers'], correct: 1, explanation: '"5" == 5 is true (loose equality converts types). "5" === 5 is false (strict equality requires same type). Always use === to avoid type coercion bugs.' },
      { id: 'q2', question: 'What does this output?\n\nconst x = 10;\nconsole.log(x > 5 ? "big" : "small");', options: ['big', 'small', 'true', 'Error'], correct: 0, explanation: 'x > 5 evaluates to true, so the ternary returns "big". Ternary syntax: condition ? valueIfTrue : valueIfFalse.' },
      { id: 'q3', question: 'Which operator checks if two values are NOT equal (strict)?', options: ['!=', '!==', '<>', 'not='], correct: 1, explanation: '!== is strict not-equal — checks value AND type. != is loose not-equal — avoid it just as you avoid ==.' },
      { id: 'q4', question: 'What does the && operator do?', options: ['Returns true if either condition is true', 'Returns true only if BOTH conditions are true', 'Negates the condition', 'Assigns a value'], correct: 1, explanation: '&& (AND) — both sides must be truthy for the result to be truthy. || (OR) — only one side needs to be truthy.' },
    ],
    reflect: { prompt: 'Where do you think conditions are used in your favourite app? Think of 3 real examples.' },
    tags: ['conditions', 'if-else', 'ternary', 'comparison operators'],
  },

  '1-5': {
    levelId: 1, day: 5, title: 'Loops',
    subtitle: 'Repeating actions without repeating yourself',
    difficulty: 'Beginner', estimatedTime: '2 hours', xp: 100,
    isBoss: false,
    concept: {
      simple: `Imagine writing console.log("Day 1"), console.log("Day 2")... 360 times. That's madness. Loops let you say: "repeat this action 360 times" in just 3 lines of code.`,
      technical: `Loops repeatedly execute a block of code while a condition is true. JavaScript provides: for (classic, index-based), while (unknown iterations), do...while (always runs at least once), for...of (iterate values), for...in (iterate keys). Array methods like forEach, map, filter, reduce are preferred for array iteration in modern JS.`,
      interview: `"When would you use a for loop vs forEach?" → "for loops offer more control (break, continue, index manipulation). forEach is cleaner for side effects on arrays but cannot be broken early. map/filter/reduce are preferable for transforming data."`,
    },
    learn: {
      points: [
        'for loop: when you know how many times to repeat',
        'while loop: when you repeat until a condition becomes false',
        'forEach: the modern way to iterate an array',
        'break: exit a loop early',
        'continue: skip to the next iteration',
        'Infinite loops = crash. Always ensure the condition eventually becomes false.',
      ],
      codeExample: `// Classic for loop
for (let day = 1; day <= 5; day++) {
  console.log(\`Day \${day} complete!\`);
}

// While loop
let streak = 0;
while (streak < 3) {
  console.log(\`Streak: \${streak}\`);
  streak++;
}

// forEach on array
const skills = ["JS", "React", "Node"];
skills.forEach(skill => {
  console.log(\`Learning: \${skill}\`);
});`,
      visual: `for (init; condition; update) {\n  // body — runs while condition is true\n}`,
    },
    tryIt: {
      title: 'Print the quest days',
      instruction: 'Use a for loop to print "Day 1" through "Day 7" followed by "BOSS DAY" for Day 7.',
      starterCode: `for (let day = 1; day <= 7; day++) {\n  // Your code here\n}`,
      expectedOutput: 'Day 1\nDay 2\nDay 3\nDay 4\nDay 5\nDay 6\nBOSS DAY (Day 7)',
    },
    build: {
      title: 'XP Progress Calculator',
      description: 'Using a loop, simulate completing 5 missions (each giving 100 XP). Start at 4820 XP. After each mission, print the new total and whether you have crossed any 500 XP milestone.',
      starterCode: `let xp = 4820;\nconst xpPerMission = 100;\n\nfor (let i = 1; i <= 5; i++) {\n  // Add XP\n  // Print new total\n  // Check if a 5000 XP milestone was crossed\n}`,
      hints: [
        'Track the XP before and after adding to check if you crossed 5000.',
        'Use an if statement inside the loop to check the milestone.',
        'A milestone is crossed if xp was below 5000 before and is at/above 5000 after.',
      ],
      solution: `let xp = 4820;\nconst xpPerMission = 100;\nfor (let i = 1; i <= 5; i++) {\n  const before = xp;\n  xp += xpPerMission;\n  console.log(\`After mission \${i}: \${xp} XP\`);\n  if (before < 5000 && xp >= 5000) {\n    console.log("🏆 MILESTONE: 5000 XP reached!");\n  }\n}`,
    },
    quiz: [
      { id: 'q1', question: 'What does the i++ expression do inside a for loop?', options: ['Decreases i by 1', 'Resets i to 0', 'Increases i by 1', 'Checks if i is positive'], correct: 2, explanation: 'i++ is shorthand for i = i + 1. It increments i by 1 after each iteration, eventually making the loop condition false so the loop stops.' },
      { id: 'q2', question: 'What will this loop print?\n\nfor (let i = 0; i < 3; i++) { console.log(i); }', options: ['0 1 2 3', '1 2 3', '0 1 2', '1 2 3 4'], correct: 2, explanation: 'i starts at 0, runs while i < 3. So it runs for i=0, i=1, i=2. When i becomes 3, the condition (3 < 3) is false and the loop stops.' },
      { id: 'q3', question: 'Which loop always executes its body at least once?', options: ['for', 'while', 'do...while', 'forEach'], correct: 2, explanation: 'do...while checks the condition AFTER executing the body, so it always runs at least once, even if the condition starts as false.' },
      { id: 'q4', question: 'What does break do inside a loop?', options: ['Pauses the loop temporarily', 'Skips the current iteration', 'Exits the loop immediately', 'Resets the counter'], correct: 2, explanation: 'break exits the loop entirely. continue (different keyword) skips to the next iteration without exiting.' },
    ],
    reflect: { prompt: 'Think of a real-world process in an application that would require a loop. What would it loop over?' },
    tags: ['loops', 'for', 'while', 'forEach', 'iteration'],
  },

  '1-6': {
    levelId: 1, day: 6, title: 'Functions',
    subtitle: 'Reusable blocks of logic',
    difficulty: 'Beginner', estimatedTime: '2 hours', xp: 100,
    isBoss: false,
    concept: {
      simple: `A function is like a recipe. You write the recipe once ("mix flour, eggs, sugar...") and then bake as many cakes as you want. In code: write the logic once, call it as many times as needed with different inputs.`,
      technical: `Functions are first-class objects in JavaScript — they can be assigned to variables, passed as arguments, and returned from other functions. Declared with function keyword or arrow syntax (=>). Parameters are inputs; the return value is output. Functions create their own scope.`,
      interview: `"What is the difference between a function declaration and a function expression?" → "Function declarations are hoisted — they can be called before they are defined. Function expressions and arrow functions are not hoisted."`,
    },
    learn: {
      points: [
        'DRY principle: Don\'t Repeat Yourself. Functions prevent code duplication.',
        'Parameters: the inputs a function expects',
        'Arguments: the actual values you pass when calling the function',
        'return: what the function gives back',
        'A function without return gives back undefined',
        'Arrow functions (=>) are the modern syntax',
      ],
      codeExample: `// Function declaration
function calculateXP(daysCompleted, xpPerDay) {
  return daysCompleted * xpPerDay;
}

// Arrow function (modern)
const greetPlayer = (name) => \`Welcome back, \${name}!\`;

// Calling functions
const totalXP = calculateXP(17, 100); // arguments
console.log(totalXP);                  // 1700

console.log(greetPlayer("Shubhi"));    // "Welcome back, Shubhi!"

// Functions with default parameters
const levelUp = (currentLevel, bonus = 0) => currentLevel + 1 + bonus;
console.log(levelUp(3));     // 4
console.log(levelUp(3, 2));  // 6`,
      visual: `function name(params) {\n  // logic\n  return result;\n}`,
    },
    tryIt: {
      title: 'Write your first useful function',
      instruction: 'Write an arrow function called getQuestStatus that takes day and level and returns a formatted string.',
      starterCode: `const getQuestStatus = (day, level) => {\n  // Return: "Level {level} | Day {day}/30"\n};\n\nconsole.log(getQuestStatus(17, 3)); // "Level 3 | Day 17/30"`,
      expectedOutput: 'Level 3 | Day 17/30',
    },
    build: {
      title: 'Quest Stats Calculator',
      description: 'Build three functions: 1) calculateXP(daysCompleted, xpPerDay) 2) getDaysRemaining(currentDay, totalDays) 3) getCompletionPercent(current, total) — then use them all to print a stats summary.',
      starterCode: `// Write your three functions here\n\n// Then use them:\nconst summary = {\n  xp: calculateXP(17, 100),\n  daysLeft: getDaysRemaining(17, 30),\n  percent: getCompletionPercent(77, 360),\n};\nconsole.log(summary);`,
      hints: [
        'calculateXP: simply multiply the two parameters.',
        'getDaysRemaining: subtract currentDay from totalDays.',
        'getCompletionPercent: (current / total) * 100 — round it with Math.round().',
      ],
      solution: `const calculateXP = (days, xpPerDay) => days * xpPerDay;\nconst getDaysRemaining = (current, total) => total - current;\nconst getCompletionPercent = (current, total) => Math.round((current / total) * 100);\n\nconst summary = {\n  xp: calculateXP(17, 100),\n  daysLeft: getDaysRemaining(17, 30),\n  percent: getCompletionPercent(77, 360),\n};\nconsole.log(summary);`,
    },
    quiz: [
      { id: 'q1', question: 'What does a function return if it has no return statement?', options: ['0', 'null', 'undefined', 'An error'], correct: 2, explanation: 'Functions without a return statement implicitly return undefined. This is a common source of bugs — always check if you meant to return something.' },
      { id: 'q2', question: 'What is the difference between parameters and arguments?', options: ['They are the same thing', 'Parameters are in the definition; arguments are the actual values passed in the call', 'Arguments are in the definition; parameters are the actual values', 'Parameters are for arrow functions; arguments for declarations'], correct: 1, explanation: 'Parameters are the variable names in the function definition: function add(a, b). Arguments are the actual values when calling: add(3, 5). a and b are parameters; 3 and 5 are arguments.' },
      { id: 'q3', question: 'Which function syntax is hoisted?', options: ['Arrow functions', 'Function expressions', 'Function declarations', 'All of the above'], correct: 2, explanation: 'Only function declarations (function name() {}) are hoisted — they can be called before their definition in the code. Arrow functions and function expressions are not.' },
      { id: 'q4', question: 'What is the output?\n\nconst double = n => n * 2;\nconsole.log(double(5));', options: ['10', '25', '52', 'Error'], correct: 0, explanation: 'The arrow function takes n and returns n * 2. Called with 5, it returns 5 * 2 = 10.' },
    ],
    reflect: { prompt: 'What\'s a task in your daily life that you could describe as a function? (inputs → process → output)' },
    tags: ['functions', 'arrow functions', 'parameters', 'return', 'DRY'],
  },

  '1-7': {
    levelId: 1, day: 7, title: 'Weekly Boss I',
    subtitle: 'Build a JavaScript Mini-App',
    difficulty: 'Boss', estimatedTime: '3 hours', xp: 200,
    isBoss: true, bossType: 'weekly',
    bossDescription: 'Combine everything from Days 1–6 to build a real mini application.',
    challenge: {
      title: 'Quest Progress Tracker',
      description: `Build a JavaScript program that:
1. Stores a player object with name, level, currentDay, xp, streak
2. Has a function \`completeDay(player)\` that adds 100 XP, increments the day, and logs progress
3. Has a function \`checkLevelUp(player)\` that logs if the player should advance to the next level
4. Simulates completing 5 days and shows the player's state after each`,
      starterCode: `// Your player object
const player = {\n  name: "Shubhi",\n  level: 3,\n  currentDay: 17,\n  xp: 4820,\n  streak: 12,\n};\n\n// completeDay function\n\n// checkLevelUp function\n\n// Simulate 5 days\nfor (let i = 0; i < 5; i++) {\n  completeDay(player);\n  checkLevelUp(player);\n}`,
      hints: [
        'completeDay should mutate the player object: player.xp += 100, player.currentDay += 1',
        'checkLevelUp should check if player.currentDay > 30 and if so, increment level and reset day',
        'Use console.log with template literals for readable output',
      ],
    },
    quiz: [
      { id: 'q1', question: 'What is a variable?', options: ['A fixed value that never changes', 'A named memory location storing a value', 'A type of loop', 'A function output'], correct: 1, explanation: 'A variable is a named reference to a value stored in memory. let and const declare variables in modern JS.' },
      { id: 'q2', question: 'Which data type represents true or false?', options: ['string', 'number', 'boolean', 'null'], correct: 2, explanation: 'boolean has exactly two values: true and false. Used in conditions, flags, and logical expressions.' },
      { id: 'q3', question: 'What does a for loop require to prevent running forever?', options: ['A return statement', 'A break by default', 'A condition that eventually becomes false', 'A timer'], correct: 2, explanation: 'A for loop runs while its condition is true. Without a condition that eventually becomes false, you get an infinite loop that crashes the program.' },
      { id: 'q4', question: 'What is the DRY principle?', options: ["Don't Run Yet", "Don't Repeat Yourself", "Define Reusable Yield", "Data Remains Yours"], correct: 1, explanation: "DRY: Don't Repeat Yourself. If you write the same logic in multiple places, extract it into a function. This makes code easier to maintain and debug." },
    ],
    reflect: { prompt: 'What felt hard this week? What came naturally? What are you most unsure about?' },
    tags: ['boss', 'weekly', 'review'],
  },

  '1-8': {
    levelId: 1, day: 8, title: 'Arrays',
    subtitle: 'Ordered lists of data',
    difficulty: 'Beginner', estimatedTime: '2 hours', xp: 100, isBoss: false,
    concept: {
      simple: 'An array is an ordered list. Like a playlist of songs, or a shopping list. Each item has a position (index) starting from 0.',
      technical: 'Arrays in JS are zero-indexed ordered collections. They can hold any type, including mixed types. Key methods: push, pop, shift, unshift, splice, slice, map, filter, reduce, find, findIndex, includes, indexOf, forEach, sort, flat, flatMap.',
      interview: '"Explain the difference between map, filter, and reduce." → "map transforms each element and returns a new array of the same length. filter returns a new array with only elements that pass a test. reduce accumulates all elements into a single value."',
    },
    learn: { points: ['Zero-indexed: first item is index 0', 'push/pop add/remove from end', 'shift/unshift add/remove from start', 'map: transform', 'filter: select', 'find: get first match', 'includes: check membership', 'length property gives the count'], codeExample: `const levels = ["Awakening", "JS Apprentice", "Frontend Warrior"];\n\nconsole.log(levels[0]);    // "Awakening"\nconsole.log(levels.length); // 3\n\nlevels.push("Backend Fortress"); // Add to end\n\n// Transform with map\nconst numbered = levels.map((level, i) => \`\${i+1}. \${level}\`);\nconsole.log(numbered);\n\n// Filter\nconst longNames = levels.filter(l => l.length > 10);\nconsole.log(longNames);`, visual: '[0]  [1]  [2]  [3]\n"A"  "B"  "C"  "D"' },
    tryIt: { title: 'Skill list', instruction: 'Create a skills array with 5 items. Use map to add "✅" prefix to each. Use filter to get only skills longer than 5 characters.', starterCode: `const skills = ["JS", "React", "Node", "SQL", "Git"];\n// map to add prefix\n// filter for long names`, expectedOutput: '["✅JS","✅React","✅Node","✅SQL","✅Git"]\n["React","Node"]' },
    build: { title: 'Mission Archive', description: 'Given an array of mission objects (day, title, xp, completed), write functions to: 1) get total XP from completed missions 2) get all incomplete missions 3) find a mission by day number.', starterCode: `const missions = [\n  { day: 1, title: "Variables", xp: 100, completed: true },\n  { day: 2, title: "Loops", xp: 100, completed: true },\n  { day: 3, title: "Functions", xp: 100, completed: false },\n  { day: 4, title: "Arrays", xp: 100, completed: false },\n];\n\n// Write your three functions here`, hints: ['Total XP: use filter to get completed, then reduce to sum xp.', 'Incomplete: filter where completed is false.', 'Find by day: use .find() with a condition on the day property.'], solution: `const getTotalXP = missions => missions.filter(m => m.completed).reduce((sum, m) => sum + m.xp, 0);\nconst getIncomplete = missions => missions.filter(m => !m.completed);\nconst findByDay = (missions, day) => missions.find(m => m.day === day);\nconsole.log(getTotalXP(missions));\nconsole.log(getIncomplete(missions).map(m => m.title));\nconsole.log(findByDay(missions, 2));` },
    quiz: [{ id: 'q1', question: 'What is the index of the first element in an array?', options: ['1', '0', '-1', 'undefined'], correct: 1, explanation: 'Arrays are zero-indexed. The first element is at index 0. A common source of off-by-one errors.' }, { id: 'q2', question: 'Which method returns a NEW array without modifying the original?', options: ['push', 'pop', 'splice', 'map'], correct: 3, explanation: 'map, filter, and slice return new arrays. push, pop, splice mutate (modify) the original array. Knowing which methods mutate is crucial for avoiding bugs.' }, { id: 'q3', question: 'What does [1,2,3].reduce((acc, n) => acc + n, 0) return?', options: ['[1,2,3]', '0', '6', 'Error'], correct: 2, explanation: 'reduce accumulates: starts with acc=0, then 0+1=1, 1+2=3, 3+3=6. The second argument (0) is the initial accumulator value.' }, { id: 'q4', question: 'How do you check if an array contains the value 5?', options: ['array.has(5)', 'array.contains(5)', 'array.includes(5)', 'array.find(5)'], correct: 2, explanation: 'Array.includes() returns true if the value exists. array.find() requires a callback function, not a direct value.' }],
    reflect: { prompt: 'How would you use map, filter, and reduce in a real app? Think of a data processing scenario.' },
    tags: ['arrays', 'map', 'filter', 'reduce'],
  },

  '1-9': {
    levelId: 1, day: 9, title: 'Objects',
    subtitle: 'Structured data with keys',
    difficulty: 'Beginner', estimatedTime: '2 hours', xp: 100, isBoss: false,
    concept: { simple: 'An object groups related information together. Instead of having firstName, lastName, age as separate variables, you put them all inside one object labelled "person".', technical: 'Objects are collections of key-value pairs. Keys are strings (or Symbols). Values can be any type including functions (called methods). Object.keys(), Object.values(), Object.entries() for iteration. Spread operator {...obj} for shallow copying. Destructuring for extracting properties.', interview: '"What is the difference between dot notation and bracket notation?" → "Dot notation (obj.key) is cleaner and preferred. Bracket notation (obj[\'key\'] or obj[variable]) is required when the key is dynamic (stored in a variable) or contains special characters."' },
    learn: { points: ['Objects store related data together', 'Keys are accessed with dot notation: player.name', 'Bracket notation for dynamic keys: player["name"]', 'Destructuring: const { name, xp } = player', 'Spread: const copy = { ...player, level: 4 }', 'Methods: functions inside objects'], codeExample: `const player = {\n  name: "Shubhi",\n  level: 3,\n  xp: 4820,\n  skills: ["JS", "React"],\n  greet() {\n    return \`Hello, I am \${this.name}!\`;\n  }\n};\n\n// Access\nconsole.log(player.name);        // "Shubhi"\nconsole.log(player["xp"]);       // 4820\n\n// Destructuring\nconst { name, level } = player;\nconsole.log(name, level);        // "Shubhi" 3\n\n// Spread (shallow copy with change)\nconst upgraded = { ...player, level: 4 };\nconsole.log(upgraded.level);     // 4\nconsole.log(player.level);       // 3 (original unchanged)`, visual: '{ key: value, key2: value2 }' },
    tryIt: { title: 'Destructure a mission', instruction: 'Destructure the mission object to extract title, xp, and completed. Log them individually.', starterCode: `const mission = { day: 17, title: "React State", xp: 100, completed: false };\n// Destructure here\nconsole.log(title, xp, completed);`, expectedOutput: 'React State 100 false' },
    build: { title: 'Player Profile Manager', description: 'Create a player object and three functions: updateXP(player, amount), levelUp(player), and getProfileSummary(player) that returns a formatted string.', starterCode: `const player = {\n  name: "Shubhi",\n  level: 3,\n  xp: 4820,\n  completedMissions: 77,\n};\n\n// Write your three functions`, hints: ['updateXP should return a new object with updated xp: { ...player, xp: player.xp + amount }', 'levelUp returns a new object with level incremented', 'getProfileSummary uses template literals to format the info'], solution: `const updateXP = (player, amount) => ({ ...player, xp: player.xp + amount });\nconst levelUp = (player) => ({ ...player, level: player.level + 1 });\nconst getProfileSummary = (p) => \`\${p.name} | Lv.\${p.level} | \${p.xp} XP | \${p.completedMissions} missions\`;\n\nlet p = updateXP(player, 300);\np = levelUp(p);\nconsole.log(getProfileSummary(p));` },
    quiz: [{ id: 'q1', question: 'How do you access a property stored in a variable key?', options: ['obj.key', 'obj[key]', 'obj{key}', 'obj->key'], correct: 1, explanation: 'When the key is in a variable, use bracket notation: obj[variable]. Dot notation only works with literal property names.' }, { id: 'q2', question: 'What does destructuring do?', options: ['Deletes properties from an object', 'Extracts properties into separate variables', 'Merges two objects', 'Copies an object deeply'], correct: 1, explanation: 'Destructuring syntax: const { a, b } = obj; — creates variables a and b from the object\'s properties of the same names.' }, { id: 'q3', question: 'What does the spread operator ({...obj}) create?', options: ['A deep copy of the object', 'A shallow copy', 'A reference to the same object', 'An array'], correct: 1, explanation: 'Spread creates a SHALLOW copy — top-level properties are copied, but nested objects/arrays still share references. Deep cloning requires structuredClone() or JSON.parse(JSON.stringify()).' }, { id: 'q4', question: 'What is a method in JavaScript?', options: ['A type of loop', 'A function stored as an object property', 'An external API call', 'A CSS style'], correct: 1, explanation: 'A method is a function that belongs to an object. Example: player.greet(). When a method uses "this", it refers to the object it belongs to.' }],
    reflect: { prompt: 'Think about an API response you\'ve seen (like a weather API or user profile). How would you model that as a JavaScript object?' },
    tags: ['objects', 'destructuring', 'spread', 'methods'],
  },

  '1-10': { levelId: 1, day: 10, title: 'Strings', subtitle: 'Text manipulation', difficulty: 'Beginner', estimatedTime: '2 hours', xp: 100, isBoss: false, concept: { simple: 'Strings are text. Everything in quotes is a string. JavaScript gives you dozens of built-in tools to search, slice, transform, and combine text.', technical: 'Strings are immutable primitive sequences of UTF-16 characters. Template literals (backticks) allow interpolation and multiline strings. Key methods: length, indexOf, includes, startsWith, endsWith, slice, substring, toUpperCase, toLowerCase, trim, replace, replaceAll, split, join, padStart, repeat, charAt.', interview: '"How would you reverse a string in JavaScript?" → "str.split(\'\').reverse().join(\'\'). For proper Unicode handling (emoji, accented chars), use Array.from(str).reverse().join(\'\')."' }, learn: { points: ['Template literals use backticks and ${}: `Hello ${name}`', 'Strings are immutable — methods return NEW strings', '.slice(start, end): extract a portion', '.split(separator): convert string to array', '.trim(): remove whitespace from both ends', '.includes(): check for substring', '.replace(): substitute text'], codeExample: `const title = "  Edinburgh Quest  ";\nconsole.log(title.trim());        // "Edinburgh Quest"\nconsole.log(title.trim().toLowerCase()); // "edinburgh quest"\n\nconst day = "Day-17-Level-3";\nconst parts = day.split("-");     // ["Day","17","Level","3"]\nconsole.log(parts[1]);            // "17"\n\n// Template literals\nconst name = "Shubhi";\nconst level = 3;\nconsole.log(\`\${name} is on Level \${level}\`);`, visual: 'index:  0  1  2  3  4\nstring: h  e  l  l  o' }, tryIt: { title: 'Format a username', instruction: 'Take the raw input "  shubhi tiwari  " and produce "Shubhi Tiwari" (trimmed and title-cased).', starterCode: `const raw = "  shubhi tiwari  ";\n// Step 1: trim\n// Step 2: split by space\n// Step 3: capitalize each word\n// Step 4: join back\nconsole.log(result);`, expectedOutput: 'Shubhi Tiwari' }, build: { title: 'Mission Title Formatter', description: 'Write a function formatMissionTitle(day, title) that returns "Day 01: Arrays" (zero-padded day, title case).', starterCode: `function formatMissionTitle(day, title) {\n  // Zero-pad the day (1 -> "01", 17 -> "17")\n  // Title-case the title\n  // Return formatted string\n}\n\nconsole.log(formatMissionTitle(1, "arrays"));  // "Day 01: Arrays"\nconsole.log(formatMissionTitle(17, "react state")); // "Day 17: React State"`, hints: ['Zero-pad: String(day).padStart(2, "0")', 'Title case: split by space, capitalize first letter of each word, join', 'word[0].toUpperCase() + word.slice(1)'], solution: `function formatMissionTitle(day, title) {\n  const padded = String(day).padStart(2, "0");\n  const titled = title.split(" ").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");\n  return \`Day \${padded}: \${titled}\`;\n}` }, quiz: [{ id: 'q1', question: 'What does "hello".slice(1, 3) return?', options: ['hel', 'el', 'ell', 'ello'], correct: 1, explanation: 'slice(start, end) extracts from index 1 up to but NOT including index 3. So indexes 1 and 2: "e" and "l" → "el".' }, { id: 'q2', question: 'What does "hello world".split(" ") return?', options: ['"hello world"', '["hello", "world"]', '["h","e","l","l","o"," ","w","o","r","l","d"]', 'Error'], correct: 1, explanation: 'split(separator) converts a string to an array, dividing at the separator. " " splits on spaces.' }, { id: 'q3', question: 'Template literals use which character?', options: ['Single quote \'', 'Double quote "', 'Backtick `', 'Hash #'], correct: 2, explanation: 'Template literals use backticks (`). They support string interpolation (${expression}) and multiline strings without escape characters.' }, { id: 'q4', question: 'Are strings mutable in JavaScript?', options: ['Yes, you can change individual characters', 'No, string methods always return new strings', 'Only if declared with let', 'Only with splice()'], correct: 1, explanation: 'Strings are immutable. "hello"[0] = "H" does nothing. Methods like toUpperCase() return new strings; they never modify the original.' }],
    reflect: { prompt: 'Where in a web app would string manipulation be essential? List 5 real examples.' }, tags: ['strings', 'template literals', 'methods'] },

  '1-11': { levelId: 1, day: 11, title: 'Debugging', subtitle: 'Finding and fixing bugs', difficulty: 'Beginner', estimatedTime: '2 hours', xp: 100, isBoss: false, concept: { simple: 'Bugs are mistakes in your code. Debugging is detective work — you have a clue (the error message or unexpected behaviour), and you track down the cause. Every developer spends a huge amount of time debugging. It is a skill, not a failure.', technical: 'Debugging involves reading error messages, using console.log strategically, browser DevTools debugger, step-through execution, and systematic elimination. Common error types: SyntaxError (invalid code), TypeError (wrong type used), ReferenceError (variable not found), RangeError (value out of valid range), LogicError (code runs but produces wrong output).', interview: '"Describe your debugging process." → "I read the error message carefully, identify the file and line number, form a hypothesis about the cause, add console.logs or use breakpoints to test the hypothesis, fix and verify. I avoid randomly changing code without a reason."' }, learn: { points: ['Read error messages — they tell you exactly what went wrong and where', 'ReferenceError: variable does not exist', 'TypeError: wrong operation on a type (calling undefined as a function)', 'SyntaxError: invalid JavaScript syntax', 'console.log() is your first debugging tool', 'Chrome DevTools: breakpoints, step-through, watch values'], codeExample: `// Common errors and how to read them:\n\n// ReferenceError: score is not defined\nconst total = score + 10;  // 'score' was never declared\n\n// TypeError: Cannot read properties of undefined\nconst user = undefined;\nconsole.log(user.name);  // Can't access .name on undefined\n\n// SyntaxError: missing )\nif (x > 5 {\n  console.log("yes");\n}\n\n// Logic error (no error thrown, wrong output)\nconst area = width + height;  // Should be width * height`, visual: 'Error → Read Message → Find Line → Understand Cause → Fix → Test' }, tryIt: { title: 'Fix the broken code', instruction: 'The code below has 3 bugs. Find and fix all of them.', starterCode: `const playerNmae = "Shubhi";\nconst level = 3\nconst xp = "4820";\n\nconst totalXp = xp + 100;\nconsole.log(\`\${playerName} is at level \${level} with \${totalXp} XP\`);`, expectedOutput: 'Shubhi is at level 3 with 4920 XP' }, build: { title: 'Debug the quest calculator', description: 'The function below is broken. Identify all the bugs and fix them so it correctly calculates the XP needed to complete the current level.', starterCode: `function xpToComplete(currentDay, xpPerMission) {\n  const daysLeft = 30 - currentDay;\n  const totalXP = daysLeft * xpPerMision;\n  if (totalXP = 0) {\n    return "Level complete!";\n  }\n  return "XP needed: " + totalXp;\n}\n\nconsole.log(xpToComplete(17, 100));`, hints: ['Look for typos in variable names.', 'Check the comparison operator inside the if statement.', 'Are all variable names consistent?'], solution: `function xpToComplete(currentDay, xpPerMission) {\n  const daysLeft = 30 - currentDay;\n  const totalXP = daysLeft * xpPerMission; // fixed typo\n  if (totalXP === 0) { // fixed = to ===\n    return "Level complete!";\n  }\n  return "XP needed: " + totalXP; // fixed casing\n}\nconsole.log(xpToComplete(17, 100));` }, quiz: [{ id: 'q1', question: 'What type of error do you get when you misspell a variable name?', options: ['SyntaxError', 'TypeError', 'ReferenceError', 'LogicError'], correct: 2, explanation: 'ReferenceError occurs when JavaScript cannot find a variable by that name. Common cause: typo in variable name, or using a variable before it\'s declared (with let/const).' }, { id: 'q2', question: 'What is a logic error?', options: ['Code that fails to compile', 'Code that throws a runtime exception', 'Code that runs but produces incorrect results', 'A typo in variable name'], correct: 2, explanation: 'Logic errors are the trickiest — the code runs without throwing an exception, but it produces the wrong output. Only caught through testing and careful verification.' }, { id: 'q3', question: 'What is the difference between = and === in a condition?', options: ['No difference', '= assigns; === compares. Using = in if() is almost always a bug.', '=== assigns; = compares', 'Both compare values'], correct: 1, explanation: '= is assignment. === is strict comparison. if (x = 5) always evaluates to true because it assigns 5 to x (truthy). You almost certainly meant if (x === 5).' }, { id: 'q4', question: 'What is the best first step when you see an error message?', options: ['Restart your computer', 'Search Google immediately', 'Read the error message carefully — it tells you the type, message, and line number', 'Ask for help immediately'], correct: 2, explanation: 'Error messages contain the error type (TypeError, etc.), a description of what went wrong, and the file and line number. Reading this carefully is the most efficient first step.' }],
    reflect: { prompt: 'Describe a bug you found (or imagined). What would your debugging process be?' }, tags: ['debugging', 'errors', 'console', 'devtools'] },

  '1-12': { levelId: 1, day: 12, title: 'Problem Solving', subtitle: 'Breaking down complex problems', difficulty: 'Beginner', estimatedTime: '2.5 hours', xp: 100, isBoss: false, concept: { simple: 'The most important skill in programming isn\'t memorizing syntax — it\'s breaking a big problem into tiny steps. Before you write any code, understand WHAT you\'re building.', technical: 'Problem decomposition: break complex problems into smaller sub-problems. Pseudocode: write the logic in plain English first. Input/output analysis: identify what goes in and what must come out. Edge cases: what about empty input, negative numbers, null values? Pattern recognition: most coding problems are variations of known patterns.', interview: '"Walk me through how you would approach this problem." → This is one of the most valuable interview skills. Thinking out loud, breaking down the problem, and asking clarifying questions demonstrates engineering maturity.' }, learn: { points: ['Step 1: Understand — what exactly is the problem?', 'Step 2: Examples — work through 2-3 concrete examples by hand', 'Step 3: Plan — write pseudocode before code', 'Step 4: Code — implement your plan', 'Step 5: Test — verify with your examples', 'Step 6: Edge cases — what breaks your solution?', 'DRY: refactor repeated code into functions'], codeExample: `// Problem: Calculate the average XP per day across all completed missions\n// \n// Step 1: Understand\n//   Input: array of completed mission objects with xp property\n//   Output: average XP (number)\n//\n// Step 2: Examples\n//   [100, 100, 150] → total 350 / 3 = 116.67\n//\n// Step 3: Pseudocode\n//   - If array is empty, return 0\n//   - Sum all XP values\n//   - Divide by number of missions\n//\n// Step 4: Code\nfunction averageXP(missions) {\n  if (missions.length === 0) return 0;\n  const total = missions.reduce((sum, m) => sum + m.xp, 0);\n  return Math.round(total / missions.length);\n}`, visual: 'Understand → Examples → Plan → Code → Test → Edge Cases' }, tryIt: { title: 'Pseudocode first', instruction: 'Write pseudocode (in comments) for a function that takes an array of quiz scores and returns: average score, highest score, and whether the user passed (average >= 70).', starterCode: `// Pseudocode:\n// 1. ...\n// 2. ...\n\n// Now implement it:\nfunction analyzeQuizResults(scores) {\n  // Your code\n}`, expectedOutput: '{ average: 75, highest: 90, passed: true }' }, build: { title: 'Quest Completion Analyzer', description: 'Given an array of mission objects, build a function that returns a summary: totalMissions, completed, completionRate (%), avgXP from completed missions, weakDays (days where quiz score < 70).', starterCode: `const missions = [\n  { day: 1, completed: true, xp: 100, quizScore: 85 },\n  { day: 2, completed: true, xp: 100, quizScore: 60 },\n  { day: 3, completed: false, xp: 0, quizScore: null },\n  { day: 4, completed: true, xp: 120, quizScore: 90 },\n];\n\nfunction analyzeMissions(missions) {\n  // Your code\n}\nconsole.log(analyzeMissions(missions));`, hints: ['completionRate = (completed.length / total) * 100', 'weakDays: filter completed missions where quizScore < 70', 'avgXP: reduce over completed missions'], solution: `function analyzeMissions(missions) {\n  const completed = missions.filter(m => m.completed);\n  const completionRate = Math.round((completed.length / missions.length) * 100);\n  const avgXP = completed.length ? Math.round(completed.reduce((s,m) => s + m.xp, 0) / completed.length) : 0;\n  const weakDays = completed.filter(m => m.quizScore !== null && m.quizScore < 70).map(m => m.day);\n  return { totalMissions: missions.length, completed: completed.length, completionRate, avgXP, weakDays };\n}` }, quiz: [{ id: 'q1', question: 'What is pseudocode?', options: ['Broken JavaScript code', 'A different programming language', 'Plain-language description of an algorithm before writing real code', 'A type of comment'], correct: 2, explanation: 'Pseudocode is a way to plan your logic in plain English (or your language) before translating it to code. It helps you think through the problem without worrying about syntax.' }, { id: 'q2', question: 'What are "edge cases"?', options: ['Syntax errors at the edges of a file', 'The most extreme or unusual inputs that might break your solution', 'Comments at the bottom of code', 'Functions that are never called'], correct: 1, explanation: 'Edge cases are unusual inputs: empty arrays, null values, zero, negative numbers, very large inputs. A robust solution handles edge cases without crashing.' }, { id: 'q3', question: 'Which of these is the most important FIRST step when solving a coding problem?', options: ['Start typing code immediately', 'Google the answer', 'Understand the problem — what are the inputs and expected outputs?', 'Choose the right loop type'], correct: 2, explanation: 'Understanding what the problem actually asks is the most critical step. Jumping straight to code on a misunderstood problem wastes enormous time.' }, { id: 'q4', question: 'What should you test after solving a problem?', options: ['Only the happy path (normal inputs)', 'Edge cases and unexpected inputs', 'Nothing — if it compiles it works', 'Only performance'], correct: 1, explanation: 'Always test edge cases: empty input, null/undefined, zero, maximum values. Happy-path testing only reveals a fraction of potential bugs.' }],
    reflect: { prompt: 'Think of the most complex thing you want to build. Break it into 5 smaller problems.' }, tags: ['problem solving', 'pseudocode', 'decomposition'] },

  '1-13': { levelId: 1, day: 13, title: 'Complexity Basics', subtitle: 'Understanding Big O notation', difficulty: 'Intermediate', estimatedTime: '2 hours', xp: 100, isBoss: false, concept: { simple: 'If you have 100 books and need to find one: searching one-by-one might take 100 steps (O(n)). If the books are alphabetical, binary search takes about 7 steps (O(log n)). Big O tells you how fast your code scales as data grows.', technical: 'Big O notation describes the worst-case time (or space) complexity of an algorithm as the input size n grows. Common complexities: O(1) constant, O(log n) logarithmic, O(n) linear, O(n log n) linearithmic, O(n²) quadratic, O(2ⁿ) exponential. Focus on understanding the patterns — not deriving formal proofs.', interview: '"What is the time complexity of searching an unsorted array?" → "O(n) in the worst case — you may need to check every element before finding the target or confirming it\'s absent."' }, learn: { points: ['O(1): same speed regardless of input size (array access by index)', 'O(n): speed grows linearly with input (simple loop)', 'O(n²): nested loops — dramatically slows with large data', 'O(log n): extremely efficient — halves the search space each step', 'Space complexity: how much memory does your algorithm use?', 'Aim for the best complexity your problem allows'], codeExample: `// O(1) — constant time\nfunction getFirstMission(missions) {\n  return missions[0]; // always 1 step\n}\n\n// O(n) — linear time\nfunction findMissionByDay(missions, day) {\n  for (const m of missions) { // potentially checks all\n    if (m.day === day) return m;\n  }\n}\n\n// O(n²) — quadratic time\nfunction findDuplicates(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = i+1; j < arr.length; j++) { // nested loop\n      if (arr[i] === arr[j]) return true;\n    }\n  }\n  return false;\n}`, visual: 'O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)' }, tryIt: { title: 'Identify the complexity', instruction: 'For each code snippet, determine whether it is O(1), O(n), or O(n²).', starterCode: `// Snippet 1\nconst xp = player.xp; // O(?)

// Snippet 2
missions.forEach(m => console.log(m.title)); // O(?)

// Snippet 3
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length; j++) {
    // do something
  }
} // O(?)`, expectedOutput: 'O(1)\nO(n)\nO(n²)' }, build: { title: 'Optimize the duplicate finder', description: 'The O(n²) duplicate finder works but is slow. Rewrite it using a Set (hash set) to achieve O(n).', starterCode: `// Slow O(n²) version:\nfunction hasDuplicateSlow(arr) {\n  for (let i = 0; i < arr.length; i++)\n    for (let j = i+1; j < arr.length; j++)\n      if (arr[i] === arr[j]) return true;\n  return false;\n}\n\n// Write O(n) version using Set:\nfunction hasDuplicateFast(arr) {\n  // Use a Set to track seen values\n}`, hints: ['A Set stores unique values and has O(1) lookup.', 'Loop through the array once. For each element, check if the Set already has it.', 'If yes: duplicate found. If no: add it to the Set and continue.'], solution: `function hasDuplicateFast(arr) {\n  const seen = new Set();\n  for (const val of arr) {\n    if (seen.has(val)) return true;\n    seen.add(val);\n  }\n  return false;\n}` }, quiz: [{ id: 'q1', question: 'What does O(1) mean?', options: ['The algorithm takes 1 second', 'The algorithm always takes the same amount of steps regardless of input size', 'The algorithm uses 1 MB of memory', 'The algorithm has 1 loop'], correct: 1, explanation: 'O(1) means constant time — accessing an array by index, looking up a hash map value. The input size does not affect how long the operation takes.' }, { id: 'q2', question: 'Why is O(n²) dangerous for large inputs?', options: ['It uses too much memory', '100 items → 10,000 steps; 1000 items → 1,000,000 steps. It scales very poorly.', 'It only works for strings', 'It requires more RAM'], correct: 1, explanation: 'O(n²) grows quadratically. Double the input → 4x the work. Triple it → 9x the work. For large datasets this becomes unusably slow.' }, { id: 'q3', question: 'What is a hash map / Set useful for?', options: ['Sorting arrays', 'O(1) average-case lookup — checking if a value exists instantly', 'Recursion', 'Memory management'], correct: 1, explanation: 'Hash maps (objects, Map) and Sets provide O(1) average-case lookup. Instead of looping to find an item (O(n)), you check the map directly.' }, { id: 'q4', question: 'Which is more efficient for large data: O(log n) or O(n)?', options: ['O(n)', 'O(log n)', 'They are identical', 'Depends on the language'], correct: 1, explanation: 'O(log n) is dramatically more efficient. For n=1,000,000: O(n) = 1,000,000 steps. O(log n) = ~20 steps. Binary search is a classic O(log n) algorithm.' }],
    reflect: { prompt: 'When building a real app, at what point do you think complexity analysis becomes important? Give an example.' }, tags: ['big O', 'complexity', 'algorithms'] },

  '1-14': { levelId: 1, day: 14, title: 'Weekly Boss II', subtitle: 'Build a Data Analysis Tool', difficulty: 'Boss', estimatedTime: '3 hours', xp: 200, isBoss: true, bossType: 'weekly', bossDescription: 'Apply arrays, objects, strings, debugging and complexity to build a real data analysis program.', challenge: { title: 'Mission Analytics Dashboard', description: 'Build a program that takes an array of mission data and produces a full analytics report including: completion stats, XP analysis, quiz performance, weak concepts, and a formatted summary string.', starterCode: `const missionData = [\n  { day: 1, title: "Programming Baseline", completed: true, xp: 100, quizScore: 90, tags: ["foundations"] },\n  { day: 2, title: "Variables", completed: true, xp: 100, quizScore: 55, tags: ["variables"] },\n  { day: 3, title: "Data Types", completed: true, xp: 100, quizScore: 80, tags: ["data-types"] },\n  { day: 4, title: "Conditions", completed: false, xp: 0, quizScore: null, tags: ["conditions"] },\n  { day: 5, title: "Loops", completed: true, xp: 100, quizScore: 45, tags: ["loops"] },\n  { day: 6, title: "Functions", completed: true, xp: 100, quizScore: 88, tags: ["functions"] },\n];\n\nfunction generateReport(missions) {\n  // Your implementation here\n}\n\nconsole.log(generateReport(missionData));`, hints: ['Break it into smaller functions first.', 'weakConcepts = completed missions with quizScore < 70.', 'Use reduce for totals, filter for subsets, map for transformations.'] }, quiz: [{ id: 'q1', question: 'What is the time complexity of a single .map() call?', options: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'], correct: 1, explanation: 'map visits every element once — O(n). If you nest map calls, you approach O(n²).' }, { id: 'q2', question: 'What does reduce with an initial value of 0 and accumulator + current.xp do?', options: ['Multiplies all XP values', 'Sums all the xp properties across the array', 'Returns the largest xp', 'Counts the items'], correct: 1, explanation: 'reduce((acc, curr) => acc + curr.xp, 0) accumulates the sum of all xp values starting from 0.' }, { id: 'q3', question: 'What is the safest way to access a nested property that might not exist?', options: ['Directly: obj.a.b', 'Optional chaining: obj?.a?.b', 'Try/catch only', 'Always use typeof first'], correct: 1, explanation: 'Optional chaining (?.) short-circuits and returns undefined if any step is null/undefined, preventing TypeErrors. Essential for API response data.' }],
    reflect: { prompt: 'Looking back at Days 1-13: what was the hardest concept? What clicked naturally? What would you like to revisit?' }, tags: ['boss', 'weekly', 'review'] },

  '1-15': { levelId: 1, day: 15, title: 'Git', subtitle: 'Version control fundamentals', difficulty: 'Beginner', estimatedTime: '2 hours', xp: 100, isBoss: false, concept: { simple: 'Imagine writing a novel and saving a copy every chapter. If you accidentally delete chapter 10, you can restore it. Git does this for code — automatically, for every change you make.', technical: 'Git is a distributed version control system (VCS). It tracks changes to files over time, allowing you to: revert to previous states, branch off to experiment safely, merge changes from multiple developers. Key commands: init, add, commit, push, pull, clone, branch, merge, status, log, diff.', interview: '"Describe your Git workflow." → "I work on feature branches, commit frequently with descriptive messages, open pull requests for review, and merge to main only after review. I never force-push to shared branches."' }, learn: { points: ['git init: create a new repo', 'git add: stage changes for commit', 'git commit -m "message": save a snapshot', 'git status: see what\'s changed', 'git log: see commit history', 'git diff: see what changed in files', 'Commits should be atomic: one logical change per commit', 'Good commit messages: "Add user authentication" not "fix stuff"'], codeExample: `# A typical Git workflow:\n\ngit init                           # Create repo\ngit add index.js                   # Stage one file\ngit add .                          # Stage all changes\ngit commit -m "Add mission data"   # Save snapshot\ngit status                         # Check state\ngit log --oneline                  # See history\ngit diff HEAD~1 HEAD               # Compare last two commits\n\n# Good commit messages:\n# ✅ "Add JWT authentication to API"\n# ✅ "Fix XP calculation for boss days"\n# ❌ "update"\n# ❌ "fixed stuff"`, visual: 'Working Dir → [git add] → Staging → [git commit] → Local Repo → [git push] → Remote' }, tryIt: { title: 'Simulate a Git workflow', instruction: 'Write the exact Git commands you would use to: 1) Initialize a repo 2) Stage all files 3) Commit with message "Initial commit: Edinburgh Quest setup" 4) Check the status 5) View the log.', starterCode: `# Write your git commands here (as comments is fine):\n# 1. Initialize:\n# 2. Stage:\n# 3. Commit:\n# 4. Status:\n# 5. Log:`, expectedOutput: 'git init\ngit add .\ngit commit -m "Initial commit: Edinburgh Quest setup"\ngit status\ngit log' }, build: { title: 'Commit message audit', description: 'Given 5 bad commit messages, rewrite them as good ones following conventional commit style.', starterCode: `// Bad → Good:\n\n// 1. "fix" →\n// 2. "changed things" →\n// 3. "wip" →\n// 4. "asdfgh" →\n// 5. "updated login" →`, hints: ['Good format: "verb + what + why (if not obvious)"', 'Examples: "Add user login endpoint", "Fix XP calculation for boss days", "Refactor mission component for readability"', 'Conventional commits prefix: feat:, fix:, docs:, refactor:, test:'], solution: `// 1. "fix" → "Fix off-by-one error in day counter"\n// 2. "changed things" → "Add dark mode toggle to settings"\n// 3. "wip" → "feat: Add initial quiz component (WIP — not yet connected)"\n// 4. "asdfgh" → [never do this — always write a meaningful message]\n// 5. "updated login" → "Fix token expiry check in login flow"` }, quiz: [{ id: 'q1', question: 'What does git add . do?', options: ['Commits all changes', 'Stages all changes in the current directory for the next commit', 'Pushes to remote', 'Creates a new branch'], correct: 1, explanation: 'git add stages changes. "." means all files in the current directory. Staging is the intermediate step before committing.' }, { id: 'q2', question: 'What is the purpose of git commit?', options: ['Upload code to GitHub', 'Create a permanent snapshot of the current staged changes', 'Switch branches', 'Download changes'], correct: 1, explanation: 'git commit takes the staged changes and saves them as a permanent snapshot in the local repository history. It does NOT upload to any remote.' }, { id: 'q3', question: 'What makes a good commit message?', options: ['Short and vague like "fix"', 'Descriptive, stating what changed and why', 'Just a timestamp', 'A list of all files changed'], correct: 1, explanation: 'Good commits are atomic (one logical change) with descriptive messages. Your team (and future you) should understand the change from the message alone, without reading the diff.' }, { id: 'q4', question: 'What command shows the history of all commits?', options: ['git history', 'git status', 'git log', 'git diff'], correct: 2, explanation: 'git log shows the commit history. git log --oneline gives a compact view. git status shows the current state of the working directory.' }],
    reflect: { prompt: 'Why do you think version control is considered an essential professional skill, even for solo developers?' }, tags: ['git', 'version control', 'workflow'] },

  '1-16': { levelId: 1, day: 16, title: 'GitHub', subtitle: 'Remote repos and collaboration', difficulty: 'Beginner', estimatedTime: '2 hours', xp: 100, isBoss: false, concept: { simple: 'GitHub is where your code lives on the internet. It is like Google Drive for code — but much more powerful. It also shows potential employers your work.', technical: 'GitHub hosts Git repositories remotely. It adds collaboration features: pull requests (PRs), issues, code review, GitHub Actions (CI/CD), GitHub Pages. Remote commands: git remote add origin URL, git push origin main, git pull origin main, git clone URL.', interview: '"How do you use GitHub in a team?" → "I work on feature branches, push to remote, open pull requests with descriptions, request reviews, address feedback, then merge. I also use issues to track tasks and milestones."' }, learn: { points: ['git remote add origin URL: link local repo to GitHub', 'git push: upload local commits to GitHub', 'git pull: download remote changes', 'git clone: copy a remote repo locally', 'Fork: copy someone else\'s repo to your account', 'Pull Request (PR): propose merging your changes into main', 'README.md: the first thing visitors see — make it excellent'], codeExample: `# Connect local repo to GitHub:\ngit remote add origin https://github.com/shubhi/edinburgh-quest.git\ngit branch -M main\ngit push -u origin main\n\n# After making local changes:\ngit add .\ngit commit -m "feat: Add mission quiz component"\ngit push\n\n# Get latest from remote:\ngit pull origin main\n\n# Clone a repo:\ngit clone https://github.com/user/repo.git`, visual: 'Local Repo ←→ [push/pull] ←→ GitHub Remote' }, tryIt: { title: 'Create a professional README', instruction: 'Write the Markdown for a README.md for the Edinburgh Quest project. Include: title, description, tech stack, how to run, and the author.', starterCode: `# Edinburgh Quest\n\n<!-- Add your sections below -->`, expectedOutput: 'A properly formatted README with all 5 sections.' }, build: { title: 'Profile GitHub README', description: 'Design a GitHub profile README for Shubhi. Include: headline, current learning, skills (as badges), goals, and a link to Edinburgh Quest.', starterCode: `# Hi, I'm Shubhi 👋\n\n<!-- Your profile README here -->\n<!-- Include: about, currently learning, skills, projects, goals -->`, hints: ['Profile READMEs live at github.com/username/username', 'Shields.io for skill badges: ![JS](https://img.shields.io/badge/JavaScript-...)', 'Keep it concise — employers spend 30 seconds on profiles'], solution: `# Hi, I'm Shubhi 👋\nA software engineering student on a 360-day journey to Edinburgh.\n\n## Currently Learning\n- React • Node.js • PostgreSQL\n\n## Skills\n![JS](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black&style=flat)\n\n## Projects\n🏴 [Edinburgh Quest](link) — 360-day RPG learning platform\n\n## Goal\nSoftware Engineer in Edinburgh by 2026 🏴` }, quiz: [{ id: 'q1', question: 'What is the difference between git push and git commit?', options: ['They do the same thing', 'git commit saves locally; git push uploads to the remote', 'git push saves locally; git commit uploads', 'git commit is for branches; git push is for main'], correct: 1, explanation: 'git commit is local only — it saves a snapshot to your local repository. git push uploads your local commits to the remote repository (GitHub).' }, { id: 'q2', question: 'What is a Pull Request?', options: ['Downloading code from GitHub', 'A proposal to merge changes from one branch into another, subject to review', 'A request to delete a repo', 'A way to pull data from an API'], correct: 1, explanation: 'A Pull Request (PR) is GitHub\'s way to propose changes. Your team can review the code, leave comments, request changes, and then approve and merge. It\'s the heart of team collaboration.' }, { id: 'q3', question: 'What command downloads a repository from GitHub to your computer?', options: ['git pull', 'git fetch', 'git clone', 'git download'], correct: 2, explanation: 'git clone creates a complete local copy of a remote repository, including all history. git pull fetches and merges changes into an ALREADY cloned repository.' }, { id: 'q4', question: 'Why is a GitHub profile important for developers?', options: ['It replaces a resume completely', 'It shows employers your actual code, projects, consistency, and public contributions', 'It is required to use VS Code', 'It proves you know 10 programming languages'], correct: 1, explanation: 'GitHub is a portfolio. Employers look at your pinned repos, README quality, commit history, and contribution graph. It demonstrates what you can actually build.' }],
    reflect: { prompt: 'What projects would you pin on your GitHub profile? What would each say about you as a developer?' }, tags: ['github', 'remote', 'pull requests', 'portfolio'] },

  '1-17': { levelId: 1, day: 17, title: 'Terminal Basics', subtitle: 'Command line fundamentals', difficulty: 'Beginner', estimatedTime: '2 hours', xp: 100, isBoss: false, concept: { simple: 'The terminal is the power tool of developers. Instead of clicking, you type commands. It\'s faster, more powerful, and necessary for running servers, using Git, and deploying applications.', technical: 'The command line interface (CLI) provides direct access to the operating system. Essential for: running Node.js scripts, managing packages with npm, Git operations, server management, deployment. Key tools: bash/zsh (Unix), PowerShell (Windows), fish.', interview: '"Are you comfortable with the command line?" → "Yes — I use it daily for Git, npm, running servers, and navigating the filesystem. I\'m also familiar with basic shell scripting."' }, learn: { points: ['pwd: print working directory (where am I?)', 'ls (Mac/Linux) / dir (Windows): list files', 'cd folder: change directory', 'cd ..: go up one level', 'mkdir: create a folder', 'touch file.txt (Mac/Linux): create a file', 'rm file: delete a file (careful!)', 'cat file: display file contents', 'node file.js: run a JavaScript file', 'npm install: install dependencies'], codeExample: `# Navigate to your project\ncd ~/Desktop/edinburgh-quest\n\n# See what's here\nls -la\n\n# Create a new folder\nmkdir src\n\n# Create a file\ntouch src/app.js\n\n# Show file contents\ncat src/app.js\n\n# Run a JS file with Node\nnode src/app.js\n\n# Install a package\nnpm install express`, visual: '~ (home) → Desktop → edinburgh-quest → src → app.js' }, tryIt: { title: 'Navigation challenge', instruction: 'Write the commands to: 1) Navigate to Desktop 2) Create folder "edinburgh-quest" 3) Go into it 4) Create "index.js" 5) Go back to Desktop.', starterCode: `# Your commands:\n# 1:\n# 2:\n# 3:\n# 4:\n# 5:`, expectedOutput: 'cd ~/Desktop\nmkdir edinburgh-quest\ncd edinburgh-quest\ntouch index.js\ncd ..' }, build: { title: 'Project setup script', description: 'Write a series of terminal commands that would set up a new Node.js project from scratch: folder, git init, npm init, create index.js, first commit.', starterCode: `# Project Setup Commands\n# Replace [project-name] with your actual project name\n\n# 1. Navigate to where you want the project\n\n# 2. Create and enter project folder\n\n# 3. Initialize Git\n\n# 4. Initialize npm (creates package.json)\n\n# 5. Create entry file\n\n# 6. Stage and commit`, hints: ['npm init -y: creates package.json without interactive prompts (the -y accepts all defaults)', 'git init should come before your first commit', 'The order matters: create files before staging them'], solution: `cd ~/Desktop\nmkdir my-project && cd my-project\ngit init\nnpm init -y\ntouch index.js\ngit add .\ngit commit -m "Initial project setup"` }, quiz: [{ id: 'q1', question: 'What does pwd do?', options: ['Delete the current directory', 'Print the current directory path', 'Create a new password', 'Show all running processes'], correct: 1, explanation: 'pwd = Print Working Directory. It shows your current location in the file system. Essential when you\'re lost.' }, { id: 'q2', question: 'How do you go up one directory level?', options: ['cd up', 'cd ..', 'cd /', 'cd back'], correct: 1, explanation: 'cd .. moves up one level. cd ../.. moves up two levels. cd ~ goes to the home directory.' }, { id: 'q3', question: 'What does npm install do?', options: ['Creates a new npm account', 'Downloads and installs the packages listed in package.json', 'Uploads your code to npm', 'Updates Node.js'], correct: 1, explanation: 'npm install reads package.json and downloads all listed dependencies into the node_modules folder. Run this after cloning a project.' }, { id: 'q4', question: 'What command runs a JavaScript file with Node.js?', options: ['run index.js', 'execute index.js', 'node index.js', 'js index.js'], correct: 2, explanation: 'node filename.js runs the file using the Node.js JavaScript runtime. This is how you run backend code, scripts, and tests.' }],
    reflect: { prompt: 'How does being comfortable with the terminal change what you can do as a developer? What would be harder without it?' }, tags: ['terminal', 'cli', 'bash', 'npm', 'node'] },

  '1-18': { levelId: 1, day: 18, title: 'Files and Folders', subtitle: 'Project structure matters', difficulty: 'Beginner', estimatedTime: '2 hours', xp: 100, isBoss: false, concept: { simple: 'A good project folder structure is like a clean desk — everything has a place. Messy structure makes code hard to find, maintain, and share.', technical: 'Modern projects follow conventions: src/ for source code, public/ for static assets, tests/ for test files. Node.js projects have package.json (metadata + dependencies), package-lock.json (exact dependency tree), node_modules/ (don\'t commit this). .gitignore prevents certain files from being tracked.', interview: '"Walk me through how you would structure a new Node.js project." → "I\'d have src/ with routes/, controllers/, services/, models/ subdirectories, a .env for environment variables, .gitignore including node_modules and .env, and a README."' }, learn: { points: ['Organize by feature or by type — pick one and be consistent', 'node_modules/ should ALWAYS be in .gitignore', '.env (environment variables) should NEVER be committed', '.gitignore: list patterns of files to exclude from Git', 'package.json: your project\'s identity and dependency list', 'Relative imports: ./utils, ../config — relative to current file', 'Absolute imports are cleaner in large projects'], codeExample: `# Good Node.js project structure:\nedinburgh-quest/\n├── src/\n│   ├── routes/\n│   │   └── missions.js\n│   ├── controllers/\n│   │   └── missionController.js\n│   ├── models/\n│   │   └── Mission.js\n│   └── app.js\n├── tests/\n│   └── missions.test.js\n├── .env              # ← NEVER commit\n├── .env.example      # ← safe to commit\n├── .gitignore\n├── package.json\n└── README.md`, visual: 'Root\n├── src/ (your code)\n├── tests/\n├── .gitignore\n└── package.json' }, tryIt: { title: 'Design a project structure', instruction: 'Draw (in text) the ideal folder structure for a full-stack "AI Interview Platform" with a React frontend and Node/Express backend.', starterCode: `# ai-interview-platform/\n# Your structure here...`, expectedOutput: 'A clear client/ and server/ separation with appropriate subdirectories.' }, build: { title: 'Create a .gitignore', description: 'Write a comprehensive .gitignore file for a Node.js + React project. Include: node_modules, env files, build outputs, OS files, editor config.', starterCode: `# .gitignore\n\n# Dependencies\n\n# Environment files\n\n# Build outputs\n\n# OS files\n\n# Editor`, hints: ['node_modules/ should always be first and most important', '.env* catches .env, .env.local, .env.production etc.', 'Build outputs: build/, dist/', 'OS: .DS_Store (Mac), Thumbs.db (Windows)'], solution: `# Dependencies\nnode_modules/\n\n# Environment files\n.env\n.env.local\n.env.*\n!.env.example\n\n# Build outputs\nbuild/\ndist/\n.next/\n\n# OS generated files\n.DS_Store\nThumbs.db\n\n# Editor config\n.vscode/\n*.swp\n*.swo` }, quiz: [{ id: 'q1', question: 'Why should node_modules/ never be committed to Git?', options: ['It\'s too large and can be regenerated with npm install from package.json', 'It contains secret keys', 'Git cannot handle folders', 'npm requires it to stay local'], correct: 0, explanation: 'node_modules can contain hundreds of megabytes. It can always be recreated with npm install. Committing it bloats your repository and causes merge conflicts.' }, { id: 'q2', question: 'What file lists all of your project\'s dependencies?', options: ['index.js', 'README.md', 'package.json', '.env'], correct: 2, explanation: 'package.json contains your project name, version, scripts, and dependency list (dependencies, devDependencies). It\'s essential for collaboration.' }, { id: 'q3', question: 'Why should .env files never be committed?', options: ['They\'re too large', 'They contain secrets like API keys and database passwords that must not be public', 'Git can\'t read them', 'They slow down the build'], correct: 1, explanation: 'Environment files hold secrets: database URLs, API keys, JWT secrets. Committing them exposes credentials publicly — a serious security breach.' }, { id: 'q4', question: 'What is .env.example used for?', options: ['A backup of .env', 'A template showing which variables are needed, without the actual values — safe to commit', 'The production environment config', 'Auto-generated by npm'], correct: 1, explanation: '.env.example shows teammates what environment variables the project needs (e.g., DATABASE_URL=your_database_url_here) without exposing actual values.' }],
    reflect: { prompt: 'How does good project structure affect a team of 5 developers working on the same codebase?' }, tags: ['project structure', '.gitignore', 'package.json', 'node_modules'] },

  '1-19': { levelId: 1, day: 19, title: 'How Websites Work', subtitle: 'The full picture', difficulty: 'Beginner', estimatedTime: '2 hours', xp: 100, isBoss: false, concept: { simple: 'When you type "google.com" and press Enter, a complex series of events happens in milliseconds. Understanding this process makes you a better developer — you know where things can go wrong and how to optimize them.', technical: 'DNS resolution converts domain name → IP. TCP handshake establishes connection. Browser sends HTTP request. Server processes (possibly querying database, running code). Server sends HTTP response. Browser parses HTML, loads CSS/JS, renders DOM, executes scripts.', interview: '"What happens when you type a URL in the browser?" → This is one of the most famous interview questions. Covering: DNS, TCP/IP, HTTP request, server processing, response, browser rendering demonstrates end-to-end understanding.' }, learn: { points: ['DNS: Domain Name System — translates "google.com" to an IP address like 142.250.80.46', 'IP address: the actual numerical address of a server', 'TCP: Transmission Control Protocol — reliable data delivery', 'HTTP request: the browser\'s ask (GET /home HTTP/1.1)', 'HTTP response: the server\'s answer (200 OK, with HTML)', 'Parsing: browser reads HTML → builds DOM, reads CSS → styles, reads JS → executes', 'Rendering: browser draws the visual page from the DOM'], codeExample: `// The request-response cycle, simplified:\n\n// 1. Browser resolves DNS\n//    "edinburghquest.com" → "123.45.67.89"\n\n// 2. Browser sends HTTP request\nGET / HTTP/1.1\nHost: edinburghquest.com\n\n// 3. Server responds\nHTTP/1.1 200 OK\nContent-Type: text/html\n\n<html>...<html>\n\n// 4. Browser parses and renders\n// HTML → DOM tree\n// CSS → CSSOM\n// DOM + CSSOM → Render tree → Paint`, visual: 'You → DNS → IP → TCP → HTTP Request → Server → DB → Response → Browser → Render' }, tryIt: { title: 'Trace a request', instruction: 'Describe in 5 steps what happens when you open edinburghquest.com for the first time.', starterCode: `// Step 1: DNS resolution — ...\n// Step 2: TCP connection — ...\n// Step 3: HTTP request — ...\n// Step 4: Server response — ...\n// Step 5: Browser rendering — ...`, expectedOutput: 'A clear 5-step description of the request lifecycle.' }, build: { title: 'Draw the architecture', description: 'Draw (in ASCII/text) the complete architecture of a web application that shows: browser, CDN, load balancer, web server, application server, database.', starterCode: `Browser\n  ↓\n  ???`, hints: ['Think about what each layer does and why it exists.', 'CDN serves static assets (images, CSS) closer to the user.', 'Load balancer distributes traffic across multiple servers.'], solution: `Browser\n  ↓ HTTP request\nCDN (static assets: images, CSS, JS)\n  ↓ dynamic requests\nLoad Balancer\n  ↓ routes to\nWeb Server (nginx/Apache)\n  ↓\nApplication Server (Node.js)\n  ↓ query\nDatabase (PostgreSQL)` }, quiz: [{ id: 'q1', question: 'What does DNS do?', options: ['Encrypts web traffic', 'Converts domain names to IP addresses', 'Manages SSL certificates', 'Stores website content'], correct: 1, explanation: 'DNS (Domain Name System) is like a phone book for the internet. It translates human-readable names (google.com) into machine-readable IP addresses (142.250.80.46).' }, { id: 'q2', question: 'What is an HTTP response code of 404?', options: ['Success', 'Server Error', 'Not Found', 'Redirect'], correct: 2, explanation: '404 Not Found: the requested resource does not exist. 200 = OK. 301/302 = Redirect. 500 = Server Error. 401 = Unauthorized. 403 = Forbidden.' }, { id: 'q3', question: 'What does the browser do with HTML after receiving it?', options: ['Displays the raw text directly', 'Parses it into a DOM tree and renders the visual page', 'Sends it to the server for processing', 'Compresses it'], correct: 1, explanation: 'The browser parses HTML into a Document Object Model (DOM) — a tree of elements. It then combines this with CSS (CSSOM) to produce the render tree and paint the visual page.' }, { id: 'q4', question: 'Why does HTTPS matter?', options: ['It is faster than HTTP', 'It encrypts data in transit — prevents interception of sensitive information', 'It is required for all websites by law', 'It stores data longer'], correct: 1, explanation: 'HTTPS uses TLS to encrypt communication between browser and server. Without it, sensitive data (passwords, payment info) can be intercepted by anyone on the network.' }],
    reflect: { prompt: 'As a developer, which part of this request-response cycle will you be responsible for building?' }, tags: ['networking', 'DNS', 'HTTP', 'browser', 'rendering'] },

  '1-20': { levelId: 1, day: 20, title: 'Client and Server', subtitle: 'Frontend vs Backend', difficulty: 'Beginner', estimatedTime: '2 hours', xp: 100, isBoss: false, concept: { simple: 'A restaurant has two sides: the front-of-house (customer experience) and the kitchen (where food is made). Web apps work the same way: the client is what users see; the server is where data is processed and stored.', technical: 'Client (frontend): runs in the browser. HTML/CSS/JS. React, Vue, Angular. Handles UI, user interaction, display logic. Server (backend): runs on a remote machine. Node.js, Python, Java. Handles business logic, database queries, authentication, security. Communication via HTTP/HTTPS using APIs.', interview: '"What is the difference between client-side and server-side rendering?" → "Client-side rendering (CSR): browser downloads a minimal HTML + JS bundle, JS builds the page dynamically. Faster after initial load. Server-side rendering (SSR): server generates full HTML for each request. Better for SEO and initial page load."' }, learn: { points: ['Client runs in the browser (React, Vue, plain JS)', 'Server runs on a machine you control (Node.js, Python)', 'API: the contract between client and server', 'Sensitive logic/data ALWAYS lives on the server', 'Never trust client-side input — always validate on the server', 'State: some lives on client (UI), some on server (database)', 'REST: the most common API design pattern'], codeExample: `// CLIENT SIDE (runs in browser)\nconst response = await fetch('/api/missions');\nconst missions = await response.json();\ndisplayMissions(missions); // updates the UI\n\n// ─────────────────────────────────\n\n// SERVER SIDE (runs on Node.js)\napp.get('/api/missions', async (req, res) => {\n  const missions = await db.query('SELECT * FROM missions');\n  res.json(missions); // sends data to client\n});`, visual: '[Browser] ←→ HTTP/HTTPS ←→ [Server] ←→ [Database]' }, tryIt: { title: 'Classify responsibilities', instruction: 'For each feature, decide: Client or Server? 1) Show a dropdown menu 2) Check if a password is correct 3) Store a new user in the database 4) Animate a button 5) Validate email format.', starterCode: `// 1. Show a dropdown menu: C or S?\n// 2. Check password: C or S?\n// 3. Store new user: C or S?\n// 4. Animate a button: C or S?\n// 5. Validate email format: C or S?`, expectedOutput: 'Client\nServer\nServer\nClient\nBoth (client for UX, server for security)' }, build: { title: 'Design the Edinburgh Quest API', description: 'Design (not implement) the API endpoints for the Edinburgh Quest app. List: the URL, HTTP method, what it does, who calls it (client), and what it returns.', starterCode: `// Edinburgh Quest API Design\n// Format: METHOD /path — description — returns\n\n// Missions:\n// GET ...\n// POST ...\n\n// User:\n// ...\n\n// Progress:\n// ...`, hints: ['Think about what the frontend needs to display each screen.', 'GET for reading data, POST for creating, PUT/PATCH for updating, DELETE for removing.', 'Each resource (missions, users, progress) typically has its own set of endpoints.'], solution: `// GET  /api/missions         — all missions — [{id, day, title, ...}]\n// GET  /api/missions/:id     — one mission — {id, day, title, content...}\n// POST /api/progress         — mark mission complete — {success: true}\n// GET  /api/user/profile     — get player profile — {name, level, xp, streak}\n// PUT  /api/user/profile     — update settings — {success: true}\n// GET  /api/achievements     — all achievements — [{id, title, unlocked}]\n// POST /api/quiz/submit      — submit quiz answers — {score, feedback}` }, quiz: [{ id: 'q1', question: 'Where should password validation happen?', options: ['Client only', 'Server only', 'Both — client for UX speed, server for security (never trust client)', 'Neither — use a third-party service always'], correct: 2, explanation: 'Validate on both sides. Client-side for fast user feedback (UX). Server-side for security — client-side can always be bypassed. Never trust user input on the server.' }, { id: 'q2', question: 'What is an API?', options: ['A type of database', 'An interface through which client and server communicate — agreed-upon URLs and data formats', 'A CSS framework', 'A JavaScript testing tool'], correct: 1, explanation: 'API (Application Programming Interface): the contract between client and server. The client calls specific URLs (endpoints) with specific methods and receives structured data (usually JSON) in return.' }, { id: 'q3', question: 'Which data should NEVER be handled on the client side?', options: ['UI state (e.g. dropdown open/closed)', 'Database credentials and authentication secrets', 'Form input values', 'Animation states'], correct: 1, explanation: 'Any code running in the browser is accessible to users. Database passwords, API secret keys, and business-critical logic must stay on the server.' }, { id: 'q4', question: 'What does a REST API typically return?', options: ['HTML', 'JSON', 'XML only', 'Binary data'], correct: 1, explanation: 'Modern REST APIs return JSON (JavaScript Object Notation) — a lightweight, human-readable data format that both clients and servers can easily parse.' }],
    reflect: { prompt: 'When building the AI Interview Platform, what will be client-side vs server-side? Think through each feature.' }, tags: ['client', 'server', 'frontend', 'backend', 'API'] },

  '1-21': { levelId: 1, day: 21, title: 'HTTP Basics', subtitle: 'The language of the web', difficulty: 'Beginner', estimatedTime: '2 hours', xp: 100, isBoss: false, concept: { simple: 'HTTP is the language clients and servers use to talk to each other. It is a set of rules: how to ask for data (request), and how to respond (response). Every website interaction is an HTTP conversation.', technical: 'HTTP (HyperText Transfer Protocol) is a stateless request-response protocol. A request has: method (GET/POST/PUT/DELETE/PATCH), URL, headers, optional body. A response has: status code, headers, body. HTTPS adds TLS encryption.', interview: '"Explain the difference between GET and POST." → "GET retrieves data. Parameters are in the URL. Safe and idempotent. POST sends data to create a resource. Data is in the request body. Not idempotent — calling it twice creates two resources."' }, learn: { points: ['GET: retrieve data (no body sent)', 'POST: create a new resource (body contains data)', 'PUT/PATCH: update existing resource', 'DELETE: remove a resource', '200 OK: success', '201 Created: new resource created', '400 Bad Request: invalid input', '401 Unauthorized: not authenticated', '403 Forbidden: authenticated but not permitted', '404 Not Found', '500 Internal Server Error'], codeExample: `// GET request — retrieve missions\nfetch('/api/missions')\n  .then(res => res.json())\n  .then(data => console.log(data));\n\n// POST request — complete a mission\nfetch('/api/progress', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ missionId: 17, completed: true }),\n});\n\n// DELETE request\nfetch('/api/jobs/5', { method: 'DELETE' });`, visual: 'Request: Method + URL + Headers + Body\nResponse: Status Code + Headers + Body' }, tryIt: { title: 'HTTP status code quiz', instruction: 'Match each scenario to the correct HTTP status code: 200, 201, 400, 401, 404, 500.', starterCode: `// Scenario → Status Code:\n// 1. Successful login — \n// 2. New user registered — \n// 3. Invalid email format submitted — \n// 4. Page not found — \n// 5. Accessing admin page while logged out — \n// 6. Database crashed on the server — `, expectedOutput: '200\n201\n400\n404\n401\n500' }, build: { title: 'Build a fetch wrapper', description: 'Write a reusable api() function that wraps fetch, automatically adds JSON headers, parses the response, and throws readable errors for non-2xx status codes.', starterCode: `async function api(url, options = {}) {\n  // Set default headers\n  // Make the fetch call\n  // Check response.ok\n  // Parse and return JSON\n  // Handle errors\n}\n\n// Usage:\nconst missions = await api('/api/missions');\nconst result = await api('/api/progress', {\n  method: 'POST',\n  body: JSON.stringify({ missionId: 17 })\n});`, hints: ['response.ok is true for 2xx status codes.', 'For errors, throw new Error(`HTTP ${response.status}: ${response.statusText}`)', 'Default headers: { Content-Type: application/json }'], solution: `async function api(url, options = {}) {\n  const res = await fetch(url, {\n    headers: { 'Content-Type': 'application/json', ...options.headers },\n    ...options,\n  });\n  if (!res.ok) {\n    const err = await res.text();\n    throw new Error(\`HTTP \${res.status}: \${err}\`);\n  }\n  return res.json();\n}` }, quiz: [{ id: 'q1', question: 'Which HTTP method is used to retrieve data without modifying it?', options: ['POST', 'PUT', 'GET', 'DELETE'], correct: 2, explanation: 'GET is safe and idempotent — calling it multiple times has the same effect and does not modify data. Parameters go in the URL query string.' }, { id: 'q2', question: 'What does HTTP status 401 mean?', options: ['Not Found', 'Server Error', 'Unauthorized — not authenticated', 'Bad Request'], correct: 2, explanation: '401 Unauthorized means the user is not authenticated (not logged in). 403 Forbidden means authenticated but not permitted. 404 = resource not found.' }, { id: 'q3', question: 'Where does request data go in a POST request?', options: ['In the URL', 'In the request headers', 'In the request body', 'In a cookie'], correct: 2, explanation: 'POST data goes in the request body (typically as JSON). GET data goes in the URL query string. Sensitive data should always use body (POST), not URL parameters.' }, { id: 'q4', question: 'What does "stateless" mean in HTTP?', options: ['HTTP is slow', 'Each request is independent — the server does not remember previous requests', 'HTTP does not support files', 'HTTP cannot use HTTPS'], correct: 1, explanation: 'HTTP is stateless: each request is independent. The server doesn\'t remember the previous request. State is managed externally: cookies, sessions, JWTs, or client-side storage.' }],
    reflect: { prompt: 'How would you use HTTP methods differently when building the AI Interview Platform? Think about creating, updating, and deleting interview sessions.' }, tags: ['HTTP', 'methods', 'status codes', 'fetch'] },

  '1-22': { levelId: 1, day: 22, title: 'APIs', subtitle: 'Application Programming Interfaces', difficulty: 'Beginner', estimatedTime: '2 hours', xp: 100, isBoss: false, concept: { simple: 'An API is like a menu at a restaurant. You don\'t go into the kitchen and cook — you look at the menu, order what you want, and the kitchen prepares it and brings it back. APIs define what you can request and what you\'ll get back.', technical: 'REST (REpresentational State Transfer) is the most common API style. Resources are nouns (users, missions). HTTP methods are verbs (GET, POST). JSON is the data format. Endpoints are URLs (/api/missions/17). Authentication typically uses JWT tokens in Authorization headers.', interview: '"What is REST?" → "REST is an architectural style for APIs using HTTP. It treats resources as URLs, uses HTTP verbs for operations (GET/POST/PUT/DELETE), returns JSON, and is stateless — no session state on the server."' }, learn: { points: ['Endpoint: a specific URL that accepts requests (/api/missions)', 'Resource: a noun representing a thing (user, mission, job)', 'REST convention: plural nouns for collections (/missions, /users)', 'Query parameters: filter/sort (/missions?level=3&completed=false)', 'Path parameters: identify a specific resource (/missions/17)', 'Headers: metadata (Authorization, Content-Type)', 'JSON: the universal data format for APIs'], codeExample: `// REST API examples for Edinburgh Quest:\n\n// Get all missions for level 3:\nGET /api/missions?level=3\n\n// Get a specific mission:\nGET /api/missions/17\n\n// Create a new job tracker entry:\nPOST /api/jobs\nBody: { "company": "Skyscanner", "role": "Junior Dev", "status": "saved" }\n\n// Update job status:\nPATCH /api/jobs/3\nBody: { "status": "applied" }\n\n// With authentication:\nGET /api/user/profile\nHeaders: { "Authorization": "Bearer eyJhbGciOiJIUzI1..." }`, visual: 'Client → [GET /api/missions/17] → Server → [Query DB] → [{mission data}] → Client' }, tryIt: { title: 'Call a real API', instruction: 'Use the Fetch API to retrieve data from the public JSONPlaceholder API (https://jsonplaceholder.typicode.com/users/1) and log the user\'s name and email.', starterCode: `async function fetchUser() {\n  const response = await fetch('https://jsonplaceholder.typicode.com/users/1');\n  const user = await response.json();\n  console.log(user.name);\n  console.log(user.email);\n}\n\nfetchUser();`, expectedOutput: 'Leanne Graham\nSincere@april.biz' }, build: { title: 'API request builder', description: 'Build a function makeRequest(endpoint, method, body) that constructs and sends API requests with proper error handling, and logs the result.', starterCode: `async function makeRequest(endpoint, method = 'GET', body = null) {\n  // Build options object\n  // Make fetch call\n  // Handle errors\n  // Return data\n}`, hints: ['body should only be included for POST/PUT/PATCH — not GET/DELETE', 'Always JSON.stringify(body) before sending', 'Use response.ok to check for errors'], solution: `async function makeRequest(endpoint, method = 'GET', body = null) {\n  const options = {\n    method,\n    headers: { 'Content-Type': 'application/json' },\n  };\n  if (body) options.body = JSON.stringify(body);\n  const res = await fetch(endpoint, options);\n  if (!res.ok) throw new Error(\`API Error: \${res.status}\`);\n  return res.json();\n}` }, quiz: [{ id: 'q1', question: 'What does REST stand for?', options: ['Remote Execution System Technology', 'Representational State Transfer', 'Resource Endpoint Standard Transfer', 'Request-Response System Template'], correct: 1, explanation: 'REST = Representational State Transfer. An architectural style, not a protocol. It uses HTTP, JSON, stateless requests, and resource-based URLs.' }, { id: 'q2', question: 'What is the difference between /missions and /missions/17?', options: ['No difference', '/missions returns a collection; /missions/17 returns a specific resource', '/missions is GET; /missions/17 is POST', '/missions is backend; /missions/17 is frontend'], correct: 1, explanation: '/missions → collection endpoint (array of all missions). /missions/17 → individual resource endpoint (one specific mission with id=17). This is REST convention.' }, { id: 'q3', question: 'Where do authentication tokens usually go in API requests?', options: ['In the URL path', 'In the request body', 'In the Authorization header', 'In the query string'], correct: 2, explanation: 'JWT tokens typically go in the Authorization header: "Bearer <token>". Never put them in URLs (which are logged) or in a GET body.' }, { id: 'q4', question: 'What is a query parameter?', options: ['A SQL query in the URL', 'A parameter after "?" in a URL used to filter/sort — e.g. /missions?level=3', 'A function parameter', 'Part of the request body'], correct: 1, explanation: 'Query parameters appear after "?" and are key=value pairs: /missions?level=3&completed=false. Used for filtering, sorting, pagination. Not for sensitive data.' }],
    reflect: { prompt: 'Design the full API spec for the AI Interview Platform. What endpoints would it need?' }, tags: ['API', 'REST', 'endpoints', 'JSON', 'fetch'] },

  '1-23': { levelId: 1, day: 23, title: 'JSON', subtitle: 'The language of data exchange', difficulty: 'Beginner', estimatedTime: '2 hours', xp: 100, isBoss: false, concept: { simple: 'JSON is just a way of writing data so that any program can read it. It looks exactly like a JavaScript object — but it\'s a string that any language can parse.', technical: 'JSON (JavaScript Object Notation) is a lightweight text format for data exchange. Valid JSON: strings (double quotes only), numbers, booleans (true/false), null, objects {}, arrays []. JSON.stringify() converts JS → JSON string. JSON.parse() converts JSON string → JS object. It is language-agnostic.', interview: '"What is JSON and why is it used for APIs?" → "JSON is a text-based data format readable by virtually all programming languages. It\'s used for APIs because it\'s lightweight, human-readable, and trivially parsed in JavaScript."' }, learn: { points: ['JSON uses double quotes (not single) for string keys and values', 'JSON.stringify(): JS object → JSON string', 'JSON.parse(): JSON string → JS object', 'localStorage stores strings — JSON lets you store objects', 'API responses come as JSON text — always parse before using', 'JSON cannot contain: functions, undefined, circular references'], codeExample: `// JavaScript object\nconst player = {\n  name: "Shubhi",\n  level: 3,\n  skills: ["JS", "React"],\n  active: true\n};\n\n// Convert to JSON string\nconst jsonString = JSON.stringify(player);\n// '{"name":"Shubhi","level":3,"skills":["JS","React"],"active":true}'\n\n// Parse back to object\nconst parsed = JSON.parse(jsonString);\nconsole.log(parsed.name); // "Shubhi"\n\n// Pretty printing (useful for debugging)\nconsole.log(JSON.stringify(player, null, 2));\n\n// localStorage (browser) — must stringify/parse\nlocalStorage.setItem('player', JSON.stringify(player));\nconst stored = JSON.parse(localStorage.getItem('player'));`, visual: 'JS Object → JSON.stringify() → String → JSON.parse() → JS Object' }, tryIt: { title: 'Serialize and deserialize', instruction: 'Take the questState object, stringify it, log it as a string, then parse it back and access a property to prove it worked.', starterCode: `const questState = {\n  playerName: "Shubhi",\n  currentLevel: 3,\n  currentDay: 17,\n  xp: 4820,\n  streak: 12,\n  missionsCompleted: 77,\n};\n\n// Stringify it\n// Log the string\n// Parse it back\n// Log questState.playerName from the parsed version`, expectedOutput: '{"playerName":"Shubhi","currentLevel":3,"currentDay":17,"xp":4820,"streak":12,"missionsCompleted":77}\nShubhi' }, build: { title: 'localStorage state manager', description: 'Build saveState(state) and loadState() functions using localStorage and JSON. Include a resetState() function. Then demonstrate saving, loading, and resetting.', starterCode: `const KEY = 'edinburghQuestState';\n\nfunction saveState(state) {\n  // Store in localStorage\n}\n\nfunction loadState() {\n  // Load from localStorage, return null if not found\n}\n\nfunction resetState() {\n  // Clear from localStorage\n}\n\n// Test:\nconst defaultState = { level: 1, xp: 0, streak: 0 };\nsaveState(defaultState);\nconsole.log(loadState());\nresetState();\nconsole.log(loadState());`, hints: ['localStorage.setItem(key, value) — value must be a string', 'localStorage.getItem(key) returns null if not found', 'Use JSON.stringify to save and JSON.parse to load'], solution: `const KEY = 'edinburghQuestState';\nfunction saveState(state) { localStorage.setItem(KEY, JSON.stringify(state)); }\nfunction loadState() { const s = localStorage.getItem(KEY); return s ? JSON.parse(s) : null; }\nfunction resetState() { localStorage.removeItem(KEY); }` }, quiz: [{ id: 'q1', question: 'What does JSON.stringify() do?', options: ['Parses JSON text into a JS object', 'Converts a JS object into a JSON string', 'Validates if a string is valid JSON', 'Saves data to localStorage'], correct: 1, explanation: 'JSON.stringify(obj) converts a JavaScript object/array into a JSON-formatted string. Required before storing in localStorage or sending in an HTTP request body.' }, { id: 'q2', question: 'Which is valid JSON?', options: ['{ name: \'Shubhi\' }', '{ "name": "Shubhi" }', '{ "name": Shubhi }', '{ name: "Shubhi" }'], correct: 1, explanation: 'JSON requires double quotes for both keys and string values. Single quotes are invalid. Unquoted keys are invalid. This is unlike regular JS objects which allow unquoted keys.' }, { id: 'q3', question: 'What does localStorage.getItem() return if the key does not exist?', options: ['undefined', '0', 'false', 'null'], correct: 3, explanation: 'localStorage.getItem() returns null (not undefined) when the key doesn\'t exist. Always check for null before JSON.parse() to avoid errors.' }, { id: 'q4', question: 'Can you store a function in JSON?', options: ['Yes, as a string', 'Yes, if it is an arrow function', 'No — functions are silently dropped by JSON.stringify', 'Yes, with special syntax'], correct: 2, explanation: 'JSON cannot represent functions. JSON.stringify() silently omits properties with function values. JSON is purely a data format: strings, numbers, booleans, null, objects, arrays.' }],
    reflect: { prompt: 'How will JSON be central to the AI Interview Platform? Trace the data journey from client to server to database and back.' }, tags: ['JSON', 'localStorage', 'serialization', 'data exchange'] },

  '1-24': { levelId: 1, day: 24, title: 'Debugging Challenge', subtitle: 'Practice finding bugs systematically', difficulty: 'Intermediate', estimatedTime: '2.5 hours', xp: 100, isBoss: false, concept: { simple: 'Today is dedicated entirely to debugging practice. Being fast at debugging is a massive professional advantage. Most senior developers spend 30-50% of their time debugging.', technical: 'Systematic debugging: 1) Reproduce the bug. 2) Understand the expected vs actual behaviour. 3) Form a hypothesis. 4) Test the hypothesis (console.log, DevTools). 5) Fix. 6) Verify the fix didn\'t break anything else (regression test).', interview: '"Tell me about a bug that took you a long time to fix." → Shows persistence, analytical thinking, and debugging methodology.' }, learn: { points: ['Read the error message first — always', 'Find the exact line causing the error', 'Form a hypothesis before making changes', 'Change ONE thing at a time — otherwise you don\'t know what fixed it', 'console.log intermediate values to trace the problem', 'Rubber duck debugging: explain the code out loud', 'If stuck: take a break. Fresh eyes find bugs faster.'], codeExample: `// Debugging tools:\n\n// 1. console.log (fastest for simple cases)\nconsole.log("Before function call:", data);\nconst result = processData(data);\nconsole.log("After:", result);\n\n// 2. console.table (great for arrays/objects)\nconsole.table(missions);\n\n// 3. debugger keyword (pauses in DevTools)\nfunction processData(data) {\n  debugger; // Opens DevTools, pauses here\n  return data.map(item => item.xp);\n}\n\n// 4. console.error for error paths\nif (!user) {\n  console.error("User not found:", userId);\n}`, visual: 'Bug → Reproduce → Hypothesize → Test → Fix → Verify' }, tryIt: { title: 'Five bugs to find', instruction: 'Each snippet has exactly one bug. Find and fix all five.', starterCode: `// Bug 1: Should return the sum of an array\nfunction sum(arr) {\n  let total = 0;\n  for (let i = 0; i <= arr.length; i++) {\n    total += arr[i];\n  }\n  return total;\n}\n\n// Bug 2: Should capitalize first letter\nconst capitalize = str => str[0].toUppercase() + str.slice(1);\n\n// Bug 3: Should check if user is admin\nconst isAdmin = (user) => user.role = "admin";\n\n// Bug 4: Should double each number\nconst double = nums => nums.map(n => n * n);\n\n// Bug 5: Should get XP from level\nconst getXP = (level) => {\n  const xpMap = { 1: 100, 2: 110, 3: 120 };\n  return xpMap[level];\n};\nconsole.log(getXP("3")); // Should return 120`, expectedOutput: 'All five functions fixed and working.' }, build: { title: 'Debug the async flow', description: 'The following async function has multiple bugs. Find all of them and fix so it correctly fetches a mission, calculates XP, and returns a summary.', starterCode: `async function getMissionSummary(missionId) {\n  const response = fetch(\`/api/missions/\${missionId}\`);\n  if (response.status === 404) {\n    throw Error("Mission not found");\n  }\n  const mission = response.json();\n  const bonusXP = mission.isBoss = true ? 200 : 0;\n  const totalXP = mission.baseXP + bonusXP\n  return {\n    title: mission.Title,\n    xp: totalXP,\n    level: mission.levelId\n  };\n}`, hints: ['Count the missing awaits.', 'Check the comparison operator in the ternary.', 'Check the property name casing.', 'Missing semicolons are not errors in JS — but look for actual logic bugs.'], solution: `async function getMissionSummary(missionId) {\n  const response = await fetch(\`/api/missions/\${missionId}\`); // await\n  if (response.status === 404) throw new Error("Mission not found");\n  const mission = await response.json(); // await\n  const bonusXP = mission.isBoss === true ? 200 : 0; // === not =\n  const totalXP = mission.baseXP + bonusXP;\n  return { title: mission.title, xp: totalXP, level: mission.levelId }; // lowercase .title\n}` }, quiz: [{ id: 'q1', question: 'What is "rubber duck debugging"?', options: ['A debugging tool built into VS Code', 'Explaining your code line-by-line to an inanimate object — forces clear thinking and often reveals the bug', 'Running tests automatically', 'A type of unit test'], correct: 1, explanation: 'Explaining code out loud (to anyone or anything) forces you to think through each step carefully. This process often reveals the bug before you even finish explaining. Widely used by professionals.' }, { id: 'q2', question: 'Why should you change only ONE thing at a time when debugging?', options: ['It is a coding rule', 'Otherwise you cannot determine which change fixed (or caused) the problem', 'To save time', 'Modern IDEs require it'], correct: 1, explanation: 'If you make multiple changes simultaneously and the bug disappears, you don\'t know which change fixed it — or whether your "fix" is actually masking a deeper problem.' }, { id: 'q3', question: 'What does the debugger keyword do?', options: ['Runs all tests', 'Pauses execution at that point when DevTools is open', 'Removes console.logs', 'Compiles the code'], correct: 1, explanation: 'The debugger statement pauses JS execution at that point when the browser DevTools is open. You can then inspect variables, step through code, and examine the call stack.' }, { id: 'q4', question: 'What is a regression?', options: ['A type of machine learning model', 'A bug introduced by a fix — when fixing one thing breaks something else', 'A performance improvement', 'Reverting to a previous commit'], correct: 1, explanation: 'A regression is a previously working feature that broke due to a code change. After fixing a bug, always test surrounding functionality to ensure you haven\'t introduced regressions.' }],
    reflect: { prompt: 'What is your personal debugging process? Write it as a 5-step checklist you would follow.' }, tags: ['debugging', 'systematic', 'console', 'DevTools'] },

  '1-25': { levelId: 1, day: 25, title: 'Mini Project I', subtitle: 'Build a Quest Progress Calculator', difficulty: 'Intermediate', estimatedTime: '3 hours', xp: 100, isBoss: false, concept: { simple: 'Today you build your first mini-project combining everything you\'ve learned. This is not a tutorial you follow — it is your own creation from a brief.', technical: 'Application design: understand requirements, plan data structures, build functions, combine into a cohesive program. This is the gap between "I can do exercises" and "I can build things."', interview: '"Tell me about a project you built." → You will reference projects like this. The ability to build something from a brief, not just follow tutorials, is what matters.' }, learn: { points: [], codeExample: '', visual: '' }, tryIt: { title: '', instruction: '', starterCode: '', expectedOutput: '' }, build: { title: 'Quest Progress Calculator App', description: `Build a standalone JavaScript program that:

1. Defines LEVELS array (12 levels with name, daysPerLevel, xpPerDay)
2. Defines PLAYER object (name, currentLevel, currentDay, xp, streak)
3. Functions:
   - getProgressInLevel(player): percentage through current level
   - getTotalProgress(player): percentage through all 360 days
   - getXpToNextLevel(player): XP remaining in current level
   - getDaysToEdinburgh(player): total days remaining
   - getSkillLevel(player, skill): returns a rating 1-10 based on level
4. Print a complete, formatted player dashboard

This should feel like a real program, not a set of exercises.`, starterCode: `// Edinburgh Quest — Progress Calculator\n// Build your complete program here\n\nconst LEVELS = [\n  // Your 12 levels\n];\n\nconst PLAYER = {\n  name: "Shubhi",\n  currentLevel: 3,\n  currentDay: 17,\n  xp: 4820,\n  streak: 12,\n  completedMissions: 77,\n};\n\n// Your functions here\n\n// Print dashboard`, hints: ['Start with the data structures before writing functions.', 'Each function should do ONE thing — don\'t put all logic in one function.', 'Test each function individually before combining into the dashboard.'], solution: '// See the complete solution after your attempt.' }, quiz: [{ id: 'q1', question: 'Before writing code for a new project, what should you do first?', options: ['Open a new file and start typing', 'Understand requirements, plan data structures, sketch the solution', 'Install dependencies', 'Set up GitHub'], correct: 1, explanation: 'Planning before coding saves enormous time. Understand inputs, outputs, and data structures first. Jumping straight to code on a complex problem often leads to refactoring everything.' }],
    reflect: { prompt: 'What was hard about building this without a tutorial? What do you now understand better from the process of building?' }, tags: ['project', 'application', 'planning'] },

  '1-26': { levelId: 1, day: 26, title: 'Mini Project Improvement', subtitle: 'Refactor and enhance', difficulty: 'Intermediate', estimatedTime: '2.5 hours', xp: 100, isBoss: false, concept: { simple: 'Good developers don\'t just ship code that works — they go back, improve it, make it cleaner, add features. Today you improve yesterday\'s project.', technical: 'Code review mindset: readability, edge cases, performance, error handling, code reuse (DRY). Refactoring: improving code structure without changing behaviour.', interview: '"How do you approach improving existing code?" → "I first understand the current behaviour, then identify: readability issues, repeated code, missing error handling, edge cases, and potential performance improvements. I make changes incrementally, testing after each."' }, learn: { points: [], codeExample: '', visual: '' }, tryIt: { title: '', instruction: '', starterCode: '', expectedOutput: '' }, build: { title: 'Improve your Progress Calculator', description: `Enhance yesterday's project with:
1. Error handling (what if currentDay > 30? what if level > 12?)
2. A generateReport() function that produces a multi-line formatted text report
3. A simulateJourney(player, days) function that simulates completing N days and returns the updated player
4. Edge case: what happens when the player reaches Day 30? Auto level-up.
5. Add a weeklyBossXP bonus (200 extra XP on days 7, 14, 21, 28)`, starterCode: `// Import or paste your Day 25 solution here\n// Then enhance it:\n\nfunction generateReport(player) {\n  // Your complete formatted report\n}\n\nfunction simulateJourney(player, days) {\n  // Simulate completing 'days' missions\n  // Handle level-ups\n  // Return the final player state\n}\n\n// Test:\nconst finalState = simulateJourney(PLAYER, 15);\nconsole.log(generateReport(finalState));`, hints: ['simulateJourney should loop day by day, calling completeDay each iteration.', 'At day 7, 14, 21, 28 — add 200 bonus XP.', 'If currentDay > 30, reset to 1 and increment level.'], solution: '// Your improved version.' }, quiz: [{ id: 'q1', question: 'What is refactoring?', options: ['Rewriting code from scratch in a new language', 'Improving code structure and readability without changing its behaviour', 'Adding new features to code', 'Fixing bugs'], correct: 1, explanation: 'Refactoring improves the internal structure without changing external behaviour. Examples: extracting functions, renaming variables, removing duplication. Tests ensure behaviour is preserved.' }],
    reflect: { prompt: 'What did improving yesterday\'s project teach you? What would you do differently if you started it today?' }, tags: ['refactoring', 'code quality', 'improvement'] },

  '1-27': { levelId: 1, day: 27, title: 'Code Review', subtitle: 'Reading and critiquing code', difficulty: 'Intermediate', estimatedTime: '2 hours', xp: 100, isBoss: false, concept: { simple: 'Code review is reading someone else\'s (or your own) code to find problems, suggest improvements, and ensure quality. In professional teams, no code reaches production without a review.', technical: 'Code review checks: correctness, readability, security, performance, tests, adherence to conventions. Good PR description: what changed, why, how to test it. Review comments should be respectful and constructive, not personal.', interview: '"How do you conduct a code review?" → "I first understand the intent of the change. I check for correctness, edge cases, readability, security issues (especially for auth/input handling), and whether tests cover the new behaviour. I leave specific, constructive comments."' }, learn: { points: [], codeExample: `// Code review example:\n\n// ❌ Before review:\nfunction x(a, b) {\n  let r = 0;\n  for (let i = 0; i < a.length; i++) {\n    if (a[i].type == b) r += a[i].xp;\n  }\n  return r;\n}\n\n// ✅ After review (with feedback applied):\nfunction sumXPByType(missions, targetType) {\n  return missions\n    .filter(m => m.type === targetType) // strict equality\n    .reduce((total, m) => total + m.xp, 0);\n}`, visual: 'Code → Review → Feedback → Improve → Merge' }, tryIt: { title: 'Review this code', instruction: 'Read the code snippet and list all issues you can find (naming, logic, security, readability).', starterCode: `// Review this function and list all problems:\nfunction login(u, p) {\n  if (u == "admin" && p == "password123") {\n    return true;\n  }\n  return false;\n}`, expectedOutput: '1. Hardcoded credentials\n2. Loose equality (==)\n3. Poor variable names (u, p)\n4. No error handling\n5. Passwords should be hashed, never plain text' }, build: { title: 'Write a code review comment', description: 'Review the provided Edinburgh Quest function and write 3 constructive review comments pointing out issues and suggesting improvements.', starterCode: `// The function to review:\nasync function saveProgress(userId, day, score) {\n  if (score > 50) {\n    db.query("INSERT INTO progress VALUES (" + userId + ", " + day + ", " + score + ")");\n    return true;\n  }\n}`, hints: ['Look for SQL injection vulnerability.', 'What happens when score <= 50? The function returns undefined implicitly.', 'Is await missing?'], solution: `// Review Comments:\n// 1. 🚨 CRITICAL: SQL injection vulnerability. Never concatenate user input into SQL strings.\n//    Use parameterized queries: db.query("INSERT INTO progress VALUES ($1, $2, $3)", [userId, day, score])\n// 2. Missing await — db.query is likely async. Without await, the insert may not complete before the function returns.\n// 3. Inconsistent return — the function returns true when score > 50, but undefined when score <= 50.\n//    This inconsistency can cause subtle bugs for callers who check the return value.` }, quiz: [{ id: 'q1', question: 'What is SQL injection?', options: ['A way to speed up database queries', 'Inserting malicious SQL code through user input to manipulate the database', 'A database optimization technique', 'A type of database join'], correct: 1, explanation: 'SQL injection is a critical security vulnerability. If user input is directly concatenated into SQL queries, attackers can insert SQL code that manipulates the database. Always use parameterized queries.' }, { id: 'q2', question: 'What makes a good code review comment?', options: ['Personal and critical ("this code is terrible")', 'Specific, constructive, and explains the why ("this pattern causes X problem, here\'s an alternative")', 'Only positive feedback', 'As brief as possible — one word'], correct: 1, explanation: 'Good review comments are specific (reference the exact line), constructive (suggest how to improve), and explain the reason (why it\'s an issue). Reviews are about code, never about the person.' }],
    reflect: { prompt: 'What would you add to a code review checklist for the AI Interview Platform?' }, tags: ['code review', 'quality', 'security', 'SQL injection'] },

  '1-28': { levelId: 1, day: 28, title: 'Revision Day', subtitle: 'Consolidating Level 01 knowledge', difficulty: 'Beginner', estimatedTime: '2 hours', xp: 100, isBoss: false, concept: { simple: 'Today is revision. Not learning new things — going back and making sure what you\'ve learned is solid. Competence requires repetition.', technical: 'Spaced repetition: reviewing material at increasing intervals improves long-term retention dramatically. Active recall (testing yourself) is more effective than re-reading. The review queue shows your weak concepts — prioritise those.', interview: 'Review day builds the foundations that let you confidently answer interview questions. It is not optional.' }, learn: { points: [], codeExample: '', visual: '' }, tryIt: { title: 'Self-assessment', instruction: 'Without looking at your notes, answer: What is a closure? What is the event loop? What is a promise? What is Big O? What is REST?', starterCode: `// Write your answers here:\n// Closure: \n// Event loop:\n// Promise:\n// Big O:\n// REST:`, expectedOutput: 'Your honest self-assessment of understanding each concept.' }, build: { title: 'Teach the concepts', description: 'Pick the 3 concepts you are least confident about from Level 01. Write a simple explanation of each AS IF explaining to a friend who has never programmed before. Then write a code example for each.', starterCode: `// Concept 1: [Name]\n// Simple explanation:\n// Code example:\n\n// Concept 2: [Name]\n// Simple explanation:\n// Code example:\n\n// Concept 3: [Name]\n// Simple explanation:\n// Code example:`, hints: ['Teaching is the best test of understanding. If you cannot explain it simply, you don\'t understand it well enough yet.', 'Use the 3-layer method: Simple → Technical → Interview.', 'Consult previous mission content for the technical definition.'], solution: '// Your explanations.' }, quiz: [{ id: 'q1', question: 'What is active recall?', options: ['Reading notes multiple times', 'Testing yourself on material from memory — more effective than re-reading', 'Highlighting textbooks', 'Watching video tutorials again'], correct: 1, explanation: 'Active recall (testing yourself without looking at notes) is one of the most evidence-based learning techniques. It forces your brain to retrieve information, strengthening the memory.' }],
    reflect: { prompt: 'Which concepts from Level 01 are you most confident about? Which are you least confident about? What is your plan to strengthen the weak ones?' }, tags: ['revision', 'review', 'consolidation'] },

  '1-29': { levelId: 1, day: 29, title: 'Final Practice', subtitle: 'Pre-boss preparation', difficulty: 'Intermediate', estimatedTime: '2.5 hours', xp: 100, isBoss: false, concept: { simple: 'Tomorrow is the Level Boss. Today is your preparation day. Like an athlete\'s final training session before a competition — sharpen what you know, identify gaps, build confidence.', technical: 'Deliberate practice: focus practice on your weak areas, not comfortable areas. This is uncomfortable but produces the fastest improvement.', interview: 'Boss day simulates an interview scenario. Preparation = reading notes + practicing coding + practicing explaining concepts aloud.' }, learn: { points: [], codeExample: '', visual: '' }, tryIt: { title: 'Boss prep challenge', instruction: 'Code these WITHOUT looking at your notes: 1) FizzBuzz 2) Reverse a string 3) Find the largest in an array 4) Check if palindrome 5) Sum array using reduce.', starterCode: `// 1. FizzBuzz (1-20)\n\n// 2. reverseString("Edinburgh")\n\n// 3. findLargest([3,1,9,4,7])\n\n// 4. isPalindrome("racecar")\n\n// 5. sum([1,2,3,4,5]) using reduce`, expectedOutput: 'All 5 working correctly.' }, build: { title: 'Concept explanation practice', description: 'Practice explaining these 5 concepts aloud (speak or write) without notes: variables, loops, functions, arrays, APIs. Time yourself — aim for 2 minutes per concept.', starterCode: `// Script your explanations here:\n// 1. Variables: ...\n// 2. Loops: ...\n// 3. Functions: ...\n// 4. Arrays: ...\n// 5. APIs: ...`, hints: ['Use the Simple → Technical → Interview structure.', 'For each: what is it, when do you use it, code example.', 'The ability to explain clearly is as important as the ability to code.'], solution: '// Your explanations.' }, quiz: [{ id: 'q1', question: 'What is the most common mistake in technical interviews?', options: ['Writing incorrect code', 'Starting to code immediately without understanding the problem', 'Using the wrong language', 'Being too confident'], correct: 1, explanation: 'The most common mistake is jumping straight to code before fully understanding the problem. Always clarify, discuss your approach, and confirm you\'re solving the right problem before writing a line of code.' }],
    reflect: { prompt: 'How prepared do you feel for tomorrow\'s boss? Honestly rate yourself 1-10 on each topic from Level 01.' }, tags: ['preparation', 'practice', 'review'] },

  '1-30': {
    levelId: 1, day: 30, title: 'LEVEL BOSS',
    subtitle: 'The Awakening — Final Challenge',
    difficulty: 'Boss', estimatedTime: '4 hours', xp: 500,
    isBoss: true, bossType: 'level',
    bossDescription: 'Three parts: Knowledge Test + Practical Challenge + Reflection. Complete all three to unlock Level 02.',
    bossIntro: `You have reached the end of Level 01. 30 days ago, you began with "What is programming?" Today you know: variables, data types, conditions, loops, functions, arrays, objects, strings, debugging, problem solving, Git, GitHub, terminal, project structure, HTTP, APIs, JSON, and complexity basics.\n\nThis boss has three parts. Complete all three.`,
    knowledgeTest: {
      title: 'Part 1: Knowledge Test (20 questions)',
      questions: [
        { id: 'k1', q: 'What keyword creates a block-scoped variable that CANNOT be reassigned?', options: ['let', 'var', 'const', 'static'], correct: 2, explanation: 'const creates a block-scoped constant. The reference cannot be reassigned after declaration.' },
        { id: 'k2', q: 'What does typeof null return?', options: ['"null"', '"undefined"', '"object"', '"boolean"'], correct: 2, explanation: 'typeof null === "object" is a famous JavaScript quirk / historical bug. Use === null to check for null.' },
        { id: 'k3', q: 'What will [1,2,3].map(n => n * 2) return?', options: ['[2,4,6]', '12', '[1,2,3]', 'Error'], correct: 0, explanation: 'map transforms each element. n*2 doubles each: [2,4,6]. Returns a new array.' },
        { id: 'k4', q: 'What is the time complexity of accessing an object property by key?', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'], correct: 2, explanation: 'Object/hash map property access is O(1) — constant time, regardless of how many properties the object has.' },
        { id: 'k5', q: 'What does git commit do?', options: ['Uploads to GitHub', 'Saves a snapshot of staged changes to the local repository', 'Stages files', 'Merges branches'], correct: 1, explanation: 'git commit saves staged changes as a permanent snapshot locally. It does NOT push to GitHub.' },
        { id: 'k6', q: 'What HTTP method creates a new resource?', options: ['GET', 'DELETE', 'PUT', 'POST'], correct: 3, explanation: 'POST creates a new resource. GET retrieves. PUT/PATCH update. DELETE removes.' },
        { id: 'k7', q: 'What does JSON.parse() do?', options: ['Converts object to string', 'Converts JSON string to JS object', 'Validates JSON syntax', 'Stringifies an array'], correct: 1, explanation: 'JSON.parse() converts a JSON-formatted string into a JavaScript object. JSON.stringify() does the reverse.' },
        { id: 'k8', q: 'Which array method does NOT modify the original array?', options: ['push', 'pop', 'splice', 'map'], correct: 3, explanation: 'map returns a new array. push, pop, splice mutate the original. Knowing which methods mutate is crucial.' },
        { id: 'k9', q: 'What is a REST API?', options: ['A database management system', 'A web architecture using HTTP, resource-based URLs, and JSON', 'A JavaScript framework', 'An HTML template system'], correct: 1, explanation: 'REST (Representational State Transfer) is an architectural style: resource URLs, HTTP methods, JSON responses, stateless requests.' },
        { id: 'k10', q: 'What is the difference between == and ===?', options: ['No difference', '=== checks type and value; == only checks value (with coercion)', '== is for objects; === is for primitives', '=== checks reference; == checks value'], correct: 1, explanation: '"5" == 5 is true (coercion). "5" === 5 is false (different types). Always use === to avoid subtle type-coercion bugs.' },
      ],
    },
    practicalChallenge: {
      title: 'Part 2: Build the Quest Engine',
      description: `Build a complete Quest Engine in JavaScript that:

1. Stores 3 levels of data (name, days, xpPerDay)
2. Tracks player state (name, currentLevel, currentDay, xp, streak, completedMissions)
3. Implements:
   - completeDay(player): adds XP, increments day, handles level-up (day 30→ next level)
   - completeBossDay(player): adds 500 bonus XP, unlocks next level
   - getPlayerCard(player): returns a formatted multi-line profile string
   - analyzeWeakness(quizScores): returns { passed: [], failed: [], avgScore }
4. Simulates: 
   - Complete Days 1-30 of Level 1
   - Apply a boss day bonus
   - Print the final player card

Your code should handle edge cases and be clean, readable, and well-named.`,
      starterCode: `// Edinburgh Quest Engine\n// Build your complete solution here\n`,
    },
    reflection: {
      title: 'Part 3: Reflection',
      prompts: [
        'What can you do now that you could not do 30 days ago?',
        'Which concept from Level 01 was most difficult? Did you fully understand it by the end?',
        'What project idea excites you most from the upcoming levels?',
        'What does "Edinburgh Ready" mean to you personally?',
      ],
    },
    quiz: [],
    reflect: { prompt: 'Congratulations on completing Level 01. What is one thing you want to do differently in Level 02?' },
    tags: ['boss', 'level', 'review', 'final'],
  },

  // ══════════════════════════════════════════════
  // LEVELS 02–12 — STUBS (day titles only)
  // ══════════════════════════════════════════════
  ...generateStubs(2, [
    'JavaScript Deep Dive', 'Variables & Scope', 'Functions & Closures', 'Arrays & Methods', 'Objects & Prototypes',
    'Destructuring & Spread', 'Weekly Boss I', 'DOM Fundamentals', 'Events & Listeners', 'Async JavaScript',
    'Promises', 'Async/Await', 'Error Handling', 'Weekly Boss II', 'ES6 Modules', 'Map & Set',
    'Regular Expressions', 'Closures Deep Dive', 'The Event Loop', 'this Keyword',
    'Array Advanced Methods', 'String Advanced Methods', 'Object Advanced', 'Debugging JS Apps',
    'Mini Project: JS App', 'Improve JS App', 'Code Review', 'Revision Day', 'Final Practice', 'LEVEL BOSS',
  ]),

  ...generateStubs(3, [
    'HTML Foundations', 'Semantic HTML', 'CSS Fundamentals', 'Box Model & Layout', 'Flexbox',
    'CSS Grid', 'Responsive Design', 'Weekly Boss I', 'Accessibility', 'React Introduction',
    'Components & Props', 'State & useState', 'useEffect', 'Forms in React', 'Weekly Boss II',
    'React Router', 'Context API', 'Custom Hooks', 'API Integration in React', 'Loading & Error States',
    'CSS Animations', 'Performance Basics', 'Testing React', 'Debugging React', 'Project: React Dashboard',
    'Dashboard: Improve', 'Code Review', 'Revision Day', 'Final Practice', 'LEVEL BOSS',
  ]),

  ...generateStubs(4, [
    'Node.js Architecture', 'Express Setup', 'Routes & Methods', 'Middleware', 'Controllers',
    'Services Layer', 'Weekly Boss I', 'Request Validation', 'Error Handling Middleware', 'Authentication Intro',
    'JWT Tokens', 'Protected Routes', 'Password Hashing', 'Weekly Boss II', 'File Uploads',
    'Environment Variables', 'API Security', 'Rate Limiting', 'Logging', 'API Documentation (Swagger)',
    'Postman Testing', 'API Versioning', 'Debugging Node', 'Performance', 'Project: REST API',
    'API Improvement', 'Code Review', 'Revision Day', 'Final Practice', 'LEVEL BOSS',
  ]),

  ...generateStubs(5, [
    'Relational Databases', 'Tables & Columns', 'Data Types in SQL', 'Primary Keys', 'Foreign Keys',
    'CRUD Operations', 'Weekly Boss I', 'SELECT Queries', 'WHERE & Filtering', 'JOINs',
    'INNER vs OUTER JOIN', 'GROUP BY & Aggregates', 'Subqueries', 'Weekly Boss II', 'Indexes',
    'Transactions', 'Normalization', 'Database Design', 'PostgreSQL Setup', 'pg (Node Library)',
    'Migrations', 'Seeding Data', 'Debugging Queries', 'Performance', 'Project: Database Design',
    'Refine Schema', 'Code Review', 'Revision Day', 'Final Practice', 'LEVEL BOSS',
  ]),

  ...generateStubs(6, [
    'Full-Stack Architecture', 'Project Setup', 'API + React Connection', 'Authentication Flow', 'JWT Frontend',
    'Protected Routes React', 'Weekly Boss I', 'Database Integration', 'CRUD Full Stack', 'File Uploads Full Stack',
    'Search & Filter', 'Pagination', 'Error Handling Full Stack', 'Weekly Boss II', 'AI Interview Platform v1',
    'Dashboard', 'Interview Creation', 'Question Management', 'Answer Submission', 'Results View',
    'Polish & Styling', 'Testing', 'Deployment Prep', 'Code Review', 'Project: Full-Stack App',
    'App Improvement', 'Portfolio README', 'Revision Day', 'Final Practice', 'LEVEL BOSS',
  ]),

  ...generateStubs(7, [
    'Arrays & Strings', 'Two Pointers', 'Sliding Window', 'Hashing & Frequency', 'Prefix Sums',
    'Stack & Queue', 'Weekly Boss I', 'Linked Lists', 'Binary Search', 'Binary Search Variants',
    'Trees Intro', 'Tree Traversal', 'BST', 'Weekly Boss II', 'Heaps & Priority Queue',
    'Graphs Intro', 'BFS', 'DFS', 'Recursion', 'Backtracking',
    'Dynamic Programming Intro', 'DP Patterns', 'Greedy Algorithms', 'Advanced Practice', 'Mock Interview I',
    'Mock Interview II', 'Pattern Review', 'Revision Day', 'Final Practice', 'LEVEL BOSS',
  ]),

  ...generateStubs(8, [
    'Git Advanced', 'Branching Strategy', 'Pull Requests', 'Code Review Practice', 'Unit Testing Intro',
    'Jest Setup', 'Weekly Boss I', 'Test Driven Development', 'Integration Tests', 'Mocking',
    'Postman Advanced', 'API Testing', 'Debugging Production', 'Weekly Boss II', 'Logging',
    'Environment Management', 'Linux Basics', 'Docker Intro', 'Dockerfile', 'Docker Compose',
    'Security Basics', 'AI Platform: Tests', 'AI Platform: Docker', 'AI Platform: Validation', 'CI/CD Intro',
    'GitHub Actions', 'Code Review', 'Revision Day', 'Final Practice', 'LEVEL BOSS',
  ]),

  ...generateStubs(9, [
    'Deployment Concepts', 'Linux Commands', 'SSH & Remote Servers', 'AWS Account Setup', 'IAM & Security',
    'EC2 Basics', 'Weekly Boss I', 'Configuring EC2', 'NGINX Setup', 'Domain & DNS',
    'SSL Certificates', 'S3 Basics', 'RDS Setup', 'Weekly Boss II', 'Environment on AWS',
    'Deploy Node API', 'Deploy React App', 'GitHub Actions CI/CD', 'Monitoring', 'Alerts',
    'Database Backups', 'AI Platform: Deploy v1', 'Load Testing', 'Cost Management', 'Project: Live App',
    'Production Monitoring', 'Code Review', 'Revision Day', 'Final Practice', 'LEVEL BOSS',
  ]),

  ...generateStubs(10, [
    'AI Landscape', 'LLM Fundamentals', 'OpenAI API Setup', 'Prompt Engineering', 'System Prompts',
    'Structured Outputs', 'Weekly Boss I', 'Embeddings', 'Vector Databases', 'Semantic Search',
    'RAG Architecture', 'AI Interview Platform: AI Questions', 'AI Evaluation', 'Weekly Boss II', 'Tool Calling',
    'AI Agents Intro', 'Resume Analysis', 'JD Analysis', 'AI Feedback System', 'AI Safety Basics',
    'Cost Management', 'AI Platform: Complete', 'AI Platform: Deploy', 'AI Testing', 'Project: AI App',
    'Project Polish', 'Code Review', 'Revision Day', 'Final Practice', 'LEVEL BOSS',
  ]),

  ...generateStubs(11, [
    'Blockchain Fundamentals', 'Ethereum Architecture', 'Wallets & Keys', 'Transactions', 'Gas & Fees',
    'Solidity Intro', 'Weekly Boss I', 'Data Types in Solidity', 'Functions & Modifiers', 'Events',
    'Mappings & Arrays', 'Inheritance', 'Interfaces', 'Weekly Boss II', 'Ethers.js Setup',
    'Connect Wallet', 'Read Contract', 'Write Contract', 'Contract Testing', 'Security Patterns',
    'Common Vulnerabilities', 'Deploy to Testnet', 'Verify Contract', 'Project: DApp', 'Project Polish',
    'Web3 Portfolio', 'Code Review', 'Revision Day', 'Final Practice', 'LEVEL BOSS',
  ]),

  ...generateStubs(12, [
    'Portfolio Strategy', 'GitHub Portfolio Audit', 'README Mastery', 'Project Documentation', 'Live Demos',
    'Technical Resume', 'Weekly Boss I', 'Resume Bullets (STAR)', 'Skills Section', 'LinkedIn Headline',
    'LinkedIn About', 'LinkedIn Projects', 'Networking Strategy', 'Weekly Boss II', 'DSA Interview Prep',
    'JavaScript Interview Prep', 'React Interview Prep', 'Node Interview Prep', 'SQL Interview Prep', 'System Design Basics',
    'Behavioral Interviews', 'Edinburgh Companies', 'UK Tech Ecosystem', 'Visa & Sponsorship Research', 'Job Tracker Setup',
    'Application Strategy', 'Code Review', 'Revision Day', 'Final Practice', '🏴 EDINBURGH READY',
  ]),
};

function generateStubs(levelId, dayTitles) {
  const result = {};
  dayTitles.forEach((title, i) => {
    const day = i + 1;
    const key = `${levelId}-${day}`;
    const isBoss = day === 30 || (levelId >= 2 && (day === 7 || day === 14 || day === 21 || day === 28));
    result[key] = {
      levelId, day, title,
      subtitle: 'Content coming soon — this level is being built.',
      difficulty: isBoss ? 'Boss' : 'Intermediate',
      estimatedTime: isBoss ? '3-4 hours' : '2 hours',
      xp: isBoss ? (day === 30 ? 500 : 200) : 110 + levelId * 10,
      isBoss,
      bossType: day === 30 ? 'level' : 'weekly',
      isStub: true,
      concept: {
        simple: `This mission covers: ${title}. Full content will be unlocked as the platform expands.`,
        technical: `Deep dive into ${title} with code examples, exercises, and quizzes.`,
        interview: `Interview preparation for ${title}.`,
      },
      learn: { points: [`Today's focus: ${title}`], codeExample: '// Content coming soon', visual: '' },
      tryIt: { title: 'Exercise', instruction: `Complete the ${title} exercises.`, starterCode: '// Your code here', expectedOutput: 'Correct output' },
      build: { title: `Build: ${title}`, description: `Apply your ${title} knowledge to build a real project component.`, starterCode: '// Your code here', hints: ['Think about the problem before coding.', 'Break it into smaller parts.', 'Test incrementally.'], solution: '// Solution available after attempt.' },
      quiz: [
        { id: 'q1', question: `What is the core concept of ${title}?`, options: ['Option A', 'Option B', 'Option C', 'Option D'], correct: 0, explanation: 'Full quiz content coming soon.' },
      ],
      reflect: { prompt: `What did you learn about ${title} today? How will you apply it?` },
      tags: [title.toLowerCase().replace(/\s+/g, '-')],
    };
  });
  return result;
}

export const getMission = (levelId, day) => MISSIONS[`${levelId}-${day}`];
export const getLevelMissions = (levelId) => {
  const result = [];
  for (let d = 1; d <= 30; d++) {
    const m = MISSIONS[`${levelId}-${d}`];
    if (m) result.push(m);
  }
  return result;
};
