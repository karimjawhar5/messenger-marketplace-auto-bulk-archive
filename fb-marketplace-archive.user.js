// ==UserScript==
// @name         FB-MP Archive Chats v2
// @namespace    fb-marketplace
// @version      2025-06-29
// @description  One-click “Archive ALL” for Marketplace chats on messenger.com
// @author       You
// @match        https://www.messenger.com/marketplace
// @grant        GM_addStyle
// @run-at       document-idle
// ==/UserScript==

(async () => {
  /* ── helpers ─────────────────────────────────────────────── */
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  function waitFor(selector, timeout = 15_000) {
    return new Promise((resolve, reject) => {
      const found = document.querySelector(selector);
      if (found) return resolve(found);

      const obs = new MutationObserver(() => {
        const el = document.querySelector(selector);
        if (el) { obs.disconnect(); resolve(el); }
      });
      obs.observe(document, { childList: true, subtree: true });

      setTimeout(() => { obs.disconnect(); reject(`Timeout: ${selector}`); }, timeout);
    });
  }

  /* ── UI: floating button ─────────────────────────────────── */
  function injectBtn() {
    if (document.getElementById('mp-archive-all')) return;

    const btn = document.createElement('button');
    btn.id          = 'mp-archive-all';
    btn.textContent = 'Archive ALL';
    btn.onclick     = archiveAll;

    GM_addStyle(`
      #mp-archive-all{
        position:fixed; top:12px; right:12px; z-index:9999;
        padding:8px 16px; border:0; border-radius:8px;
        background:#1877f2; color:#fff; font-weight:600; cursor:pointer;
      }
      #mp-archive-all:hover{opacity:.85}
    `);

    document.body.appendChild(btn);
  }

  /* ── core: archive every visible thread ───────────────────── */
  async function archiveAll() {
    /** Grab every 3-dot “More options …” button in the list. */
    const menuBtns = [...document.querySelectorAll('[aria-label^="More options"]')];

    if (!menuBtns.length) {
      alert('No Marketplace chats found. Try scrolling the list into view first.');
      return;
    }

    if (!confirm(`Attempt to archive ${menuBtns.length} chats?`)) return;

    let done = 0;
    for (const btn of menuBtns) {
      btn.click();

      try {
        const menu = await waitFor('div[role="menu"]');
        const archiveItem = [...menu.querySelectorAll('[role="menuitem"]')]
          .find(el => /Archive chat|Archive/i.test(el.textContent));

        if (archiveItem) {
          archiveItem.click();
          done++;
        }
      } catch (e) {
        console.warn(e);
      }

      await sleep(100);         // throttle ≈1 op/sec
    }

    alert(`Finished. Requested archive on ${done} chats.`);
  }

  /* ── boot ────────────────────────────────────────────────── */
  injectBtn();
})();
