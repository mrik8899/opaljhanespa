import { useEffect } from 'react';

export default function useProtectSite() {
  useEffect(() => {
    // ----------------------
    // Block right-click
    // ----------------------
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);

    // ----------------------
    // Block developer keys
    // ----------------------
    const handleKeyDown = (e) => {
      // F12
      if (e.key === 'F12') e.preventDefault();

      // Ctrl+Shift+I/J or Ctrl+Shift+C
      if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) e.preventDefault();

      // Ctrl+U
      if (e.ctrlKey && e.key.toUpperCase() === 'U') e.preventDefault();

      // Ctrl+S (prevent save) and Ctrl+A (optional)
      if (e.ctrlKey && ['S', 'A'].includes(e.key.toUpperCase())) e.preventDefault();
    };
    document.addEventListener('keydown', handleKeyDown);

    // ----------------------
    // Disable text selection
    // ----------------------
    const handleSelectStart = (e) => e.preventDefault();
    document.addEventListener('selectstart', handleSelectStart);

    const handleCopy = (e) => e.preventDefault();
    document.addEventListener('copy', handleCopy);

    // ----------------------
    // Obfuscate console
    // ----------------------
    const originalConsole = { ...console };
    ['log', 'warn', 'error', 'info', 'debug'].forEach((method) => {
      console[method] = () => {};
    });

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('copy', handleCopy);
      Object.assign(console, originalConsole);
    };
  }, []);
}
