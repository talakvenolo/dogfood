import Header from "../Header/Header";
import {useEffect, useState} from "react";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import Footer from "../Footer/Footer";
import api from "../../utils/api";
import SearchInfo from "../SearchInfo/SearchInfo";
import useDebounce from "../../hooks/useDebounce";
import {isLiked} from "../../utils/products";
import {Route, Routes} from "react-router-dom";
import CatalogPage from "../../pages/CatalogPage/CatalogPage";
import ProductPage from "../../pages/ProductPage/ProductPage";
import NotFoundPage from "../../pages/ NotFoundPage/NotFoundPage";
import {UserContext} from "../../context/userContext";
import {CardContext} from "../../context/cardContext";

function Application() {
    const [cards, setCards] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const debounceSearchQuery = useDebounce(searchQuery, 300);

    useEffect(() => {
        setIsLoading(true);
        Promise.all([api.getUserInfo(), api.getProductList()])
            .then(([userData, cardData]) => {
                setCurrentUser(userData);
                setCards(cardData.products);
            })
            .catch(err => console.error(err))
            .finally(() => {
                setIsLoading(false);
            })
    }, []);

    useEffect(() => {
        handleRequest();
        console.log('INPUT', debounceSearchQuery)
    },[debounceSearchQuery]);

    const handleRequest = () => {
        setIsLoading(true);
        api.search(debounceSearchQuery).then(data => {
            setCards(data);
        }).catch(err => console.error(err))
            .finally(() => {
                setIsLoading(false);
            })
    }
    function handleFormSubmit(e) {
        e.preventDefault();
        handleRequest();
    }
    const handleInputChange = (inputValue) => {
        setSearchQuery(inputValue);
    }

    const handleUpdateUser = (userUpdate) => {
        api.setUserInfo(userUpdate).then((newUserData) => {
            setCurrentUser(newUserData);
        })
    }

    const handleProductLike = (product) => {
        const liked = isLiked(product.likes, currentUser._id); //ищем в массиве лайков id текущего пользователя.
        api.changeLikeProduct(product._id, liked).then((newCard) => { // в зависимости от того есть ли лайки или нет отправляем запрос "DELETE" или "PUT"
            const newCards = cards.map((card) => {
                // console.log('Карточка в переборе', card);
                // console.log('Карточка с сервера', newCard);
                return card._id === newCard._id ? newCard : card;
            })
            setCards(newCards);
        })
    }

    return (
        <UserContext.Provider value={{user: currentUser, isLoading}}> {/* Внедряем данные из стейта currentUser  с помощью провайдера контекста*/}
            <CardContext.Provider value={{cards, handleLike: handleProductLike}}>
            <Header user={currentUser} updateUserHandle={handleUpdateUser}> {/*Всем дочерним элементам доступен контекст*/}
                <Logo className='logo logo_place_header' href='/' />
                <Routes>
                    <Route path="/" element={
                        <Search onInput={handleInputChange} onSubmit={handleFormSubmit} />
                    } />
                </Routes>

            </Header>
            <main className='content container'>
                <SearchInfo searchCount={cards.length} searchText={searchQuery} />
                <Routes>
                    <Route index element={<CatalogPage />} />
                    <Route path="/product/:productId" element={<ProductPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
            <Footer />
            </CardContext.Provider>
        </UserContext.Provider>
    )
}

export default Application;
