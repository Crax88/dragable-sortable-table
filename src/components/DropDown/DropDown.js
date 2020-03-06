import React, { useState } from "react";

import "./DropDown.css";

const Dropdown = ({ onSelect, title, items = [], multiSelect = false }) => {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const toggle = open => {
    setOpen(open);
    if (!open) {
      onSelect(selection);
    }
  };
  const handleClick = item => {
    if (selection.includes(item)) {
      setSelection([...selection].filter(el => el !== item));
    } else {
      if (multiSelect) {
        setSelection([...selection, item]);
      } else {
        setSelection([item]);
      }
    }
  };

  return (
    <div className="dd-wrapper">
      <div className="dd-header" role="button" onClick={() => toggle(!open)}>
        <div className="dd-header__title">
          <p className="dd-header__title--bold">{title}</p>
        </div>
        <div className="dd-header__action">
          <p>{open ? "✗" : "▼"}</p>
        </div>
      </div>
      {open && (
        <ul className="dd-list">
          {items.map(item => (
            <li className="dd-list-item" key={item.id}>
              <button
                className={selection.includes(item) ? "green" : ""}
                type="button"
                onClick={() => handleClick(item)}
              >
                <span>{item.value}</span>
                <span>{selection.includes(item) ? "✔" : ""}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
