import { adminRoot } from "./config";
import { UserRole } from "../utils/auth.roles";

const data = [
  /******************************** MENU GPS ****************************** */

  {
    id: "reports",
    icon: "iconsminds-line-chart-1",
    label: "Usuarios",
    to: `${adminRoot}/reports`,
    subs: [
      {
        id: "oniric-financial-analysis-weeks",
        label: "Interno",
        to: `/oniric/financial-analysis-weeks`
      },
      {
        id: "cruise-sales-overview",
        label: "Empresas",
        to: `/oniric/cruise-sales-overview`
      },

    ]
  },
  {
    id: "in-progress-reports",
    icon: "iconsminds-coding",
    label: "Procesos",
    to: "/in-progress-reports",
    subs: [
      {
        id: "client-analysis",
        label: "Permisos",
        to: `/client-analysis`
      },
      {
        id: "sales-progress",
        label: "Vacaciones",
        to: `/sales-progress`
      },

      {
        id: "sales-by-travel",
        label: "Home Office",
        to: `/sales-by-travel`
      },

      {
        id: "year-to-date-sales",
        label: "Reconocimientos",
        to: `/year-to-date-sales`
      },

    ]
  }


];
export default data;
