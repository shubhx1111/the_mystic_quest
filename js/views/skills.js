// Edinburgh Quest — Skills View
import { getState, recalcSkills } from '../state.js';
import { LEVELS } from '../data/levels.js';

const SKILL_CONFIG = [
  { key: 'coding', label: 'Coding', icon: '💻', color: '#63b3ed', desc: 'General programming ability — syntax, logic, debugging, code quality.' },
  { key: 'csFundamentals', label: 'CS Fundamentals', icon: '🧠', color: '#9f7aea', desc: 'How computers work: memory, algorithms, complexity, data structures.' },
  { key: 'dsa', label: 'DSA', icon: '⚔️', color: '#f6e05e', desc: 'Data structures & algorithms — the language of technical interviews.' },
  { key: 'fullStack', label: 'Full Stack', icon: '🌐', color: '#68d391', desc: 'Frontend + backend + database. Building complete, working applications.' },
  { key: 'cloud', label: 'Cloud', icon: '☁️', color: '#90cdf4', desc: 'Deployment, infrastructure, AWS, CI/CD. Making apps live.' },
  { key: 'ai', label: 'AI Engineering', icon: '🤖', color: '#b794f4', desc: 'Practical AI: prompts, APIs, embeddings, RAG, agents.' },
  { key: 'web3', label: 'Web3', icon: '⛓️', color: '#f687b3', desc: 'Blockchain, Solidity, smart contracts. A specialisation layer.' },
  { key: 'career', label: 'Career Readiness', icon: '🎯', color: '#fbd38d', desc: 'Portfolio, resume, LinkedIn, interview prep, job search strategy.' },
];

export function renderSkills() {
  const state = getState();
  const skills = recalcSkills();

  const totalMissions = state.missionsCompleted;
  const hoursLearning = Math.round(totalMissions * 2); // avg 2h per mission
  const quizAccuracy = computeQuizAccuracy(state);

  const container = document.getElementById('view-container');
  container.innerHTML = `
    <div class="skills-view">
      <div class="skills-header">
        <h1>🧠 Skill Stats</h1>
        <p class="skills-disclaimer">
          These bars reflect missions completed — they are <strong>progress indicators</strong>,
          not measures of actual professional competence.
          <em>Completion ≠ mastery.</em>
        </p>
      </div>

      <!-- LEARNING ANALYTICS -->
      <div class="analytics-grid">
        <div class="analytic-card glass-card">
          <div class="analytic-icon">⏱</div>
          <div class="analytic-value">${hoursLearning}h</div>
          <div class="analytic-label">Learning Hours</div>
        </div>
        <div class="analytic-card glass-card">
          <div class="analytic-icon">📋</div>
          <div class="analytic-value">${totalMissions}</div>
          <div class="analytic-label">Missions Done</div>
        </div>
        <div class="analytic-card glass-card">
          <div class="analytic-icon">⚔️</div>
          <div class="analytic-value">${state.dsaProblems}</div>
          <div class="analytic-label">DSA Problems</div>
        </div>
        <div class="analytic-card glass-card">
          <div class="analytic-icon">📊</div>
          <div class="analytic-value">${quizAccuracy}%</div>
          <div class="analytic-label">Quiz Accuracy</div>
        </div>
        <div class="analytic-card glass-card">
          <div class="analytic-icon">🚀</div>
          <div class="analytic-value">${state.projectsCompleted || 0}</div>
          <div class="analytic-label">Projects Done</div>
        </div>
        <div class="analytic-card glass-card">
          <div class="analytic-icon">📅</div>
          <div class="analytic-value">${state.consistencyRate}%</div>
          <div class="analytic-label">Consistency</div>
        </div>
      </div>

      <!-- SKILL BARS DETAILED -->
      <section class="glass-card skill-detail-section">
        <h2>Skill Progression</h2>
        <div class="skill-detail-grid">
          ${SKILL_CONFIG.map(s => renderSkillDetail(s, skills[s.key] || 0, state)).join('')}
        </div>
      </section>

      <!-- WEAK CONCEPTS -->
      ${state.reviewQueue.length > 0 ? `
      <section class="glass-card weak-concepts">
        <h2>⚠️ Concepts Needing Review</h2>
        <p>Based on quiz scores below 70%:</p>
        <div class="weak-list">
          ${state.reviewQueue.map(key => {
            const [lvl, day] = key.split('-');
            return `<div class="weak-item">
              <span class="weak-tag">⚠️</span>
              <span>Level ${lvl}, Day ${day}</span>
              <button class="btn btn-ghost btn-xs" onclick="window.location.hash='mission/${lvl}/${day}'">
                Revise →
              </button>
            </div>`;
          }).join('')}
        </div>
      </section>
      ` : `
      <section class="glass-card weak-concepts">
        <h2>✅ No Weak Concepts</h2>
        <p>All attempted quizzes scored 70%+. Keep it up!</p>
      </section>
      `}

      <!-- LEVEL ROADMAP SKILLS -->
      <section class="glass-card skills-roadmap">
        <h2>Skills by Level</h2>
        <div class="roadmap-grid">
          ${LEVELS.map(l => `
            <div class="roadmap-level ${state.currentLevel === l.id ? 'roadmap-current' : state.currentLevel > l.id ? 'roadmap-done' : 'roadmap-locked'}">
              <span class="roadmap-icon">${l.icon}</span>
              <div class="roadmap-info">
                <div class="roadmap-number">L${l.number}</div>
                <div class="roadmap-name">${l.title}</div>
                <div class="roadmap-gains">
                  ${Object.entries(l.skillsGained || {}).map(([k, v]) => {
                    const sc = SKILL_CONFIG.find(s => s.key === k);
                    return sc ? `<span style="color:${sc.color}">+${v} ${sc.icon}</span>` : '';
                  }).join(' ')}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    </div>
  `;

  // Animate skill bars
  setTimeout(() => {
    document.querySelectorAll('.skill-fill-animated').forEach(el => {
      const target = el.dataset.width;
      el.style.width = target + '%';
    });
  }, 100);
}

function renderSkillDetail(skillConfig, value, state) {
  const blocks = 10;
  const filled = Math.round(value / 10);

  return `
    <div class="skill-detail-card glass-card-inner">
      <div class="sdc-header">
        <span class="sdc-icon">${skillConfig.icon}</span>
        <div class="sdc-info">
          <h3 style="color:${skillConfig.color}">${skillConfig.label}</h3>
          <p class="sdc-desc">${skillConfig.desc}</p>
        </div>
        <span class="sdc-value">${value}/100</span>
      </div>
      <div class="sdc-bar-track">
        <div class="sdc-bar-fill skill-fill-animated"
          data-width="${value}"
          style="background: linear-gradient(90deg, ${skillConfig.color}88, ${skillConfig.color}); width: 0%">
        </div>
      </div>
      <div class="sdc-blocks">
        ${Array.from({length: blocks}, (_, i) => `
          <div class="sdc-block ${i < filled ? 'sdc-filled' : ''}"
               style="${i < filled ? `background:${skillConfig.color}` : ''}"></div>
        `).join('')}
      </div>
      <div class="sdc-level-label">${getSkillLabel(value)}</div>
    </div>
  `;
}

function getSkillLabel(value) {
  if (value === 0) return 'Not started';
  if (value < 20) return 'Beginner';
  if (value < 40) return 'Developing';
  if (value < 60) return 'Intermediate';
  if (value < 80) return 'Advanced';
  return 'Expert';
}

function computeQuizAccuracy(state) {
  const missions = Object.values(state.missionData || {});
  const withScores = missions.filter(m => m.quizScore !== undefined && m.quizScore !== null);
  if (!withScores.length) return 0;
  const avg = withScores.reduce((sum, m) => sum + m.quizScore, 0) / withScores.length;
  return Math.round(avg);
}
