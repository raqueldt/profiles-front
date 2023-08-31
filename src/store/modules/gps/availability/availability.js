import axios from 'axios'
import moment from "moment";
import { apiUrl } from '../../../../constants/config'
import CruiseServices from '../../../../services/gps/cruise/CruiseServices.js';
import ItineraryServices from '../../../../services/gps/itinerary/ItineraryServices.js';
import MetadataServices from '../../../../services/gps/metadata/MetadataServices.js';

import ActivityServices from "../../../../services/gps/activity/ActivityServices.js";
import SiteServices from "../../../../services/gps/site/siteServices.js";
import SpecieServices from "../../../../services/gps/specie/SpecieServices.js";
import ProfilesServices from "../../../../services/gps/profiles/ProfilesServices.js";

const state = {
    originalRowdata: [],

    /* Lista de filtros iniciales*/
    initialYatchsList: [],
    //initialItinerariesList: [],
    initialItinerariesList: [{
            itinerariesTypes: "Simple",
            itinNigths: [
                { id: 3, nights: "3 Nights" },
                { id: 4, nights: "4 Nights" },
                { id: 5, nights: "5 Nights" },
                { id: 6, nights: "6 Nights" },
                { id: 7, nights: "7 Nights" }
            ]
        },
        {
            itinerariesTypes: "Compound",
            itinNigths: [
                { id: 8, nights: "8 Nights" },
                { id: 9, nights: "9 Nights" },
                { id: 10, nights: "10 Nights" },
                { id: 11, nights: "11 Nights" },
                { id: 12, nights: "12 Nights" },
                { id: 13, nights: "13 Nights" },
                { id: 14, nights: "14 Nights" }

            ]
        }
    ],
    initialItinerariesTypeList: [],

    /* Lista de filtros secundarios*/
    initialActivityList: [],
    initialSitesList: [],
    initialSpeciesList: [],
    initialCompanyList: [],

    /* Valores seleccionados en Filtro inicial*/
    //dateMainFilter: "",
    //dateMainFilter: [],
    dateMainFilter: {
        startDate: null,
        endDate: null
    },

    yatchMainFilters: [],
    itineraryMainFilters: [],
    typeItineraryMainFilters: [],

    //Filtro por default para Itinerarios largos y cortos
    //largeShortItineraryMainFilters: [],
    largeShortItineraryMainFilters: { id: "1", value: "Standard" },

    paxMainFilters: "",

    /* Valores seleccionados en Filtro secundario*/
    activitySecondaryFilters: [],
    sitesSecondaryFilters: [],
    speciesSecondaryFilters: [],
    companySecondaryFilters: [],
    porcentSecondaryFilters: "",
    rangeSecondaryFilters: [1000, 15000],
    comisionSecondaryFilters: "",

    itinerariesByActivities: [],
    itinerariesBySites: [],
    itinerariesBySpecies: []
};

const getters = {
    // Obtengo lista de filtros principales
    getInitialYatchsList: state => state.initialYatchsList,
    getInitialItinerariesList: state => state.initialItinerariesList,
    getInitialItinerariesTypeList: state => state.initialItinerariesTypeList,

    // Obtengo lista de filtros secundarios
    getInitialActivityList: state => state.initialActivityList,
    getInitialSitesList: state => state.initialSitesList,
    getInitialSpeciesList: state => state.initialSpeciesList,
    getInitialCompanyList: state => state.initialCompanyList,

    // Obtengo datos seleccionados de filtros principales
    getYatchMainFilters: state => state.yatchMainFilters,
    //getYatchMainFilters: state => sessionStorage.getItem('setYatchsMainFilter') ? JSON.parse(sessionStorage.getItem('setYatchsMainFilter')) :  state.yatchMainFilters,

    getItineraryMainFilters: state => state.itineraryMainFilters,
    //getItineraryMainFilters: state => sessionStorage.getItem('setItinerariesMainFilter') ? JSON.parse(sessionStorage.getItem('setItinerariesMainFilter')) :  state.itineraryMainFilters,

    getTypeItineraryMainFilters: state => state.typeItineraryMainFilters,
    getLargeShortItineraryMainFilters: state =>
        state.largeShortItineraryMainFilters,
    getPaxMainFilters: state => state.paxMainFilters,

    getDateMainFilter: state => state.dateMainFilter,

    // Obtengo datos seleccionados de filtros secundarios
    getActivitySecondaryFilters: state => state.activitySecondaryFilters,
    getSitesSecondaryFilters: state => state.sitesSecondaryFilters,
    getSpeciesSecondaryFilters: state => state.speciesSecondaryFilters,
    getCompanySecondaryFilters: state => state.companySecondaryFilters,
    getPorcentSecondaryFilters: state => state.porcentSecondaryFilters,
    getRangeSecondaryFilters: state => state.rangeSecondaryFilters,
    getComisionSecondaryFilters: state => state.comisionSecondaryFilters,

    // Array de Salidas
    getOriginalRowdata: state => state.originalRowdata,

    //Para filtros avanzados
    getItinerariesByActivities: state => state.itinerariesByActivities,
    getItinerariesBySites: state => state.itinerariesBySites,
    getItinerariesBySpecies: state => state.itinerariesBySpecies
};

const mutations = {
    setDateMainFilter(state, dateMainFilter) {
        // sessionStorage.setItem('initialDateRangeFilter', JSON.stringify(dateMainFilter)); // Guardo en SessionStorage el rango inicial de fechas
        state.dateMainFilter = dateMainFilter;
    },
    setYatchsMainFilter(state, yatchMainFilters) {
        sessionStorage.setItem('setYatchsMainFilter', JSON.stringify(yatchMainFilters));
        state.yatchMainFilters = yatchMainFilters;
    },
    setItinerariesMainFilter(state, itineraryMainFilters) {
        sessionStorage.setItem('setItinerariesMainFilter', JSON.stringify(itineraryMainFilters));
        state.itineraryMainFilters = itineraryMainFilters;
    },
    setTypeItineraryFiltersMainFilter(state, typeItineraryMainFilters) {
        sessionStorage.setItem('setTypeItineraryFiltersMainFilter', JSON.stringify(typeItineraryMainFilters));
        state.typeItineraryMainFilters = typeItineraryMainFilters;
    },
    setSitesSecondaryFilters(state, sitesSecondaryFilters) {        
        sessionStorage.setItem('setSitesSecondaryFilters', JSON.stringify(sitesSecondaryFilters));
        state.sitesSecondaryFilters = sitesSecondaryFilters;
    },
    setLargeShortItineraryFiltersMainFilter(state, largeShortItineraryMainFilters ) {
        //sessionStorage.setItem('setLargeShortItineraryFiltersMainFilter', JSON.stringify(largeShortItineraryMainFilters));
        state.largeShortItineraryMainFilters = largeShortItineraryMainFilters;
    },
    setSpeciesSecondaryFilters(state, speciesSecondaryFilters) {
        sessionStorage.setItem('setSpeciesSecondaryFilters', JSON.stringify(speciesSecondaryFilters));
        state.speciesSecondaryFilters = speciesSecondaryFilters;
    },
    setPaxMainFilter(state, paxMainFilters) {        
        sessionStorage.setItem('setPaxMainFilter', JSON.stringify(paxMainFilters));
        state.paxMainFilters = paxMainFilters;
    },
    setRangeSecondaryFilters(state, rangeSecondaryFilters) {
        //sessionStorage.setItem('setRangeSecondaryFilters', JSON.stringify(rangeSecondaryFilters));
        state.rangeSecondaryFilters = rangeSecondaryFilters;
    },





    setInitialYatchsList(state, initialYatchsList) {
        state.initialYatchsList = initialYatchsList;
    },
    setInitialItinerariesList(state, initialItinerariesList) {
        state.initialItinerariesList = initialItinerariesList;
    },
    setInitialItinerariesTypeList(state, initialItinerariesTypeList) {
        state.initialItinerariesTypeList = initialItinerariesTypeList;
    },

    setInitialActivityList(state, initialActivityList) {
        state.initialActivityList = initialActivityList;
    },
    setInitialSpeciesList(state, initialSpeciesList) {
        state.initialSpeciesList = initialSpeciesList;
    },
    setInitialSitesList(state, initialSitesList) {
        state.initialSitesList = initialSitesList;
    },
    setInitialCompanyList(state, initialCompanyList) {
        state.initialCompanyList = initialCompanyList;
    },
    setActivitySecondaryFilters(state, activitySecondaryFilters) {
        state.activitySecondaryFilters = activitySecondaryFilters;
    },
    setCompanySecondaryFilters(state, companySecondaryFilters) {
        state.companySecondaryFilters = companySecondaryFilters;
    },
    setPorcentSecondaryFilters(state, porcentSecondaryFilters) {
        state.porcentSecondaryFilters = porcentSecondaryFilters;
    },
    setComisionSecondaryFilters(state, comisionSecondaryFilters) {
        state.comisionSecondaryFilters = comisionSecondaryFilters;
    },

    setOriginalRowdata(state, originalRowdata) {
        state.originalRowdata = originalRowdata;
    },

    /* Filtros activities, sites, species*/
    setItinerariesByActivities(state, itinerariesByActivities) {
        state.itinerariesByActivities = itinerariesByActivities;
    },
    setItinerariesBySites(state, itinerariesBySites) {
        state.itinerariesBySites = itinerariesBySites;
    },
    setItinerariesBySpecies(state, itinerariesBySpecies) {
        state.itinerariesBySpecies = itinerariesBySpecies;
    }

    // getTodoItemsError(state, error) {
    //     state.isLoad = false
    //     state.todoError = error
    //     state.allItems = null
    //     state.items = null
    // },
    // addTodoItem(state, newItem) {
    //     const newId = Math.max(...state.allItems.map(item => item.id)) + 1
    //     state.allItems.splice(0, 0, { id: newId, ...newItem })
    //     state.items = state.allItems
    // }
};

const actions = {

    // ************ APIs Filtros iniciales ***************
    getYatchs({ commit }) {
        return new Promise((resolve, reject) => {
            CruiseServices.getCruises()
                .then(response => {
                    commit('setInitialYatchsList', response.data.data);
                    resolve();
                })
                .catch(error => {
                    console.log("Error: " + error);
                });
        })
    },
    getItinerariesType({ commit }) {
        return new Promise((resolve, reject) => {
            MetadataServices.getMetadataByGroup(14)
                .then(response => {
                    commit('setInitialItinerariesTypeList', response.data.data);
                    resolve();
                })
                .catch(error => {
                    console.log("Error: " + error);
                });
        })
    },
    // getAllItineraries({ commit }) {
    //     return new Promise((resolve, reject) => {
    //         ItineraryServices.getAllItineraries()
    //             .then(response => {
    //                 commit('setInitialItinerariesList', response.data.data);
    //                 resolve();
    //             })
    //             .catch(error => {
    //                 console.log("Error: " + error);
    //             });
    //     })
    // },

    // ************ Fin APIs Filtros iniciales ***************

    // ************ APIs Filtros secundarios ***************

    getAllActivities({ commit }) {
        return new Promise((resolve, reject) => {
            ActivityServices.getAllActivities()
                .then(response => {
                    commit('setInitialActivityList', response.data.data);
                    resolve();
                })
                .catch(error => {
                    console.log("Error: " + error);
                });
        })
    },
    getAllSites({ commit }) {
        return new Promise((resolve, reject) => {
            SiteServices.getAll()
                .then(response => {
                    commit('setInitialSitesList', response.data.data);
                    resolve();
                })
                .catch(error => {
                    console.log("Error: " + error);
                });
        })
    },
    getAllSpecies({ commit }) {
        return new Promise((resolve, reject) => {
            SpecieServices.getAll()
                .then(response => {
                    commit('setInitialSpeciesList', response.data.data);
                    resolve();
                })
                .catch(error => {
                    console.log("Error: " + error);
                });
        })
    },
    getComisionGPS({ commit }) {
        return new Promise((resolve, reject) => {
            ProfilesServices.getComisionGPS()
                .then(response => {
                    commit('setInitialCompanyList', response.data.data);
                    resolve();
                })
                .catch(error => {
                    console.log("Error: " + error.data);
                });
        })
    },

    getItinerariesByActivities({ commit }, selectedActivities) {
        // console.log("Seleccionado (2): " + selectedActivities)
        return new Promise((resolve, reject) => {
            if (selectedActivities.length > 0) {
                let selectedActivitiesOnlyActId = selectedActivities.map(a => a.actId);
                let data = {
                    selectedActivities: selectedActivitiesOnlyActId
                };
                ItineraryServices.getItinerariesByActivities(data)
                    .then(response => {
                        //console.log("RESULTADO ==>: " + JSON.stringify(response.data.data));
                        if (response.data.data.length) {
                            commit('setItinerariesByActivities', response.data.data);
                            resolve();
                        }
                    })
                    .catch(error => {
                        console.log("Error: " + error);
                    });
            }
        })
    },
    getItinerariesBySites({ commit }, selectedSites) {
        return new Promise((resolve, reject) => {

            if (selectedSites.length > 0) {
                let selectedSitesOnlySitId = selectedSites.map(a => a.sitId);
                let data = { selectedSites: selectedSitesOnlySitId };
                ItineraryServices.getItinerariesBySites(data)
                    .then(response => {
                        if (response.data.data.length) {
                            commit("setItinerariesBySites", response.data.data);
                            resolve();
                        }
                    })
                    .catch(error => {
                        console.log("Error: " + error);
                    });
            }
        })
    },

    getItinerariesBySpecies({ commit }, selectedSpecies) {

        return new Promise((resolve, reject) => {
            if (selectedSpecies.length > 0) {
                let selectedSpeciesOnlySitId = selectedSpecies.map(a => a.speId);
                let data = { selectedSpecies: selectedSpeciesOnlySitId };
                ItineraryServices.getItinerariesBySpecies(data)
                    .then(response => {
                        if (response.data.data.length) {
                            commit('setItinerariesBySpecies', response.data.data);
                            resolve();
                        }
                    })
                    .catch(error => {
                        console.log("Error: " + error);
                    });
            }
        })
    },


    // ************ Fin APIs Filtros secundarios ***************
    setSitesFilter({ commit }, sitesFilter) {
        //sessionStorage.removeItem('initialSitesFilter')
        sessionStorage.setItem('initialSitesFilter', JSON.stringify(sitesFilter));
        commit('setSitesSecondaryFilters', sitesFilter);
    }

    // getTodoItems({ commit }) {
    //     axios
    //         .get(`${apiUrl}/todos`)
    //         .then(r => r.data)
    //         .then(res => {
    //             if (res.status) {
    //                 commit('getTodoItemsSuccess', res.data)
    //             } else {
    //                 commit('getTodoItemsError', 'error:getTodoItems')
    //             }
    //         })
    // }
}

export default {
    state,
    getters,
    mutations,
    actions
}