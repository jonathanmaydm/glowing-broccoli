import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Prompt } from "react-router-dom";
import { discardChanges, fetchData } from "../redux/reducers";
import styled from "styled-components";

import Cell from "./Cell";
import { Row } from "./Row";

const Table = ({ data, ...props }: any) => {
  const fetchData = () => {
    props.fetchData(props.match.params.table);
  };
  useEffect(fetchData, [props.match.params.table, props.massive]);

  useEffect(
    () => {
      props.discardChanges();
    },
    [props.match.params.table]
  );

  if (!data.length) {
    return <h2>No Data</h2>;
  }

  return (
    <table
      style={{ borderCollapse: "collapse", borderSpacing: 0, overflow: "auto" }}
    >
      <thead>
        <tr>
          {Object.keys(data[0].original).map(column => (
            <td key={column}>{column}</td>
          ))}
          {/* 
            This doesn't work because the order
            of the column names is different than
            what massive gives me
            {props.db.table_structure
              .find(table => table.table_name === props.match.params.table)
              .columns.map(column => (
                <td key={column.column_name}>{column.column_name}</td>
              ))} */}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => {
          return <Row key={JSON.stringify(row)} row={index} />;
        })}
      </tbody>
    </table>
  );
};

export default connect(
  state => state,
  { discardChanges, fetchData }
)(Table);
