import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import 'App.css';
import 'antd/dist/antd.css';
import RouterTest from 'pages/RouterTest'

function App() {
  return (
    <div>
      <BrowserRouter>
        <RouterTest />
      </BrowserRouter>
    </div>
  );
}

export default App;
