/**
 * SparkForge — Maximum Security Layer v2
 * © 2025 SoSpark Design (Soahim Rahman Tasin)
 * https://www.soahimrahman.pro.bd
 *
 * Unauthorised reproduction or redistribution is prohibited.
 * See LICENSE for full terms.
 */
(function () {
  'use strict';

  /* ── 1. DEVTOOLS DETECTION (multi-method) ───────────────────────────── */
  var _devOpen  = false;
  var _paused   = false;   // debugger trap flag

  // Method A: window size diff
  function _sizeCheck() {
    var w = window.outerWidth  - window.innerWidth;
    var h = window.outerHeight - window.innerHeight;
    return w > 100 || h > 100;
  }

  // Method B: console object check (firebug / older devtools)
  function _consoleCheck() {
    var el = document.createElement('div');
    var opened = false;
    Object.defineProperty(el, 'id', {
      get: function () { opened = true; }
    });
    console.log && console.log(el);
    console.clear && console.clear();
    return opened;
  }

  // Method C: debugger timing trap
  function _debuggerTrap() {
    var start = Date.now();
    (function() { debugger; })(); /* jshint ignore:line */
    return Date.now() - start > 80; // paused in debugger = slow
  }

  function _onDevToolsOpen() {
    if (_devOpen) return;
    _devOpen = true;
    console.clear();
    console.log('%c⛔ SparkForge — Proprietary Software',
      'color:#ff4d4d;font-size:20px;font-weight:900;');
    console.log('%cThis tool is protected under copyright law.\n' +
      'Copying, cloning, or redistributing this code is a violation.\n\n' +
      '© 2025 SoSpark Design · soahimrahman2024@gmail.com',
      'color:#999;font-size:13px;');
  }

  function _checkDevTools() {
    var open = _sizeCheck() || _debuggerTrap();
    if (open) _onDevToolsOpen();
    else _devOpen = false;
  }

  setInterval(_checkDevTools, 500);


  /* ── 2. ALL FUNCTION KEYS BLOCKED ──────────────────────────────────── */
  // Blocks F1–F12 + all DevTools combos at keydown level
  document.addEventListener('keydown', function (e) {
    var key  = e.key  || '';
    var code = e.code || '';
    var ctrl = e.ctrlKey || e.metaKey;
    var shift = e.shiftKey;
    var alt   = e.altKey;

    // Block ALL F-keys (F1–F12)
    if (/^F\d{1,2}$/.test(key)) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }

    // Ctrl+Shift+I/J/C/K/E (DevTools panels)
    if (ctrl && shift && 'ijckeIJCKE'.includes(key)) {
      e.preventDefault(); e.stopImmediatePropagation(); return false;
    }
    // Ctrl+U (view source)
    if (ctrl && (key === 'u' || key === 'U')) {
      e.preventDefault(); e.stopImmediatePropagation(); return false;
    }
    // Ctrl+S (save page)
    if (ctrl && (key === 's' || key === 'S')) {
      e.preventDefault(); e.stopImmediatePropagation(); return false;
    }
    // Ctrl+P (print — can reveal source)
    if (ctrl && (key === 'p' || key === 'P')) {
      e.preventDefault(); e.stopImmediatePropagation(); return false;
    }
    // Ctrl+A (select all — page level)
    // only block when NOT inside input/textarea
    var tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (ctrl && (key === 'a' || key === 'A') && tag !== 'input' && tag !== 'textarea') {
      e.preventDefault(); e.stopImmediatePropagation(); return false;
    }
    // Alt+F4 attempt via JS (partial — OS handles real Alt+F4)
    if (alt && key === 'F4') {
      e.preventDefault(); return false;
    }
  }, true); // ← capture phase = fires before anything else


  /* ── 3. RIGHT-CLICK BLOCK ───────────────────────────────────────────── */
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
  }, true);


  /* ── 4. TEXT SELECTION (smart — allows tool inputs & table) ─────────── */
  document.addEventListener('selectstart', function (e) {
    var tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'td' || tag === 'th') return true;
    if (e.target && e.target.closest) {
      if (e.target.closest('table') || e.target.closest('.table-wrap')) return true;
    }
    e.preventDefault();
    return false;
  }, true);


  /* ── 5. DRAG PREVENTION ─────────────────────────────────────────────── */
  document.addEventListener('dragstart', function (e) {
    e.preventDefault();
  }, true);


  /* ── 6. PRINT BLOCK ─────────────────────────────────────────────────── */
  // Blocks Ctrl+P and window.print()
  window.addEventListener('beforeprint', function (e) {
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    // Hide entire body during print
    document.body.style.display = 'none';
    setTimeout(function () { document.body.style.display = ''; }, 1000);
  });


  /* ── 7. IFRAME BLOCK ────────────────────────────────────────────────── */
  if (window.self !== window.top) {
    try { window.top.location = window.self.location; }
    catch (e) { document.body.innerHTML = ''; }
  }


  /* ── 8. DEVTOOLS OPEN → BLUR PAGE ───────────────────────────────────── */
  // When DevTools is detected open, blur/lock the page content
  var _overlay = null;
  function _showOverlay() {
    if (_overlay) return;
    _overlay = document.createElement('div');
    _overlay.id = '__sf_guard__';
    _overlay.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:2147483647',
      'background:rgba(0,0,0,0.97)',
      'display:flex', 'flex-direction:column',
      'align-items:center', 'justify-content:center',
      'font-family:sans-serif', 'color:#fff', 'text-align:center',
      'cursor:default'
    ].join(';');
    _overlay.innerHTML =
      '<div style="font-size:48px;margin-bottom:16px">⛔</div>' +
      '<h1 style="font-size:22px;font-weight:900;color:#ff4d4d;margin:0 0 12px">Developer tools detected</h1>' +
      '<p style="color:#888;font-size:14px;max-width:360px;line-height:1.6;margin:0">' +
      'SparkForge is proprietary software.<br>' +
      'Inspecting or copying this tool is prohibited.<br><br>' +
      '<span style="color:#555;font-size:12px">© 2025 SoSpark Design · soahimrahman2024@gmail.com</span></p>';
    document.body && document.body.appendChild(_overlay);
  }

  function _hideOverlay() {
    if (_overlay && _overlay.parentNode) {
      _overlay.parentNode.removeChild(_overlay);
      _overlay = null;
    }
  }

  // Enhanced devtools check that also triggers overlay
  function _checkAndOverlay() {
    var open = _sizeCheck();
    if (open) { _showOverlay(); _onDevToolsOpen(); }
    else _hideOverlay();
  }
  setInterval(_checkAndOverlay, 500);


  /* ── 9. CONSOLE WATERMARK ───────────────────────────────────────────── */
  console.log('%cSparkForge', 'color:#f97316;font-size:32px;font-weight:900;');
  console.log('%c© 2025 SoSpark Design — All rights reserved.\nCopying or redistributing this tool is strictly prohibited.\nContact: soahimrahman2024@gmail.com',
    'color:#666;font-size:12px;');


  /* ── 10. DOMAIN LOCK ────────────────────────────────────────────────── */
  var _allowed = [
    'localhost',
    '127.0.0.1',
    'soahimrahmantasin17.github.io',
    'www.soahimrahman.pro.bd',
    'soahimrahman.pro.bd',
  ];
  var _host = (window.location.hostname || '').toLowerCase();
  var _ok   = _allowed.some(function (d) {
    return _host === d || _host.endsWith('.' + d);
  });
  if (!_ok && _host !== '') {
    document.addEventListener('DOMContentLoaded', function () {
      document.body.innerHTML =
        '<div style="font-family:sans-serif;text-align:center;padding:80px 20px;">' +
        '<h1 style="color:#e53e3e;font-size:2rem">⛔ Unauthorised Domain</h1>' +
        '<p style="font-size:1.1rem;margin-top:16px;color:#555">This tool is proprietary software owned by SoSpark Design.<br>' +
        'It is not licensed to run on <strong>' + _host + '</strong>.</p>' +
        '<p style="margin-top:24px;color:#888">© 2025 SoSpark Design · ' +
        '<a href="mailto:soahimrahman2024@gmail.com">soahimrahman2024@gmail.com</a></p></div>';
    });
  }

})();