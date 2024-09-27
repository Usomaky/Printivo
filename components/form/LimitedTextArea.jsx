import React, { useEffect, useState } from "react";

const LimitedTextArea = ({
  value,
  limit,
  rows,
  cols,
  required,
  classNamez,
  defaultValue,
  placeholder,
  tw,
  name,
}) => {
  const [text, setText] = useState(value);
  const [remaining, setRemaining] = useState(limit);

  useEffect(() => {
    if (value) {
      setText(value);
    } else {
      console.log("no value");
      setText("");
    }
  }, [value]);

  useEffect(() => {
    if (text) {
      setRemaining(limit - text.length);
    }
  }, [text]);

  const handleChange = (e) => {
    if (e.target.value.length > limit) {
      e.target.value = e.target.value.substr(0, limit);
    }
    setText(e.target.value);
  };

  return (
    <div className="w-full py-1 relative">
      <textarea
        tw={tw ? tw : ""}
        name={name}
        id={name}
        value={text ? text : ""}
        onChange={handleChange}
        cols={cols}
        rows={rows}
        required={required}
        className={classNamez ? classNamez : ""}
        defaultValue={defaultValue ? defaultValue : ""}
        placeholder={placeholder}
      />
      <div className="absolute bottom-0 right-0 px-2 pb-5 text-sm">
        {remaining}/{limit}
      </div>
    </div>
  );
};

export default LimitedTextArea;
