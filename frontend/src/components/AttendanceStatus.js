import React, { useState, useEffect } from 'react';
import { Container, Table, Alert } from 'react-bootstrap';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const AttendanceStatus = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/tickets/attendance-status');
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const confirmedUsers = users.filter(user => user.attendanceStatus === 'Yes').length;
  const notConfirmedUsers = users.filter(user => user.attendanceStatus === 'No').length;
  const notDeterminedUsers = users.filter(user => user.attendanceStatus === 'Not Determined Yet').length;

  const totalUsers = users.length;

  const pieData = {
    labels: ['Confirmed', 'Not Confirmed', 'Not Determined Yet'],
    datasets: [{
      data: [confirmedUsers, notConfirmedUsers, notDeterminedUsers],
      backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56']
    }]
  };

  const barData = {
    labels: ['Confirmed', 'Not Confirmed', 'Not Determined Yet'],
    datasets: [{
      label: '# of Users',
      data: [confirmedUsers, notConfirmedUsers, notDeterminedUsers],
      backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56']
    }]
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Attendance Status</h2>
      {loading && <Alert variant="info">Loading...</Alert>}
      {error && <Alert variant="danger">Error fetching data</Alert>}
      {!loading && !error && (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Event</th>
                <th>Attendance Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.event}</td>
                  <td>{user.attendanceStatus}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="mt-5">
            <h3 className="text-center">Attendance Overview</h3>
            <div className="d-flex justify-content-around">
              <div>
                <h4>Pie Chart</h4>
                <Pie data={pieData} />
              </div>
              <div>
                <h4>Bar Chart</h4>
                <Bar data={barData} />
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default AttendanceStatus;
