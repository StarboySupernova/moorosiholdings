import React from 'react';
import {
  FaFacebook,
  FaTwitter,
  FaPhoneSquareAlt,
  FaWhatsappSquare,
  FaLinkedin,,
} from 'react-icons/fa';
import { IoIosMailUnread } from 'react-icons/io';

export const socialLinks =  [
  {
    name: 'telephone',
    url: 'tel:+263776798109',
    icon: <FaPhoneSquareAlt />,
  },
  {
    name: 'mail',
    url: 'mailto:info@diginotive.co.zw',
    icon: <IoIosMailUnread />,
  },
  {
    name: 'whatsapp',
    url: `https://wa.me/263776798109?text=${encodeURIComponent(
      "Hello, I would like to inquire about Diginotive's R&D and AI Solutions.",
    )}`,
    icon: <FaWhatsappSquare />,
  },
  {
    name: 'facebook',
    url: 'https://www.facebook.com/diginotivesolutions',
    icon: <FaFacebook />,
  },
  {
    name: 'twitter',
    url: 'https://twitter.com/diginotive_zw',
    icon: <FaTwitter />,
  },
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/company/diginotive-solutions',
    icon: <FaLinkedin />,
  },,
];

 