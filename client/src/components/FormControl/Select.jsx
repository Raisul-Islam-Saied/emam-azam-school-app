import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Select({
  object,
  options,
  whatWillShow,
  errorMessage,
  onChange,
  image,
  defaultMessage,
  buttonClass = "",
  ...rest
}) {
  const [selected, setSelected] = useState(
    options
      ? options[0]
      : defaultMessage
      ? { [whatWillShow]: defaultMessage }
      : object[0]
  );
  useEffect(() => {
    setSelected(
      options
        ? options[0]
        : defaultMessage
        ? { [whatWillShow]: defaultMessage }
        : object[0]
    );
  }, [object && object]);

  return (
    <Listbox
      onChange={(e) => {
        setSelected(e);
        onChange(e);
      }}
      value={selected}
    >
      {({ open }) => (
        <>
          <div className="relative mt-1 ">
            <Listbox.Button
              className={` relative w-full cursor-default rounded-[5px] bg-white py-2 pl-3 pr-10 text-left text-gray-900   ring-inset  focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm sm:leading-6 border dark:border-none dark:bg-slate-700/30 ${buttonClass} ${
                errorMessage
                  ? "border-red-500 ring-red-500 ring-1 "
                  : "border-slate-300"
              }`}
            >
              <span className="flex items-center">
                <span className="ml-1 block truncate dark:text-slate-200">
                  {object ? selected[whatWillShow] : selected}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm scrollbar dark:dark:bg-gray-800  ">
                {options &&
                  options.map((option, index) => (
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
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "ml-3 block truncate"
                              )}
                            >
                              {option}
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
                {object &&
                  object.map((option, index) => (
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
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            {image && (
                              <picture >
                                {" "}
                                <img
                                  loading="lazy"
                                  src={option[image]}
                                  alt=""
                                  className="h-5 w-5 flex-shrink-0 rounded-full"
                                />
                              </picture>
                            )}
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "ml-3 block truncate"
                              )}
                            >
                              {option[whatWillShow]}
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
            <span
              className={`text-[13px] my-2  text-red-500  ${
                errorMessage ? "visible" : "invisible"
              }`}
            >
              {errorMessage}
            </span>
          </div>
        </>
      )}
    </Listbox>
  );
}
