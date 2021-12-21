import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSortOrderAction } from '../../store/api-actions';

// TODO подумать над типом переменных
enum Params {
  Sort = 'sort',
  Order = 'order',
}

enum Sort {
  Price = 'price',
  Rating = 'rating',
}

enum Order {
  Desc = 'desc',
  Asc = 'asc,'
}

function Sorting():JSX.Element {
  const dispatch = useDispatch();

  const [sort, setSort] = useState<string>('');
  const [order, setOrder] = useState<string>('');

  useEffect(() => {
    dispatch(fetchSortOrderAction(`?_${Params.Sort}=${sort}${order && `&_${Params.Order}=${order}`}`));
  }, [sort, order]);


  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button${(sort === Sort.Price) ? ' catalog-sort__type-button--active' : ''}`}
          aria-label="по цене"
          tabIndex={(sort === Sort.Price) ? -1 : 0}
          onClick={()=> setSort(Sort.Price)}
        >
          по цене
        </button>
        <button
          className={`catalog-sort__type-button${(sort === Sort.Rating) ? ' catalog-sort__type-button--active' : ''}`}
          aria-label="по популярности"
          tabIndex={(sort === Sort.Rating) ? -1 : 0}
          onClick={()=> setSort(Sort.Rating)}
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up${(order === Order.Asc) ? ' catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          tabIndex={(order === Order.Asc) ? -1 : 0}
          onClick={()=> {
            if (sort === '') {
              setSort(Sort.Price);
            }
            setOrder(Order.Asc);
          }}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down${(order === Order.Desc) ? ' catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
          tabIndex={(order === Order.Desc) ? -1 : 0}
          onClick={()=> {
            if (sort === '') {
              setSort(Sort.Price);
            }
            setOrder(Order.Desc);
          }}
        >
        </button>
      </div>
    </div>
  );
}

export default Sorting;
