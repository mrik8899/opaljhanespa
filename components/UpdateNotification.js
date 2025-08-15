'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, RefreshCw } from 'lucide-react';
import { useServiceWorker } from '../hooks/useServiceWorker';

export default function UpdateNotification() {
  const { isUpdateAvailable, updateServiceWorker, isInstalled } = useServiceWorker();

  return (
    <AnimatePresence>
      {isUpdateAvailable && (
        <motion.div
          className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 max-w-sm w-full"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 pt-0.5">
                <RefreshCw className="h-5 w-5 text-emerald-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Update Available</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  A new version of the app is available. Refresh to update.
                </p>
                <div className="mt-2 flex space-x-2">
                  <button
                    type="button"
                    onClick={updateServiceWorker}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  >
                    Update Now
                  </button>
                  <button
                    type="button"
                    onClick={() => {}}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {}}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      )}
      
      {isInstalled && (
        <motion.div
          className="fixed bottom-4 right-4 z-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 max-w-xs flex items-center space-x-2"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1, type: 'spring', damping: 20, stiffness: 300 }}
        >
          <CheckCircle className="h-5 w-5 text-emerald-500" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">Ready to work offline</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
