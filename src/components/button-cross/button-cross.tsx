import { UserActivity } from '../../const';

type Props = {
  onClick?: (a: boolean) => void,
}

function ButtonCross({onClick}: Props): JSX.Element {
  const handleCloseClick = () => {
    document.body.style.overflow = UserActivity.Scroll;
    if (onClick) {
      onClick(false);
    }
  };

  return (
    <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={handleCloseClick}>
      <span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
    </button>
  );
}

export default ButtonCross;
