import React, { useState } from "react";
import DropDown from "../DropDown/DropDown";

import { connect } from "react-redux";

import "./SearchForm.css";

const SearchForm = ({ columns }) => {
  const [text, setText] = useState("");
  const [prop, setProp] = useState("");
  const handleChange = e => {
    setText(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log(`Search ${text} by ${prop}`);
  };
  const handleSelect = item => {
    setProp(item[0].field);
  };
  return (
    <form>
      <label>
        Search
        <input value={text} onChange={handleChange} />
      </label>
      <span>By</span>
      <DropDown onSelect={handleSelect} title={"field"} items={columns} />
      <input onClick={handleSubmit} type="submit" value="⌕" />
    </form>
  );
};

const mapStateToProps = ({ bookColumns: { columns } }) => {
  const prepared = Object.values(columns)
    .map(el => {
      if (el.hided) return null;
      return { id: el.id, value: el.title, field: el.accessor };
    })
    .filter(el => el);
  return {
    columns: prepared
  };
};

export default connect(mapStateToProps)(SearchForm);
