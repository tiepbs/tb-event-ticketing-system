import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TicketPurchase from './components/TicketPurchase';
import QrCodeScanner from './components/QrCodeScanner';
import AttendanceStatus from './components/AttendanceStatus';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/tickets" component={TicketPurchase} />
        <Route path="/qr-scan" component={QrCodeScanner} />
        <Route path="/attendance-status" component={AttendanceStatus} />
        <Route path="/" component={TicketPurchase} />
      </Switch>
    </Router>
  );
};

export default App;
