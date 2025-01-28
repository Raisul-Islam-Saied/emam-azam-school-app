import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaQuoteRight } from "react-icons/fa6";
import { data } from "../../slideData";

function Slider() {
  const slideData = data;
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const lastSlide = slideData.length - 1;

    if (index > lastSlide) {
      setIndex(0);
    }
    if (index < 0) {
      setIndex(lastSlide);
    }
  }, [index, slideData]);

  useEffect(() => {
    const slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    return () => clearInterval(slider);
  }, [index]);

  // useEffect(() => {
  //       const lastIndex = slideData.length - 1;
  //       if (index < 0) {
  //         setIndex(lastIndex);
  //       }
  //       if (index > lastIndex) {
  //         setIndex(0);
  //       }

  // }, [slideData , index])

  //     console.log('rendaring');

  //     useEffect(() => {

  //      const slider = setInterval(() => {
  //        setIndex(index - 1);
  //      }, 3000);

  //     return () => clearInterval(slider)

  //     }, [index])

  // useEffect(() => {
  //   const slider = setInterval(() => {
  //     setIndex(index + 1);
  //   }, 3000);
  //   return () => clearInterval(slider);
  // }, [index]);

  return (
    <main className="slider">
      <section>
        <div className="title">
          <h2>
            <span>/</span> Review
          </h2>
        </div>
        <div className="slider-card">
          {slideData.map((slide, slideIndex) => {
            const { id, name, post, desc, img } = slide;
            // let position = "nextSlide";

            // if (slideIndex === index) {
            //   position = "activeSlide";
            // }
            // if (
            //   slideIndex === index - 1 ||
            //   (index === 0 && slideIndex === slideData.length - 1)
            // ) {
            //   position = "lastSlide";
            // }
            let position = "nextSlide";
            if (slideIndex === index) {
              position = "activeSlide";
            }
            if (
              slideIndex === index - 1 ||
              (index === 0 && slideIndex === slideData.length - 1)
            ) {
              position = "lastSlide";
            }
            console.log(index);
            return (
              <article key={id} className={position}>
                <div className="slide-img">
                  <img loading="lazy" src={img} alt={name} />
                </div>
                <div className="slide-body">
                  <h3>{name}</h3>
                  <h4>{post}</h4>
                  <p>{desc}</p>
                  <span className="quoteIcon">
                    <FaQuoteRight></FaQuoteRight>
                  </span>
                </div>
              </article>
            );
          })}
        </div>{" "}
        <div className="action">
          <button
            onClick={() => {
              setIndex(index - 1);
            }}
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={() => {
              setIndex(index + 1);
            }}
          >
            <FaAngleRight />
          </button>
        </div>
      </section>
    </main>
  );
}

export default Slider;
