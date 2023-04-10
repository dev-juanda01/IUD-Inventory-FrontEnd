import React from "react";
import "./Carousel.css";

export default function Carousel() {
  return (
    <div id="carouselExample" className="carousel slide">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="img/mobile-1.jpg" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="img/mobile-2.jpg" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="img/mobile-3.jpg" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="img/computer-1.jpg" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="img/computer-2.jpg" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="img/computer-3.jpg" className="d-block w-100" alt="..." />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

// <section className="carousel">
//   <img src="img/mobile-1.jpg" alt="Logo mobile 1" />
//   <img src="img/mobile-2.jpg" alt="Logo mobile 2" />
//   <img src="img/mobile-3.jpg" alt="Logo mobile 3" />
//   <img src="img/computer-1.jpg" alt="Logo computer 1" />
//   <img src="img/computer-2.jpg" alt="Logo computer 2" />
//   <img src="img/computer-3.jpg" alt="Logo computer 3" />
// </section>
