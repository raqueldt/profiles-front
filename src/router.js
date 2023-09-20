import Vue from "vue";
import VueRouter from "vue-router";
import AuthGuard from "./utils/auth.guard";
import { adminRoot } from "./constants/config";
import AuthRequired from "./utils/AuthRequired";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("./views/home"),
    redirect: "./user/login",
  },
  {
    path: adminRoot,
    component: () => import("./views/app"),
    redirect: `${adminRoot}/dashboard`,
    name: "dashboard",
    beforeEnter: AuthRequired,
    meta: { loginRequired: true },

    children: [
      /* ******************* PROFILES ******************* */

      {
        path: "dashboard",
        props: true,
        name: "main-dashboard",
        beforeEnter: AuthRequired,
        component: () => import("./views/app/profiles/dashboard/MainDashboard"),
      },

      {
        path: "/app/team",
        beforeEnter: AuthRequired,
        props: true,
        name: "Team",
        component: () => import("@/views/app/profiles/team/MainTeam"),
      },
      {
        path: "/app/company",
        beforeEnter: AuthRequired,
        props: true,
        name: "Company",
        component: () => import("@/views/app/profiles/company/MainCompany"),
      },
      {
        path: "/app/perfil",
        beforeEnter: AuthRequired,
        props: true,
        name: "Perfil",
        component: () => import("@/views/app/profiles/perfil/MainPerfil"),
      },

      //SUBMENU TALAENTO HUMANO
      {
        path: "/tthh/noticias",
        name: "noticias",
        beforeEnter: AuthRequired,
        component: () => import("@/views/app/profiles/noticias/MainNoticias"),
      },
      {
        path: "/tthh/rolpagos",
        name: "rolpagos",
        beforeEnter: AuthRequired,
        component: () => import("@/views/app/profiles/rolpagos/Main"),
      },
      {
        path: "/tthh/documentos",
        name: "documentos",
        beforeEnter: AuthRequired,
        component: () => import("@/views/app/profiles/documentos/Main"),
      },

      /* ******************* GPS ******************* */

      {
        path: "/v2/availability",
        beforeEnter: AuthRequired,
        props: true,
        name: "AvailabilityV2",
        component: () =>
          import("@/views/app/gps/availability/v2/AvailabilityV2"),
      },

      {
        path: "targets",
        props: true,
        name: "target",
        alias: "/app/gps/targets/targets",
        beforeEnter: AuthRequired,
        component: () => import("./views/app/gps/targets/Targets"),
      },
      {
        path: "targetProgressDetails",
        props: true,
        name: "targetProgressDetails",
        alias: "/app/gps/targets/targetProgressDetails",
        beforeEnter: AuthRequired,
        component: () =>
          import(
            "./views/app/gps/targets/components/TargetsMonthlyProgressDetails"
          ),
      },

      {
        path: "/availability",
        beforeEnter: AuthRequired,
        props: true,
        name: "newAvailability",
        component: () =>
          import("./views/app/gps/availability/components/Availability.vue"),
      },

      // -----------  BOOKINGS -----------
      {
        path: "/booking/:id",
        props: true,
        name: "booking",
        beforeEnter: AuthRequired,
        component: () => import("./views/app/gps/bookings/SlotsParent.vue"),
      },

      {
        path: "gps/bookings/edit/slotsparentedit",
        props: true,
        name: "SlotsParentEdit",
        beforeEnter: AuthRequired,
        component: () =>
          import("./views/app/gps/bookings/edit/SlotsParentEdit.vue"),
      },

      {
        path: "/slotspreview/:cotId",
        props: true,
        name: "slotspreview",
        alias: "/app/gps/slotspreview",
        beforeEnter: AuthRequired,
        component: () => import("./views/app/gps/bookings/SlotsPreview.vue"),
      },

      {
        path: "/collection-urgent-payments",
        name: "UrgentPaymentsAll",
        beforeEnter: AuthRequired,
        component: () =>
          import("./views/app/gps/collections/dashboard/UrgentPaymentsAll.vue"),
      },

      {
        path: "/collection-overdue-payments",
        name: "OverduePaymentsAll",
        beforeEnter: AuthRequired,
        component: () =>
          import(
            "./views/app/gps/collections/dashboard/OverduePaymentsAll.vue"
          ),
      },

      {
        path: "/collection-recent-payments/",
        name: "RecentPaymentsAll",
        beforeEnter: AuthRequired,
        component: () =>
          import("./views/app/gps/collections/dashboard/RecentPaymentsAll.vue"),
      },

      {
        path: "/collection-payments-due",
        name: "DuePaymentsAll",
        beforeEnter: AuthRequired,
        component: () =>
          import("./views/app/gps/collections/dashboard/DuePaymentsAll.vue"),
      },

      {
        path: "/collection-notas-credito",
        name: "collectionNotasCredito",
        beforeEnter: AuthRequired,
        component: () =>
          import(
            "./views/app/gps/collections/notasCredito/collectionNotasCredito.vue"
          ),
      },

      {
        path: "/quote/:gctId",
        props: true,
        name: "quote",
        alias: "/app/gps/quote",
        beforeEnter: AuthRequired,
        component: () => import("./views/app/gps/quote/components/Quote.vue"),
      },
      {
        path: "/quotepreview/:cotId",
        props: true,
        name: "quotepreview",
        alias: "/app/gps/quotepreview",
        beforeEnter: AuthRequired,
        component: () =>
          import("./views/app/gps/quote/components/QuotePreview.vue"),
      },
      {
        path: "/quotepreviewgroup/:gctId",
        props: true,
        name: "quotepreviewgroup",
        alias: "/app/gps/quotepreviewgroup",
        beforeEnter: AuthRequired,
        component: () =>
          import("./views/app/gps/quote/components/QuotePreviewGroup.vue"),
      },

      {
        path: "gps/quote/quoteservices",
        props: true,
        name: "quoteservices",
        beforeEnter: AuthRequired,
        component: () => import("./views/app/gps/quote/QuoteServices.vue"),
      },
      {
        path: "gps/quote/quotepreviewpdf",
        props: true,
        name: "quotepreviewpdf",
        beforeEnter: AuthRequired,
        component: () => import("./views/app/gps/quote/QuotePreviewPDF.vue"),
      },

      {
        path: "ratesmanager/ratesmanager",
        props: true,
        name: "ratesmanager",
        beforeEnter: AuthRequired,
        component: () =>
          import("./views/app/ratesmanager/RatesManagerDashboard"),
      },

      // ----------- CONFIRMATIONS -----------
      {
        path: "/confirmations/:cofId",
        props(route) {
          return {
            cofId: parseInt(route.params.cofId),
          };
        },
        name: "confirmations",
        alias: "/app/gps/confirmations",
        beforeEnter: AuthRequired,
        component: () =>
          import("./views/app/gps/confirmations/Confirmations.vue"),
      },

      /* ******************* COLLECTIONS ******************* */
      {
        path: "/collection-dashboard",
        name: "collection-dashboard",
        alias: "/app/gps/collections-dashboard",
        beforeEnter: AuthRequired,
        component: () =>
          import("./views/app/gps/collections/collectionDashboard.vue"),
      },
      {
        path: "/collection-admin",
        name: "collection-admin",
        alias: "/app/gps/collections-admin",
        beforeEnter: AuthRequired,
        component: () =>
          import("./views/app/gps/collections/collectionAdmin.vue"),
      },
      {
        path: "/collection-file-manager",
        name: "collection-file-manager",
        alias: "/app/gps/collections-file-manager",
        beforeEnter: AuthRequired,
        component: () =>
          import("./views/app/gps/collections/collectionFileManager.vue"),
      },
      {
        path: "/collection-search",
        props: true,
        name: "collection-search",
        alias: "/app/gps/collections-search",
        beforeEnter: AuthRequired,
        component: () =>
          import("./views/app/gps/collections/collectionSearch.vue"),
      },
      {
        path: "/collection-search-file",
        props: true,
        name: "collection-search-file",
        alias: "/app/gps/collections-search-file",
        beforeEnter: AuthRequired,
        component: () =>
          import("./views/app/gps/collections/collectionSearchFile.vue"),
      },
      /* ******************* FIN COLLECTIONS ******************* */

      /* ******************* Reports ******************* */
      {
        path: "/client-analysis",
        name: "client-analysis",
        alias: "/app/gps/client-analysis",
        beforeEnter: AuthRequired,
        component: () => import("./views/app/gps/reports/ClientAnalysis.vue"),
      },
      {
        path: "/sales-progress",
        name: "sales-progress",
        alias: "/app/gps/sales-progress",
        beforeEnter: AuthRequired,
        component: () => import("./views/app/gps/reports/SalesProgress.vue"),
      },
      {
        path: "/itinerary-results",
        name: "itinerary-results",
        alias: "/app/gps/itinerary-results",
        beforeEnter: AuthRequired,
        component: () => import("./views/app/gps/reports/ItineraryResults.vue"),
      },
      {
        path: "/passenger-analysis",
        name: "passenger-analysis",
        alias: "/app/gps/passenger-analysis",
        beforeEnter: AuthRequired,
        component: () =>
          import(
            "./views/app/gps/reports/passenger-analysis/PassengerAnalysis.vue"
          ),
      },
      {
        path: "/sales-by-travel",
        name: "sales-by-travel",
        alias: "/app/gps/sales-by-travel",
        beforeEnter: AuthRequired,
        component: () => import("./views/app/gps/reports/SalesByTravel.vue"),
      },
      {
        path: "/year-to-date-sales",
        name: "year-to-date-sales",
        alias: "/app/gps/year-to-date-sales",
        beforeEnter: AuthRequired,
        component: () => import("./views/app/gps/reports/YearToDateSales.vue"),
      },
      {
        path: "/boat-client-analysis",
        name: "boat-client-analysis",
        alias: "/app/gps/boat-client-analysis",
        beforeEnter: AuthRequired,
        component: () =>
          import("./views/app/gps/reports/BoatClientAnalysis.vue"),
      },
      {
        path: "/financial-analysis",
        name: "financial-analysis",
        alias: "/app/gps/financial-analysis",
        beforeEnter: AuthRequired,
        component: () =>
          import("./views/app/gps/reports/FinancialAnalysis.vue"),
      },
      {
        path: "/oniric/financial-analysis-weeks",
        name: "financial-analysis-weeks",
        beforeEnter: AuthRequired,
        component: () =>
          import("./views/app/gps/reports/FinancialAnalysisWeeks.vue"),
      },

      {
        path: "/oniric/cruise-sales-overview",
        name: "cruise-sales-overview",
        beforeEnter: AuthRequired,
        component: () =>
          import(
            "./views/app/gps/reports/cruise-sales-overview/CruiseSalesOverview.vue"
          ),
      },

      {
        path: "/product/config",
        name: "config",
        beforeEnter: AuthRequired,
        component: () => import("./views/app/gps/product/config/Config.vue"),
      },

      {
        path: "/oniric/cruise-itinerary-sales",
        name: "cruise-itinerary-sales",
        beforeEnter: AuthRequired,
        component: () =>
          import("./views/app/gps/reports/CruiseItinerarySales.vue"),
      },

      {
        path: "dashboards",
        component: () => import("./views/app/dashboards"),
        redirect: `${adminRoot}/dashboards/default`,
        beforeEnter: AuthRequired,

        children: [
          {
            path: "default",
            component: () => import("./views/app/dashboards/Default"),
          },
          {
            path: "analytics",

            component: () => import("./views/app/dashboards/Analytics"),
          },
          {
            path: "ecommerce",
            component: () => import("./views/app/dashboards/Ecommerce"),
          },
          {
            path: "content",
            component: () => import("./views/app/dashboards/Content"),
          },
        ],
      },
      {
        path: "pages",
        component: () => import("./views/app/pages"),
        redirect: `${adminRoot}/pages/product`,
        beforeEnter: AuthRequired,
        children: [
          {
            path: "product",
            component: () => import("./views/app/pages/product"),
            redirect: `${adminRoot}/pages/product/data-list`,
            children: [
              {
                path: "data-list",
                component: () => import("./views/app/pages/product/DataList"),
              },
              {
                path: "thumb-list",
                component: () => import("./views/app/pages/product/ThumbList"),
              },
              {
                path: "image-list",
                component: () => import("./views/app/pages/product/ImageList"),
              },
              {
                path: "details",
                component: () => import("./views/app/pages/product/Details"),
              },
              {
                path: "details-alt",
                component: () => import("./views/app/pages/product/DetailsAlt"),
              },
            ],
          },
          {
            path: "profile",
            component: () => import("./views/app/pages/profile"),
            redirect: `${adminRoot}/pages/profile/social`,
            children: [
              {
                path: "social",
                component: () => import("./views/app/pages/profile/Social"),
              },
              {
                path: "portfolio",
                component: () => import("./views/app/pages/profile/Portfolio"),
              },
            ],
          },
          {
            path: "blog",
            component: () => import("./views/app/pages/blog"),
            redirect: `${adminRoot}/pages/blog/blog-list`,
            children: [
              {
                path: "blog-list",
                component: () => import("./views/app/pages/blog/BlogList"),
              },
              {
                path: "blog-detail",
                component: () => import("./views/app/pages/blog/BlogDetail"),
              },
            ],
          },
          {
            path: "miscellaneous",
            component: () => import("./views/app/pages/miscellaneous"),
            redirect: `${adminRoot}/pages/miscellaneous/faq`,
            children: [
              {
                path: "faq",
                component: () => import("./views/app/pages/miscellaneous/Faq"),
              },
              {
                path: "knowledge-base",
                component: () =>
                  import("./views/app/pages/miscellaneous/KnowledgeBase"),
              },
              {
                path: "search",
                component: () =>
                  import("./views/app/pages/miscellaneous/Search"),
              },
              {
                path: "prices",
                component: () =>
                  import("./views/app/pages/miscellaneous/Prices"),
              },
              {
                path: "mailing",
                component: () =>
                  import("./views/app/pages/miscellaneous/Mailing"),
              },
              {
                path: "invoice",
                component: () =>
                  import("./views/app/pages/miscellaneous/Invoice"),
              },
            ],
          },
        ],
      },
      {
        path: "applications",
        component: () => import("./views/app/applications"),
        redirect: `${adminRoot}/applications/todo`,
        beforeEnter: AuthRequired,
        children: [
          {
            path: "todo",
            component: () => import("./views/app/applications/Todo"),
          },
          {
            path: "survey",
            component: () => import("./views/app/applications/Survey"),
          },
          {
            path: "survey/:id",
            component: () => import("./views/app/applications/SurveyDetail"),
            props: true,
          },
          {
            path: "chat",
            component: () => import("./views/app/applications/Chat"),
          },
        ],
      },
      {
        path: "ui",
        component: () => import("./views/app/ui"),
        redirect: `${adminRoot}/ui/forms`,
        beforeEnter: AuthRequired,
        children: [
          {
            path: "forms",
            component: () => import("./views/app/ui/forms"),
            redirect: `${adminRoot}/ui/forms/layouts`,
            children: [
              {
                path: "layouts",
                component: () => import("./views/app/ui/forms/Layouts"),
              },
              {
                path: "components",
                component: () => import("./views/app/ui/forms/Components"),
              },
              {
                path: "validations",
                component: () => import("./views/app/ui/forms/Validations"),
              },
              {
                path: "wizard",
                component: () => import("./views/app/ui/forms/Wizard"),
              },
            ],
          },
          {
            path: "datatables",
            component: () => import("./views/app/ui/datatables"),
            redirect: `${adminRoot}/ui/datatables/divided-table`,
            children: [
              {
                path: "divided-table",
                component: () =>
                  import("./views/app/ui/datatables/DividedTable"),
              },
              {
                path: "scrollable",
                component: () => import("./views/app/ui/datatables/Scrollable"),
              },
              {
                path: "default",
                component: () => import("./views/app/ui/datatables/Default"),
              },
            ],
          },
          {
            path: "components",
            component: () => import("./views/app/ui/components"),
            redirect: `${adminRoot}/ui/components/alerts`,
            children: [
              {
                path: "alerts",
                component: () => import("./views/app/ui/components/Alerts"),
              },
              {
                path: "badges",
                component: () => import("./views/app/ui/components/Badges"),
              },
              {
                path: "buttons",
                component: () => import("./views/app/ui/components/Buttons"),
              },
              {
                path: "cards",
                component: () => import("./views/app/ui/components/Cards"),
              },
              {
                path: "carousel",
                component: () => import("./views/app/ui/components/Carousel"),
              },
              {
                path: "charts",
                component: () => import("./views/app/ui/components/Charts"),
              },
              {
                path: "collapse",
                component: () => import("./views/app/ui/components/Collapse"),
              },
              {
                path: "dropdowns",
                component: () => import("./views/app/ui/components/Dropdowns"),
              },
              {
                path: "editors",
                component: () => import("./views/app/ui/components/Editors"),
              },
              {
                path: "icons",
                component: () => import("./views/app/ui/components/Icons"),
              },
              {
                path: "input-groups",
                component: () =>
                  import("./views/app/ui/components/InputGroups"),
              },
              {
                path: "jumbotron",
                component: () => import("./views/app/ui/components/Jumbotron"),
              },
              {
                path: "maps",
                component: () => import("./views/app/ui/components/Maps"),
              },
              {
                path: "modal",
                component: () => import("./views/app/ui/components/Modal"),
              },
              {
                path: "navigation",
                component: () => import("./views/app/ui/components/Navigation"),
              },
              {
                path: "popover-tooltip",
                component: () =>
                  import("./views/app/ui/components/PopoverTooltip"),
              },
              {
                path: "sortable",
                component: () => import("./views/app/ui/components/Sortable"),
              },
              {
                path: "tables",
                component: () => import("./views/app/ui/components/Tables"),
              },
            ],
          },
        ],
      },
      {
        path: "menu",
        component: () => import("./views/app/menu"),
        redirect: `${adminRoot}/menu/types`,
        beforeEnter: AuthRequired,
        children: [
          {
            path: "types",
            component: () => import("./views/app/menu/Types"),
          },
          {
            path: "levels",
            component: () => import("./views/app/menu/levels"),
            redirect: `${adminRoot}/menu/levels/third-level-1`,
            children: [
              {
                path: "third-level-1",
                component: () =>
                  import("./views/app/menu/levels/Third-level-1"),
              },
              {
                path: "third-level-2",
                component: () =>
                  import("./views/app/menu/levels/Third-level-2"),
              },
              {
                path: "third-level-3",
                component: () =>
                  import("./views/app/menu/levels/Third-level-3"),
              },
            ],
          },
        ],
      },
      {
        path: "blank-page",
        component: () => import("./views/app/blank-page"),
      },
    ],
  },

  {
    path: "/error",
    name: "error",
    component: () => import("./views/Error"),
  },
  {
    path: "/unauthorized",
    name: "unathorized",
    component: () => import("./views/Unauthorized"),
  },
  {
    path: "/user",
    component: () => import("./views/user"),
    redirect: "/user/login",

    children: [
      {
        path: "login",
        meta: { requiresVisitor: true },
        component: () => import("./views/user/Login"),
      },
    ],
  },
  {
    path: "*",
    component: () => import("./views/Error"),
  },
];

const router = new VueRouter({
  linkActiveClass: "active",
  routes,
  history: true,
  mode: "history",
});

router.beforeEach(AuthGuard);

export default router;
