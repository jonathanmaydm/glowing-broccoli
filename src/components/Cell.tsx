import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { queueUpdate } from "../redux/reducers";

const Cell = (props: any) => {
  let [content, updateContent] = useState(props.content);
  // const [edit, toggleEdit] = useState(false);

  if (content instanceof Date) {
    content = content.toISOString();
  }

  return (
    <Td>
      <Input
        characters={(content || "NULL").toString().length}
        value={content === "" ? "" : content || "NULL"}
        onChange={e => {
          updateContent(e.target.value);
        }}
        onKeyPress={e => {
          if (e.key === "Enter") {
            props.edit(content);
          }
        }}
        onBlur={() => {
          props.edit(content);
        }}
        focused={props.focused}
        edited={props.edited}
        null={!content}
      />
    </Td>
  );
};

const Td = styled.td`
  border: 1px solid rgba(222, 222, 222, 1);
`;

const Input = styled.textarea`
  resize: none;
  min-width: ${props => {
    return props.characters + 1 + "ch";
  }};
  overflow: auto;
  max-width: 80vw;
  width: 100%;
  border: none;
  padding: 5px;
  font-size: 1em;
  line-height: 1;
  color: ${props => (props.focused ? "white" : "")};
  background: ${props =>
    props.focused
      ? props.edited
        ? "rgb(123, 158, 205)"
        : "rgb(35, 99, 217)"
      : props.edited
        ? "rgb(250, 250, 200)"
        : ""};
  color: ${props => (props.null ? "gray" : "")};
  font-size: ${props => (props.null ? ".9em" : "1em")};
`;

export default connect(
  state => state,
  { queueUpdate }
)(Cell);
