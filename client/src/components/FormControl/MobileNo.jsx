import axios from "axios";
import React, { useEffect, useState } from "react";
import countries from "../../data/countries.json";

import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Mobile({
  placeholder,
  name,
  onChange,
  className,
  errorMessage,
  notRequired,
  id,
  disabled,
  disableValue,

  phoneNO,
  ...rest
}) {
  const [selected, setSelected] = useState(countries[18]);
  const [number, setNumber] = useState("");

  const handelNumberChange = (e) => {
    const value = String(e.target.value);

    const sliced = value.slice(0, selected.dial_code.length);
    if (selected.dial_code !== sliced) {
      e.target.value = "";
    }

    const a = `${selected.dial_code}${String(e.target.value).replace(
      sliced,
      ""
    )}`;
    onChange(a.split(" ").join(""));

    if (value.length === selected.dial_code.length + 1) {
      setNumber(String(e.target.value).replace(sliced, " "));
    } else {
      setNumber(String(e.target.value).replace(sliced, ""));
    }
  };
  const url = `https://purecatamphetamine.github.io/country-flag-icons/3x2/${selected.code}.svg`;
  const onCountryChange = (e) => {
    setSelected(e);
  };

  return (
    <>
      <div
        className={`  handelInput text-sm flex  ${
          errorMessage
            ? "border-red-500 ring-red-500 ring-[0.4px] "
            : "border-slate-300 p-0 py-[0.20rem] "
        } ${className}`}
      >
        <Listbox onChange={onCountryChange} value={selected.name}>
          {({ open }) => (
            <>
              <div className="relative mt-1 ">
                <Listbox.Button
                  className={` relative  cursor-pointer        focus:outline-none   text-sm  `}
                >
                  <span className="flex items-center justify-center">
                    <img className="w-8 bg-transparent mx-3" src={url} alt="" />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute w-50 z-10 mt-1 max-h-56  overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm scrollbar dark:dark:bg-gray-800  ">
                    {countries.map((country, index) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "bg-indigo-600 text-white"
                              : "text-gray-900 dark:dark:text-slate-300",
                            "relative cursor-default select-none py-2 pl-3 pr-9"
                          )
                        }
                        value={country}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "ml-3  truncate flex  items-center"
                                )}
                              >
                                <picture loading="lazy">
                                  <img
                                    className="w-5 bg-transparent mx-3"
                                    loading="lazy"
                                    src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country.code}.svg`}
                                    alt=""
                                  />
                                </picture>
                                <span className="truncate ml-3 w-40">
                                  {country.name}
                                </span>
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-indigo-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>

        <input
          {...rest}
          type="tel"
          value={disabled ? disableValue : `${selected.dial_code}${number}`}
          name={name}
          autoComplete="none"
          disabled={disabled}
          id={id ? id : name}
          placeholder={placeholder}
          onChange={handelNumberChange}
          className="handelInput dark:bg-transparent border-0 outline-none p-0   focus:ring-0 "
        />
      </div>
      <span
        className={`text-[13px] truncate   h-5 my-1 text-red-500   ${
          errorMessage ? "visible" : "hidden"
        }`}
      >
        {errorMessage}
      </span>
    </>
  );
}

export default Mobile;
