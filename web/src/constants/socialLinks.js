import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaPhoneSquareAlt,
  FaWhatsappSquare,
} from "react-icons/fa";
import { DiApple } from "react-icons/di";
import { IoIosMailUnread } from "react-icons/io";
import { FcAndroidOs } from "react-icons/fc";

// add reddit and other social media links
export const socialLinks = [
  {
    name: "telephone",
    url: "tel:+263783344929",
    icon: <FaPhoneSquareAlt />,
  },
  {
    name: "mail",
    url: "mailto:mutambironald682@gmail.com",
    icon: <IoIosMailUnread />,
  },
  {
    name: "whatsapp",
    url: `https://wa.me/263783344929?text=${encodeURIComponent(
      "I would like to chat to an available Diginotive Representative",
    )}`,
    icon: <FaWhatsappSquare />,
  },
  {
    name: "facebook",
    url: "https://www.facebook.com/Diginotive.zw",
    icon: <FaFacebook />,
  },
  {
    name: "twitter",
    url: "https://twitter.com/Diginotiverust",
    icon: <FaTwitter />,
  },
  {
    name: "Apple",
    url: "https://www.apple.com/Diginotive_iOS_App",
    icon: <DiApple />,
  },
  {
    name: "Android",
    url: "https://www.play.google.com/Diginotive_On_Android",
    icon: <FcAndroidOs />,
  },
];
