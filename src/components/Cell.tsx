import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { toggleEdit, queueUpdate } from "../redux/reducers";

//needs refactoring

const Cell = (props: any) => {
  const inputRef = useRef({} as any);
  let [content, updateContent] = useState(props.row[props.column]);
  if (content instanceof Date) {
    content = content.toISOString();
  }
  useEffect(
    () => {
      if (!props.updates.length) {
        updateContent(props.row[props.column]);
      }
    },
    [props.updates.length]
  );

  useLayoutEffect(
    () => {
      if (inputRef.current && inputRef.current.focus) {
        inputRef.current.focus();
      }
    },
    [props.editing]
  );

  if (props.editing === props.row + props.column + props.index) {
    return (
      <td>
        <input
          ref={inputRef}
          value={content ? content.toString() : "NULL"}
          onBlur={() => {
            if (content !== props.row[props.column]) {
              props.queueUpdate({
                original: { ...props.row },

                updated: { ...props.row, [props.column]: content }
              });
            }
            props.toggleEdit("");
          }}
          onKeyPress={e => {
            if (e.key === "Enter") {
              inputRef.current.blur();
            }
          }}
          onChange={e => {
            updateContent(e.target.value);
          }}
          style={{
            background:
              content !== props.row[props.column] && props.updates.length
                ? "yellow"
                : "",
            width: "100%",
            padding: 0,
            boxSizing: "border-box",
            border: "1px solid gray"
          }}
        />
      </td>
    );
  } else {
    return (
      <td
        style={{
          background:
            content != props.row[props.column] &&
            !(props.row[props.column] instanceof Date)
              ? "yellow"
              : ""
        }}
        onClick={() => props.toggleEdit(props.row + props.column + props.index)}
      >
        {content ? content.toString() : "NULL"}
      </td>
    );
  }
};

export default connect(
  state => state,
  { toggleEdit, queueUpdate }
)(Cell);
