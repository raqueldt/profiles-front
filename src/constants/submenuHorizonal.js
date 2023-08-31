import { adminRoot } from "./config";
import { UserRole } from "../utils/auth.roles";

const data = [
  /******************************** MENU GPS ****************************** */

  {
    id: "reports",
    icon: "iconsminds-line-chart-1",
    label: "Oniric",
    to: `${adminRoot}/reports`,
    subs: [
      {
        id: "oniric-financial-analysis-weeks",
        label: "Financial Analysis Weeks",
        to: `/oniric/financial-analysis-weeks`
      },
      {
        id: "cruise-sales-overview",
        label: "Cruise Sales Overview",
        to: `/oniric/cruise-sales-overview`
      },
      {
        id: "cruise-itinerary-sales",
        label: "GM by itinerary",
        to: `/oniric/cruise-itinerary-sales`
      }
    ]
  },
  {
    id: "in-progress-reports",
    icon: "iconsminds-coding",
    label: "In Progress",
    to: "/in-progress-reports",
    subs: [
      {
        id: "client-analysis",
        label: "Client Analysis",
        to: `/client-analysis`
      },
      {
        id: "sales-progress",
        label: "Sales Progress",
        to: `/sales-progress`
      },
      {
        id: "passenger-analysis",
        label: "Passenger Analysis",
        to: `/passenger-analysis`
      },
      {
        id: "sales-by-travel",
        label: "Sales By Travel",
        to: `/sales-by-travel`
      },

      {
        id: "year-to-date-sales",
        label: "Year To Date Sales",
        to: `/year-to-date-sales`
      },
      {
        id: "boat-client-analysis",
        label: "Boat Client Analysis",
        to: `/boat-client-analysis`
      },
      {
        id: "financial-analysis",
        label: "Financial Analysis",
        to: `/financial-analysis`
      },

      {
        id: "itinerary-results",
        label: "Itinerary Results",
        to: `/itinerary-results`
      },
      {
        id: "sales-by-code",
        label: "Sales by Code",
        to: `/sales-by-code`
      }
    ]
  },
  {
    id: "tthh",
    icon: "iconsminds-line-chart",
    label: "Oniric",
    to: `${adminRoot}/tthh`,
    subs: [
      {
        id: "oniric-financial-analysis-weeks",
        label: "Financial Analysis Weeks",
        to: `/oniric/financial-analysis-weeks`
      },
      {
        id: "cruise-sales-overview",
        label: "Cruise Sales Overview",
        to: `/oniric/cruise-sales-overview`
      },
      {
        id: "cruise-itinerary-sales",
        label: "GM by itinerary",
        to: `/oniric/cruise-itinerary-sales`
      }
    ]
  },
  {
    id: "in-progress-reports",
    icon: "iconsminds-coding",
    label: "In Progress",
    to: "/in-progress-reports",
    subs: [
      {
        id: "client-analysis",
        label: "Client Analysis",
        to: `/client-analysis`
      },
      {
        id: "sales-progress",
        label: "Sales Progress",
        to: `/sales-progress`
      },
      {
        id: "passenger-analysis",
        label: "Passenger Analysis",
        to: `/passenger-analysis`
      },
      {
        id: "sales-by-travel",
        label: "Sales By Travel",
        to: `/sales-by-travel`
      },

      {
        id: "year-to-date-sales",
        label: "Year To Date Sales",
        to: `/year-to-date-sales`
      },
      {
        id: "boat-client-analysis",
        label: "Boat Client Analysis",
        to: `/boat-client-analysis`
      },
      {
        id: "financial-analysis",
        label: "Financial Analysis",
        to: `/financial-analysis`
      },

      {
        id: "itinerary-results",
        label: "Itinerary Results",
        to: `/itinerary-results`
      },
      {
        id: "sales-by-code",
        label: "Sales by Code",
        to: `/sales-by-code`
      }
    ]
  }
];
export default data;
