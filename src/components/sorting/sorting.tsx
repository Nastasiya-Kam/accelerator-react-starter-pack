import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Order, Sort } from '../../const';
import { setOrder, setSorting } from '../../store/action';

function Sorting():JSX.Element {
  const dispatch = useDispatch();

  const [currentSorting, setCurrentSorting] = useState<string>('');
  const [currentOrder, setCurrentOrder] = useState<string>('');

  const typeHandler = (type: string): void => {
    if (currentOrder === '') {
      setCurrentOrder(Order.Asc);
      dispatch(setOrder(Order.Asc));
    }
    setCurrentSorting(type);
    dispatch(setSorting(type));
  };

  const orderHandler = (order: string): void => {
    if (currentSorting === '') {
      setCurrentSorting(Sort.Price);
      dispatch(setSorting(Sort.Price));
    }
    setCurrentOrder(order);
    dispatch(setOrder(order));
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button${(currentSorting === Sort.Price) ? ' catalog-sort__type-button--active' : ''}`}
          aria-label="по цене"
          tabIndex={(currentSorting === Sort.Price) ? -1 : 0}
          onClick={() => typeHandler(Sort.Price)}
        >
          по цене
        </button>
        <button
          className={`catalog-sort__type-button${(currentSorting === Sort.Rating) ? ' catalog-sort__type-button--active' : ''}`}
          aria-label="по популярности"
          tabIndex={(currentSorting === Sort.Rating) ? -1 : 0}
          onClick={()=> typeHandler(Sort.Rating)}
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up${(currentOrder === Order.Asc) ? ' catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          tabIndex={(currentOrder === Order.Asc) ? -1 : 0}
          onClick={()=> orderHandler(Order.Asc)}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down${(currentOrder === Order.Desc) ? ' catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
          tabIndex={(currentOrder === Order.Desc) ? -1 : 0}
          onClick={()=> orderHandler(Order.Desc)}
        >
        </button>
      </div>
    </div>
  );
}

export default Sorting;
