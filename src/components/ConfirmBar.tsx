import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import { Prompt, withRouter } from "react-router-dom";
import { discardChanges } from "../redux/reducers";

//needs refactoring

const ConfirmBar = props => {
  return (
    <>
      {!!props.updates.length && (
        <div
          style={{
            background: "yellow",
            zIndex: 1,
            position: "absolute",
            bottom: 0,
            width: "100%"
          }}
        >
          <Prompt
            when={!!props.updates.length}
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
          <button
            onClick={() => {
              const promises = props.updates.map(update => {
                return props.massive[props.match.params.table]
                  .update(update.original, update.updated)
                  .catch(console.log);
              });
              Promise.all(promises)
                .then(result => {
                  // fetchData();
                  props.discardChanges();
                  props.toggleEdit("");
                })
                .catch(console.log);
            }}
          >
            Save
          </button>
        </div>
      )}
    </>
  );
};

export default connect(
  state => state,
  { discardChanges }
)(ConfirmBar);
