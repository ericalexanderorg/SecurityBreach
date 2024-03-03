import {
  Admin,
  Resource
} from "react-admin";
import dataProvider  from './dataProvider';
import { BreachList, BreachCreate } from "./breaches";
import { Dashboard } from "./dashboard"

export const App = () => ( 
  <Admin dashboard={Dashboard} title="SecurityBreach" dataProvider={dataProvider}>
      <Resource name="breaches" list={BreachList} create={BreachCreate} />
  </Admin>
);
