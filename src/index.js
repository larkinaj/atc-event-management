// import React from 'react';
// import App from './App';
// import {createRoot} from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';


// const root = createRoot(document.getElementById('root'));
// root.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );

import React from 'react';
import { render } from 'react-dom';
import App from './client/App';
import { BrowserRouter as Router } from 'react-router-dom';
render(
  <Router>
    <App />
  </Router>,

  document.getElementById('root')
);