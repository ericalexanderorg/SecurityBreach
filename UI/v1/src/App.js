import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import './App.css';
import dataProvider from './dataProvider';

const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="breaches" list={ListGuesser} />
    </Admin>
);

export default App;