// Edinburgh Quest — Mission View (5-Step Flow)
import { getMission } from '../data/missions.js';
import { getState, completeMission, getMissionData, isMissionUnlocked } from '../state.js';
import { navigate } from '../router.js';
import { LEVELS } from '../data/levels.js';

let currentHintsRevealed = 0;
let quizAnswers = {};
let quizSubmitted = false;

export function renderMission(params) {
  const [levelId, dayStr, mode] = params;
  const levelNum = parseInt(levelId) || getState().currentLevel;
  const day = parseInt(dayStr) || getState().currentDay;
  const isLowEnergy = mode === 'low-energy';

  if (!isMissionUnlocked(levelNum, day)) {
    renderLockedMission(levelNum, day);
    return;
  }

  const mission = getMission(levelNum, day);
  if (!mission) { renderMissionError(); return; }

  const mData = getMissionData(levelNum, day);
  const level = LEVELS[levelNum - 1];

  currentHintsRevealed = 0;
  quizAnswers = {};
  quizSubmitted = false;

  const container = document.getElementById('view-container');
  container.innerHTML = `
    <div class="mission-view ${isLowEnergy ? 'low-energy-mode' : ''}">
      <!-- MISSION HEADER -->
      <div class="mission-header glass-card">
        <div class="mission-breadcrumb">
          <button class="btn-back" onclick="history.back()">← Back</button>
          <span class="mission-breadcrumb-path">${level.icon} Level ${level.number} · Day ${day}</span>
          <span class="difficulty-badge difficulty-${mission.difficulty.toLowerCase()}">${mission.difficulty}</span>
        </div>
        <h1 class="mission-title">${mission.isBoss ? `⚔️ ${mission.title}` : `Day ${day}: ${mission.title}`}</h1>
        <p class="mission-subtitle">${mission.subtitle}</p>
        <div class="mission-meta-row">
          <span class="meta-chip">⏱ ${mission.estimatedTime}</span>
          <span class="meta-chip">⚡ +${mission.xp} XP</span>
          ${isLowEnergy ? '<span class="meta-chip low-energy-chip">💤 Low-Energy Mode</span>' : ''}
          ${mData.completed ? '<span class="meta-chip completed-chip">✅ Completed</span>' : ''}
        </div>
        ${isLowEnergy ? `
          <div class="low-energy-banner">
            <span>💤 Low-Energy Mode: 20-minute condensed version. Tracked as a Mini Quest.</span>
          </div>
        ` : ''}
        <!-- STEP PROGRESS -->
        <div class="step-nav">
          ${['Learn', 'Try', 'Build', 'Quiz', 'Reflect'].map((step, i) => `
            <div class="step-nav-item" id="step-nav-${i}" data-step="${i}">
              <div class="step-dot"></div>
              <span>${step}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- STEP CONTENT -->
      <div class="mission-content" id="mission-steps">
        ${renderStep1(mission, isLowEnergy)}
      </div>

      <!-- STUCK BUTTON (always visible) -->
      <div class="stuck-bar">
        <button class="btn btn-stuck" id="stuck-btn" onclick="showStuckModal()">
          🆘 I'm Stuck
        </button>
      </div>
    </div>

    <!-- STUCK MODAL -->
    <div class="modal-overlay" id="stuck-modal" style="display:none">
      ${renderStuckModal(mission)}
    </div>
  `;

  activateStep(0);
  setupStepNavigation(mission, levelNum, day, isLowEnergy);
}

// ─── STEP 1: LEARN ───────────────────────────────────
function renderStep1(mission, isLowEnergy) {
  const c = mission.concept;
  const l = mission.learn;
  return `
    <div class="step-panel" id="step-0">
      <div class="step-header">
        <div class="step-number">STEP 1</div>
        <h2>📖 Learn</h2>
      </div>

      <!-- 3-Layer Concept -->
      <div class="concept-layers">
        <div class="concept-layer layer-simple active" id="layer-simple">
          <div class="layer-tab-row">
            <button class="layer-tab active-tab" onclick="switchLayer('simple')">🟢 Simple</button>
            <button class="layer-tab" onclick="switchLayer('technical')">🟡 Technical</button>
            <button class="layer-tab" onclick="switchLayer('interview')">🔴 Interview</button>
          </div>
          <div class="layer-content" id="layer-simple-content">
            <p class="concept-text">${c.simple}</p>
          </div>
          <div class="layer-content" id="layer-technical-content" style="display:none">
            <p class="concept-text technical">${c.technical}</p>
          </div>
          <div class="layer-content" id="layer-interview-content" style="display:none">
            <p class="concept-text interview">${c.interview}</p>
          </div>
        </div>
      </div>

      <!-- Key Points -->
      ${l.points && l.points.length > 0 ? `
      <div class="learn-points glass-card-inner">
        <h3>Key Points</h3>
        <ul class="key-points-list">
          ${l.points.map(p => `<li>${p}</li>`).join('')}
        </ul>
      </div>
      ` : ''}

      <!-- Code Example -->
      ${l.codeExample ? `
      <div class="code-example-block">
        <div class="code-block-header">
          <span class="code-label">Code Example</span>
          <button class="copy-btn" onclick="copyCode(this)">📋 Copy</button>
        </div>
        <pre class="code-block"><code>${escHtml(l.codeExample)}</code></pre>
      </div>
      ` : ''}

      <!-- Visual Mental Model -->
      ${l.visual ? `
      <div class="mental-model glass-card-inner">
        <h4>💡 Mental Model</h4>
        <pre class="visual-block">${l.visual}</pre>
      </div>
      ` : ''}

      <div class="step-footer">
        <button class="btn btn-primary" onclick="goToStep(1)">
          I understand → Try It ⚡
        </button>
      </div>
    </div>
  `;
}

// ─── STEP 2: TRY ─────────────────────────────────────
function renderStep2(mission) {
  const t = mission.tryIt;
  if (!t || !t.instruction) return '<div class="step-panel" id="step-1"><p>No exercise for this mission.</p></div>';
  return `
    <div class="step-panel" id="step-1">
      <div class="step-header">
        <div class="step-number">STEP 2</div>
        <h2>⚡ Try It</h2>
      </div>
      <h3>${t.title}</h3>
      <p class="instruction-text">${t.instruction}</p>
      <div class="code-editor-wrapper">
        <div class="editor-toolbar">
          <span class="editor-lang">JavaScript</span>
          <button class="btn btn-ghost btn-sm" onclick="resetTryEditor()">↺ Reset</button>
        </div>
        <textarea class="code-editor" id="try-editor" spellcheck="false">${t.starterCode || ''}</textarea>
        <div class="editor-actions">
          <button class="btn btn-primary" onclick="runTryCode()">▶ Run</button>
        </div>
      </div>
      <div class="output-panel" id="try-output" style="display:none">
        <div class="output-label">Output:</div>
        <pre class="output-text" id="try-output-text"></pre>
      </div>
      ${t.expectedOutput ? `
      <div class="expected-panel">
        <span class="expected-label">Expected Output:</span>
        <code>${escHtml(t.expectedOutput)}</code>
      </div>
      ` : ''}
      <div class="step-footer">
        <button class="btn btn-ghost" onclick="goToStep(0)">← Back</button>
        <button class="btn btn-primary" onclick="goToStep(2)">Ready to Build →</button>
      </div>
    </div>
  `;
}

// ─── STEP 3: BUILD ───────────────────────────────────
function renderStep3(mission) {
  const b = mission.build;
  if (!b) return '<div class="step-panel" id="step-2"><p>No build task.</p></div>';
  return `
    <div class="step-panel" id="step-2">
      <div class="step-header">
        <div class="step-number">STEP 3</div>
        <h2>🔨 Build</h2>
      </div>
      <h3>${b.title}</h3>
      <div class="build-description">${b.description.replace(/\n/g, '<br>')}</div>

      <div class="code-editor-wrapper">
        <div class="editor-toolbar">
          <span class="editor-lang">JavaScript</span>
          <button class="btn btn-ghost btn-sm" onclick="resetBuildEditor()">↺ Reset</button>
        </div>
        <textarea class="code-editor code-editor-large" id="build-editor" spellcheck="false">${b.starterCode || ''}</textarea>
        <div class="editor-actions">
          <button class="btn btn-primary" onclick="runBuildCode()">▶ Run</button>
        </div>
      </div>
      <div class="output-panel" id="build-output" style="display:none">
        <div class="output-label">Output:</div>
        <pre class="output-text" id="build-output-text"></pre>
      </div>

      <!-- HINT SYSTEM -->
      <div class="hint-system">
        <div class="hints-header">
          <span>💡 Hints</span>
          <span class="hints-used" id="hints-used-label">${currentHintsRevealed}/${b.hints?.length || 0} used</span>
        </div>
        <div class="hints-list" id="hints-list">
          ${(b.hints || []).map((h, i) => `
            <div class="hint-item ${i < currentHintsRevealed ? 'revealed' : 'hidden'}" id="hint-${i}">
              ${i < currentHintsRevealed ? `<span class="hint-number">💡 Hint ${i+1}</span><p>${h}</p>` :
                `<button class="btn btn-ghost btn-sm" onclick="revealHint(${i}, ${b.hints?.length})">Reveal Hint ${i+1}</button>`}
            </div>
          `).join('')}
        </div>
        ${b.solution ? `
        <button class="btn btn-ghost btn-sm show-solution-btn" id="show-solution-btn" onclick="showSolution('${btoa(encodeURIComponent(b.solution)).substring(0, 20)}')">
          👁️ Show Solution
        </button>
        <div class="solution-block" id="solution-block" style="display:none">
          <div class="solution-warning">⚠️ Only check after a genuine attempt. Understanding is the goal.</div>
          <pre class="code-block"><code>${escHtml(b.solution || '')}</code></pre>
        </div>
        ` : ''}
      </div>

      <div class="step-footer">
        <button class="btn btn-ghost" onclick="goToStep(1)">← Back</button>
        <button class="btn btn-primary" onclick="goToStep(3)">Take the Quiz →</button>
      </div>
    </div>
  `;
}

// ─── STEP 4: QUIZ ────────────────────────────────────
function renderStep4(mission) {
  const questions = mission.quiz || [];
  if (!questions.length) return `
    <div class="step-panel" id="step-3">
      <div class="step-header"><div class="step-number">STEP 4</div><h2>📝 Quiz</h2></div>
      <p>No quiz for this mission.</p>
      <div class="step-footer">
        <button class="btn btn-ghost" onclick="goToStep(2)">← Back</button>
        <button class="btn btn-primary" onclick="goToStep(4)">Reflect →</button>
      </div>
    </div>`;
  return `
    <div class="step-panel" id="step-3">
      <div class="step-header">
        <div class="step-number">STEP 4</div>
        <h2>📝 Quiz</h2>
        <p class="quiz-intro">${questions.length} questions · Test your understanding</p>
      </div>
      <div class="quiz-questions" id="quiz-questions">
        ${questions.map((q, qi) => `
          <div class="quiz-question" id="qq-${qi}">
            <div class="q-number">Q${qi + 1}</div>
            <p class="q-text">${q.question.replace(/\n/g, '<br>')}</p>
            <div class="q-options">
              ${q.options.map((opt, oi) => `
                <button class="q-option" id="opt-${qi}-${oi}" onclick="selectAnswer(${qi}, ${oi}, ${q.correct}, '${escAttr(q.explanation)}')">
                  <span class="opt-letter">${String.fromCharCode(65 + oi)}</span>
                  <span>${opt}</span>
                </button>
              `).join('')}
            </div>
            <div class="q-feedback" id="qf-${qi}" style="display:none"></div>
          </div>
        `).join('')}
      </div>
      <div class="quiz-score-panel" id="quiz-score-panel" style="display:none"></div>
      <div class="step-footer">
        <button class="btn btn-ghost" onclick="goToStep(2)">← Back</button>
        <button class="btn btn-primary" id="submit-quiz-btn" onclick="submitQuiz(${questions.length})" disabled>
          Submit Quiz
        </button>
      </div>
    </div>`;
}

// ─── STEP 5: REFLECT ─────────────────────────────────
function renderStep5(mission, levelId, day, isLowEnergy) {
  return `
    <div class="step-panel" id="step-4">
      <div class="step-header">
        <div class="step-number">STEP 5</div>
        <h2>💭 Reflect</h2>
      </div>
      <div class="reflect-prompt">
        <p class="reflect-question">${mission.reflect?.prompt || 'What did you learn today?'}</p>
        <textarea class="reflect-textarea" id="reflect-input"
          placeholder="Write your thoughts here... (optional but encouraged)">${getMissionData(levelId, day).reflection || ''}</textarea>
      </div>

      <!-- COMPLETION CHECKLIST -->
      <div class="completion-checklist glass-card-inner">
        <h3>Before you complete:</h3>
        <label class="checklist-item"><input type="checkbox" id="check-learned"> <span>I learned the concept</span></label>
        <label class="checklist-item"><input type="checkbox" id="check-practiced"> <span>I practiced the exercise</span></label>
        <label class="checklist-item"><input type="checkbox" id="check-built"> <span>I attempted the build task</span></label>
        <label class="checklist-item"><input type="checkbox" id="check-quizzed"> <span>I attempted the quiz</span></label>
      </div>

      <div class="step-footer">
        <button class="btn btn-ghost" onclick="goToStep(3)">← Back</button>
        <button class="btn btn-complete" id="complete-btn" onclick="completeMissionFlow(${levelId}, ${day}, ${isLowEnergy})">
          ${isLowEnergy ? '💤 Complete Mini Quest' : '⚔️ Complete Mission'}
        </button>
      </div>
    </div>`;
}

// ─── HELPERS & GLOBALS ───────────────────────────────

function setupStepNavigation(mission, levelId, day, isLowEnergy) {
  // Insert other step panels dynamically
  const content = document.getElementById('mission-steps');
  content.innerHTML =
    renderStep1(mission, isLowEnergy) +
    renderStep2(mission) +
    renderStep3(mission) +
    renderStep4(mission) +
    renderStep5(mission, levelId, day, isLowEnergy);

  activateStep(0);
}

function activateStep(stepIndex) {
  document.querySelectorAll('.step-panel').forEach((p, i) => {
    p.style.display = i === stepIndex ? 'block' : 'none';
  });
  document.querySelectorAll('.step-nav-item').forEach((n, i) => {
    n.classList.toggle('active', i === stepIndex);
    n.classList.toggle('done', i < stepIndex);
  });
}

// Expose to window (inline onclick)
window.goToStep = activateStep;

window.switchLayer = function(type) {
  ['simple', 'technical', 'interview'].forEach(t => {
    document.getElementById(`layer-${t}-content`).style.display = t === type ? 'block' : 'none';
  });
  document.querySelectorAll('.layer-tab').forEach((btn, i) => {
    btn.classList.toggle('active-tab', ['simple', 'technical', 'interview'][i] === type);
  });
};

window.revealHint = function(index, total) {
  currentHintsRevealed = index + 1;
  const hintEl = document.getElementById(`hint-${index}`);
  const mission = getMission(getState().currentLevel, getState().currentDay);
  const hint = mission?.build?.hints?.[index] || '';
  hintEl.className = 'hint-item revealed';
  hintEl.innerHTML = `<span class="hint-number">💡 Hint ${index + 1}</span><p>${hint}</p>`;
  document.getElementById('hints-used-label').textContent = `${currentHintsRevealed}/${total} used`;
};

window.showSolution = function() {
  const sol = document.getElementById('solution-block');
  if (sol) sol.style.display = sol.style.display === 'none' ? 'block' : 'none';
};

window.runTryCode = function() {
  runCode('try-editor', 'try-output', 'try-output-text');
};

window.runBuildCode = function() {
  runCode('build-editor', 'build-output', 'build-output-text');
};

window.resetTryEditor = function() {
  const mission = getMission(getState().currentLevel, getState().currentDay);
  const el = document.getElementById('try-editor');
  if (el && mission?.tryIt) el.value = mission.tryIt.starterCode || '';
};

window.resetBuildEditor = function() {
  const mission = getMission(getState().currentLevel, getState().currentDay);
  const el = document.getElementById('build-editor');
  if (el && mission?.build) el.value = mission.build.starterCode || '';
};

function runCode(editorId, outputPanelId, outputTextId) {
  const code = document.getElementById(editorId)?.value || '';
  const outputPanel = document.getElementById(outputPanelId);
  const outputText = document.getElementById(outputTextId);
  outputPanel.style.display = 'block';

  const logs = [];
  const originalLog = console.log;
  const originalError = console.error;

  console.log = (...args) => { logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ')); };
  console.error = (...args) => { logs.push('❌ ' + args.join(' ')); };

  try {
    // eslint-disable-next-line no-new-func
    new Function(code)();
    outputText.innerHTML = logs.length > 0
      ? escHtml(logs.join('\n'))
      : '<span style="color:var(--text-muted)">No output</span>';
    outputText.style.color = 'var(--success)';
  } catch (e) {
    outputText.innerHTML = `<span style="color:var(--danger)">❌ ${escHtml(e.message)}</span>`;
  } finally {
    console.log = originalLog;
    console.error = originalError;
  }
}

window.selectAnswer = function(qi, oi, correct, explanation) {
  if (quizSubmitted) return;
  quizAnswers[qi] = oi;

  document.querySelectorAll(`#qq-${qi} .q-option`).forEach(btn => btn.classList.remove('selected'));
  document.getElementById(`opt-${qi}-${oi}`).classList.add('selected');

  const submitBtn = document.getElementById('submit-quiz-btn');
  const mission = getMission(getState().currentLevel, getState().currentDay);
  if (submitBtn && Object.keys(quizAnswers).length >= (mission?.quiz?.length || 1)) {
    submitBtn.disabled = false;
  }
};

window.submitQuiz = function(total) {
  quizSubmitted = true;
  const mission = getMission(getState().currentLevel, getState().currentDay);
  const questions = mission?.quiz || [];
  let correct = 0;

  questions.forEach((q, qi) => {
    const chosen = quizAnswers[qi];
    const isCorrect = chosen === q.correct;
    if (isCorrect) correct++;

    const allOpts = document.querySelectorAll(`#qq-${qi} .q-option`);
    allOpts.forEach((btn, i) => {
      btn.classList.remove('selected');
      if (i === q.correct) btn.classList.add('correct');
      else if (i === chosen && !isCorrect) btn.classList.add('incorrect');
      btn.disabled = true;
    });

    const feedback = document.getElementById(`qf-${qi}`);
    feedback.style.display = 'block';
    feedback.className = `q-feedback ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
    feedback.innerHTML = `${isCorrect ? '✅ Correct!' : '❌ Not quite.'} ${q.explanation}`;
  });

  const score = Math.round((correct / total) * 100);
  const panel = document.getElementById('quiz-score-panel');
  panel.style.display = 'block';
  panel.innerHTML = `
    <div class="quiz-score ${score >= 80 ? 'score-high' : score >= 50 ? 'score-mid' : 'score-low'}">
      <div class="score-number">${score}%</div>
      <div class="score-label">${correct}/${total} correct</div>
      <div class="score-msg">${getScoreMessage(score)}</div>
      ${score < 50 ? '<div class="score-warning">⚠️ REPAIR QUEST recommended — review the concept before moving on.</div>' : ''}
    </div>`;

  const submitBtn = document.getElementById('submit-quiz-btn');
  if (submitBtn) {
    submitBtn.textContent = 'Continue to Reflect →';
    submitBtn.onclick = () => goToStep(4);
  }

  // Store score temporarily
  window._lastQuizScore = score;
};

window.completeMissionFlow = function(levelId, day, isLowEnergy) {
  const state = getState();
  const score = window._lastQuizScore ?? 50;
  const reflection = document.getElementById('reflect-input')?.value || '';

  completeMission(levelId, day, score, isLowEnergy);

  // Store reflection
  state.missionData[`${levelId}-${day}`] = {
    ...state.missionData[`${levelId}-${day}`],
    reflection,
  };

  showMissionComplete(levelId, day, score, isLowEnergy);
};

function showMissionComplete(levelId, day, score, isLowEnergy) {
  const state = getState();
  const xpEarned = isLowEnergy ? 30 : 100;
  const container = document.getElementById('view-container');
  container.innerHTML = `
    <div class="mission-complete-overlay">
      <div class="complete-card glass-card">
        <div class="complete-sparkles">✨ ✨ ✨</div>
        <div class="complete-icon">${isLowEnergy ? '💤' : '⚔️'}</div>
        <h1>${isLowEnergy ? 'Mini Quest Complete!' : 'Mission Complete!'}</h1>
        <div class="complete-xp">+${xpEarned} XP</div>
        <div class="complete-stats">
          <div class="cs"><span class="cs-label">Quiz Score</span><span class="cs-val">${score}%</span></div>
          <div class="cs"><span class="cs-label">Streak</span><span class="cs-val">🔥 ${state.currentStreak}</span></div>
          <div class="cs"><span class="cs-label">Total XP</span><span class="cs-val">⭐ ${state.xp.toLocaleString()}</span></div>
        </div>
        ${score < 50 ? `
        <div class="complete-warning">
          ⚠️ Quiz score below 50% — consider reviewing this concept before moving on.
        </div>
        ` : ''}
        <div class="complete-actions">
          <button class="btn btn-primary" onclick="window.location.hash='dashboard'">
            Back to Dashboard
          </button>
          <button class="btn btn-ghost" onclick="window.location.hash='mission/${state.currentLevel}/${state.currentDay}'">
            Next Mission →
          </button>
        </div>
      </div>
    </div>`;

  // Particle animation
  launchParticles();
}

function launchParticles() {
  const emojis = ['✨', '⭐', '🎉', '⚡', '🏴'];
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    p.style.cssText = `left:${Math.random()*100}vw; animation-delay:${Math.random()*0.5}s; font-size:${1 + Math.random()}rem`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 2000);
  }
}

window.showStuckModal = function() {
  document.getElementById('stuck-modal').style.display = 'flex';
};
window.closeStuckModal = function() {
  document.getElementById('stuck-modal').style.display = 'none';
};

function renderStuckModal(mission) {
  return `
    <div class="modal-content glass-card">
      <div class="modal-header">
        <h2>🆘 I'm Stuck — Let's Fix That</h2>
        <button class="btn-close" onclick="closeStuckModal()">✕</button>
      </div>
      <div class="stuck-steps">
        <div class="stuck-step">
          <span class="ss-num">1</span>
          <div>
            <strong>What part is confusing?</strong>
            <p>Identify the specific thing you don't understand yet.</p>
            <textarea class="stuck-input" id="stuck-what" placeholder="e.g. I don't understand what 'scope' means in this context"></textarea>
          </div>
        </div>
        <div class="stuck-step">
          <span class="ss-num">2</span>
          <div>
            <strong>Simpler version</strong>
            <p>${mission.concept?.simple || 'Re-read the Simple explanation at the top.'}</p>
          </div>
        </div>
        <div class="stuck-step">
          <span class="ss-num">3</span>
          <div>
            <strong>Tiny example</strong>
            ${mission.learn?.codeExample ? `<pre class="code-block-small"><code>${escHtml(mission.learn.codeExample.split('\n').slice(0, 5).join('\n'))}</code></pre>` : '<p>Re-read the code example in Step 1.</p>'}
          </div>
        </div>
        <div class="stuck-step">
          <span class="ss-num">4</span>
          <div>
            <strong>Smaller problem</strong>
            <p>Before doing the full build task, just try the "Try It" exercise again. Or just make the first variable and log it.</p>
          </div>
        </div>
        <div class="stuck-step">
          <span class="ss-num">5</span>
          <div>
            <strong>Return to the original task</strong>
            <p>Once you understand the smaller piece, apply it back to the build task.</p>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" onclick="closeStuckModal()">I'm ready to try again</button>
        <button class="btn btn-ghost" onclick="goToStep(0); closeStuckModal()">Back to Learn</button>
      </div>
    </div>`;
}

function renderLockedMission(levelId, day) {
  document.getElementById('view-container').innerHTML = `
    <div class="locked-mission glass-card">
      <div class="lock-icon">🔒</div>
      <h2>Mission Locked</h2>
      <p>Complete Day ${day - 1} to unlock this mission.</p>
      <button class="btn btn-primary" onclick="history.back()">← Go Back</button>
    </div>`;
}

function renderMissionError() {
  document.getElementById('view-container').innerHTML = `
    <div class="locked-mission glass-card">
      <div class="lock-icon">⚠️</div>
      <h2>Mission Not Found</h2>
      <button class="btn btn-primary" onclick="window.location.hash='dashboard'">← Dashboard</button>
    </div>`;
}

function getScoreMessage(score) {
  if (score === 100) return '🌟 Perfect score! Bonus challenge unlocked!';
  if (score >= 85) return '✅ Excellent — you can continue normally.';
  if (score >= 75) return '✅ Good work — keep going.';
  if (score >= 50) return '📝 OK — continue but revisit the concept.';
  return '⚠️ Below 50% — review before moving on (REPAIR QUEST).';
}

window.copyCode = function(btn) {
  const code = btn.closest('.code-example-block')?.querySelector('code')?.textContent;
  if (code) navigator.clipboard.writeText(code).then(() => { btn.textContent = '✅ Copied'; setTimeout(() => btn.textContent = '📋 Copy', 2000); });
};

function escHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function escAttr(str) {
  return String(str).replace(/'/g, "\\'").replace(/\n/g, ' ');
}
