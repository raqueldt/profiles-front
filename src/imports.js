import Vue from "vue";

// LAYOUTS:
Vue.component(
  "breadcrumb-layout",
  require("./layouts/BreadcrumLayout.vue").default
);

Vue.component("importComponents", require("./importComponents").default);

/* DASHBOARD */
// Vue.component(
//   "sales",
//   require("./views/app/dashboard/SalesDashboard.vue").default
// );
Vue.component(
  "chart-dashboard",
  require("./views/app/gps/dashboard/ChartDashboard.vue").default
);
Vue.component(
  "main-dashboard",
  require("./views/app/gps/dashboard/MainDashboard.vue").default
);
Vue.component(
  "quotes-dashboard",
  require("./views/app/gps/dashboard/QuotesDashboard.vue").default
);
Vue.component(
  "my-quotes",
  require("./views/app/gps/dashboard/MyQuotes.vue").default
);
Vue.component(
  "my-requests-clients-dashboard",
  require("./views/app/gps/dashboard/MyRequestsClientsDahsboard.vue").default
);
Vue.component(
  "confirmations-dashboard",
  require("./views/app/gps/dashboard/ConfirmationsDashboard.vue").default
);
Vue.component(
  "quotes-to-expire-dashboard",
  require("./views/app/gps/dashboard/QuotesToExpireDashboard.vue").default
);
Vue.component(
  "pax-in-country-dashboard",
  require("./views/app/gps/dashboard/PaxInCountryDashboard.vue").default
);
Vue.component(
  "recent-activity-dashboard",
  require("./views/app/gps/dashboard/RecentActivityDashboard.vue").default
);
Vue.component(
  "waiting-list-dashboard",
  require("./views/app/gps/dashboard/WaitingListDashboard.vue").default
);

/* ALERTS */
Vue.component(
  "alertsglobal",
  require("./views/app/gps/alerts/Alerts.vue").default
);
Vue.component(
  "alertsavailability",
  require("./views/app/gps/alerts/AlertsAvailability.vue").default
);

/* AVAILABILITY - OLD*/
// Vue.component('availabilitymainfilters', require('./views/app/gps/availability/AvailabilityMainFilters.vue').default);
// Vue.component('availabilityfilters', require('./views/app/gps/availability/AvailabilityFilters.vue').default);
// Vue.component('availabilitydistribution', require('./views/app/gps/availability/AvailabilityDistribution.vue').default);
// Vue.component('availabilityDepartures', require('./views/app/gps/availability/AvailabilityDepartures.vue').default);
// Vue.component('ModalRowdataRaits', require('./views/app/gps/availability/ModalRowdataRaits.vue').default);

/* AVAILABILITY*/
Vue.component(
  "availability",
  require("./views/app/gps/availability/components/Availability.vue").default
);
Vue.component(
  "add-services",
  require("./views/app/gps/availability/components/AddServices.vue").default
);
Vue.component(
  "availability-departures",
  require("./views/app/gps/availability/components/AvailabilityDepartures.vue")
  .default
);
Vue.component(
  "availability-filters",
  require("./views/app/gps/availability/components/AvailabilityFilters.vue")
  .default
);
Vue.component(
  "availability-refresh",
  require("./views/app/gps/availability/components/AvailabilityRefresh.vue")
  .default
);
Vue.component(
  "availability-send-options",
  require("./views/app/gps/availability/components/AvailabilitySendOptions.vue")
  .default
);

Vue.component(
  "departures-info",
  require("./views/app/gps/availability/departures/DeparturesInfo.vue").default
);
Vue.component(
  "departures-prices",
  require("./views/app/gps/availability/departures/DeparturesPrices.vue")
  .default
);
Vue.component(
  "departures-slots",
  require("./views/app/gps/availability/departures/DeparturesSlots.vue").default
);
Vue.component(
  "departures-block-slots",
  require("./views/app/gps/availability/departures/DeparturesBlockSlots.vue")
  .default
);
Vue.component(
  "departures-block-slots-modal",
  require("./views/app/gps/availability/departures/DeparturesBlockSlotsModal.vue")
  .default
);
Vue.component(
  "departures-relocation-modal",
  require("./views/app/gps/availability/departures/DeparturesRelocationModal.vue")
  .default
);
Vue.component(
  "departures-relocation-legend",
  require("./views/app/gps/availability/departures/DeparturesRelocationLegend.vue")
  .default
);
Vue.component(
  "modal-waiting-list",
  require("./views/app/gps/availability/departures/ModalWaitingList.vue")
  .default
);
Vue.component(
  "table-waiting-list",
  require("./views/app/gps/availability/departures/TableWaitingList.vue")
  .default
);
Vue.component(
  "modal-request",
  require("./views/app/gps/availability/departures/ModalRequest.vue").default
);
Vue.component(
  "history-quote",
  require("./views/app/gps/availability/departures/HistoryQuote.vue").default
);
Vue.component(
  "history-confirmation",
  require("./views/app/gps/availability/departures/HistoryConfirmation.vue")
  .default
);

/* BOOKINGS*/
Vue.component(
  "slotsparent",
  require("./views/app/gps/bookings/SlotsParent.vue").default
);
Vue.component(
  "detail-promotion-departure",
  require("./views/app/gps/bookings/DetailPromotion.vue").default
);

Vue.component(
  "slotsform",
  require("./views/app/gps/bookings/SlotsForm.vue").default
);
Vue.component(
  "slotsdistribution",
  require("./views/app/gps/bookings/SlotsDistribution.vue").default
);
Vue.component(
  "slotssummary",
  require("./views/app/gps/bookings/SlotsSummary.vue").default
);
Vue.component(
  "slotsmodalresume",
  require("./views/app/gps/bookings/SlotsModalResume.vue").default
);
Vue.component(
  "ModalDeckPlans",
  require("./views/app/gps/bookings/ModalDeckPlans.vue").default
);
Vue.component(
  "slotsextradiscounts",
  require("./views/app/gps/bookings/SlotsExtraDiscounts.vue").default
);
Vue.component(
  "slotsstatistics",
  require("./views/app/gps/bookings/SlotsStatistics.vue").default
);
Vue.component(
  "slotspreview",
  require("./views/app/gps/bookings/SlotsPreview.vue").default
);
Vue.component(
  "slots-modal-change-percent",
  require("./views/app/gps/bookings/SlotsModalChangePercent.vue").default
);
Vue.component(
  "slots-popover",
  require("./views/app/gps/bookings/SlotsPopover.vue").default
);

/* BOOKINGS - EDIT*/
Vue.component(
  "slotsparentedit",
  require("./views/app/gps/bookings/edit/SlotsParentEdit.vue").default
);
Vue.component(
  "slotsformedit",
  require("./views/app/gps/bookings/edit/SlotsFormEdit.vue").default
);
Vue.component(
  "slotsdistributionedit",
  require("./views/app/gps/bookings/edit/SlotsDistributionEdit.vue").default
);
Vue.component(
  "slotssummaryedit",
  require("./views/app/gps/bookings/edit/SlotsSummaryEdit.vue").default
);
Vue.component(
  "slotsmodalresumeedit",
  require("./views/app/gps/bookings/edit/SlotsModalResumeEdit.vue").default
);

Vue.component(
  "ModalonAvailability",
  require("./views/app/gps/availability/ModalonAvailability.vue").default
);
Vue.component(
  "ItineraryAvailability",
  require("./views/app/gps/availability/ItineraryAvailability.vue").default
);
Vue.component(
  "ModalItinerary",
  require("./views/app/gps/availability/ModalItinerary.vue").default
);
Vue.component(
  "ActivitySumary",
  require("./views/app/gps/availability/ActivitySumary.vue").default
);

/* QUOTE */
Vue.component(
  "quoteadmin",
  require("./views/app/gps/quote/QuoteAdmin.vue").default
);
Vue.component(
  "quoteservices",
  require("./views/app/gps/quote/QuoteServices.vue").default
);
Vue.component(
  "ModalExtraDiscount",
  require("./views/app/gps/quote/ModalExtraDiscount.vue").default
);
Vue.component(
  "ModalNoteQuote",
  require("./views/app/gps/quote/ModalNoteQuote.vue").default
);
Vue.component(
  "quoteaddservices",
  require("./views/app/gps/quote/QuoteAddServices.vue").default
);
Vue.component(
  "quotepreviewpdf",
  require("./views/app/gps/quote/QuotePreviewPDF.vue").default
);
Vue.component(
  "ModalExtendTimeLimit",
  require("./views/app/gps/quote/ModalExtendTimeLimit.vue").default
);
Vue.component(
  "ModalCodes",
  require("./views/app/gps/quote/ModalCodes.vue").default
);

Vue.component(
  "quotes",
  require("./views/app/gps/quote/components/Quote.vue").default
);
Vue.component(
  "quote-header",
  require("./views/app/gps/quote/components/QuoteHeader.vue").default
);
Vue.component(
  "add-service",
  require("./views/app/gps/quote/components/ButtonAddServices.vue").default
);
Vue.component(
  "quote-tabs",
  require("./views/app/gps/quote/components/QuoteTabs.vue").default
);
Vue.component(
  "group-tabs",
  require("./views/app/gps/quote/components/GroupTabs.vue").default
);
Vue.component(
  "quote-service",
  require("./views/app/gps/quote/components/QuoteAddService.vue").default
);
Vue.component(
  "detail-header",
  require("./views/app/gps/quote/DetailItems/DetailHeader.vue").default
);
Vue.component(
  "detail-items",
  require("./views/app/gps/quote/DetailItems/DetailItems.vue").default
);
Vue.component(
  "detail-service-cruise",
  require("./views/app/gps/quote/DetailItems/DetailServiceCruise.vue").default
);
Vue.component(
  "detail-service-product",
  require("./views/app/gps/quote/DetailItems/DetailServiceProduct.vue").default
);

Vue.component(
  "detail-summary",
  require("./views/app/gps/quote/DetailItems/DetailSummary.vue").default
);
Vue.component(
  "modal-settings-group",
  require("./views/app/gps/quote/components/ModalSettingsGroup.vue").default
);

Vue.component(
  "modal-change-correo",
  require("./views/app/gps/quote/components/ModalCambioCorreo.vue").default
);
Vue.component(
  "modal-change-cliente",
  require("./views/app/gps/quote/components/ModalCambioCliente.vue").default
);

Vue.component(
  "modal-setting-period",
  require("./views/app/gps/quote/components/ModalSettingPeriod.vue").default
);
Vue.component(
  "copy-quote",
  require("./views/app/gps/quote/components/CopyQuote.vue").default
);
Vue.component(
  "modal-status-quote",
  require("./views/app/gps/quote/components/ModalStatusQuote.vue").default
);
Vue.component(
  "quote-preview",
  require("./views/app/gps/quote/components/QuotePreview.vue").default
);
Vue.component(
  "quote-preview-group",
  require("./views/app/gps/quote/components/QuotePreviewGroup.vue").default
);
Vue.component(
  "quote-preview-by-group",
  require("./views/app/gps/quote/components/QuotePreviewbyGroup.vue").default
);
Vue.component(
  "booking-details",
  require("./views/app/gps/quote/components/BookingDetail.vue").default
);
Vue.component(
  "modal-codes-client",
  require("./views/app/gps/quote/components/ModalCodesClient.vue").default
);
Vue.component(
  "modal-settings-include",
  require("./views/app/gps/quote/components/ModalSettingsIncludes.vue").default
);

Vue.component(
  "modal-pre-confirm",
  require("./views/app/gps/quote/components/ModalPreConfirm.vue").default
);

/* CONFIRMATIONS */
// Vue.component('summaryparent', require('./views/app/gps/confirmations/summary/SummaryParent.vue').default);
// Vue.component('itineraryparent', require('./views/app/gps/confirmations/itinerary/ItineraryParent.vue').default);
// Vue.component('modalitineraryconfirmation', require('./views/app/gps/confirmations/itinerary/ModalNoteItineraryConfirmation.vue').default);
// Vue.component('invoiceparent', require('./views/app/gps/confirmations/invoice/InvoiceParent.vue').default);
// Vue.component('historyparent', require('./views/app/gps/confirmations/history/HistoryParent.vue').default);
// Vue.component('documentsparent', require('./views/app/gps/confirmations/document/DocumentsParent.vue').default);

/* Pssengers */
// Vue.component('passengersparent', require('./views/app/gps/confirmations/passengers/PassengerParent.vue').default);
// Vue.component('FormPassengers', require('./views/app/gps/confirmations/passengers/FormPassengers.vue').default);
// Vue.component('modalCancelPax', require('./views/app/gps/confirmations/passengers/ModalCancelPax.vue').default);

/* CONFIRMATIONS */
Vue.component(
  "confirmations",
  require("./views/app/gps/confirmations/Confirmations.vue").default
);
Vue.component(
  "confirmation-options",
  require("./views/app/gps/confirmations/ModalOptionsConfirmation.vue").default
);
Vue.component(
  "confirmations-summary",
  require("./views/app/gps/confirmations/summary/Summary.vue").default
);
Vue.component(
  "modal-setting-period-confirmation",
  require("./views/app/gps/confirmations/summary/ModalSettingPeriodConfirmation.vue")
  .default
);
Vue.component(
  "confirmations-passengers",
  require("./views/app/gps/confirmations/passengers/Passengers.vue").default
);
Vue.component(
  "confirmations-itinerary",
  require("./views/app/gps/confirmations/itinerary/Itinerary.vue").default
);
Vue.component(
  "confirmations-documents",
  require("./views/app/gps/confirmations/documents/Documents.vue").default
);
Vue.component(
  "invoice-documents",
  require("./views/app/gps/confirmations/documents/DocumentsInvoice.vue")
  .default
);
Vue.component(
  "new-invoice",
  require("./views/app/gps/confirmations/documents/DocumentsInvoiceModalNew.vue")
  .default
);
Vue.component(
  "edit-invoice",
  require("./views/app/gps/confirmations/documents/DocumentsInvoiceModalEdit.vue")
  .default
);
Vue.component(
  "confirmations-attachments",
  require("./views/app/gps/confirmations/attachments/Attachments.vue").default
);
Vue.component(
  "confirmations-history",
  require("./views/app/gps/confirmations/history/History.vue").default
);

/* CONFIRMATIONS  - SUMMARY*/
Vue.component(
  "summary-confirmation-details",
  require("./views/app/gps/confirmations/summary/SummaryConfirmationDetails.vue")
  .default
);
Vue.component(
  "summary-confirmation-notes",
  require("./views/app/gps/confirmations/summary/SummaryConfirmationNotes.vue")
  .default
);
Vue.component(
  "summary-confirmation-policies",
  require("./views/app/gps/confirmations/summary/SummaryConfirmationPolicies.vue")
  .default
);
Vue.component(
  "summary-confirmation-edit-policies",
  require("./views/app/gps/confirmations/summary/SummaryConfirmationEditPolicies.vue")
  .default
);
Vue.component(
  "summary-confirmation-table-cancellation-policies",
  require("./views/app/gps/confirmations/summary/SummaryConfirmationTableCancellationPolicies.vue")
  .default
);
Vue.component(
  "summary-confirmation-plan-pagos",
  require("./views/app/gps/confirmations/summary/SummaryConfirmationPlanPagos.vue")
  .default
);
Vue.component(
  "summary-confirmation-edit-plan-pagos",
  require("./views/app/gps/confirmations/summary/SummaryConfirmationEditPlanPagos.vue")
  .default
);
Vue.component(
  "summary-plan-pagos-edit-porcents",
  require("./views/app/gps/confirmations/summary/SummaryConfirmationPlanPagosEditPorcents.vue")
  .default
);

Vue.component(
  "summary-confirmation-table-payments-policies",
  require("./views/app/gps/confirmations/summary/SummaryConfirmationTablePaymentsPolicies.vue")
  .default
);
Vue.component(
  "summary-confirmation-includes",
  require("./views/app/gps/confirmations/summary/SummaryConfirmationIncludes.vue")
  .default
);

/* CONFIRMATIONS  - ITINERARY*/
Vue.component(
  "itinerary-confirmation-form",
  require("./views/app/gps/confirmations/itinerary/ItineraryConfirmationForm.vue")
  .default
);
Vue.component(
  "itinerary-confirmation-add-services",
  require("./views/app/gps/confirmations/itinerary/ItineraryConfirmationModalAddServices.vue")
  .default
);
Vue.component(
  "itinerary-confirmation-subtotal",
  require("./views/app/gps/confirmations/itinerary/ItineraryConfirmationSubtotal.vue")
  .default
);

/* RATE MANAGER */
Vue.component(
  "ratesmanagerdasboard",
  require("./views/app/ratesmanager/RatesManagerDashboard.vue").default
);
Vue.component(
  "modaldeparturespromotion",
  require("./views/app/ratesmanager/ModalDeparturesPromotion.vue").default
);
Vue.component(
  "DetailPromotion",
  require("./views/app/ratesmanager/DetailPromotion.vue").default
);

/* COLLECTIONS */
Vue.component(
  "detail-history-quote",
  require("./views/app/gps/collections/HistoryQuote.vue").default
);
Vue.component(
  "detail-history-confirmation",
  require("./views/app/gps/collections/HistoryConfirmation.vue").default
);
Vue.component(
  "collection-header",
  require("./views/app/gps/collections/components/collectionHeader.vue").default
);
Vue.component(
  "collection-dashboard",
  require("./views/app/gps/collections/collectionDashboard.vue").default
);
Vue.component(
  "collection-admin",
  require("./views/app/gps/collections/collectionAdmin.vue").default
);
Vue.component(
  "collection-file-manager",
  require("./views/app/gps/collections/collectionFileManager.vue").default
);
/* REPORTS */
Vue.component(
  "client-analysis",
  require("./views/app/gps/reports/ClientAnalysis.vue").default
);
Vue.component(
  "sales-progress",
  require("./views/app/gps/reports/SalesProgress.vue").default
);

Vue.component(
  "passengers-analyisis",
  require("./views/app/gps/reports/passenger-analysis/PassengerAnalysis.vue")
  .default
);
Vue.component(
  "sales-by-travel",
  require("./views/app/gps/reports/SalesByTravel.vue").default
);
Vue.component(
  "year-to-date-sales",
  require("./views/app/gps/reports/YearToDateSales.vue").default
);
Vue.component(
  "boat-client-analysis",
  require("./views/app/gps/reports/BoatClientAnalysis.vue").default
);
Vue.component(
  "boat-client-analysis-details",
  require("./views/app/gps/reports/BoatClientAnalysisDetails.vue").default
);
// 2022-04-28 | fg | search

Vue.component(
  "financial-analysis",
  require("./views/app/gps/reports/FinancialAnalysis.vue").default
);
Vue.component(
  "financial-analysis-departures",
  require("./views/app/gps/reports/FinancialAnalysisDepartures.vue").default
);

Vue.component(
  "financial-analysis-monthly",
  require("./views/app/gps/reports/FinancialAnalysisMonthly.vue").default
);
Vue.component(
  "itinerary-results",
  require("./views/app/gps/reports/ItineraryResults.vue").default
);
Vue.component(
  "itinerary-results-detail",
  require("./views/app/gps/reports/ItineraryResultsDetail.vue").default
);

// COLLECTIONS-DASHBOARD
Vue.component(
  "collection-payments-recorded",
  require("./views/app/gps/collections/dashboard/collectionRecentPaymentsRecorded.vue")
  .default
);
Vue.component(
  "collection-payments-due",
  require("./views/app/gps/collections/dashboard/collectionPaymentsDue.vue")
  .default
);
Vue.component(
  "collection-overdue-payments",
  require("./views/app/gps/collections/dashboard/collectionOverduePayments.vue")
  .default
);
Vue.component(
  "collection-urgent-payments",
  require("./views/app/gps/collections/dashboard/collectionUrgentPayments.vue")
  .default
);

// COLLECTIONS-ADMINISTRATOR
Vue.component(
  "collection-admin-filter",
  require("./views/app/gps/collections/admin/collectionAdminFilter.vue").default
);
Vue.component(
  "collection-admin-table",
  require("./views/app/gps/collections/admin/collectionAdminTable.vue").default
);
Vue.component(
  "collection-admin-summary",
  require("./views/app/gps/collections/admin/collectionAdminSummary.vue")
  .default
);
Vue.component(
  "collection-admin-resume-client",
  require("./views/app/gps/collections/admin/collectionAdminResumeByClient.vue")
  .default
);

// COLLECTIONS-FILE MANAGER
Vue.component(
  "collection-file-manager-tabs",
  require("./views/app/gps/collections/fileManager/collectionFileManagerTabs.vue")
  .default
);
Vue.component(
  "collection-file-manager-summary",
  require("./views/app/gps/collections/fileManager/collectionFileManagerSummary.vue")
  .default
);
Vue.component(
  "collection-file-manager-filter",
  require("./views/app/gps/collections/fileManager/collectionFileManagerFilter.vue")
  .default
);

Vue.component(
  "collection-file-manager-records",
  require("./views/app/gps/collections/fileManager/records/collectionFileManagerRecords.vue")
  .default
);
Vue.component(
  "collection-file-manager-credit-notes",
  require("./views/app/gps/collections/fileManager/credit-notes/collectionFileManagerCreditNotes.vue")
  .default
);
Vue.component(
  "collection-file-manager-compensation",
  require("./views/app/gps/collections/fileManager/compensations/collectionFileManagerCompensation.vue")
  .default
);
Vue.component(
  "collection-file-manager-compensation-credit",
  require("./views/app/gps/collections/fileManager/compensations/collectionFileManagerCompensationCredit.vue")
  .default
);
Vue.component(
  "collection-file-manager-header",
  require("./views/app/gps/collections/fileManager/collectionFileManagerHeader.vue")
  .default
);

// COMPONENTS
Vue.component(
  "formated-dates",
  require("./views/app/gps/components/FormatedDates.vue").default
);
Vue.component(
  "formated-range-date",
  require("./views/app/gps/components/FormatedRangeDate.vue").default
);
Vue.component(
  "formated-dates-event",
  require("./views/app/gps/components/FormatedDatesEvent.vue").default
);
/* SNIPPETS */
Vue.component(
  "modal-snippets",
  require("./views/app/gps/snippets/ModalSnippets.vue").default
);
Vue.component(
  "modal-snippets-copy-data",
  require("./views/app/gps/snippets/ModalSnippetsCopyData.vue").default
);

/* SNIPPETS */
Vue.component(
  "itinerary-info-table",
  require("./views/app/gps/availability/components/ItinerarayInfoTable.vue")
  .default
);

// DEPARTURES-TABLE
Vue.component(
  "departures-checkbox",
  require("./views/app/gps/availability/departures-table/DeparturesCheckbox.vue")
  .default
);
Vue.component(
  "departures-yacht",
  require("./views/app/gps/availability/departures-table/DeparturesYacht.vue")
  .default
);
Vue.component(
  "departures-dates",
  require("./views/app/gps/availability/departures-table/DeparturesDates.vue")
  .default
);
Vue.component(
  "departures-itinerary",
  require("./views/app/gps/availability/departures-table/DeparturesItinerary.vue")
  .default
);
Vue.component(
  "departures-available",
  require("./views/app/gps/availability/departures-table/DeparturesAvailable.vue")
  .default
);
Vue.component(
  "departures-on-hold",
  require("./views/app/gps/availability/departures-table/DeparturesOnHold.vue")
  .default
);
Vue.component(
  "departures-prices-table",
  require("./views/app/gps/availability/departures-table/DeparturesPrices.vue")
  .default
);
Vue.component(
  "departures-distribution-table",
  require("./views/app/gps/availability/departures-table/DeparturesDistribution.vue")
  .default
);
Vue.component(
  "departures-request",
  require("./views/app/gps/availability/departures-table/DeparturesRequest.vue")
  .default
);


/* TARGETS */
Vue.component(
    "targets",
    require("./views/app/gps/targets/Targets.vue")
    .default
  );