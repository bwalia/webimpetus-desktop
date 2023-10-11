import List from "./List";
import Show from "./Show";

export default {
  options: {
    group: "admin",
    roles: ["administrator"],
  },
  list: List,
  show: Show,
};