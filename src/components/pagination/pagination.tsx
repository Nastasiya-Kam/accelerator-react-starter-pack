import { PaginationPage } from '../../const';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsFilter, getCurrentPage, getCurrentPageCount, getFirstPage, getLastPage } from '../../store/user-data/selectors';
import { nextFirstPage, nextLastPage, prevFirstPage, prevLastPage, setCurrentPage } from '../../store/action';
import { getPageCount } from '../../store/guitars-data/selectors';

function Pagination():JSX.Element {
  const isFilter = useSelector(checkIsFilter);
  const mainPageCount = useSelector(getPageCount);
  const currentPageCount = useSelector(getCurrentPageCount);
  const dispatch = useDispatch();
  const firstPage = useSelector(getFirstPage);
  const lastPage = useSelector(getLastPage);
  const currentPage = useSelector(getCurrentPage);

  const pageCount = isFilter ? currentPageCount : mainPageCount;
  const pagination = Array(pageCount).fill(true).map((_, i) => i + 1);

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {
          (firstPage !== PaginationPage.First) &&
          <li className="pagination__page pagination__page--prev" id="prev">
            <a
              className="link pagination__page-link"
              href="1"
              onClick={(evt) => {
                evt.preventDefault();

                dispatch(prevFirstPage());
                dispatch(prevLastPage());
              }}
            >
              Назад
            </a>
          </li>
        }
        {
          pagination.slice(firstPage, lastPage).map((page) => {
            const key = `${page}-page`;

            return (
              <li key={key} className="pagination__page">
                <a
                  className={`link pagination__page-link${(page === currentPage) ? ' pagination__page--active' : ''}`}
                  href="##"
                  // //TODO путь на страницу каталога {AppRoute.CatalogPage.replace(ReplacedPart.Page, `page_${page}`)}
                  onClick={() => {
                    dispatch(setCurrentPage(page));
                  }}
                >
                  {page}
                </a>
              </li>
            );
          })
        }
        {
          (lastPage < pageCount) &&
          <li className="pagination__page pagination__page--next" id="next">
            {/* TODO//?: что означает href=2 */}
            <a
              className="link pagination__page-link"
              href="2"
              onClick={(evt) => {
                evt.preventDefault();

                dispatch(nextFirstPage());
                dispatch(nextLastPage());
              }}
            >
              Далее
            </a>
          </li>
        }
      </ul>
    </div>
  );
}

export default Pagination;
