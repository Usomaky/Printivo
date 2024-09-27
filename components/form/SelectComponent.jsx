import React, { useEffect, useState } from 'react'

const Select = ({ items, tag, onchange, value, defaultOption }) => {
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    setSelected(0)
  }, [items])

  return (
    <div className="w-full py-2 relative">
      <select
        id={tag}
        name={tag}
        defaultValue={items[0]}
        onChange={(e) => onchange(e.target.value)}
        className="p-4 w-full border appearance-none"
      >
        {items ? (
          <React.Fragment>
            {defaultOption && <option> - {defaultOption} - </option>}
            {items.map((item, index) => (
              <option
                key={`s-${index}`}
                value={value === 'index' ? index : item}
              >
                {item}
              </option>
            ))}
          </React.Fragment>
        ) : (
          <option> ---- </option>
        )}
      </select>
    </div>
  )
}

export default Select
