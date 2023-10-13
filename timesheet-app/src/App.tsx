import {
  Admin,
  Resource,
  Layout,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import projects from "./pages/projects";
import tasks from "./pages/tasks";
import Menu from "./Menu";

export const MyLayout = (props: any) => <Layout {...props} menu={Menu} />;
export const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider} layout={MyLayout}>
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
