import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { queueUpdate } from "../redux/reducers";

const isEqual = (a: String | Date, b: String) =>
  a instanceof Date ? a.toISOString() === b : a == b;

const Cell = (props: any) => {
  let [content, updateContent] = useState(props.content);
  const [edit, toggleEdit] = useState(false);

  if (content instanceof Date) {
    content = content.toISOString();
  }

  return (
    <Td onDoubleClick={() => toggleEdit(true)}>
      {edit ? (
        <Input
          value={content === "" ? "" : content || "NULL"}
          onChange={e => {
            updateContent(e.target.value);
          }}
          autoFocus={true}
          onBlur={() => {
            props.addUpdate(content);
            toggleEdit(false);
          }}
        />
      ) : (
        <Article edited={!isEqual(props.content, content)} null={!content}>
          {content || "NULL"}
        </Article>
      )}
    </Td>
  );
};

const Article = styled.article`
  background: ${props => (props.edited ? "rgb(250, 250, 200)" : "")};
  color: ${props => (props.null ? "gray" : "")};
  font-size: ${props => (props.null ? ".9em" : "1em")};
`;

const Td = styled.td`
  border: 1px solid rgba(222, 222, 222, 1);
  padding: 5px;
`;

const Input = styled.input`
  :active,
  :focus {
    width: 100%;
    box-sizing: content-box;
    border: none;
    background: white;
  }
  width: 100%;
  border: none;
  padding: 0;
  font-size: 1em;
`;

export default connect(
  state => state,
  { queueUpdate }
)(Cell);
