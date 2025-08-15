'use client';

import { useEffect, useState } from 'react';
import { Workbox } from 'workbox-window';

export function useServiceWorker() {
  const [waitingWorker, setWaitingWorker] = useState(null);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      console.warn('Service workers are not supported in this browser');
      return;
    }

    const wb = new Workbox('/sw.js');
    
    const showSkipWaitingPrompt = (worker) => {
      setWaitingWorker(worker);
      setIsUpdateAvailable(true);
    };

    // Check for updates
    const checkForUpdates = async () => {
      try {
        await wb.register();
        console.log('Service worker registered');
      } catch (error) {
        console.error('Service worker registration failed:', error);
      }
    };

    // Check if the service worker is controlling the page
    if (navigator.serviceWorker.controller) {
      setIsInstalled(true);
    }

    // Listen for the controlling service worker changing
    navigator.serviceWorker.oncontrollerchange = () => {
      window.location.reload();
    };

    // Listen for the installed event which is fired when the service worker is installed
    wb.addEventListener('installed', (event) => {
      if (event.isUpdate) {
        console.log('App updated in the background');
      } else {
        console.log('App is now installed offline-ready!');
        setIsInstalled(true);
      }
    });

    // Listen for the waiting event which is fired when a new service worker is waiting
    wb.addEventListener('waiting', (event) => {
      showSkipWaitingPrompt(event.target);
    });

    // Check for updates on initial load
    checkForUpdates();

    // Check for updates every hour
    const updateInterval = setInterval(checkForUpdates, 60 * 60 * 1000);

    return () => {
      clearInterval(updateInterval);
      wb.removeEventListener('installed');
      wb.removeEventListener('waiting');
    };
  }, []);

  // Function to apply the update
  const updateServiceWorker = () => {
    if (waitingWorker) {
      waitingWorker.addEventListener('statechange', (event) => {
        if (event.target.state === 'activated') {
          window.location.reload();
        }
      });
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    }
    setIsUpdateAvailable(false);
  };

  return { isUpdateAvailable, updateServiceWorker, isInstalled };
}
