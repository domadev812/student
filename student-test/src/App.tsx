import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// redux
import configureStore from 'src/store/configuration/configureStore';

import Main from './pages';

const { store } = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Main />
      </Router>
    </Provider>
  );
}
