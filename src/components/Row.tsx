import React, { useState, useRef } from "react";
import styled from "styled-components";
import Cell from "./Cell";
import { connect } from "react-redux";
import { queueUpdate } from "../redux/reducers";

const RowWithoutData = props => {
  const [focused, toggleFocus] = useState(false);
  const tr = useRef({} as any);
  return (
    <Tr
      tabIndex={0}
      ref={tr}
      onFocus={() => {
        toggleFocus(true);
      }}
      onBlur={() => {
        toggleFocus(false);
      }}
      focused={focused}
    >
      {Object.keys(props.row).map(column => (
        <Cell
          addUpdate={content => {
            props.queueUpdate({
              original: { ...props.row },
              updated: {
                ...props.row,
                [column]: content
              }
            });
          }}
          content={props.row[column]}
          key={column}
        />
      ))}
    </Tr>
  );
};

export const Row = connect(
  state => state,
  { queueUpdate }
)(RowWithoutData);

const Tr = styled.tr`
  :focus {
    outline: none;
  }
  ${props => (props.focused ? "background: rgb(35, 99, 217)" : null)};
  ${props => (props.focused ? "color: white" : null)};
`;
