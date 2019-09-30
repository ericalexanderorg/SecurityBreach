import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import './App.css';
import dataProvider from './dataProvider';
import { BreachList } from './breaches';
import { Dashboard } from './dashboard';

const App = () => (  
  <Admin dashboard={Dashboard} title="SecurityBreach" dataProvider={dataProvider}>
      <Resource name="breaches" list={BreachList} />
  </Admin>
);

export default App;