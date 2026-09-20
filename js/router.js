// Edinburgh Quest — Hash Router
const routes = {};
let currentView = null;

export function registerRoute(hash, handler) {
  routes[hash] = handler;
}

export function navigate(hash) {
  window.location.hash = hash;
}

export function getCurrentHash() {
  return window.location.hash.replace('#', '') || 'dashboard';
}

function handleRoute() {
  const hash = getCurrentHash();
  const mainParts = hash.split('/');
  const routeKey = mainParts[0];
  const handler = routes[routeKey] || routes['dashboard'];
  if (handler) {
    currentView = routeKey;
    handler(mainParts.slice(1));
  }
  // Update nav active state
  document.querySelectorAll('[data-route]').forEach(el => {
    el.classList.toggle('nav-active', el.dataset.route === routeKey);
  });
}

export function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}
