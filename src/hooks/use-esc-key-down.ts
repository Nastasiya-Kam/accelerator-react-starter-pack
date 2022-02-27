import { useCallback, useEffect } from 'react';
import { KeyCode, UserActivity } from '../const';

const useEscKeyDown = (onClick: (a: boolean) => void) => {
  const handleEscKeyDown = useCallback((evt) => {
    if(evt.keyCode === KeyCode.Escape) {
      document.body.style.overflow = UserActivity.Scroll;
      onClick(false);
    }
  }, [ onClick ]);

  useEffect(() => {
    document.addEventListener(UserActivity.Keydown, handleEscKeyDown);
    return () => document.removeEventListener(UserActivity.Keydown, handleEscKeyDown);
  }, [ handleEscKeyDown ]);
};

export { useEscKeyDown };
