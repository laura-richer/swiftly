import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './js/App';

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
