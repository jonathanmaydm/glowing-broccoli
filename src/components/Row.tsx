import React, { useState, useRef } from "react";
import styled from "styled-components";
import Cell from "./Cell";
import { connect } from "react-redux";
import { queueUpdate, updateColumn } from "../redux/reducers";

const RowWithoutData = (props: any) => {
  const [focused, toggleFocus] = useState(false);
  const tr = useRef({} as any);

  const original = props.data[props.row].original;
  const updates = props.data[props.row].updates;
  return (
    <Tr
      tabIndex={0}
      // ref={tr}
      onFocus={() => {
        toggleFocus(true);
      }}
      onBlur={() => {
        toggleFocus(false);
      }}
      focused={focused}
    >
      {Object.keys(original || {}).map(column => {
        return (
          <Cell
            edit={update => {
              if (original[column] === update) {
                props.updateColumn(column, props.row, undefined);
              } else {
                props.updateColumn(column, props.row, update);
              }
            }}
            content={
              updates[column] === ""
                ? ""
                : updates[column] === null
                  ? null
                  : updates[column] || original[column]
            }
            edited={updates[column] === "" || updates[column]}
            key={column}
            focused={focused}
          />
        );
      })}
    </Tr>
  );
};

export const Row = connect(
  (state: any) => ({ data: state.data }),
  { queueUpdate, updateColumn }
)(RowWithoutData);

const Tr = styled.tr`
  :focus {
    outline: none;
  }
  ${props => (props.focused ? "background: rgb(35, 99, 217)" : null)};
  ${props => (props.focused ? "color: white" : null)};
`;
