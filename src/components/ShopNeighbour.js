import React from 'react'
import './ShopNeighbour.css'

const ShopNeighbour = () => {
  return (
    <div className='class-parent-flex1'>
      <div className='p1'>Shop At Market</div>
      <div className='flx'>
        <ul>
            <li>
                <img className='imt' src='https://flamingoestate.com/cdn/shop/files/PH_48009.jpg?v=1688604507' alt='img'></img>
                <p className='txt'>Lifestyle</p>
            </li>
            <li>
                <img className='imt' src='https://cdn-7.nikon-cdn.com/Images/Learn-Explore/Photography-Techniques/2020/Donna-Crous-food-photography/Media/Donna-Crous-food-photography-Popcorn-hand-n-triangle-styling.jpg' alt='img'></img>
                <p className='txt'>Food</p>
            </li>
            <li>
                <img className='imt' src='https://images.pexels.com/photos/4113664/pexels-photo-4113664.jpeg?cs=srgb&dl=pexels-alleksana-4113664.jpg&fm=jpg' alt='img'></img>
                <p className='txt'>Drinks</p>
            </li>
            <li>
                <img className='imt' src='https://www.weronika.co.uk/wp-content/uploads/2023/03/olivia-michael-candle-co-weronika-karczewska-product-photography-0-6-801x1200.jpg' alt='img'></img>
                <p className='txt'>Homeware</p>
            </li>
        </ul>
      </div>
    </div>
  )
}

export default ShopNeighbour
