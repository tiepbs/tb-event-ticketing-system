import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import TicketPurchase from './components/TicketPurchase';
import QrCodeScanner from './components/QrCodeScanner';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/tickets" component={TicketPurchase} />
        <Route path="/scan-qr" component={QrCodeScanner} />
        {/* Thêm các route khác nếu cần */}
      </Switch>
    </Router>
  );
};

export default App;
