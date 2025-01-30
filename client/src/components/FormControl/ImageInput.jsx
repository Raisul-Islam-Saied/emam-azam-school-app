import React, { useState } from "react";
import FormControl from "./FormControl";
import FormTitle from "./FormTitle";
import { UserCircleIcon, UserIcon, UsersIcon } from "@heroicons/react/20/solid";
const defaultImage = "/images/default.jpg";
function ImageInput({ name = "no_name", setAvatar, errorMessage }) {
  const [image, setImage] = useState();
  return (
    <div className="flex gap-5">
      <div className="   w-16 md:w-20 relative ">
        {" "}
        {image ? (
          <img
            className=" w-8 h-8 object-cover border border-slate-600 dark:border-gray-300 rounded-full absolute "
            src={image}
            alt=""
          />
        ) : (
          <span
            className=" w-8 h-8 object-cover border border-slate-600 dark:border-gray-300 rounded-full absolute "
            alt=""
          >
            {" "}
          
            <UserIcon/>
          
          </span>
        )}
      </div>

      <div className="flex-5/6">
        <FormControl className="mb-0">
          <FormTitle
            title="আপনার একটি প্রোফাইল ছবি দিন"
            subtitle="ফটোটির সাইজ অবশ্যই 0.5MB অথবা 500KB এর কম হতে হবে এবং শুধুমাত্র .jpg, .jpeg অথবা .png ফরম্যাটের ছবি গ্রহণযোগ্য। এই ছবিটি আমরা আমাদের ওয়েবসাইটে কোর্স স্টুডেন্ট লিস্ট-এ ব্যবহার করতে পারি"
          />
          <input
            name={name}
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            className=" border-0 mt-2 bg-transparent file:mr-4
                  file:ml-1
                  text-slate-400 file:py-1 font-bangla file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-800 file:text-slate-300 hover:file:bg-slate-700 file:-mx-3 text-1 mantine-Input-input "
            onChange={(e) => {
              setImage(URL.createObjectURL(e.target.files[0]));
              setAvatar(e.currentTarget.files[0]);
            }}
          />
          <span
            className={`text-[13px] truncate   h-5 my-1 text-red-500   ${
              errorMessage ? "visible" : "hidden"
            }`}
          >
            {errorMessage}
          </span>
        </FormControl>
      </div>
    </div>
  );
}

export default ImageInput;
