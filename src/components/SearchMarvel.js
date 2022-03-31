import React from "react";
import { Form, FormControl } from "react-bootstrap";

const SearchMarvel = ({ searchValue }) => {
  const handleChange = (e) => {
    searchValue(e.target.value);
  };

  return (
    <Form
      className="d-flex"
      method="POST "
      onSubmit={(e) => {
        e.preventDefault();
      }}
      name="formName"
      // className="center"
    >
    
      <FormControl
        type="text"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        onChange={handleChange}
      />
      
    </Form>
  );
};

export default SearchMarvel;
