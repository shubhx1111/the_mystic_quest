// Edinburgh Quest — State Manager
import { ACHIEVEMENTS } from './data/achievements.js';
import { LEVELS } from './data/levels.js';

const STATE_KEY = 'edinburghQuest_v1';

const DEFAULT_STATE = {
  // Profile
  playerName: 'Shubhi',
  joinedAt: new Date().toISOString(),

  // Progress
  currentLevel: 1,
  currentDay: 1,
  xp: 0,
  missionsCompleted: 0,

  // Streak
  currentStreak: 0,
  longestStreak: 0,
  lastActivityDate: null,

  // Skill stats (0-100)
  skills: {
    coding: 0,
    csFundamentals: 0,
    dsa: 0,
    fullStack: 0,
    cloud: 0,
    ai: 0,
    web3: 0,
    career: 0,
  },

  // Per-mission data
  missionData: {},
  // { '1-1': { completed: bool, quizScore: 0-100, attempts: 0, hintsUsed: 0, completedAt: ISO, isLowEnergy: bool } }

  // Review queue
  reviewQueue: [], // array of concept strings

  // Achievements
  unlockedAchievements: [],

  // Stats
  dsaProblems: 0,
  projectsStarted: 0,
  projectsCompleted: 0,
  debuggingChallenges: 0,
  perfectQuizzes: 0,
  highScoreQuizzes: 0,
  deployments: 0,
  smartContractDeployed: false,
  flagshipVersion: 0,
  resumeCompleted: false,
  mockInterviews: 0,
  jobsTracked: 0,
  miniQuests: 0,
  consistencyRate: 0,
  scheduledDays: 0,

  // Career
  jobTracker: [],
  resume: { experience: [], projects: [], education: [], skills: [], achievements: [] },

  // Coding Arena — solved challenges
  solvedChallenges: {},

  // Settings
  settings: {
    reminderEnabled: false,
    reminderTime: '19:00',
    notifications: true,
    theme: 'dark',
  },
};

let _state = null;

export function loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (raw) {
      _state = { ...DEFAULT_STATE, ...JSON.parse(raw) };
      // Deep merge skills
      _state.skills = { ...DEFAULT_STATE.skills, ..._state.skills };
      _state.settings = { ...DEFAULT_STATE.settings, ..._state.settings };
    } else {
      _state = { ...DEFAULT_STATE };
    }
  } catch {
    _state = { ...DEFAULT_STATE };
  }
  updateStreak();
  return _state;
}

export function getState() {
  if (!_state) loadState();
  return _state;
}

export function saveState() {
  localStorage.setItem(STATE_KEY, JSON.stringify(_state));
}

export function updateState(updates) {
  _state = { ..._state, ...updates };
  saveState();
  checkAchievements();
  return _state;
}

// ── Streak Logic ────────────────────────────────
function updateStreak() {
  const today = todayStr();
  const last = _state.lastActivityDate;
  if (!last) return;

  const diff = daysBetween(last, today);
  if (diff === 0) return; // same day, no change
  if (diff === 1) {
    // Active yesterday — streak continues (it will increment on mission complete)
  } else if (diff > 1) {
    // Missed days — reset streak
    _state.currentStreak = 0;
  }
}

export function recordActivity() {
  const today = todayStr();
  const last = _state.lastActivityDate;
  const diff = last ? daysBetween(last, today) : 1;

  if (diff === 1) {
    _state.currentStreak += 1;
  } else if (diff > 1) {
    _state.currentStreak = 1;
  }
  _state.longestStreak = Math.max(_state.longestStreak, _state.currentStreak);
  _state.lastActivityDate = today;
  _state.scheduledDays += 1;
  _state.consistencyRate = Math.round((_state.missionsCompleted / Math.max(_state.scheduledDays, 1)) * 100);
  saveState();
}

// ── Mission Progress ─────────────────────────────
export function completeMission(levelId, day, quizScore, isLowEnergy = false) {
  const key = `${levelId}-${day}`;
  const mission = _state.missionData[key] || {};

  if (!mission.completed) {
    _state.missionsCompleted += 1;
    addXP(isLowEnergy ? 30 : 100);
    if (isLowEnergy) _state.miniQuests += 1;
  }

  _state.missionData[key] = {
    ...mission,
    completed: !isLowEnergy,
    lowEnergy: isLowEnergy,
    quizScore: quizScore ?? mission.quizScore,
    completedAt: new Date().toISOString(),
    attempts: (mission.attempts || 0) + 1,
  };

  // Update review queue based on score
  if (quizScore < 70) {
    addToReviewQueue(key);
  } else {
    removeFromReviewQueue(key);
  }

  if (quizScore === 100) _state.perfectQuizzes += 1;
  if (quizScore >= 80) _state.highScoreQuizzes += 1;

  recordActivity();

  // Auto advance day
  const nextDay = day + 1;
  if (nextDay > 30 && !isLowEnergy) {
    // Level complete
    if (_state.currentLevel < 12) {
      _state.currentLevel += 1;
      _state.currentDay = 1;
      addXP(500); // level completion bonus
    }
  } else if (!isLowEnergy) {
    _state.currentDay = Math.max(_state.currentDay, nextDay);
  }

  saveState();
  checkAchievements();
}

export function addXP(amount) {
  _state.xp += amount;
  saveState();
}

// ── Review Queue ─────────────────────────────────
export function addToReviewQueue(concept) {
  if (!_state.reviewQueue.includes(concept)) {
    _state.reviewQueue.push(concept);
  }
}

export function removeFromReviewQueue(concept) {
  _state.reviewQueue = _state.reviewQueue.filter(c => c !== concept);
}

// ── Skills ───────────────────────────────────────
export function recalcSkills() {
  // Compute skill levels from missions completed in each area
  const s = { ...DEFAULT_STATE.skills };
  const completedLevels = _state.currentLevel - 1;

  LEVELS.forEach((lvl, i) => {
    if (i < completedLevels) {
      Object.entries(lvl.skillsGained || {}).forEach(([skill, val]) => {
        if (s[skill] !== undefined) s[skill] = Math.min(100, s[skill] + val);
      });
    } else if (i === completedLevels) {
      // Partial credit for current level
      const dayFrac = _state.currentDay / 30;
      Object.entries(lvl.skillsGained || {}).forEach(([skill, val]) => {
        if (s[skill] !== undefined) s[skill] = Math.min(100, s[skill] + Math.round(val * dayFrac));
      });
    }
  });

  _state.skills = s;
  saveState();
  return s;
}

// ── Achievements ─────────────────────────────────
function checkAchievements() {
  const state = _state;
  ACHIEVEMENTS.forEach(a => {
    if (!state.unlockedAchievements.includes(a.id)) {
      try {
        if (a.condition(state)) {
          state.unlockedAchievements.push(a.id);
          state.xp += a.xp;
          // Dispatch event for UI notification
          window.dispatchEvent(new CustomEvent('achievement-unlocked', { detail: a }));
        }
      } catch { /* condition access guard */ }
    }
  });
  saveState();
}

// ── Job Tracker ──────────────────────────────────
export function addJob(job) {
  const newJob = { id: Date.now(), ...job, addedAt: new Date().toISOString() };
  _state.jobTracker = [newJob, ..._state.jobTracker];
  _state.jobsTracked = _state.jobTracker.length;
  saveState();
  checkAchievements();
  return newJob;
}

export function updateJob(id, updates) {
  _state.jobTracker = _state.jobTracker.map(j => j.id === id ? { ...j, ...updates } : j);
  saveState();
}

export function deleteJob(id) {
  _state.jobTracker = _state.jobTracker.filter(j => j.id !== id);
  _state.jobsTracked = _state.jobTracker.length;
  saveState();
}

// ── Coding Arena ─────────────────────────────────
export function markChallengeSolved(challengeId, hintsUsed = 0) {
  _state.solvedChallenges[challengeId] = { solvedAt: new Date().toISOString(), hintsUsed };
  if (challengeId.startsWith('dsa_')) {
    _state.dsaProblems += 1;
  }
  if (challengeId.startsWith('debug_')) {
    _state.debuggingChallenges += 1;
  }
  addXP(50);
  saveState();
  checkAchievements();
}

// ── Helpers ───────────────────────────────────────
function todayStr() {
  return new Date().toISOString().split('T')[0];
}

function daysBetween(a, b) {
  const msPerDay = 86400000;
  return Math.floor((new Date(b) - new Date(a)) / msPerDay);
}

export function resetAllProgress() {
  _state = { ...DEFAULT_STATE, playerName: _state.playerName };
  saveState();
}

export function isMissionUnlocked(levelId, day) {
  if (levelId < _state.currentLevel) return true;
  if (levelId === _state.currentLevel && day <= _state.currentDay) return true;
  return false;
}

export function isMissionCompleted(levelId, day) {
  const d = _state.missionData[`${levelId}-${day}`];
  return d?.completed === true;
}

export function getMissionData(levelId, day) {
  return _state.missionData[`${levelId}-${day}`] || {};
}
