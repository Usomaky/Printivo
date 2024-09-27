import React, { useState } from 'react'

export default function FormDropDownMenu({ css, placeholder, options, value }) {
  const [toggle, setToggle] = useState(false)
  const [selected, setSelected] = useState(null)

  const handleSelected = (string) => {
    setToggle(false)
    setSelected(string)
    value(string)
  }

  return (
    <div>
      <div className="mt-1 relative bg-white">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded="false"
          aria-labelledby="listbox-label"
          className={`relative text-bright sm:pl-6 sm:pr-6 pl-3 pr-3 box-border pt-1 pb-1 sm:pt-4 sm:pb-4 border w-full  flex flex-row ${
            toggle ? '' : 'mb-8'
          } ${css}`}
          onClick={() => setToggle(!toggle)}
        >
          <span className="flex items-center">
            <span className="ml-3 block truncate">
              {selected ? selected.name : placeholder}
            </span>
          </span>
          <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 14L8 10H16L12 14Z" fill="black" />
            </svg>
          </span>
        </button>

        {toggle && (
          <div
            className={`absolute mt-1 w-full rounded-md bg-white shadow-lg z-50`}
          >
            <ul
              tabIndex="-1"
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-item-3"
              className="max-h-56  py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            >
              {/* list */}

              {options.map((item, key) => (
                <li
                  key={key + item.id}
                  id="listbox-item-0"
                  role="option"
                  className={`relative p-3 pl-7 border-b select-none  hover:bg-cream-md hover:text-black cursor-pointer ${
                    selected?.id === item.id ? 'bg-cream-md text-black' : ''
                  }`}
                  onClick={() => handleSelected(item)}
                >
                  <div className="flex items-center">
                    <span className="ml-3 block font-normal truncate">
                      {item.name}
                    </span>
                  </div>

                  {selected?.id === item.id && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <svg
                        class="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </li>
              ))}

              {/* list */}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
