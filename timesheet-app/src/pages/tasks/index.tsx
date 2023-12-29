import List from "./List";
import Show from "./Show";
import './task.css';

export default {
  options: {
    group: "admin",
    roles: ["administrator"],
  },
  list: List,
  show: Show,
};