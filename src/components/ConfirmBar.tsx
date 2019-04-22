import React from "react";
import { connect } from "react-redux";

import { Prompt } from "react-router-dom";
import { discardChanges, saveChanges } from "../redux/reducers";
import styled from "styled-components";

//needs refactoring

const ConfirmBar = props => {
  const updates = props.data.filter(row => Object.keys(row.updates).length > 0)
    .length;

  return (
    <>
      {updates > 0 && (
        <Footer
          style={{
            background: "rgb(250, 250, 200)",
            zIndex: 1,
            position: "absolute",
            bottom: 0,
            width: "80vw"
          }}
        >
          <Prompt
            when={!!updates}
            message="Are you sure you want to this page? Unsaved data will be lost"
          />
          You have unsaved changes
          <button
            onClick={() => {
              props.discardChanges();
            }}
          >
            Discard
          </button>
          <button onClick={() => props.saveChanges(props.match.params.table)}>
            Save
          </button>
        </Footer>
      )}
    </>
  );
};

const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default connect(
  state => state,
  { discardChanges, saveChanges }
)(ConfirmBar);
