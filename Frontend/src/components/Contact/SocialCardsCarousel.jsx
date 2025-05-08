import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaGooglePlay,
  FaTwitter,
} from "react-icons/fa";
import { Carousel } from "react-bootstrap";
import "./SocialCardsCarousel.css";

const socialMedia = [
  { icon: <FaFacebookF size={30} />, name: "Facebook" },
  { icon: <FaInstagram size={30} />, name: "Instagram" },
  { icon: <FaYoutube size={30} />, name: "YouTube" },
  { icon: <FaTiktok size={30} />, name: "TikTok" },
  { icon: <FaGooglePlay size={30} />, name: "Play Store" },
  { icon: <FaTwitter size={30} />, name: "Twitter" },
];

const splitIntoChunks = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

const SocialCardsCarousel = () => {
  const slides = splitIntoChunks(socialMedia, 3);

  return (
    <div className="mt-5 px-5">
      <Carousel controls indicators={false}>
        {slides.map((group, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex justify-content-center gap-3">
              {group.map((item, idx) => (
                <div key={idx} className="card p-4 text-center shadow-sm" style={{ width: "100px", borderRadius: "20px" }}>
                  <div>{item.icon}</div>
                  <small className="mt-2">{item.name}</small>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default SocialCardsCarousel;
