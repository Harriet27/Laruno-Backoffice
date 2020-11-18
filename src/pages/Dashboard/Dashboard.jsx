import { Card } from '@material-ui/core';
import React from 'react';

export default function Dashboard() {
  return (
    <div style={{ margin: '50px' }}>
      <Card
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',

          height: '50vh',
        }}
      >
        <h1>Dashboard</h1>
      </Card>
    </div>
  );
}
