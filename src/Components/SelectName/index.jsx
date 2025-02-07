import React from "react";

const SelectName = ({ title, handleChange, value, options }) => {
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <select
          onChange={handleChange}
          style={{
            textAlign: "left",
            fontSize: "18px",
            padding: "5px",
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >
          <option value={value}> {title}</option>
          {options.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SelectName;
