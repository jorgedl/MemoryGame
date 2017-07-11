import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './components/App';
import GameStore from './stores/GameStore';

import './index.less';

/* global document */

const stores = {
  gameStore: new GameStore()
};

ReactDOM.render((
  <Provider {...stores}>
    <App />
  </Provider>
), document.getElementById('app'));
