import { useState, useEffect, useCallback } from 'react';

// Type definitions for browser-specific fullscreen APIs
interface ExtendedDocument extends Document {
  webkitFullscreenElement?: Element;
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;
  webkitExitFullscreen?: () => Promise<void>;
  mozCancelFullScreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
}

interface ExtendedElement extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

export const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Check if fullscreen is currently active
  const checkFullscreen = useCallback(() => {
    const doc = document as ExtendedDocument;
    const fullscreenElement = document.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.mozFullScreenElement ||
      doc.msFullscreenElement;
    
    setIsFullscreen(!!fullscreenElement);
  }, []);

  // Enter fullscreen mode
  const enterFullscreen = useCallback(async (element?: HTMLElement) => {
    const targetElement = (element || document.documentElement) as ExtendedElement;
    
    try {
      if (targetElement.requestFullscreen) {
        await targetElement.requestFullscreen();
      } else if (targetElement.webkitRequestFullscreen) {
        await targetElement.webkitRequestFullscreen();
      } else if (targetElement.mozRequestFullScreen) {
        await targetElement.mozRequestFullScreen();
      } else if (targetElement.msRequestFullscreen) {
        await targetElement.msRequestFullscreen();
      } else {
        throw new Error('Fullscreen API not supported');
      }
    } catch (error) {
      console.error('Error entering fullscreen:', error);
    }
  }, []);

  // Exit fullscreen mode
  const exitFullscreen = useCallback(async () => {
    const doc = document as ExtendedDocument;
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (doc.webkitExitFullscreen) {
        await doc.webkitExitFullscreen();
      } else if (doc.mozCancelFullScreen) {
        await doc.mozCancelFullScreen();
      } else if (doc.msExitFullscreen) {
        await doc.msExitFullscreen();
      }
    } catch (error) {
      console.error('Error exiting fullscreen:', error);
    }
  }, []);

  // Toggle fullscreen mode - non-async to ensure it runs synchronously with user click
  const toggleFullscreen = useCallback((element?: HTMLElement) => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      // For better compatibility, always target document.documentElement unless specifically requested
      const targetElement = element || document.documentElement;
      enterFullscreen(targetElement);
    }
  }, [isFullscreen, enterFullscreen, exitFullscreen]);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      // Add a small delay to ensure the state has updated
      setTimeout(() => {
        checkFullscreen();
      }, 10);
    };

    // Add event listeners for different browsers
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    // Initial check
    checkFullscreen();

    // Cleanup
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [checkFullscreen]);

  return {
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen,
  };
};