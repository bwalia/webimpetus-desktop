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
import Dashboard from "./Dashboard";
import AppBar from "./AppBar";
import Login from "./Login";
import ProjectIcon from '@mui/icons-material/AccountTree';
import "./main.css"

export const MyLayout = (props: any) => <Layout {...props} menu={Menu} appBar={AppBar} />;
export const App = () => (
  <Admin 
    dataProvider={dataProvider} 
    authProvider={authProvider} 
    layout={MyLayout}
    dashboard={Dashboard}
    loginPage={Login}
  >
    <Resource
      name="projects"
      icon={ProjectIcon}
      {...projects}
    />
    <Resource
      name="tasks"
      {...tasks}
    />
  </Admin>
);
