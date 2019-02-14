import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { queueUpdate } from "../redux/reducers";

const isEqual = (a: String | Date, b: String) =>
  a instanceof Date ? a.toISOString() === b : a == b;

const Cell = (props: any) => {
  let [content, updateContent] = useState(props.row[props.column]);
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
            if (!isEqual(props.row[props.column], content)) {
              props.queueUpdate({
                original: { ...props.row[props.column] },
                updated: {
                  ...props.row[props.column],
                  [props.column]: content
                }
              });
            }
            toggleEdit(false);
          }}
        />
      ) : (
        <Article
          edited={!isEqual(props.row[props.column], content)}
          null={!content}
        >
          {content || "NULL"}
        </Article>
      )}
    </Td>
  );
};

const Article = styled.article`
  background: ${props => (props.edited ? "rgb(250, 250, 200)" : "")};
  color: ${props => (props.null ? "gray" : "black")};
  font-size: ${props => (props.null ? ".9em" : "1em")};
`;

const Td = styled.td`
  border: 1px solid rgba(222, 222, 222, 1);
`;

const Input = styled.input`
  :active,
  :focus {
    width: 100%;
    box-sizing: content-box;
    border: none;
    // outline: yellow;
    // outline-offset: 2px;
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
