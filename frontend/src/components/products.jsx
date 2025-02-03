//eslint-disable-next-line
import {React, useState, useEffect} from 'react';
import propTypes from 'prop-types'
export default function Product({name, image, description, price}){

    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        if (!image || image.length === 0) return;
        const interval = setInterval(() => {
          setCurrentIndex(prevIndex => (prevIndex + 1) % image.length);
        }, 2000);
        return () => clearInterval(interval); // Cleanup on unmount
      }, [image]);   //Defining useState and useEffect Hooks
    
      const currentImage = image[currentIndex]; //add this line

    return(
        <div className="bg-neutral-200 p-4 rounded-lg shadow-md flex flex-col justify-between">
            <div className="w-full">
                <img
                src={image}
                alt={name}
                className="w-full h-56 object-cover rounded-lg mb-2"/>
                <h2 className="text-lg font-bold"></h2>
                <p className="text-sm opacity-50 line-clamp-2">{description}</p>  
            </div>
            <div className="w-full">
                <p className="text-lg font-bold my-2">${price}</p>
                <button className="w-full text-white px-4 py-2 rounded-md bg-neutral-900">
                    More Info</button>
            </div>
        </div>
    )
}

Product.propTypes = {
    name: propTypes.string.isRequired,
    image: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    price: propTypes.number.isRequired
}