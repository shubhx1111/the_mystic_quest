// Edinburgh Quest — Projects View
import { getState, updateState, addXP } from '../state.js';

const PROJECTS = [
  {
    id: 'project-01', number: '01', icon: '⚛️', title: 'React Dashboard',
    level: 3, color: '#76e4f7',
    description: 'A responsive analytics dashboard built with React. Your first real frontend project.',
    versions: [
      { v: '1.0', label: 'Basic Components', desc: 'Header, sidebar, data cards', level: 3 },
      { v: '1.1', label: 'API Integration', desc: 'Fetch real data from an API', level: 3 },
      { v: '1.2', label: 'Responsive + Accessible', desc: 'Mobile-first, ARIA labels', level: 3 },
    ],
    techStack: ['React', 'CSS', 'REST API'],
    milestones: ['Set up React project', 'Build reusable components', 'Connect to API', 'Make responsive', 'Deploy to GitHub Pages'],
    githubPlaceholder: 'github.com/username/react-dashboard',
  },
  {
    id: 'project-02', number: '02', icon: '🛡️', title: 'REST API',
    level: 4, color: '#68d391',
    description: 'A production-style REST API with authentication, validation, and proper error handling.',
    versions: [
      { v: '1.0', label: 'Express Setup + Routes', desc: 'CRUD endpoints', level: 4 },
      { v: '1.1', label: 'Authentication + JWT', desc: 'Login/register/protected routes', level: 4 },
      { v: '1.2', label: 'Validation + Error Handling', desc: 'Proper middleware', level: 4 },
    ],
    techStack: ['Node.js', 'Express', 'JWT', 'Postman'],
    milestones: ['Express setup', 'CRUD routes', 'JWT auth', 'Input validation', 'Error middleware', 'API documentation'],
    githubPlaceholder: 'github.com/username/rest-api',
  },
  {
    id: 'project-03', number: '03', icon: '🏗️', title: 'Full-Stack App',
    level: 6, color: '#fc8181',
    description: 'A complete full-stack application combining React, Node.js, Express, and PostgreSQL.',
    versions: [
      { v: '1.0', label: 'Architecture Setup', desc: 'Client + Server + Database', level: 6 },
      { v: '1.1', label: 'Auth + Database', desc: 'Login, sessions, data persistence', level: 6 },
      { v: '1.2', label: 'Full CRUD + Deployment', desc: 'Complete features + live URL', level: 9 },
    ],
    techStack: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    milestones: ['Project setup', 'Database schema', 'API + Auth', 'React integration', 'End-to-end testing', 'Deployment'],
    githubPlaceholder: 'github.com/username/fullstack-app',
  },
  {
    id: 'project-flagship', number: '04', icon: '🤖', title: 'AI Interview Platform',
    level: 6, color: '#b794f4', flagship: true,
    description: 'Your flagship project — a full-stack AI-powered interview preparation platform that grows with you across 4 levels.',
    versions: [
      { v: '1.0', label: 'Foundation (Level 6)', desc: 'Login, dashboard, interview creation, questions, results', level: 6 },
      { v: '2.0', label: 'Production (Level 8)', desc: 'Authentication, DB, API architecture, validation, tests, Docker', level: 8 },
      { v: '3.0', label: 'Deployed (Level 9)', desc: 'Live on AWS, CI/CD pipeline, monitoring', level: 9 },
      { v: '4.0', label: 'AI-Powered (Level 10)', desc: 'AI question generation, evaluation, scoring, resume analysis', level: 10 },
    ],
    techStack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'OpenAI', 'AWS', 'Docker'],
    milestones: [
      'User auth + sessions', 'Interview session creation', 'Question management', 'Answer submission',
      'Results + scoring', 'Add tests (Jest)', 'Dockerize', 'Deploy to AWS EC2',
      'CI/CD with GitHub Actions', 'AI question generation', 'AI answer evaluation', 'Resume parsing',
    ],
    githubPlaceholder: 'github.com/username/ai-interview-platform',
  },
  {
    id: 'project-05', number: '05', icon: '⛓️', title: 'Web3 DApp',
    level: 11, color: '#f687b3',
    description: 'A decentralized application on Ethereum — a serious Web3 specialization project.',
    versions: [
      { v: '1.0', label: 'Smart Contract', desc: 'Solidity contract deployed to testnet', level: 11 },
      { v: '1.1', label: 'Frontend Connection', desc: 'Ethers.js + wallet connect', level: 11 },
      { v: '1.2', label: 'Full DApp', desc: 'Complete, tested, deployed DApp', level: 11 },
    ],
    techStack: ['Solidity', 'Ethers.js', 'Hardhat', 'React', 'MetaMask'],
    milestones: ['Smart contract written', 'Unit tests', 'Testnet deployment', 'Frontend setup', 'Wallet connection', 'Live DApp'],
    githubPlaceholder: 'github.com/username/web3-dapp',
  },
];

export function renderProjects() {
  const state = getState();
  const container = document.getElementById('view-container');

  container.innerHTML = `
    <div class="projects-view">
      <div class="projects-header">
        <h1>🚀 Project Lab</h1>
        <p>Real projects that grow with your skills. Each one will be on your portfolio.</p>
      </div>

      <div class="projects-list">
        ${PROJECTS.map(p => renderProjectCard(p, state)).join('')}
      </div>
    </div>

    <!-- PROJECT DETAIL MODAL -->
    <div class="modal-overlay" id="project-modal" style="display:none">
      <div id="project-modal-content"></div>
    </div>
  `;
}

function renderProjectCard(project, state) {
  const unlocked = state.currentLevel >= project.level;
  const projectState = state.projectData?.[project.id] || { status: 'not-started', currentVersion: null, githubUrl: '' };
  const status = projectState.status;
  const completedMilestones = projectState.completedMilestones || [];
  const totalMilestones = project.milestones.length;
  const progress = Math.round((completedMilestones.length / totalMilestones) * 100);

  return `
    <div class="project-card glass-card ${project.flagship ? 'flagship-card' : ''} ${!unlocked ? 'locked-card' : ''}"
         style="border-left: 4px solid ${project.color}">
      <div class="project-card-header">
        <div class="project-number-icon">
          <span class="project-icon">${project.icon}</span>
          <span class="project-number">PROJECT ${project.number}</span>
        </div>
        ${project.flagship ? '<span class="flagship-badge">⭐ FLAGSHIP</span>' : ''}
        ${!unlocked ? '<span class="locked-badge">🔒 Locked (Level ' + project.level + ')</span>' : ''}
        <div class="project-status-badge status-${status}">${getStatusLabel(status)}</div>
      </div>

      <h2 class="project-title" style="color:${project.color}">${project.title}</h2>
      <p class="project-desc">${project.description}</p>

      <div class="tech-stack">
        ${project.techStack.map(t => `<span class="tech-chip">${t}</span>`).join('')}
      </div>

      ${unlocked ? `
      <!-- VERSIONS -->
      <div class="versions-list">
        ${project.versions.map(v => {
          const isUnlocked = state.currentLevel >= v.level;
          const isDone = completedMilestones.includes(v.v);
          return `<div class="version-item ${isUnlocked ? '' : 'version-locked'}">
            <div class="version-badge" style="background:${isUnlocked ? project.color + '22' : 'transparent'};border-color:${project.color}">
              v${v.v}
            </div>
            <div class="version-info">
              <span class="version-label">${v.label}</span>
              <span class="version-desc">${v.desc}</span>
              ${!isUnlocked ? `<span class="version-locked-note">Unlocks at Level ${v.level}</span>` : ''}
            </div>
            <span class="version-status">${isDone ? '✅' : isUnlocked ? '→' : '🔒'}</span>
          </div>`;
        }).join('')}
      </div>

      <!-- PROGRESS -->
      <div class="project-progress">
        <div class="progress-bar-track">
          <div class="progress-bar-fill" style="width:${progress}%; background:${project.color}"></div>
        </div>
        <span class="progress-label">${completedMilestones.length}/${totalMilestones} milestones · ${progress}%</span>
      </div>

      <div class="project-actions">
        <button class="btn btn-primary btn-sm" onclick="openProjectDetail('${project.id}')">
          Open Project →
        </button>
        ${projectState.githubUrl ? `<a href="${projectState.githubUrl}" target="_blank" class="btn btn-ghost btn-sm">GitHub →</a>` : ''}
      </div>
      ` : `
      <div class="project-locked-msg">
        Complete Level ${project.level} missions to unlock this project.
      </div>
      `}
    </div>
  `;
}

window.openProjectDetail = function(projectId) {
  const project = PROJECTS.find(p => p.id === projectId);
  if (!project) return;
  const state = getState();
  const projectState = state.projectData?.[projectId] || { status: 'not-started', completedMilestones: [], githubUrl: '' };

  const modal = document.getElementById('project-modal');
  const content = document.getElementById('project-modal-content');
  modal.style.display = 'flex';

  content.innerHTML = `
    <div class="modal-content glass-card project-detail-modal">
      <div class="modal-header">
        <h2 style="color:${project.color}">${project.icon} ${project.title}</h2>
        <button class="btn-close" onclick="document.getElementById('project-modal').style.display='none'">✕</button>
      </div>
      <div class="project-detail-body">
        <div class="milestones-section">
          <h3>Milestones</h3>
          ${project.milestones.map((m, i) => {
            const done = projectState.completedMilestones?.includes(String(i));
            return `<label class="milestone-item">
              <input type="checkbox" ${done ? 'checked' : ''} onchange="toggleMilestone('${projectId}', '${i}', this.checked)">
              <span class="${done ? 'done-text' : ''}">${m}</span>
            </label>`;
          }).join('')}
        </div>
        <div class="github-section">
          <h3>GitHub URL</h3>
          <input class="text-input" id="gh-url-input" placeholder="${project.githubPlaceholder}" value="${projectState.githubUrl || ''}"
            onchange="saveGithubUrl('${projectId}', this.value)">
        </div>
        <div class="project-status-section">
          <h3>Status</h3>
          <div class="status-buttons">
            ${['not-started', 'in-progress', 'completed'].map(s => `
              <button class="btn ${projectState.status === s ? 'btn-primary' : 'btn-ghost'} btn-sm"
                onclick="updateProjectStatus('${projectId}', '${s}')">
                ${getStatusLabel(s)}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    </div>`;
};

window.toggleMilestone = function(projectId, milestoneIdx, checked) {
  const state = getState();
  if (!state.projectData) state.projectData = {};
  if (!state.projectData[projectId]) state.projectData[projectId] = { status: 'not-started', completedMilestones: [], githubUrl: '' };

  const ms = state.projectData[projectId].completedMilestones;
  if (checked && !ms.includes(milestoneIdx)) {
    ms.push(milestoneIdx);
    addXP(25);
  } else {
    state.projectData[projectId].completedMilestones = ms.filter(m => m !== milestoneIdx);
  }
  updateState({ projectData: state.projectData });
};

window.saveGithubUrl = function(projectId, url) {
  const state = getState();
  if (!state.projectData) state.projectData = {};
  if (!state.projectData[projectId]) state.projectData[projectId] = { status: 'not-started', completedMilestones: [], githubUrl: '' };
  state.projectData[projectId].githubUrl = url;
  updateState({ projectData: state.projectData });
};

window.updateProjectStatus = function(projectId, status) {
  const state = getState();
  if (!state.projectData) state.projectData = {};
  if (!state.projectData[projectId]) state.projectData[projectId] = { status: 'not-started', completedMilestones: [], githubUrl: '' };
  state.projectData[projectId].status = status;
  updateState({ projectData: state.projectData });
  openProjectDetail(projectId);
};

function getStatusLabel(status) {
  const labels = { 'not-started': '⬜ Not Started', 'in-progress': '🔨 In Progress', 'completed': '✅ Completed' };
  return labels[status] || status;
}
