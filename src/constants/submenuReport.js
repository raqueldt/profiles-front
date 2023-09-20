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
        id: "report-interno",
        label: "Interno",
        to: `/report/interno`,
      },
      {
        id: "report-company",
        label: "Empresas",
        to: `/report/company`,
      },
    ],
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
        to: `/report/permisos`,
      },
      {
        id: "sales-progress",
        label: "Vacaciones",
        to: `/report/vacaciones`,
      },

      {
        id: "sales-by-travel",
        label: "Home Office",
        to: `/report/homeoffice`,
      },

      {
        id: "year-to-date-sales",
        label: "Reconocimientos",
        to: `/report/reconocimientos`,
      },
    ],
  },
];
export default data;
