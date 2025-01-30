import { CheckIcon, TrashIcon } from "@heroicons/react/20/solid";

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import formatFileSize from "../helper/formatFileSize";

function Drop({
  name,
  btnValue,
  acceptFileName,
  setFile,
  accept,
  className,
  multiple = false,
  errorMessage,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    setFile(selectedFile);
  }, [selectedFile]);
  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles);
    if (multiple === true) {
      setSelectedFile((prev) => {
        if (prev) {
          return [...prev, ...acceptedFiles];
        } else return acceptedFiles;
      });
    } else {
      setSelectedFile(acceptedFiles);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept
      ? accept
      : {
          "application/pdf": [".pdf"],
        },
    multiple: multiple,
  });
  const deleteFile = (fileName, index) => {
    const newArray = selectedFile.filter(
      (element, idx) => idx !== index || element.name !== fileName
    );
    setSelectedFile(newArray);
  };
  return (
    <div className={`w-full cursor-pointer my-1 ${className}`}>
      <div
        {...getRootProps()}
        className="w-full h-28 border-[3px] rounded-md border-slate-400 dark:border-slate-500   col-span-2 border-dashed flex justify-between items-center gap-4 p-4 "
      >
        <div className="flex gap-4">
          {" "}
          <div className="w-12 h-12 dark:bg-slate-600 bg-slate-300 rounded-full flex items-center justify-center ">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="12"
              viewBox="0 0 384 512"
            >
              <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 408c0 13.3-10.7 24-24 24s-24-10.7-24-24V305.9l-31 31c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l72-72c9.4-9.4 24.6-9.4 33.9 0l72 72c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-31-31V408z" />
            </svg>
          </div>
          <div className=" dark:text-slate-400 text-slate-600 ">
            <h1 className="lg:text-lg capitalize  font-semibold text-md ">
              {isDragActive ? "drag here" : " Drag and Drop files here "}
            </h1>
            <span>Files :{acceptFileName}</span>
          </div>
        </div>
        <div className="">
          <span className="bg-violet-600 cursor-pointer disabled:bg-gray-600  text-slate-100 p-2 px-5 rounded-md font-semibold  dark:bg-violet-500 dark:disabled:bg-violet-400 hover:bg-gray-700 focus:animate-button w-full relative flex justify-center items-center gap-3">
            {btnValue ? btnValue : "UPLOAD"}
          </span>

          <input
            accept="application/pdf"
            {...getInputProps()}
            type="file"
            className="hidden"
          />
        </div>
      </div>
      {selectedFile &&
        selectedFile.map((file, index) => {
          return (
            <div
              key={index}
              className="w-full h-15  bg-green-600/20 border-[1.5px] rounded-md my-2 text-green-600 border-green-600/60 flex items-center justify-between px-5"
            >
              <div className="flex capitalize flex-col">
                <h3 className=" w-50 truncate">{file?.name}</h3>
                <h4>Size : {formatFileSize(file?.size)}</h4>
              </div>
              <div className="flex gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.7}
                  stroke="currentColor"
                  className="w-8 h-8 border border-green-300 cursor-pointer p-1 rounded-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
                <span className="h-8 w-[0.09rem] bg-green-300 "></span>
                <TrashIcon
                  onClick={() => deleteFile(file.name, index)}
                  strokeWidth={1.7}
                  className="text-red-600 w-8 h-8 border border-red-400 p-[0.5rem] cursor-pointer rounded-full"
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Drop;
