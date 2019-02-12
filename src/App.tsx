import React, { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { connectMassive } from "./redux/reducers";
import Table from "./components/Table";
import Nav from "./components/Nav";
import ConfirmBar from "./components/ConfirmBar";
import config from "./config";
import styled from "styled-components";

const App = props => {
  useEffect(() => {
    if ((window as any).massive) {
      (window as any)
        .massive(config.CONNECTION_STRING)
        .then(props.connectMassive);
    }
  }, []);

  return (
    <BrowserRouter>
      <Window>
        <NavPanel>
          <Route path="/" component={Nav} />
        </NavPanel>
        <MainContent>
          <Route path="/tables/:table" component={Table} />
          <Route path="/tables/:table" component={ConfirmBar} />
        </MainContent>
      </Window>
    </BrowserRouter>
  );
};

export default connect(
  state => ({}),
  { connectMassive }
)(App);

const MainContent = styled.section`
  overflow: auto;
`;

const NavPanel = styled.nav`
  max-width: 30vw;
  display: flex;
  flex-direction: column;
  border-right: 1px solid gray;
  padding: 0 10px;
  overflow: auto;
`;

const Window = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;
