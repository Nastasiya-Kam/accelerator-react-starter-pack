import { Guitar, GuitarCart } from '../../types/guitars';
import { getGuitarType, numberWithSpaces } from '../../utils/utils';

type Props = {
  guitar: Guitar | GuitarCart,
}

function PopupInfo({guitar}: Props):JSX.Element {
  const { name, previewImg, price, vendorCode, stringCount, type } = guitar;

  return (
    <div className="modal__info">
      <img className="modal__img" src={previewImg.replace('img', 'img/content')} width="67" height="137" alt={name} />
      <div className="modal__info-wrapper">
        <h3 className="modal__product-name title title--little title--uppercase">Гитара {name}</h3>
        <p className="modal__product-params modal__product-params--margin-11">Артикул: {vendorCode}</p>
        <p className="modal__product-params">{getGuitarType(type)}, {stringCount} струнная</p>
        <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{numberWithSpaces(price)} ₽</span></p>
      </div>
    </div>
  );
}

export default PopupInfo;
