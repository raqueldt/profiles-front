import { adminRoot } from "./config";
import { UserRole } from "../utils/auth.roles";

const data = [
  /******************************** MENU GPS ****************************** */

  {
    id: "tthh",
    icon: "iconsminds-line-chart-1",
    label: "Publicación",
    to: `${adminRoot}/tthh`,
    subs: [
      {
        id: "oniric-financial-analysis-weeks",
        label: "Noticias",
        to: `/tthh/noticias`
      },
      {
        id: "cruise-sales-overview",
        label: "Rol de pagos",
        to: `/tthh/rolpagos`
      },
    ]
  },
  {
    id: "in-progress-reports",
    icon: "iconsminds-coding",
    label: "Actualización",
    to: "/in-progress-reports",
    subs: [
      {
        id: "client-analysis",
        label: "Documentos",
        to: `/tthh/documentos`
      },
      {
        id: "sales-progress",
        label: "Cargas Familiares",
        to: `/sales-progress`
      },
      {
        id: "passenger-analysis",
        label: "Feriados",
        to: `/passenger-analysis`
      },
      {
        id: "sales-by-travel",
        label: "Formulario 107",
        to: `/sales-by-travel`
      },

      {
        id: "cruise-itinerary-sales",
        label: "Departamentos",
        to: `/oniric/cruise-itinerary-sales`
      }

    ]
  }


];
export default data;
