import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Nav = props => {
  return (
    <>
      <h5>Tables</h5>
      {props.db.table_structure.map(table => {
        return (
          <Link to={`/${table.table_name}`} style={{ textDecoration: "none" }}>
            <span
              key={table.table_name}
              className={`nav-group-item ${
                table.table_name === props.match.params.table ? "active" : ""
              }`}
            >
              {table.table_name}
            </span>
          </Link>
        );
      })}
    </>
  );
};

export default connect(state => state)(Nav);
