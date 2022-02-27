import { useCallback, useEffect } from 'react';
import { KeyCode, UserActivity } from '../const';

const useEscKeyDown = (onClick: (a: boolean) => void, isScrollBlocked = true) => {
  const handleEscKeyDown = useCallback((evt) => {
    if(evt.keyCode === KeyCode.Escape) {
      if (isScrollBlocked) {
        document.body.style.overflow = UserActivity.Scroll;
      }
      onClick(false);
    }
  }, [ onClick, isScrollBlocked ]);

  useEffect(() => {
    document.addEventListener(UserActivity.Keydown, handleEscKeyDown);
    return () => document.removeEventListener(UserActivity.Keydown, handleEscKeyDown);
  }, [ handleEscKeyDown ]);
};

export { useEscKeyDown };
