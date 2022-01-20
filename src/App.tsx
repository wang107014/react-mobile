import React from 'react';
import { Provider } from 'react-redux'
import './App.less';
import Router from '../src/router/index';
import { hot } from "react-hot-loader/root";

const App: React.FC = () => {

  return (
    <div className="App">
      <Router/>
    </div>
  );
};
const AppHot = process.env.NODE_ENV === "development" ? hot(App) : App;
export default AppHot;
