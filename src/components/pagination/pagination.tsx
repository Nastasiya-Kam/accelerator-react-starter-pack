import { AppRoute, DEFAULT_PAGE, PAGINATION_STEP, ReplacedPart } from '../../const';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsFilter, getCurrentPage, getCurrentPageCount, getFirstPage, getLastPage } from '../../store/user-data/selectors';
import { nextFirstPage, nextLastPage, prevFirstPage, prevLastPage, setCurrentPage } from '../../store/action';
import { getPageCount } from '../../store/guitars-data/selectors';
import { useLocation } from 'react-router-dom';
import browserHistory from '../../browser-history';

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

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {
          (currentPage !== DEFAULT_PAGE) &&
          <li className="pagination__page pagination__page--prev" id="prev">
            <a
              className="link pagination__page-link"
              href="##"
              onClick={(evt) => {
                evt.preventDefault();

                const newCurrentPage = currentPage - 1;

                if (newCurrentPage % PAGINATION_STEP === 0) {
                  dispatch(prevFirstPage());
                  dispatch(prevLastPage());
                }

                dispatch(setCurrentPage(newCurrentPage));
                browserHistory.push(AppRoute.CatalogPage.replace(ReplacedPart.Page, `page_${newCurrentPage}/?${searchParams.toString()}`));
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
                  href="##"
                  className={`link pagination__page-link${(page === currentPage) ? ' pagination__page--active' : ''}`}
                  onClick={(evt) => {
                    evt.preventDefault();
                    dispatch(setCurrentPage(page));
                    browserHistory.push(AppRoute.CatalogPage.replace(ReplacedPart.Page, `page_${page}/?${searchParams.toString()}`));
                  }}
                >
                  {page}
                </a>
              </li>
            );
          })
        }
        {
          (currentPage !== currentPageCount && currentPageCount !== 0) &&
          <li className="pagination__page pagination__page--next" id="next">
            <a
              className="link pagination__page-link"
              href="##"
              onClick={(evt) => {
                evt.preventDefault();

                const newCurrentPage = currentPage + 1;

                if (newCurrentPage % PAGINATION_STEP === 1) {
                  dispatch(nextFirstPage());
                  dispatch(nextLastPage());
                }

                dispatch(setCurrentPage(newCurrentPage));
                browserHistory.push(AppRoute.CatalogPage.replace(ReplacedPart.Page, `page_${newCurrentPage}/?${searchParams.toString()}`));
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
