import { Admin, Resource } from "react-admin";
import { Dashboard } from "./dashboard";
import { BreachList } from './breaches';
import { dataProvider } from "./dataProvider";

export const App = () => (
  <Admin dashboard={Dashboard} title="SecurityBreach" dataProvider={dataProvider}>
    <Resource name="breaches" list={BreachList} />
  </Admin>
);
