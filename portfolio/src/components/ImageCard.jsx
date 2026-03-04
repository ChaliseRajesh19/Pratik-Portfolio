import React from 'react'

function ImageCard({ work }) {
  const imageSrc = work?.imageURL
    ? work.imageURL.startsWith('http')
      ? work.imageURL
      : `${import.meta.env.VITE_API_URL}${work.imageURL}`
    : '';

  return (
    <>
      {work? (
        <div className="w-64 bg-white rounded-2xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300">
          <img
            src={imageSrc}
            alt={work?.title || 'Work image'}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl text-black font-bold">{work?.title}</h3>
          </div>
        </div>
      ) : (
        <div className="w-64 h-48 bg-gray-300 rounded-2xl flex items-center justify-center">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}
    </>
  )
}

export default ImageCard;