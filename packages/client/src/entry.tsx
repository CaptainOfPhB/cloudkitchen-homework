import React from 'react';
import { createRoot } from 'react-dom/client';

import Orders from './pages/Orders';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Orders />
  </React.StrictMode>,
);
