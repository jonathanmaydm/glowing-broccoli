import React, { useState, useRef } from "react";
import Cell from "./Cell";

export const Row = props => {
  const [focused, toggleFocus] = useState(false);
  const tr = useRef({} as any);
  return (
    <tr
      tabIndex={0}
      ref={tr}
      onFocus={() => {
        toggleFocus(true);
      }}
      onBlur={() => {
        toggleFocus(false);
      }}
      style={{ background: focused ? "rgba(20, 20, 230, 0.8)" : "" }}
    >
      {Object.keys(props.row).map(column => (
        <Cell
          index={props.index}
          row={props.row}
          column={column}
          key={column}
        />
      ))}
    </tr>
  );
};
