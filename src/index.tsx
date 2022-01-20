import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'lib-flexible';
import '@/style/common.css';
import reportWebVitals from './reportWebVitals';
import {Provider as ReduxProvider} from "react-redux";
import {store, persistor} from "@/store";
import {PersistGate} from "redux-persist/lib/integration/react";
import {ConfigProvider, ErrorBlock} from 'antd-mobile'
import zhCN from 'antd-mobile/es/locales/zh-CN'
import React from "react";

ReactDOM.render(
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConfigProvider locale={zhCN}>
        <App/>
      </ConfigProvider>
    </PersistGate>
  </ReduxProvider>,
  document.getElementById('root')
);

reportWebVitals();
