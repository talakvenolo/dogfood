import './index.css';
import Card from "../Card/Card";


const CardList = ({goods, currentUser, onProductLike}) => {


    return (
        <div className='cards'>
            {goods.map(el => {
                return (
                    <Card key={el._id} {...el} onProductLike={onProductLike} currentUser={currentUser} />
                )
            }) }
        </div>
    );
};

export default CardList;
