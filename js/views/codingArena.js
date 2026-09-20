// Edinburgh Quest — Coding Arena View
import { CHALLENGES, getChallengesByCategory, getChallengeById } from '../data/challenges.js';
import { getState, markChallengeSolved } from '../state.js';

const CATEGORIES = [
  { id: 'all', label: '🎯 All', color: 'var(--primary)' },
  { id: 'javascript', label: '⚡ JavaScript', color: '#f6e05e' },
  { id: 'dsa', label: '⚔️ DSA', color: '#9f7aea' },
  { id: 'sql', label: '🗄️ SQL', color: '#68d391' },
  { id: 'debugging', label: '🐛 Debugging', color: '#fc8181' },
];

let currentChallenge = null;
let hintsRevealed = 0;

export function renderCodingArena(params) {
  const state = getState();
  const challengeId = params?.[0];

  if (challengeId) {
    const challenge = getChallengeById(challengeId);
    if (challenge) { renderChallengeDetail(challenge, state); return; }
  }

  const category = params?.[0] || 'all';
  renderChallengeList(category, state);
}

function renderChallengeList(activeCategory, state) {
  const challenges = activeCategory === 'all' ? CHALLENGES : getChallengesByCategory(activeCategory);
  const container = document.getElementById('view-container');

  container.innerHTML = `
    <div class="coding-arena">
      <div class="arena-header">
        <h1>⚔️ Coding Arena</h1>
        <p>Practice coding challenges. Personal progression — not a leaderboard.</p>
        <div class="arena-stats">
          <span class="arena-stat">Solved: <strong>${Object.keys(state.solvedChallenges).length}/${CHALLENGES.length}</strong></span>
          <span class="arena-stat">DSA Problems: <strong>${state.dsaProblems}</strong></span>
        </div>
      </div>

      <!-- CATEGORY FILTER -->
      <div class="category-tabs">
        ${CATEGORIES.map(cat => `
          <button class="cat-tab ${cat.id === activeCategory ? 'cat-active' : ''}"
            onclick="window.location.hash='coding-arena/${cat.id}'"
            style="${cat.id === activeCategory ? `border-color:${cat.color}; color:${cat.color}` : ''}">
            ${cat.label}
          </button>
        `).join('')}
      </div>

      <!-- CHALLENGE GRID -->
      <div class="challenge-grid">
        ${challenges.map(c => renderChallengeCard(c, state)).join('')}
      </div>
    </div>
  `;
}

function renderChallengeCard(challenge, state) {
  const solved = state.solvedChallenges[challenge.id];
  const diffClass = `diff-${challenge.difficulty}`;
  const catConfig = CATEGORIES.find(c => c.id === challenge.category) || CATEGORIES[0];

  return `
    <div class="challenge-card glass-card ${solved ? 'solved' : ''}"
         onclick="window.location.hash='coding-arena/challenge/${challenge.id}'"
         style="cursor:pointer">
      <div class="challenge-card-header">
        <span class="challenge-cat" style="color:${catConfig.color}">${catConfig.label}</span>
        <span class="challenge-xp">+${challenge.xp} XP</span>
      </div>
      <h3 class="challenge-title">${challenge.title}</h3>
      <p class="challenge-desc">${challenge.description.substring(0, 80)}${challenge.description.length > 80 ? '...' : ''}</p>
      <div class="challenge-footer">
        <span class="diff-badge ${diffClass}">${challenge.difficulty}</span>
        ${challenge.pattern ? `<span class="pattern-badge">Pattern: ${challenge.pattern}</span>` : ''}
        ${challenge.tags?.map(t => `<span class="tag-badge">${t}</span>`).join('') || ''}
      </div>
      <div class="challenge-status">
        ${solved ? '<span class="status-solved">✅ Solved</span>' : '<span class="status-unsolved">→ Attempt</span>'}
      </div>
    </div>
  `;
}

function renderChallengeDetail(challenge, state) {
  const solved = state.solvedChallenges[challenge.id];
  hintsRevealed = 0;
  currentChallenge = challenge;

  const container = document.getElementById('view-container');
  container.innerHTML = `
    <div class="challenge-detail">
      <div class="challenge-detail-header glass-card">
        <button class="btn-back" onclick="window.location.hash='coding-arena'">← Back to Arena</button>
        <div class="cd-meta">
          <span class="diff-badge diff-${challenge.difficulty}">${challenge.difficulty}</span>
          <span class="xp-badge">+${challenge.xp} XP</span>
          ${solved ? '<span class="solved-badge">✅ Solved</span>' : ''}
        </div>
        <h1>${challenge.title}</h1>
        ${challenge.pattern ? `<span class="pattern-label">Pattern: <strong>${challenge.pattern}</strong></span>` : ''}
      </div>

      <div class="challenge-layout">
        <!-- PROBLEM DESCRIPTION -->
        <div class="challenge-problem glass-card">
          <h3>📋 Problem</h3>
          <p class="problem-desc">${challenge.description}</p>
          ${challenge.testCases?.length > 0 ? `
          <div class="test-cases">
            <h4>Examples:</h4>
            ${challenge.testCases.map(tc => `
              <div class="test-case">
                <span class="tc-label">Input:</span><code>${JSON.stringify(tc.input)}</code>
                <span class="tc-label">Expected:</span><code>${JSON.stringify(tc.expected)}</code>
              </div>`).join('')}
          </div>
          ` : ''}

          <!-- HINTS -->
          <div class="hint-system">
            <div class="hints-header">
              <h4>💡 Hints</h4>
              <span id="arena-hints-used">${hintsRevealed}/${challenge.hints.length}</span>
            </div>
            ${challenge.hints.map((h, i) => `
              <div class="hint-item" id="arena-hint-${i}" data-revealed="false">
                <button class="btn btn-ghost btn-sm" onclick="revealArenaHint(${i})">
                  Reveal Hint ${i + 1}
                </button>
              </div>
            `).join('')}
          </div>

          <!-- SOLUTION -->
          <div class="solution-section">
            <button class="btn btn-ghost btn-sm" onclick="toggleArenaSOlution()">👁️ Show Solution</button>
            <div id="arena-solution" style="display:none">
              <div class="solution-warning">Study the solution only after a genuine attempt.</div>
              <pre class="code-block"><code>${escHtml(challenge.solution)}</code></pre>
            </div>
          </div>
        </div>

        <!-- CODE EDITOR -->
        <div class="challenge-editor glass-card">
          <div class="editor-toolbar">
            <span class="editor-lang">${challenge.category === 'sql' ? 'SQL' : 'JavaScript'}</span>
            <button class="btn btn-ghost btn-sm" onclick="resetArenaEditor()">↺ Reset</button>
          </div>
          <textarea class="code-editor code-editor-arena" id="arena-editor" spellcheck="false">${challenge.starterCode}</textarea>
          <div class="editor-actions">
            <button class="btn btn-primary" onclick="runArenaCode()">▶ Run</button>
            ${!solved ? `<button class="btn btn-success" onclick="markArenaSolved('${challenge.id}')">✅ Mark as Solved</button>` : ''}
          </div>
          <div class="output-panel" id="arena-output" style="display:none">
            <div class="output-label">Output:</div>
            <pre class="output-text" id="arena-output-text"></pre>
          </div>
        </div>
      </div>
    </div>
  `;
}

window.revealArenaHint = function(index) {
  if (!currentChallenge) return;
  const el = document.getElementById(`arena-hint-${index}`);
  const hint = currentChallenge.hints[index];
  el.dataset.revealed = 'true';
  el.innerHTML = `<span class="hint-number">💡 Hint ${index + 1}</span><p>${hint}</p>`;
  el.className = 'hint-item revealed';
  hintsRevealed = Math.max(hintsRevealed, index + 1);
  const label = document.getElementById('arena-hints-used');
  if (label) label.textContent = `${hintsRevealed}/${currentChallenge.hints.length}`;
};

window.toggleArenaSOlution = function() {
  const el = document.getElementById('arena-solution');
  if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
};

window.resetArenaEditor = function() {
  if (currentChallenge) {
    const el = document.getElementById('arena-editor');
    if (el) el.value = currentChallenge.starterCode;
  }
};

window.runArenaCode = function() {
  const code = document.getElementById('arena-editor')?.value || '';
  const outputPanel = document.getElementById('arena-output');
  const outputText = document.getElementById('arena-output-text');
  outputPanel.style.display = 'block';

  const logs = [];
  const orig = console.log;
  console.log = (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
  try {
    // eslint-disable-next-line no-new-func
    new Function(code)();
    outputText.innerHTML = logs.length ? escHtml(logs.join('\n')) : '<span style="color:var(--text-muted)">No output</span>';
    outputText.style.color = 'var(--success)';
  } catch (e) {
    outputText.innerHTML = `<span style="color:var(--danger)">❌ ${escHtml(e.message)}</span>`;
  } finally {
    console.log = orig;
  }
};

window.markArenaSolved = function(challengeId) {
  markChallengeSolved(challengeId, hintsRevealed);
  const btn = document.querySelector('.challenge-detail .btn-success');
  if (btn) {
    btn.textContent = '✅ Solved!';
    btn.disabled = true;
    btn.className = 'btn btn-ghost btn-sm';
  }
  window.dispatchEvent(new CustomEvent('show-toast', { detail: { msg: '+XP earned! Challenge solved!', type: 'success' } }));
};

function escHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
