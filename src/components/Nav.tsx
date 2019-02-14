import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const Nav = props => {
  return (
    <>
      <h5 style={{ padding: "5px 10px", margin: 0 }}>Tables</h5>
      {props.db.table_structure.map(table => {
        return (
          <NavLink
            activeStyle={{ background: "rgb(219,219,219)" }}
            to={`/tables/${table.table_name}`}
            style={{
              textDecoration: "none",
              padding: "5px 10px",
              color: "black"
            }}
          >
            {table.table_name}
          </NavLink>
        );
      })}
    </>
  );
};

export default connect(state => state)(Nav);
