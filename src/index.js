import React from 'react';
import ReactDOM from 'react-dom';
import Game from './modules/Game';
import 'antd/dist/antd.css';
import './index.css';
import * as serviceWorker from './serviceWorker';

serviceWorker.register();

ReactDOM.render(<Game  />,document.getElementById('root'));
