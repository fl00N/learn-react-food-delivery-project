import { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({id, name, price, description, image}) => {

    const {cartItems, addToCart, removeFromCart, token, setShowLogin} = useContext(StoreContext)

    const handleAddToCart = () => {
        if (token) {
            addToCart(id)
        } else {
            setShowLogin(true)
        }
    }

    const handleRemoveFromCart = () => {
        if (token) {
            removeFromCart(id)
        } else {
            setShowLogin(true)
        }
    }
  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className='food-item-image' src={image} alt="" />
            {!cartItems[id]
                ? <img className='add' onClick={handleAddToCart} src={assets.add_icon_white} alt='' />
                : <div className='food-item-counter'>
                    <img className='remove-btn' onClick={handleRemoveFromCart} src={assets.remove_icon_red} alt='' />
                    <p>{cartItems[id]}</p>
                    <img className='add-btn' onClick={handleAddToCart} src={assets.add_icon_green} alt="" />
                 </div>
            }
        </div>

        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">${price}</p>
        </div>

    </div>
  )
}

export default FoodItem