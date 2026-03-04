import {FaFacebook, FaInstagram,FaTwitter} from 'react-icons/fa';
import {MdEmail} from 'react-icons/md';

import React from 'react'

function SocialMedia() {
  return (
    <div className="flex space-x-6 mt-8">
        <a
            href="mailto:pratiksharma2004@gmail.com"
            className="text-indigo-300 hover:text-indigo-100 transition-colors duration-300"
        >
            <MdEmail className="w-8 h-8" />
        </a>
        <a
            href="https://www.facebook.com/creativepratik16/"
            className="text-indigo-300 hover:text-indigo-100 transition-colors duration-300"
        >
            <FaFacebook className="w-8 h-8" />
        </a>
        <a
            href="https://www.instagram.com/creativepratik22/"
            className="text-indigo-300 hover:text-indigo-100 transition-colors duration-300"
        >
            <FaInstagram className="w-8 h-8" />
        </a>
        <a
            href="https://www.twitter.com/creativepratik_"
            className="text-indigo-300 hover:text-indigo-100 transition-colors duration-300"
        >
            <FaTwitter className="w-8 h-8" />
        </a>
    </div>
  )
}

export default SocialMedia
