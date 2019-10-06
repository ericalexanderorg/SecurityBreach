import React from 'react';
import { Admin, Resource } from 'react-admin';
import './App.css';

import dataProvider from './dataProvider';
import { BreachList, BreachCreate } from './breaches';
import { Dashboard } from './dashboard';

const App = () => (  
  <Admin dashboard={Dashboard} title="SecurityBreach" dataProvider={dataProvider}>
      <Resource name="breaches" list={BreachList} create={BreachCreate} />
  </Admin>
);

export default App;