import React from "react";

const Dropdown = ({ title, options, func, value }) => {
  return (
    <div className="select">
      <select defaultValue={value} onChange={func} name="format" id="format">
        <option value={title} disabled>
          {title}
        </option>
        {options.map((o, i) => (
          <option key={i} value={o}>
            {o.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
