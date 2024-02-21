import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CheckoutPage from './CheckoutPage';
import Projects from './Projects';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Projects />} />
          {/* Define more routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
