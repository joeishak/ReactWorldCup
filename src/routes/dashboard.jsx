import Dashboard from "views/Dashboard/Dashboard";
import UserProfile from "views/UserProfile/UserProfile";
import TableList from "views/TableList/TableList";
import Typography from "views/Typography/Typography";
import Icons from "views/Icons/Icons";
import Maps from "views/Maps/Maps";
import Notifications from "views/Notifications/Notifications";
import Upgrade from "views/Upgrade/Upgrade";

//Default World Cup Routes
import Stadiums from "views/Stadiums/Stadiums";
import Matches from "views/Matches/Matches";
import Teams from "views/Teams/Teams";
import Standings from "views/Standings/Standings";
import Players from "views/Players/Players";




const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard
  },
  {
    path: "/stadium",
    name: "Stadiums",
    icon: "pe-7s-graph",
    component: Stadiums
  },
  // {
  //   path: "/matches",
  //   name: "Matches",
  //   icon: "pe-7s-graph",
  //   component: Matches
  // },
  // {
  //   path: "/teams",
  //   name: "Teams",
  //   icon: "pe-7s-graph",
  //   component: Teams
  // },
  // {
  //   path: "/players",
  //   name: "Players",
  //   icon: "pe-7s-graph",
  //   component: Players
  // },
  // {
  //   path: "/Stadings",
  //   name: "Standings",
  //   icon: "pe-7s-graph",
  //   component: Standings
  // },
  // {
  //   path: "/Maps",
  //   name: "Maps",
  //   icon: "pe-7s-globe",
  //   component: Maps
  // },
  { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
];

export default dashboardRoutes;
