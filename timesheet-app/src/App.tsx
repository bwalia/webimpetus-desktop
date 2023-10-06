import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import projects from "./pages/projects";
import tasks from "./pages/tasks";

export const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource
      name="projects"
      {...projects}
    />
    <Resource
      name="tasks"
      {...tasks}
    />
  </Admin>
);
