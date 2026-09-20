// Edinburgh Quest — Career Command Center
import { getState, addJob, updateJob, deleteJob, updateState } from '../state.js';

const JOB_STATUSES = [
  { id: 'saved', label: '💾 Saved', color: '#90cdf4' },
  { id: 'researching', label: '🔍 Researching', color: '#f6e05e' },
  { id: 'applied', label: '📨 Applied', color: '#63b3ed' },
  { id: 'assessment', label: '📝 Assessment', color: '#f6ad55' },
  { id: 'interview', label: '🎤 Interview', color: '#b794f4' },
  { id: 'offer', label: '🎉 Offer!', color: '#48bb78' },
  { id: 'rejected', label: '❌ Rejected', color: '#fc8181' },
  { id: 'withdrawn', label: '↩️ Withdrawn', color: '#718096' },
];

let activeCareerTab = 'tracker';

export function renderCareer(params) {
  const tab = params?.[0] || activeCareerTab;
  activeCareerTab = tab;
  const state = getState();

  const container = document.getElementById('view-container');
  container.innerHTML = `
    <div class="career-view">
      <div class="career-header">
        <h1>🏴 Edinburgh Career</h1>
        <p>Convert your skills into a career.</p>
      </div>

      <div class="career-tabs">
        ${[
          { id: 'tracker', label: '🗂️ Job Tracker' },
          { id: 'jd-analyzer', label: '📋 JD Analyzer' },
          { id: 'resume', label: '📄 Resume Builder' },
          { id: 'interview', label: '🎤 Interview Sim' },
          { id: 'uk-research', label: '🏴 UK Research' },
        ].map(t => `
          <button class="career-tab ${tab === t.id ? 'tab-active' : ''}"
            onclick="window.location.hash='career/${t.id}'">${t.label}</button>
        `).join('')}
      </div>

      <div class="career-tab-content" id="career-tab-content">
        ${renderCareerTab(tab, state)}
      </div>
    </div>
  `;
}

function renderCareerTab(tab, state) {
  switch (tab) {
    case 'tracker': return renderJobTracker(state);
    case 'jd-analyzer': return renderJDAnalyzer(state);
    case 'resume': return renderResumeBuilder(state);
    case 'interview': return renderInterviewSim(state);
    case 'uk-research': return renderUKResearch();
    default: return renderJobTracker(state);
  }
}

// ─── JOB TRACKER ─────────────────────────────────────
function renderJobTracker(state) {
  const jobs = state.jobTracker || [];
  return `
    <div class="job-tracker">
      <div class="tracker-header">
        <h2>Job Tracker</h2>
        <button class="btn btn-primary" onclick="openAddJobModal()">+ Add Job</button>
      </div>

      <!-- STATUS KANBAN HEADERS -->
      <div class="kanban-headers">
        ${JOB_STATUSES.map(s => `
          <div class="kanban-col-header" style="border-bottom: 3px solid ${s.color}">
            <span>${s.label}</span>
            <span class="kanban-count">${jobs.filter(j => j.status === s.id).length}</span>
          </div>`).join('')}
      </div>

      ${jobs.length === 0 ? `
      <div class="empty-tracker glass-card">
        <div class="empty-icon">🗂️</div>
        <h3>No jobs tracked yet</h3>
        <p>Start adding companies you're interested in.</p>
        <button class="btn btn-primary" onclick="openAddJobModal()">Add Your First Job</button>
      </div>
      ` : `
      <div class="jobs-list">
        ${jobs.map(job => renderJobCard(job)).join('')}
      </div>
      `}
    </div>

    <!-- ADD JOB MODAL -->
    <div class="modal-overlay" id="add-job-modal" style="display:none">
      <div class="modal-content glass-card">
        <div class="modal-header">
          <h2>Add Job</h2>
          <button class="btn-close" onclick="document.getElementById('add-job-modal').style.display='none'">✕</button>
        </div>
        <div class="job-form">
          <input class="text-input" id="job-company" placeholder="Company (e.g. Skyscanner)">
          <input class="text-input" id="job-role" placeholder="Role (e.g. Junior Software Engineer)">
          <input class="text-input" id="job-location" placeholder="Location (e.g. Edinburgh)">
          <input class="text-input" id="job-url" placeholder="Job URL">
          <select class="text-input" id="job-status">
            ${JOB_STATUSES.map(s => `<option value="${s.id}">${s.label}</option>`).join('')}
          </select>
          <textarea class="text-input" id="job-notes" placeholder="Notes..." rows="3"></textarea>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" onclick="submitAddJob()">Add Job</button>
          <button class="btn btn-ghost" onclick="document.getElementById('add-job-modal').style.display='none'">Cancel</button>
        </div>
      </div>
    </div>
  `;
}

function renderJobCard(job) {
  const status = JOB_STATUSES.find(s => s.id === job.status) || JOB_STATUSES[0];
  return `
    <div class="job-card glass-card" style="border-left: 3px solid ${status.color}">
      <div class="job-card-header">
        <div>
          <h3 class="job-company">${escHtml(job.company)}</h3>
          <p class="job-role">${escHtml(job.role)}</p>
          <p class="job-location">📍 ${escHtml(job.location || '')}</p>
        </div>
        <div class="job-card-actions">
          <span class="job-status-badge" style="background:${status.color}22; color:${status.color}">${status.label}</span>
          <select class="status-select" onchange="changeJobStatus(${job.id}, this.value)">
            ${JOB_STATUSES.map(s => `<option value="${s.id}" ${s.id === job.status ? 'selected' : ''}>${s.label}</option>`).join('')}
          </select>
          <button class="btn-icon" onclick="deleteJobById(${job.id})">🗑️</button>
        </div>
      </div>
      ${job.notes ? `<p class="job-notes">${escHtml(job.notes)}</p>` : ''}
      ${job.url ? `<a href="${escHtml(job.url)}" target="_blank" class="job-link">View Listing →</a>` : ''}
      <div class="job-date">Added: ${new Date(job.addedAt).toLocaleDateString()}</div>
    </div>`;
}

window.openAddJobModal = () => { document.getElementById('add-job-modal').style.display = 'flex'; };
window.submitAddJob = function() {
  const job = {
    company: document.getElementById('job-company').value.trim(),
    role: document.getElementById('job-role').value.trim(),
    location: document.getElementById('job-location').value.trim(),
    url: document.getElementById('job-url').value.trim(),
    status: document.getElementById('job-status').value,
    notes: document.getElementById('job-notes').value.trim(),
  };
  if (!job.company || !job.role) { alert('Company and Role are required.'); return; }
  addJob(job);
  document.getElementById('add-job-modal').style.display = 'none';
  renderCareer([activeCareerTab]);
};
window.changeJobStatus = (id, status) => { updateJob(id, { status }); };
window.deleteJobById = (id) => { if (confirm('Remove this job?')) { deleteJob(id); renderCareer([activeCareerTab]); } };

// ─── JD ANALYZER ─────────────────────────────────────
function renderJDAnalyzer(state) {
  const roadmapSkills = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express', 'SQL', 'PostgreSQL',
    'Git', 'Docker', 'AWS', 'Testing', 'REST APIs', 'TypeScript (partial)', 'DSA'];

  return `
    <div class="jd-analyzer">
      <h2>📋 Job Description Analyzer</h2>
      <p>Paste a job description to see which skills you already have vs which to prioritise.</p>
      <textarea class="jd-input" id="jd-text" placeholder="Paste the job description here..." rows="10"></textarea>
      <button class="btn btn-primary" onclick="analyzeJD()">Analyze JD</button>
      <div class="jd-results" id="jd-results" style="display:none"></div>

      <div class="jd-note">
        <strong>⚠️ Note:</strong> This analyzer matches common skill keywords. It does not fabricate requirements —
        it only shows what it finds in the text you paste.
      </div>
    </div>
  `;
}

window.analyzeJD = function() {
  const text = document.getElementById('jd-text').value.toLowerCase();
  if (!text.trim()) return;

  const skillMap = [
    { name: 'JavaScript', keywords: ['javascript', 'js', 'es6'], level: 2 },
    { name: 'TypeScript', keywords: ['typescript', 'ts'], level: 3 },
    { name: 'React', keywords: ['react', 'react.js', 'reactjs'], level: 3 },
    { name: 'Node.js', keywords: ['node', 'node.js', 'nodejs', 'express'], level: 4 },
    { name: 'SQL / PostgreSQL', keywords: ['sql', 'postgres', 'postgresql', 'mysql', 'database'], level: 5 },
    { name: 'REST APIs', keywords: ['rest', 'api', 'restful', 'http'], level: 4 },
    { name: 'Git / GitHub', keywords: ['git', 'github', 'version control'], level: 1 },
    { name: 'Docker', keywords: ['docker', 'container', 'containerization'], level: 8 },
    { name: 'AWS / Cloud', keywords: ['aws', 'cloud', 'azure', 'gcp', 'ec2', 's3'], level: 9 },
    { name: 'Testing', keywords: ['jest', 'testing', 'unit test', 'cypress', 'tdd'], level: 8 },
    { name: 'GraphQL', keywords: ['graphql', 'apollo'], level: null },
    { name: 'Redis', keywords: ['redis', 'cache', 'caching'], level: null },
    { name: 'Kubernetes', keywords: ['kubernetes', 'k8s'], level: null },
    { name: 'CI/CD', keywords: ['ci/cd', 'github actions', 'jenkins', 'pipeline'], level: 8 },
    { name: 'Python', keywords: ['python', 'django', 'flask'], level: null },
    { name: 'AI / LLM', keywords: ['ai', 'llm', 'openai', 'langchain', 'ml'], level: 10 },
  ];

  const state = getState();
  const found = skillMap.filter(s => s.keywords.some(k => text.includes(k)));

  const covered = found.filter(s => s.level !== null && state.currentLevel >= s.level);
  const learning = found.filter(s => s.level !== null && state.currentLevel < s.level && state.currentLevel >= (s.level - 3));
  const notCovered = found.filter(s => s.level === null || state.currentLevel < (s.level - 3));

  const results = document.getElementById('jd-results');
  results.style.display = 'block';
  results.innerHTML = `
    <div class="jd-result-section covered">
      <h3>🟢 Covered by your roadmap (${covered.length})</h3>
      ${covered.map(s => `<span class="skill-pill pill-green">${s.name}</span>`).join('')}
    </div>
    <div class="jd-result-section learning">
      <h3>🟡 Coming up in your roadmap (${learning.length})</h3>
      ${learning.map(s => `<span class="skill-pill pill-yellow">${s.name} <small>(Level ${s.level})</small></span>`).join('')}
    </div>
    <div class="jd-result-section not-covered">
      <h3>🔴 Not currently covered (${notCovered.length})</h3>
      ${notCovered.map(s => `<span class="skill-pill pill-red">${s.name}</span>`).join('')}
      ${notCovered.length === 0 ? '<p>Your roadmap covers everything found in this JD!</p>' : ''}
    </div>
    <div class="jd-summary glass-card-inner">
      <strong>Match Summary:</strong>
      ${covered.length} of ${found.length} required skills are already in your roadmap.
    </div>
  `;
};

// ─── RESUME BUILDER ───────────────────────────────────
function renderResumeBuilder(state) {
  const resume = state.resume || {};
  return `
    <div class="resume-builder">
      <div class="resume-header-row">
        <h2>📄 Technical Resume</h2>
        <button class="btn btn-ghost btn-sm" onclick="previewResume()">👁 Preview</button>
      </div>
      <div class="resume-note">
        ⚠️ <strong>Rule:</strong> Do not invent achievements, metrics, or responsibilities.
        Only document what you have genuinely done.
      </div>

      <div class="resume-sections">
        <!-- EXPERIENCE -->
        <div class="resume-section glass-card-inner">
          <div class="rs-header">
            <h3>💼 Experience</h3>
            <button class="btn btn-ghost btn-xs" onclick="addResumeItem('experience')">+ Add</button>
          </div>
          <div id="resume-experience">
            ${(resume.experience || []).map((e, i) => renderResumeExp(e, i)).join('') || '<p class="empty-section">No experience added yet.</p>'}
          </div>
        </div>

        <!-- PROJECTS -->
        <div class="resume-section glass-card-inner">
          <div class="rs-header">
            <h3>🚀 Projects</h3>
            <button class="btn btn-ghost btn-xs" onclick="addResumeItem('projects')">+ Add</button>
          </div>
          <div id="resume-projects">
            ${(resume.projects || []).map((p, i) => renderResumeProject(p, i)).join('') || '<p class="empty-section">No projects added yet.</p>'}
          </div>
        </div>

        <!-- SKILLS -->
        <div class="resume-section glass-card-inner">
          <div class="rs-header"><h3>🛠️ Skills</h3></div>
          <textarea class="text-input" id="resume-skills-input" placeholder="JavaScript, React, Node.js, SQL, Git, Docker..."
            onchange="saveResumeField('skills', this.value)">${(resume.skills || []).join(', ')}</textarea>
        </div>

        <!-- EDUCATION -->
        <div class="resume-section glass-card-inner">
          <div class="rs-header"><h3>🎓 Education</h3></div>
          <div class="edu-fields">
            <input class="text-input" id="edu-degree" placeholder="Degree (e.g. B.Tech CSE)"
              value="${resume.education?.[0]?.degree || ''}" onchange="saveEdu()">
            <input class="text-input" id="edu-institution" placeholder="Institution"
              value="${resume.education?.[0]?.institution || ''}" onchange="saveEdu()">
            <input class="text-input" id="edu-year" placeholder="Year"
              value="${resume.education?.[0]?.year || ''}" onchange="saveEdu()">
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderResumeExp(exp, index) {
  return `<div class="resume-item" data-index="${index}">
    <strong>${exp.company || ''}</strong> — ${exp.role || ''}
    <p class="resume-bullet">${exp.bullet || ''}</p>
    <button class="btn-icon" onclick="removeResumeItem('experience', ${index})">🗑️</button>
  </div>`;
}

function renderResumeProject(proj, index) {
  return `<div class="resume-item" data-index="${index}">
    <strong>${proj.name || ''}</strong> (${proj.tech || ''})
    <p class="resume-bullet">${proj.bullet || ''}</p>
    <button class="btn-icon" onclick="removeResumeItem('projects', ${index})">🗑️</button>
  </div>`;
}

window.addResumeItem = function(section) {
  const state = getState();
  if (!state.resume) state.resume = {};
  if (!state.resume[section]) state.resume[section] = [];
  if (section === 'experience') {
    const company = prompt('Company name:');
    const role = prompt('Role:');
    const bullet = prompt('Achievement bullet (Action + Technology + Result):');
    if (company) state.resume.experience.push({ company, role, bullet });
  } else if (section === 'projects') {
    const name = prompt('Project name:');
    const tech = prompt('Tech stack:');
    const bullet = prompt('Impact bullet:');
    if (name) state.resume.projects.push({ name, tech, bullet });
  }
  updateState({ resume: state.resume });
  renderCareer([activeCareerTab]);
};

window.removeResumeItem = function(section, index) {
  const state = getState();
  state.resume[section].splice(index, 1);
  updateState({ resume: state.resume });
  renderCareer([activeCareerTab]);
};

window.saveEdu = function() {
  const state = getState();
  if (!state.resume) state.resume = {};
  state.resume.education = [{ degree: document.getElementById('edu-degree')?.value, institution: document.getElementById('edu-institution')?.value, year: document.getElementById('edu-year')?.value }];
  updateState({ resume: state.resume });
};

window.saveResumeField = function(field, value) {
  const state = getState();
  if (!state.resume) state.resume = {};
  state.resume[field] = field === 'skills' ? value.split(',').map(s => s.trim()).filter(Boolean) : value;
  updateState({ resume: state.resume });
};

window.previewResume = function() {
  window.dispatchEvent(new CustomEvent('show-toast', { detail: { msg: 'Resume preview coming soon!', type: 'info' } }));
};

// ─── INTERVIEW SIMULATOR ──────────────────────────────
const INTERVIEW_QUESTIONS = {
  javascript: [
    { q: 'What is a closure in JavaScript?', model: 'A closure is a function that retains access to its outer scope\'s variables even after the outer function has returned. Example: counters, private state, partial application.' },
    { q: 'Explain the event loop.', model: 'JavaScript is single-threaded. The event loop manages asynchronous operations: the call stack runs synchronous code, while the event queue holds callbacks. When the stack is empty, the event loop pushes the next queued callback.' },
    { q: 'What is the difference between let, const, and var?', model: 'var: function-scoped, hoisted. let: block-scoped, reassignable. const: block-scoped, not reassignable. Always prefer const; use let when you need to reassign; avoid var.' },
  ],
  react: [
    { q: 'What are React hooks?', model: 'Hooks are functions that let you use state and lifecycle features in functional components. useState for state, useEffect for side effects, useContext for context, useMemo/useCallback for performance optimization.' },
    { q: 'Explain the virtual DOM.', model: 'React maintains a virtual representation of the DOM. When state changes, React computes a diff between the new virtual DOM and previous, then applies only the minimal set of changes to the real DOM. This is efficient.' },
  ],
  dsa: [
    { q: 'What is the time complexity of binary search?', model: 'O(log n). Binary search halves the search space each step. For n=1,000,000 elements, it takes ~20 steps.' },
    { q: 'Explain what a hash map is and when you would use it.', model: 'A hash map stores key-value pairs with O(1) average lookup. Use when you need fast lookup by a key — e.g., checking for duplicates, counting frequencies, caching results.' },
  ],
  behavioral: [
    { q: 'Tell me about yourself.', model: 'I\'m a software engineering student on a structured learning journey. I\'m building skills in JavaScript, React, Node.js, SQL, and cloud deployment, with a target of working as a software engineer in Edinburgh.' },
    { q: 'Why Edinburgh?', model: 'Edinburgh has a vibrant tech ecosystem — from fintech (Money Dashboard, FreeAgent) to travel (Skyscanner, Agoda) to gaming. The city combines world-class universities, growing startups, and established tech companies.' },
  ],
};

function renderInterviewSim(state) {
  return `
    <div class="interview-sim">
      <h2>🎤 Interview Room</h2>
      <p>Practice one question at a time. Get feedback. Build confidence.</p>
      <div class="interview-modes">
        ${Object.keys(INTERVIEW_QUESTIONS).map(mode => `
          <button class="mode-btn glass-card" onclick="startInterview('${mode}')">
            ${getModeIcon(mode)} ${capitalize(mode)}
          </button>
        `).join('')}
      </div>
      <div class="interview-session" id="interview-session" style="display:none"></div>
    </div>
  `;
}

window.startInterview = function(mode) {
  const questions = INTERVIEW_QUESTIONS[mode] || [];
  if (!questions.length) return;
  const q = questions[Math.floor(Math.random() * questions.length)];
  const session = document.getElementById('interview-session');
  session.style.display = 'block';
  session.innerHTML = `
    <div class="interview-card glass-card">
      <div class="interview-mode-badge">${getModeIcon(mode)} ${capitalize(mode)} Interview</div>
      <h3 class="interview-question">"${q.q}"</h3>
      <textarea class="interview-answer" id="interview-answer"
        placeholder="Type your answer here... Think before you write."></textarea>
      <div class="interview-actions">
        <button class="btn btn-primary" onclick="submitInterviewAnswer(${JSON.stringify(q.model).replace(/"/g, '&quot;')})">
          Get Feedback
        </button>
        <button class="btn btn-ghost" onclick="startInterview('${mode}')">Next Question →</button>
      </div>
      <div class="interview-feedback" id="interview-feedback" style="display:none"></div>
    </div>
  `;
  session.scrollIntoView({ behavior: 'smooth' });
};

window.submitInterviewAnswer = function(modelAnswer) {
  const answer = document.getElementById('interview-answer')?.value || '';
  const feedback = document.getElementById('interview-feedback');
  feedback.style.display = 'block';
  feedback.innerHTML = `
    <div class="feedback-section">
      <h4>📝 Model Answer</h4>
      <p>${escHtml(modelAnswer)}</p>
    </div>
    <div class="feedback-section">
      <h4>Self-Assessment</h4>
      <p>Compare your answer to the model. Did you cover the key points? Was your explanation clear?</p>
      <div class="self-rate">
        ${[1,2,3,4,5].map(r => `<button class="rate-btn" onclick="rateAnswer(${r})">${r}⭐</button>`).join('')}
      </div>
    </div>
  `;
  // Track mock interviews
  const state = getState();
  updateState({ mockInterviews: (state.mockInterviews || 0) + 1 });
};

window.rateAnswer = function(rating) {
  document.querySelectorAll('.rate-btn').forEach((btn, i) => {
    btn.classList.toggle('rated', i < rating);
  });
};

// ─── UK RESEARCH ──────────────────────────────────────
function renderUKResearch() {
  return `
    <div class="uk-research">
      <h2>🏴 Edinburgh & UK Tech Ecosystem</h2>
      <div class="research-grid">
        <div class="research-card glass-card">
          <h3>🏢 Edinburgh Tech Companies</h3>
          <ul class="company-list">
            ${[
              { name: 'Skyscanner', type: 'Travel Tech', notes: 'One of Europe\'s biggest travel platforms' },
              { name: 'FreeAgent', type: 'Fintech SaaS', notes: 'Accounting software for freelancers' },
              { name: 'Money Dashboard', type: 'Fintech', notes: 'Personal finance app' },
              { name: 'Administrate', type: 'EdTech', notes: 'Training management' },
              { name: 'Craneware', type: 'HealthTech', notes: 'Healthcare software' },
              { name: 'Quorum Cyber', type: 'Cybersecurity', notes: 'Security services' },
              { name: 'Fanduel', type: 'Sports Tech', notes: 'Fantasy sports platform' },
              { name: 'Agoda (via Booking Holdings)', type: 'Travel', notes: 'Edinburgh engineering hub' },
            ].map(c => `<li class="company-item">
              <strong>${c.name}</strong>
              <span class="company-type">${c.type}</span>
              <span class="company-notes">${c.notes}</span>
            </li>`).join('')}
          </ul>
        </div>
        <div class="research-card glass-card">
          <h3>📋 UK Grad Role Checklist</h3>
          <ul class="checklist-list">
            ${[
              'JavaScript / TypeScript proficiency',
              'React or Angular (React preferred)',
              'Node.js + Express or similar',
              'SQL database experience',
              'Git + GitHub',
              'REST API design',
              'Testing (Jest, Cypress)',
              'Docker basics',
              'CI/CD understanding',
              'Portfolio with live projects',
              'Professional GitHub profile',
              'LinkedIn profile',
              'Clear technical resume',
            ].map(item => `<li class="checklist-item">
              <input type="checkbox" onchange="saveResearchCheck(this, '${escAttr(item)}')">
              <span>${item}</span>
            </li>`).join('')}
          </ul>
        </div>
        <div class="research-card glass-card">
          <h3>💷 UK Salary Ranges (2025 est.)</h3>
          <table class="salary-table">
            <tr><th>Role</th><th>Range</th></tr>
            <tr><td>Graduate Dev</td><td>£28,000–£40,000</td></tr>
            <tr><td>Junior Dev</td><td>£35,000–£50,000</td></tr>
            <tr><td>Mid-Level</td><td>£50,000–£70,000</td></tr>
            <tr><td>Senior</td><td>£70,000–£100,000+</td></tr>
            <tr><td>Edinburgh vs London</td><td>~15–20% lower</td></tr>
          </table>
          <p class="salary-note">⚠️ Ranges are estimates. Research specific companies on Glassdoor/LinkedIn.</p>
        </div>
        <div class="research-card glass-card">
          <h3>📋 Visa / Sponsorship Notes</h3>
          <ul>
            <li>Graduate Route visa: 2 years post-study work in UK</li>
            <li>Skilled Worker visa: requires employer sponsorship</li>
            <li>Many Edinburgh tech companies are licensed sponsors</li>
            <li>Check: <a href="https://www.gov.uk/check-uk-visa" target="_blank">UK Visa Checker</a></li>
            <li>Always verify current requirements — immigration rules change</li>
          </ul>
          <p class="visa-note">⚠️ This is not legal advice. Always consult official UK gov sources.</p>
        </div>
      </div>
    </div>
  `;
}

// helpers
function getModeIcon(mode) {
  const icons = { javascript: '⚡', react: '⚛️', node: '🟢', sql: '🗄️', dsa: '⚔️', behavioral: '🤝', 'system-design': '🏗️' };
  return icons[mode] || '🎤';
}
function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }
function escHtml(str) { return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function escAttr(str) { return String(str).replace(/'/g, "\\'").replace(/"/g, '\\"'); }
window.saveResearchCheck = function() { /* persist later */ };
