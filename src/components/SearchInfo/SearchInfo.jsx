import s from "./SearchInfo.module.css";

const SearchInfo = ({searchText, searchCount}) => {
    return (
        searchText && <section className={s.searchTitle}>
            По запросу <span className={s.boldText}>{searchText}</span> найдено {searchCount} товаров
        </section>
    );
};

export default SearchInfo;
