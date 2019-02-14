import React, { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { connectMassive } from "./redux/reducers";
import Table from "./components/Table";
import Nav from "./components/Nav";
import ConfirmBar from "./components/ConfirmBar";
import config from "./config";
import styled from "styled-components";

const color = "rgba(200, 200, 200, 0.98)";

const App = props => {
  useEffect(() => {
    props.connectMassive();
  }, []);

  return (
    <BrowserRouter>
      <>
        <Window>
          <NavPanel>
            <Route path="/" component={Nav} />
          </NavPanel>
          <MainPanel>
            <Route path="/tables/:table" component={Table} />
            <Route path="/tables/:table" component={ConfirmBar} />
          </MainPanel>
        </Window>
      </>
    </BrowserRouter>
  );
};

export default connect(
  state => ({}),
  { connectMassive }
)(App);

const TitleBar = styled.header`
  background: rgba(200, 200, 200, 0.98);
  width: 100%;
  height: 20px;
`;

const MainPanel = styled.section`
  overflow: auto;
  flex-grow: 1;
  background: rgb(255, 255, 255);
`;

const NavPanel = styled.nav`
  background: rgba(200, 200, 200, 0.98);
  width: 20vw;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgb(219, 219, 219);
  overflow: auto;
  flex-shrink: 0;
`;

const Window = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  // background: transparent;
`;
