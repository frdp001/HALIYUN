/**
 * Obfuscates a string to prevent simple keyword scanners from flagging it.
 * Returns a React-compatible structure or string.
 */
export const obfuscate = (text: string) => {
  return text.split('').map((char, i) => (
    <span key={i} className="inline-block">
      {char}
      {i % 3 === 0 && <span className="sr-only">{Math.random().toString(36).substring(7)}</span>}
    </span>
  ));
};

/**
 * Basic bot detection to deter automated scanners.
 */
export const isBot = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const bots = ['googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider', 'yandexbot', 'sogou', 'exabot', 'facebot', 'ia_archiver'];
  return bots.some(bot => userAgent.includes(bot)) || !!(window as any)._phantom || !!(window as any).__nightmare;
};

/**
 * Basic client-side security measures to deter simple scraping and framing.
 */
export const initSecurity = () => {
  if (typeof window === 'undefined') return;
  
  // ... existing code ...

  // 1. Frame Busting
  // Ensures the site is not being displayed inside an unauthorized iframe
  if (window.self !== window.top) {
    try {
      if (window.top) {
        window.top.location.href = window.self.location.href;
      }
    } catch (e) {
      // If cross-origin prevents access to top, at least hide the body
      document.body.style.display = 'none';
    }
  }

  // 2. Disable Right-Click (Deterrent)
  document.addEventListener('contextmenu', (e) => {
    // Only disable if not in development
    if (process.env.NODE_ENV === 'production') {
      e.preventDefault();
    }
  });

  // 3. Basic Anti-Debugging
  // This makes it slightly more annoying to use devtools
  if (process.env.NODE_ENV === 'production') {
    setInterval(() => {
      (function() {
        return false;
      }['constructor']('debugger')['call']());
    }, 2000);
  }
};
