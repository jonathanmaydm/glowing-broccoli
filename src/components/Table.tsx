import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Prompt } from "react-router-dom";
import { discardChanges, toggleEdit } from "../redux/reducers";

import Cell from "./Cell";

const Table = (props: any) => {
  const [data, updateData] = useState([]);
  const fetchData = () => {
    if (props.massive && props.match.params.table) {
      props.massive[props.match.params.table].find().then((res: any) => {
        updateData(res);
      });
    }
  };
  useEffect(fetchData, [props.match.params.table]);

  useEffect(
    () => {
      props.discardChanges();
      props.toggleEdit("");
    },
    [props.match.params.table]
  );

  if (!data.length) {
    return <h2>No Data</h2>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            {Object.keys(data[0]).map(column => (
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
            return (
              <tr key={JSON.stringify(row)}>
                {Object.keys(row).map(column => {
                  return (
                    <Cell
                      index={index}
                      row={row}
                      column={column}
                      key={column}
                    />
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default connect(
  state => state,
  { discardChanges, toggleEdit }
)(Table);
