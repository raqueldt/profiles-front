import { adminRoot } from "./config";
import { UserRole } from "../utils/auth.roles";

const data = [
  /******************************** MENU GPS ****************************** */
  {
    id: "dashboard",
    icon: "simple-icon-grid",
    label: "gps.dashboard",
    to: `${adminRoot}/dashboard`
  },
  // {
  //     id: "newAvailability",
  //     icon: "iconsminds-yacht",
  //     label: "gps.availability",
  //     to: `/availability`
  // },
  {
    id: "AvailabilityV2",
    icon: "iconsminds-user",
    label: "Team",
    to: `/v2/availability`
  },
//   {
//     id: "ratesmanager",
//     icon: "iconsminds-calculator",
//     label: "gps.ratesmanager",
//     to: `${adminRoot}/ratesmanager/ratesmanager`
//   },
  /******************************** FIN MENU GPS ****************************** */

  /********************************* MENU COLLECTIONS *************************************** */

//   {
//     id: "collection-dashboard",
//     icon: "iconsminds-coins-2",
//     label: "TTHH",
//     to: `/collection-dashboard`
    // subs: [

    // {
    //     id: "collection-dashboard",
    //     icon: "simple-icon-grid",
    //     label: "Dashboard",
    //     to: `/collection-dashboard`
    // },
    // {
    //     id: "collection-admin",
    //     icon: "iconsminds-gear",
    //     label: "Administrator",
    //     to: `/collection-admin`
    // },
    // {
    //     id: "collection-file-manager",
    //     icon: "simple-icon-folder-alt",
    //     label: "File Manager",
    //     to: `/collection-file-manager`
    // }

    // ]
//   },
  {
    id: "tthh",
    icon: "iconsminds-line-chart-1",
    label: "Talento",
    to: ``,
  },
  {
    id: "reports",
    icon: "iconsminds-line-chart-1",
    label: "Reports",
    to: ``,
  }

];
export default data;
