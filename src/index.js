import React from 'react';
import { render } from 'react-dom';
import App from './client/App';

// uncomment so that webpack can bundle styles
// import styles from './style/style.css';

// use react-query across entire application
// const queryClient = new QueryClient();    

const root = document.getElementById('root');

render(
//   <QueryClientProvider client={queryClient}>
//     <Router>
      <App />,
//     </Router>
//   </QueryClientProvider>,
  root   
);