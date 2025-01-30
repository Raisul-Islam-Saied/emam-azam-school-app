import { MinusSmallIcon } from "@heroicons/react/20/solid";
import {
  PaperAirplaneIcon,
  PaperClipIcon,
  Square2StackIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import Input from "./FormControl/Input";
import Button from "./Button";
const my_id = "123";
const messagesArray = [
  {
    text: "lorem inspham dor sit amit",
    attachment: "",
    sender: "456",
    reveiver: "456",
    date_time: "1",
    conversation_id: "123456",
  },
  {
    text: " sit amit",
    attachment: "",
    sender: "456",
    reveiver: "123",
    date_time: "2",
    conversation_id: "123456",
  },
  {
    text: "lorem  amit",
    attachment: "",
    sender: "123",
    reveiver: "456",
    date_time: "2",
    conversation_id: "123456",
  },
];
function Support() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState(messagesArray);

  const textref = useRef(null);
  

  const messageSet = (e) => {
    e.preventDefault();
    text &&
      setMessages((prev) => [
        ...prev,
        {
          text: text,
          attachment: "",
          sender: "123",
          reveiver: "456",
          date_time: new Date().toLocaleTimeString(),
          conversation_id: "123456",
        },
      ]);
    setText("");
textref.current.focus()
  };
  return (
    <div className="w-screen h-screen bg-blue-600/70 pt-20 pb-5 ">
      <div className="bg-slate-200 w-[65%] h-full block m-auto rounded-lg relative">
        <div className="bg-slate-300 w-full h-[4rem] rounded-t-lg flex justify-between shadow">
          <div className="flex justify-center items-center mx-5 gap-x-2 relative">
            <span className="absolute left-8 top-[2.6rem] w-2 h-2 rounded-full ring-white ring-2 bg-green-500 "></span>
            <picture>
              <img
                loading="lazy"
                className="w-10 ring-2 rounded-full ring-white"
                src="user-12.png"
                alt=""
              />
            </picture>

            <div className="flex flex-col ">
              <span className="font-medium mt-3 text-lg">
                Raisul islam saied
              </span>
              <span className="text-sm mb-3">active</span>
            </div>
          </div>

          <div className="flex text-sm gap-x-2 p-3">
            <TrashIcon width="1.5rem" strokeWidth={1.2} />

            <Square2StackIcon strokeWidth={1.2} width="1.5rem" />
            <XMarkIcon strokeWidth={1.2} width="1.5rem" />
          </div>
        </div>{" "}
        <div className="  w-full  h-[75%] flex     items-end  ">
          <div className="flex w-full flex-col overflow-y-scroll h-full scrollbar  p-4 ">
            {messages.map((message) => {
              return (
                <div
                  className={` flex  gap-4  ${
                    message.sender === my_id ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender !== my_id && (
                    <picture>
                      <img
                        loading="lazy"
                        className="w-8 ring-1 rounded-full ring-white"
                        src="user-12.png"
                        alt=""
                      />
                    </picture>
                  )}
                  <div className="flex max-w-[60%] flex-col">
                    <span
                      className={`bg-blue-600 p-2 rounded-xl rounded-br-none ${
                        message.sender === my_id && "bg-slate-400"
                      }`}
                    >
                      {message.text}
                    </span>
                    <span className="text-sm ml-1 font-thin my-1 text-slate-600">
                      {message.date_time}
                    </span>
                  </div>
                </div>
              );
            })}{" "}
          </div>
        </div>
        <form
          onSubmit={messageSet}
          className="bg-slate-300 w-full h-[4rem] rounded-b-lg shadow-2 flex justify-between absolute bottom-0 p-3 gap-2"
        >
          <PaperClipIcon />
          <Input
            ref={textref}
            type=""
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="type your message here . . ."
            value={text}
          />{" "}
          <PaperAirplaneIcon
            onClick={messageSet}
            className={`
            stroke-blue-700 ${text === "" && "stroke-blue-400"}`}
            strokeWidth={2}
          />
        </form>
      </div>
    </div>
  );
}

export default Support;
