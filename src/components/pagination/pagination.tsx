import { PAGINATIONS } from '../../const';

function Pagination():JSX.Element {
  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {/* //TODO: если первая страница, то кнопка назад - удалить */}
        {/* <li className="pagination__page pagination__page--prev" id="prev"><a className="link pagination__page-link" href="1">Назад</a></li> */}
        {
          PAGINATIONS.map((pagination, index) => {
            const key = `${index}-${pagination}`;
            // TODO: настроить  pagination__page--active
            return (
              <li key={key} className="pagination__page">
                <a className="link pagination__page-link" href={pagination}>{pagination}</a>
              </li>
            );
          })
        }
        {/* //TODO: если листов больше нет, то кнопку далее - удалить */}
        <li className="pagination__page pagination__page--next" id="next"><a className="link pagination__page-link" href="2">Далее</a></li>
      </ul>
    </div>
  );
}

export default Pagination;
