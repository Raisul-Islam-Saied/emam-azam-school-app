import PageTitle from "./Heading/PageTitle";
import PageHeadingImage from "./Heading/HeadingImage";
import PageHead from "./Heading/PageHead";
import PageSubtitle from "./Heading/PageSubtitle";
import peep from "../assets/images/peep32.svg";
import image from "../assets/images/1-video-gallery.webp";
import image2 from "../assets/images/2-scoreboard.webp";
import image3 from "../assets/images/3-flight-booking.webp";
import image4 from "../assets/images/4-manage-bookstore.webp";
import image5 from "../assets/images/5-lws-blog.webp";
import image6 from "../assets/images/6-expense-tracker.webp";
import image7 from "../assets/images/7-todo-application.webp";
import image8 from "../assets/images/8-product-cart.webp";
import image9 from "../assets/images/9-lwsjob-finder.webp";
import image10 from "../assets/images/10-chat-application.webp";
import useIntersection from "../hooks/useIntersection";

function Section2() {
  const [ref, visible] = useIntersection({ threshold: 0.1 });
  return (
    <section
      id="project"
      ref={ref}
      className="w-full relative    py-20 border-b border-b-slate-300 dark:border-b-slate-600 "
    >
      <div className="container w-[90%] mx-auto ">
        <PageTitle>
          <PageHeadingImage src={peep} visible={visible} />
          <PageHead>
            কোর্সে যে <span className="primary-highlighter">প্রজেক্ট</span> গুলো
            করানো হবে
          </PageHead>
          <PageSubtitle>দশটি প্রজেক্ট আমরা একসাথে করবো</PageSubtitle>
        </PageTitle>

        <div className="grid grid-cols-2 gap-4 mt-16 w-[93%] mx-auto md:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7].map((a) => {
            return (
              <div className="overflow-hidden  col-span-2 rounded-md md:row-span-2 ">
                <div>
                  <img
                    loading="lazy"
                    src={`image${a}`}
                    className={`  transition-all duration-500 ease-in-out hover:scale-105 object-cover `}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Section2;
