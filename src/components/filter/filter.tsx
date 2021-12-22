import { STRINGS_COUNT, TYPE_GUITARS } from '../../const';
import FilterPrice from '../filter-price/filter-price';

function Filter():JSX.Element {

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <FilterPrice />
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>

        {
          TYPE_GUITARS.map((guitar, index) => {
            const key = `${index}-${guitar}`;
            // TODO: продумать checked. По умолчанию не расставлены.
            // TODO: при обновлении сбрасывается?
            return (
              <div key={key} className="form-checkbox catalog-filter__block-item">
                <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic" />
                <label htmlFor="acoustic">{guitar}</label>
              </div>
            );
          })
        }
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        {
          STRINGS_COUNT.map((stringCount, index) => {
            const key = `${index}-${stringCount}`;

            // TODO: каждый тип гитары отличается по количеству струн
            return (
              <div key={key} className="form-checkbox catalog-filter__block-item">
                <input className="visually-hidden" type="checkbox" id={`${stringCount}-strings`} name={`${stringCount}-strings`} />
                <label htmlFor={`${stringCount}-strings`}>{stringCount}</label>
              </div>
            );
          })
        }
      </fieldset>
    </form>
  );
}

export default Filter;
