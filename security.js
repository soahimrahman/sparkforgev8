/**
 * SparkForge — Security Layer v3 (Optimized)
 * © 2025 SoSpark Design (Soahim Rahman Tasin)
 * https://www.soahimrahman.pro.bd
 */
(function () {
  'use strict';

  /* ── 1. DEVTOOLS DETECTION (lightweight) ────────────────────────────── */
  var _devOpen = false;

  function _sizeCheck() {
    return (window.outerWidth - window.innerWidth) > 100 ||
           (window.outerHeight - window.innerHeight) > 100;
  }

  function _onDevToolsOpen() {
    if (_devOpen) return;
    _devOpen = true;
    console.clear();
    console.log('%c⛔ SparkForge — Proprietary Software',
      'color:#ff4d4d;font-size:20px;font-weight:900;');
    console.log('%c© 2025 SoSpark Design · soahimrahman2024@gmail.com',
      'color:#999;font-size:13px;');
  }

  /* ── 2. DEVTOOLS OVERLAY ────────────────────────────────────────────── */
  var _overlay = null;

  function _showOverlay() {
    if (_overlay) return;
    _overlay = document.createElement('div');
    _overlay.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:2147483647',
      'background:rgba(0,0,0,0.97)',
      'display:flex', 'flex-direction:column',
      'align-items:center', 'justify-content:center',
      'font-family:sans-serif', 'color:#fff', 'text-align:center'
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

  function _checkDevTools() {
    if (_sizeCheck()) {
      _showOverlay();
      _onDevToolsOpen();
    } else {
      _hideOverlay();
      _devOpen = false;
    }
  }
  setInterval(_checkDevTools, 2000);


  /* ── 3. RIGHT-CLICK BLOCK ───────────────────────────────────────────── */
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    return false;
  }, true);


  /* ── 4. KEYBOARD SHORTCUT BLOCKING ─────────────────────────────────── */
  document.addEventListener('keydown', function (e) {
    var key  = e.key  || '';
    var ctrl = e.ctrlKey || e.metaKey;
    var shift = e.shiftKey;

    if (/^F\d{1,2}$/.test(key)) {
      e.preventDefault(); e.stopImmediatePropagation(); return false;
    }
    if (ctrl && shift && 'ijckeIJCKE'.includes(key)) {
      e.preventDefault(); e.stopImmediatePropagation(); return false;
    }
    if (ctrl && 'uUsSpP'.includes(key)) {
      e.preventDefault(); e.stopImmediatePropagation(); return false;
    }
    var tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (ctrl && (key === 'a' || key === 'A') && tag !== 'input' && tag !== 'textarea') {
      e.preventDefault(); e.stopImmediatePropagation(); return false;
    }
  }, true);


  /* ── 5. TEXT SELECTION (allows inputs & tables) ─────────────────────── */
  document.addEventListener('selectstart', function (e) {
    var tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'td' || tag === 'th') return true;
    if (e.target && e.target.closest) {
      if (e.target.closest('table') || e.target.closest('.table-wrap')) return true;
    }
    e.preventDefault();
    return false;
  }, true);


  /* ── 6. DRAG PREVENTION ─────────────────────────────────────────────── */
  document.addEventListener('dragstart', function (e) {
    e.preventDefault();
  }, true);


  /* ── 7. IFRAME BLOCK ────────────────────────────────────────────────── */
  if (window.self !== window.top) {
    try { window.top.location = window.self.location; }
    catch (e) { document.body.innerHTML = ''; }
  }


  /* ── 8. PRINT BLOCK ─────────────────────────────────────────────────── */
  window.addEventListener('beforeprint', function () {
    document.body.style.display = 'none';
    setTimeout(function () { document.body.style.display = ''; }, 1000);
  });


  /* ── 9. CONSOLE WATERMARK ───────────────────────────────────────────── */
  console.log('%cSparkForge', 'color:#f97316;font-size:32px;font-weight:900;');
  console.log('%c© 2025 SoSpark Design — All rights reserved.\nContact: soahimrahman2024@gmail.com',
    'color:#666;font-size:12px;');


  /* ── 10. DOMAIN LOCK ────────────────────────────────────────────────── */
  // NOTE: Only add hostnames here — NO paths, NO slashes, NO subfolders
  // e.g. 'soahimrahman.github.io' covers ALL paths under that domain
  var _allowed = [
    'localhost',
    '127.0.0.1',
    'sospark.pro.bd',
    'www.sospark.pro.bd',
    'sparkforge.pro.bd',
    'www.sparkforge.pro.bd',
    'soahimrahman.github.io',   // covers /sparkforgev8, /sparkforgev8.1, ALL subfolders
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
        '<p style="font-size:1.1rem;margin-top:16px;color:#555">This tool is proprietary software.<br>' +
        'It is not licensed to run on <strong>' + _host + '</strong>.</p>' +
        '<p style="margin-top:24px;color:#888">© 2025 SoSpark Design · ' +
        '<a href="mailto:soahimrahman2024@gmail.com">soahimrahman2024@gmail.com</a></p></div>';
    });
  }

})();
