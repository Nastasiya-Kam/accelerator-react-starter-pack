import { useState } from 'react';
import { DEFAULT_PAGE, PaginationPage, PAGINATION_STEP } from '../../const';
import { useSelector } from 'react-redux';
import { getCatalogPageCount } from '../../store/guitars-data/selectors';

function Pagination():JSX.Element {
  const [firstPage, setFirstPage] = useState<number>(PaginationPage.First);
  const [lastPage, setLastPage] = useState<number>(PaginationPage.Last);
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE);

  const catalogPageCount = useSelector(getCatalogPageCount);
  const pagination = Array(catalogPageCount).fill(true).map((_, i) => i + 1);

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

                setFirstPage((prevFirstPage) => prevFirstPage - PAGINATION_STEP);
                setLastPage((prevLastPage) => prevLastPage - PAGINATION_STEP);
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
                    setCurrentPage(page);
                  }}
                >
                  {page}
                </a>
              </li>
            );
          })
        }
        {
          (lastPage < catalogPageCount) &&
          <li className="pagination__page pagination__page--next" id="next">
            {/* TODO//?: что означает href=2 */}
            <a
              className="link pagination__page-link"
              href="2"
              onClick={(evt) => {
                evt.preventDefault();

                setFirstPage((prevFirstPage) => prevFirstPage + PAGINATION_STEP);
                setLastPage((prevLastPage) => prevLastPage + PAGINATION_STEP);
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
