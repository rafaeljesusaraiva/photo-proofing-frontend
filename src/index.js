import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { CoolLog } from '@utils';

import './style.css';

CoolLog();

ReactDOM.render(<App />, document.getElementById('root'));
