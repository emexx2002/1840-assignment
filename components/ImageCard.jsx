// components/ImageCard.js
import React from 'react';

const ImageCard = ({ imageUrl, altDescription }) => {
    return (
        <div className="border border-gray-300 rounded shadow">
            <div className='w-full h-2/3'>
                <img src={imageUrl} alt={altDescription} className="w-full h-full object-cover mb-2" loading="lazy" />
            </div>

            <div className='px-3 h-1/3 flex capitalize font-semibold items-center'>
                <p className="text-gray-800">{altDescription}</p>

            </div>

        </div>
    );
};

export default ImageCard;
