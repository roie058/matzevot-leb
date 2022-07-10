import React from "react";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useEffect, useState } from "react";
const handleDragStart = (e) => e.preventDefault();

const Gallery = (props) => {
  const [item, setItem] = useState();
  useEffect(() => {
    let items = [];
    if (props.img) {
      items = props.img.map((image) => (
        <img
          src={image.src}
          key={image.src}
          onDragStart={handleDragStart}
          style={{ maxHeight: props.maxHeight, maxWidth: props.maxWidth }}
          alt={props.alt}
        />
      ));
    } else {
      items = props.reviews;
    }

    setItem(items);

    return () => (items = []);
  }, [props]);

  return (
    <div style={{ margin: "5%" }}>
      <AliceCarousel
        disableButtonsControls
        autoPlay={props.autoPlay}
        autoPlayInterval="2500"
        responsive={props.responsive}
        mouseTracking
        items={item}
      />
    </div>
  );
};

export default Gallery;
