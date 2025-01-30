import PageTitle from "./Heading/PageTitle";
import PageHeadingImage from "./Heading/HeadingImage";
import PageHead from "./Heading/PageHead";
import PageSubtitle from "./Heading/PageSubtitle";
import peep from "../assets/images/peep4.svg";
import image from "../assets/images/1-video-gallery.webp";

import useIntersection from "../hooks/useIntersection";
import { StarIcon } from "@heroicons/react/24/outline";

function Section3() {
  const [ref, visible] = useIntersection({ threshold: 0.1 });
  return (
    <section
      id="what-you-get"
      ref={ref}
      className="w-full relative    py-20 "
    >
      <div className="container w-[90%] mx-auto ">
        <PageTitle>
          <PageHeadingImage
            src={peep}
            visible={visible}
            className="!w-[5.4rem] "
          />
          <PageHead>
            কোর্স করে কি পাবেন
            <span className="primary-highlighter"> আর কি পাবেন না</span>
          </PageHead>
          <PageSubtitle>
            কোর্সটি শেষ করার পর আপনি আমাদের থেকে যা কিছু পাবেন বা পাবেন না
          </PageSubtitle>
        </PageTitle>

        <div className="grid grid-cols-1 gap-10 md:gap-6 mt-16 mx-auto md:grid-cols-2 lg:grid-cols-3   ">
          <div className="section3-grid">
            <span className="bg-fuchsia-600/10 p-4 rounded-full dark:bg-purple-700/20">
              <StarIcon className="w-6 stroke-violet-700  dark:stroke-purple-600" />
            </span>

            <h3 className="font-semibold text-gray-900/90  dark:text-slate-200 text-[1.1rem]">
              কোর্স সার্টিফিকেট নেই
            </h3>
            <p className="text-center text-gray-800 dark:text-slate-200/70 text-md">
              যেহেতু এটি সেলফ-পেসড ভিডিও অনলি কোর্স তাই এই কোর্সের কোন অফিসিয়াল
              সার্টিফিকেট আমরা দিচ্ছিনা। যদি শুধু সার্টিফিকেট প্রাপ্তি আপনার
              উদ্দেশ্য হয় তাহলে এই কোর্সটি আপনার জন্য নয়। এই কোর্সটি শুধু
              রিডাক্স বুঝার জন্য।
            </p>
          </div>{" "}
          <div className="section3-grid">
            <span className="bg-fuchsia-600/10 p-4 rounded-full dark:bg-purple-700/20">
              <StarIcon className="w-6 stroke-violet-700  dark:stroke-purple-600" />
            </span>

            <h3 className="font-semibold text-gray-900/90  dark:text-slate-200 text-[1.1rem]">
              কোর্স সার্টিফিকেট নেই
            </h3>
            <p className="text-center text-gray-800 dark:text-slate-200/70 text-md">
              যেহেতু এটি সেলফ-পেসড ভিডিও অনলি কোর্স তাই এই কোর্সের কোন অফিসিয়াল
              সার্টিফিকেট আমরা দিচ্ছিনা। যদি শুধু সার্টিফিকেট প্রাপ্তি আপনার
              উদ্দেশ্য হয় তাহলে এই কোর্সটি আপনার জন্য নয়। এই কোর্সটি শুধু
              রিডাক্স বুঝার জন্য।
            </p>
          </div>{" "}
          <div className="section3-grid">
            <span className="bg-fuchsia-600/10 p-4 rounded-full dark:bg-purple-700/20">
              <StarIcon className="w-6 stroke-violet-700  dark:stroke-purple-600" />
            </span>

            <h3 className="font-semibold text-gray-900/90  dark:text-slate-200 text-[1.1rem]">
              কোর্স সার্টিফিকেট নেই
            </h3>
            <p className="text-center text-gray-800 dark:text-slate-200/70 text-md">
              যেহেতু এটি সেলফ-পেসড ভিডিও অনলি কোর্স তাই এই কোর্সের কোন অফিসিয়াল
              সার্টিফিকেট আমরা দিচ্ছিনা। যদি শুধু সার্টিফিকেট প্রাপ্তি আপনার
              উদ্দেশ্য হয় তাহলে এই কোর্সটি আপনার জন্য নয়। এই কোর্সটি শুধু
              রিডাক্স বুঝার জন্য।
            </p>
          </div>{" "}
          <div className="section3-grid">
            <span className="bg-fuchsia-600/10 p-4 rounded-full dark:bg-purple-700/20">
              <StarIcon className="w-6 stroke-violet-700  dark:stroke-purple-600" />
            </span>

            <h3 className="font-semibold text-gray-900/90  dark:text-slate-200 text-[1.1rem]">
              কোর্স সার্টিফিকেট নেই
            </h3>
            <p className="text-center text-gray-800 dark:text-slate-200/70 text-md">
              যেহেতু এটি সেলফ-পেসড ভিডিও অনলি কোর্স তাই এই কোর্সের কোন অফিসিয়াল
              সার্টিফিকেট আমরা দিচ্ছিনা। যদি শুধু সার্টিফিকেট প্রাপ্তি আপনার
              উদ্দেশ্য হয় তাহলে এই কোর্সটি আপনার জন্য নয়। এই কোর্সটি শুধু
              রিডাক্স বুঝার জন্য।
            </p>
          </div>{" "}
          <div className="section3-grid">
            <span className="bg-fuchsia-600/10 p-4 rounded-full dark:bg-purple-700/20">
              <StarIcon className="w-6 stroke-violet-700  dark:stroke-purple-600" />
            </span>

            <h3 className="font-semibold text-gray-900/90  dark:text-slate-200 text-[1.1rem]">
              কোর্স সার্টিফিকেট নেই
            </h3>
            <p className="text-center text-gray-800 dark:text-slate-200/70 text-md">
              যেহেতু এটি সেলফ-পেসড ভিডিও অনলি কোর্স তাই এই কোর্সের কোন অফিসিয়াল
              সার্টিফিকেট আমরা দিচ্ছিনা। যদি শুধু সার্টিফিকেট প্রাপ্তি আপনার
              উদ্দেশ্য হয় তাহলে এই কোর্সটি আপনার জন্য নয়। এই কোর্সটি শুধু
              রিডাক্স বুঝার জন্য।
            </p>
          </div>{" "}
          <div className="section3-grid">
            <span className="bg-fuchsia-600/10 p-4 rounded-full dark:bg-purple-700/20">
              <StarIcon className="w-6 stroke-violet-700  dark:stroke-purple-600" />
            </span>

            <h3 className="font-semibold text-gray-900/90  dark:text-slate-200 text-[1.1rem]">
              কোর্স সার্টিফিকেট নেই
            </h3>
            <p className="text-center text-gray-800 dark:text-slate-200/70 text-md">
              যেহেতু এটি সেলফ-পেসড ভিডিও অনলি কোর্স তাই এই কোর্সের কোন অফিসিয়াল
              সার্টিফিকেট আমরা দিচ্ছিনা। যদি শুধু সার্টিফিকেট প্রাপ্তি আপনার
              উদ্দেশ্য হয় তাহলে এই কোর্সটি আপনার জন্য নয়। এই কোর্সটি শুধু
              রিডাক্স বুঝার জন্য।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section3;
