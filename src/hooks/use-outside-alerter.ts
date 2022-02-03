import { RefObject, useEffect } from 'react';
import { UserActivity } from '../const';

const useOutsideClicker = (ref: RefObject<HTMLDivElement>, onClick: (a: boolean) => void) => {
  useEffect(() => {
    const handleOutsideClick = (evt: any) => {
      if (ref.current && !ref.current.contains(evt.target)) {
        document.body.style.overflow = UserActivity.Scroll;
        onClick(false);
      }
    };

    document.addEventListener(UserActivity.Mousedown, handleOutsideClick);
    return () => document.removeEventListener(UserActivity.Mousedown, handleOutsideClick);
  }, [ ref, onClick ]);
};

export { useOutsideClicker };
