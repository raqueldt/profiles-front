import { adminRoot } from "./config";
import { UserRole } from "../utils/auth.roles";

const data = [
  /******************************** MENU GPS ****************************** */
  {
    id: "dashboard",
    icon: "simple-icon-grid",
    label: "profiles.dashboard",
    to: `${adminRoot}/dashboard`,
  },
  // {
  //     id: "newAvailability",
  //     icon: "iconsminds-yacht",
  //     label: "profiles.availability",
  //     to: `/availability`
  // },
  {
    id: "team",
    icon: "iconsminds-user",
    label: "profiles.team",
    to: `/app/team`,
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
    id: "company",
    icon: "iconsminds-the-white-house",
    label: "Company",
    to: `/app/company`,
  },
  {
    id: "tthh",
    icon: "iconsminds-diploma-2",
    label: "TTHH",
    to: ``,
  },
  {
    id: "reports",
    icon: "iconsminds-line-chart-1",
    label: "Reports",
    to: ``,
  },

];
export default data;
