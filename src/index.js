import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js'

const title = 'Course Wrap';

ReactDOM.render(
    <App/>,
    document.getElementById('app')
  );

module.hot.accept();