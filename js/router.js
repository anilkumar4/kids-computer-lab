/**
 * Kids Computer Lab — Hash Router
 * Simple hash-based SPA router for static hosting.
 * @module router
 */

class Router {
  constructor() {
    /** @type {Map<string, Function>} */
    this._routes = new Map();
    this._notFound = null;
    this._beforeEach = null;
    this._currentRoute = null;
    this._currentParams = null;

    window.addEventListener('hashchange', () => this._resolve());
    window.addEventListener('load', () => this._resolve());
  }

  /**
   * Register a route pattern.
   * Supports named params: '/lesson/:id' matches '/lesson/a1'
   * @param {string} pattern - Route pattern (e.g., '/home', '/lesson/:id')
   * @param {Function} handler - Route handler(params)
   */
  on(pattern, handler) {
    this._routes.set(pattern, handler);
    return this;
  }

  /** Set a 404 handler */
  notFound(handler) {
    this._notFound = handler;
    return this;
  }

  /** Set a navigation guard called before each route change */
  beforeEach(guard) {
    this._beforeEach = guard;
    return this;
  }

  /** Navigate to a hash route */
  navigate(path) {
    window.location.hash = '#' + path;
  }

  /** Get current route path */
  get currentPath() {
    return this._getPath();
  }

  /** Get current route params */
  get currentParams() {
    return this._currentParams;
  }

  /** Extract path from hash */
  _getPath() {
    const hash = window.location.hash.slice(1) || '/';
    return hash.startsWith('/') ? hash : '/' + hash;
  }

  /** Resolve the current hash against registered routes */
  _resolve() {
    const path = this._getPath();

    // Run guard
    if (this._beforeEach) {
      const proceed = this._beforeEach(path, this._currentRoute);
      if (proceed === false) return;
    }

    // Try each registered route
    for (const [pattern, handler] of this._routes) {
      const params = this._match(pattern, path);
      if (params !== null) {
        this._currentRoute = pattern;
        this._currentParams = params;
        handler(params);
        return;
      }
    }

    // No match — 404
    this._currentRoute = null;
    this._currentParams = null;
    if (this._notFound) {
      this._notFound(path);
    }
  }

  /**
   * Match a path against a pattern.
   * Returns params object on match, null on no match.
   */
  _match(pattern, path) {
    const patternParts = pattern.split('/').filter(Boolean);
    const pathParts = path.split('/').filter(Boolean);

    // Handle root route
    if (patternParts.length === 0 && pathParts.length === 0) {
      return {};
    }

    if (patternParts.length !== pathParts.length) {
      return null;
    }

    const params = {};

    for (let i = 0; i < patternParts.length; i++) {
      const pp = patternParts[i];
      const pv = pathParts[i];

      if (pp.startsWith(':')) {
        // Named parameter
        params[pp.slice(1)] = decodeURIComponent(pv);
      } else if (pp !== pv) {
        // Literal mismatch
        return null;
      }
    }

    return params;
  }

  /** Force re-resolve (useful after dynamic route registration) */
  refresh() {
    this._resolve();
  }
}

const router = new Router();
export default router;
