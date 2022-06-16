import React from 'react';
import { createRoot } from 'react-dom/client';

import Order from './pages/Order';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Order />
  </React.StrictMode>,
);
