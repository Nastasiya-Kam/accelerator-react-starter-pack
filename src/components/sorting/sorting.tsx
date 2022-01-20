import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import browserHistory from '../../browser-history';
import { Filter, Order, Sort } from '../../const';
import { setOrder, setSorting } from '../../store/action';
import { getOrder, getSorting } from '../../store/user-data/selectors';

function Sorting():JSX.Element {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const sortingType = useSelector(getSorting);
  const orderType = useSelector(getOrder);

  const dispatch = useDispatch();

  const [currentSorting, setCurrentSorting] = useState<string>(sortingType);
  const [currentOrder, setCurrentOrder] = useState<string>(orderType);

  useEffect(() => {
    setCurrentSorting(sortingType);
    setCurrentOrder(orderType);
  }, [sortingType, orderType]);

  const handleTypeClick = (type: string): void => {
    if (currentOrder === '') {
      setCurrentOrder(Order.Asc);
      dispatch(setOrder(Order.Asc));
    }

    setCurrentSorting(type);
    dispatch(setSorting(type));
    searchParams.set(Filter.SortingType, type);

    browserHistory.push(`${location.pathname}?${searchParams.toString()}`);
  };

  const handleOrderClick = (order: string): void => {
    if (currentSorting === '') {
      setCurrentSorting(Sort.Price);
      dispatch(setSorting(Sort.Price));
    }

    setCurrentOrder(order);
    dispatch(setOrder(order));
    searchParams.set(Filter.OrderingType, order);

    browserHistory.push(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button${(currentSorting === Sort.Price) ? ' catalog-sort__type-button--active' : ''}`}
          aria-label="по цене"
          tabIndex={(currentSorting === Sort.Price) ? -1 : 0}
          onClick={() => handleTypeClick(Sort.Price)}
        >
          по цене
        </button>
        <button
          className={`catalog-sort__type-button${(currentSorting === Sort.Rating) ? ' catalog-sort__type-button--active' : ''}`}
          aria-label="по популярности"
          tabIndex={(currentSorting === Sort.Rating) ? -1 : 0}
          onClick={()=> handleTypeClick(Sort.Rating)}
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up${(currentOrder === Order.Asc) ? ' catalog-sort__order-button--up-active' : ''}`}
          aria-label="По возрастанию"
          tabIndex={(currentOrder === Order.Asc) ? -1 : 0}
          onClick={()=> handleOrderClick(Order.Asc)}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down${(currentOrder === Order.Desc) ? ' catalog-sort__order-button--down-active' : ''}`}
          aria-label="По убыванию"
          tabIndex={(currentOrder === Order.Desc) ? -1 : 0}
          onClick={()=> handleOrderClick(Order.Desc)}
        >
        </button>
      </div>
    </div>
  );
}

export default Sorting;
