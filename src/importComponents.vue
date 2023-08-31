<template></template>
<script>
import InputTag from "./components/Form/InputTag";
import vSelect from "vue-select";
import Datepicker from 'vuejs-datepicker';
import "vue-select/dist/vue-select.css";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import { getDirection } from "./utils/index";
// import { validationMixin} from "vuelidate";
import DateRangePicker from 'vue2-daterange-picker'
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import moment from "moment";

// const {
//     required,
//     maxLength,
//     minLength,
//     alpha,
//     email,
//     sameAs,
//     numeric,
//     maxValue,
//     minValue,
//     helpers
// } = require("vuelidate/lib/validators");
// const upperCase = helpers.regex('upperCase', /^[A-Z]*$/)

export default {
    // mixins: [validationMixin],
    name: 'importComponents',
    components: {
        "input-tag": InputTag,
        "v-select": vSelect,
        datepicker: Datepicker,
        "vue-slider": VueSlider,
        DateRangePicker 
    },
     data(){
        return {
            maxDate: moment().add(3, 'Y').format('YYYY-MM-DD'),     // maxDate
            opens: 'right',
            locale: {                
                direction: 'ltr', //direction of text
                format: 'yyyy-mm-dd',
                separator: ' - ', //separator between the two ranges
                applyLabel: 'Apply',
                cancelLabel: 'Cancel',
                weekLabel: 'W',
                clearLabel: "Clear",
                // cancelLabel: 'Clear',
                customRangeLabel: 'Custom Range',
                showCustomRangeLabel: false,
                daysOfWeek: moment.weekdaysMin(), //array of days - see moment documenations for details
                monthNames: moment.monthsShort(), //array of month names - see moment documenations for details
                firstDay: 1, //ISO first day of week - see moment documenations for details                
            },
            
            ranges: {
                     [moment([moment().format('YYYY'),0]).format('yyyy-MMM')]: [
                        moment([moment().format('YYYY'), 0, 1]).toDate(),
                        moment([moment().format('YYYY'), 0]).endOf('month').toDate()
                    ],
                     [moment([moment().format('YYYY'),1]).format('yyyy-MMM')]: [
                        moment([moment().format('YYYY'), 1, 1]).toDate(),
                        moment([moment().format('YYYY'), 1]).endOf('month').toDate()
                    ],
                    [moment([moment().format('YYYY'),2]).format('yyyy-MMM')]: [
                        moment([moment().format('YYYY'), 2, 1]).toDate(),
                        moment([moment().format('YYYY'), 2]).endOf('month').toDate()
                    ],
                    [moment([moment().format('YYYY'),3]).format('yyyy-MMM')]: [
                        moment([moment().format('YYYY'), 3, 1]).toDate(),
                        moment([moment().format('YYYY'), 3]).endOf('month').toDate()
                    ],
                    [moment([moment().format('YYYY'),4]).format('yyyy-MMM')]: [
                        moment([moment().format('YYYY'), 4, 1]).toDate(),
                        moment([moment().format('YYYY'), 4]).endOf('month').toDate()
                    ],
                     [moment([moment().format('YYYY'),5]).format('yyyy-MMM')]: [
                        moment([moment().format('YYYY'), 5, 1]).toDate(),
                        moment([moment().format('YYYY'), 5]).endOf('month').toDate()
                    ],
                    [moment([moment().format('YYYY'),6]).format('yyyy-MMM')]: [
                        moment([moment().format('YYYY'), 6, 1]).toDate(),
                        moment([moment().format('YYYY'), 6]).endOf('month').toDate()
                    ],
                    [moment([moment().format('YYYY'),7]).format('yyyy-MMM')]: [
                        moment([moment().format('YYYY'), 7, 1]).toDate(),
                        moment([moment().format('YYYY'), 7]).endOf('month').toDate()
                    ],
                     [moment([moment().format('YYYY'),8]).format('yyyy-MMM')]: [
                        moment([moment().format('YYYY'), 8, 1]).toDate(),
                        moment([moment().format('YYYY'), 8]).endOf('month').toDate()
                    ],
                    [moment([moment().format('YYYY'),9]).format('yyyy-MMM')]: [
                        moment([moment().format('YYYY'), 9, 1]).toDate(),
                        moment([moment().format('YYYY'), 9]).endOf('month').toDate()
                    ],
                    [moment([moment().format('YYYY'),10]).format('yyyy-MMM')]: [
                        moment([moment().format('YYYY'), 10, 1]).toDate(),
                        moment([moment().format('YYYY'), 10]).endOf('month').toDate()
                    ],
                    [moment([moment().format('YYYY'),11]).format('yyyy-MMM')]: [
                        moment([moment().format('YYYY'), 11, 1]).toDate(),
                        moment([moment().format('YYYY'), 11]).endOf('month').toDate()
                    ],
                   

                    [moment([moment().add(1, 'year').format('YYYY'),0]).format('yyyy-MMM')]: [
                        moment([moment().add(1, 'year').format('YYYY'), 0, 1]).toDate(),
                        moment([moment().add(1, 'year').format('YYYY'), 0]).endOf('month').toDate()
                    ],
                     [moment([moment().add(1, 'year').format('YYYY'),1]).format('yyyy-MMM')]: [
                        moment([moment().add(1, 'year').format('YYYY'), 1, 1]).toDate(),
                        moment([moment().add(1, 'year').format('YYYY'), 1]).endOf('month').toDate()
                    ],
                    [moment([moment().add(1, 'year').format('YYYY'),2]).format('yyyy-MMM')]: [
                        moment([moment().add(1, 'year').format('YYYY'), 2, 1]).toDate(),
                        moment([moment().add(1, 'year').format('YYYY'), 2]).endOf('month').toDate()
                    ],
                     [moment([moment().add(1, 'year').format('YYYY'),3]).format('yyyy-MMM')]: [
                        moment([moment().add(1, 'year').format('YYYY'), 3, 1]).toDate(),
                        moment([moment().add(1, 'year').format('YYYY'), 3]).endOf('month').toDate()
                    ],
                    [moment([moment().add(1, 'year').format('YYYY'),4]).format('yyyy-MMM')]: [
                        moment([moment().add(1, 'year').format('YYYY'), 4, 1]).toDate(),
                        moment([moment().add(1, 'year').format('YYYY'), 4]).endOf('month').toDate()
                    ],
                     [moment([moment().add(1, 'year').format('YYYY'),5]).format('yyyy-MMM')]: [
                        moment([moment().add(1, 'year').format('YYYY'), 5, 1]).toDate(),
                        moment([moment().add(1, 'year').format('YYYY'), 5]).endOf('month').toDate()
                    ],
                     [moment([moment().add(1, 'year').format('YYYY'),6]).format('yyyy-MMM')]: [
                        moment([moment().add(1, 'year').format('YYYY'), 6, 1]).toDate(),
                        moment([moment().add(1, 'year').format('YYYY'), 6]).endOf('month').toDate()
                    ],
                     [moment([moment().add(1, 'year').format('YYYY'),7]).format('yyyy-MMM')]: [
                        moment([moment().add(1, 'year').format('YYYY'), 7, 1]).toDate(),
                        moment([moment().add(1, 'year').format('YYYY'), 7]).endOf('month').toDate()
                    ],
                    [moment([moment().add(1, 'year').format('YYYY'),8]).format('yyyy-MMM')]: [
                        moment([moment().add(1, 'year').format('YYYY'), 8, 1]).toDate(),
                        moment([moment().add(1, 'year').format('YYYY'), 8]).endOf('month').toDate()
                    ],
                     [moment([moment().add(1, 'year').format('YYYY'),9]).format('yyyy-MMM')]: [
                        moment([moment().add(1, 'year').format('YYYY'), 9, 1]).toDate(),
                        moment([moment().add(1, 'year').format('YYYY'), 9]).endOf('month').toDate()
                    ],
                    [moment([moment().add(1, 'year').format('YYYY'),10]).format('yyyy-MMM')]: [
                        moment([moment().add(1, 'year').format('YYYY'), 10, 1]).toDate(),
                        moment([moment().add(1, 'year').format('YYYY'), 10]).endOf('month').toDate()
                    ],
                     [moment([moment().add(1, 'year').format('YYYY'),11]).format('yyyy-MMM')]: [
                        moment([moment().add(1, 'year').format('YYYY'), 11, 1]).toDate(),
                        moment([moment().add(1, 'year').format('YYYY'), 11]).endOf('month').toDate()
                    ],



                     [moment([moment().add(2, 'year').format('YYYY'),0]).format('yyyy-MMM')]: [
                        moment([moment().add(2, 'year').format('YYYY'), 0, 1]).toDate(),
                        moment([moment().add(2, 'year').format('YYYY'), 0]).endOf('month').toDate()
                    ],
                     [moment([moment().add(2, 'year').format('YYYY'),1]).format('yyyy-MMM')]: [
                        moment([moment().add(2, 'year').format('YYYY'), 1, 1]).toDate(),
                        moment([moment().add(2, 'year').format('YYYY'), 1]).endOf('month').toDate()
                    ],
                    [moment([moment().add(2, 'year').format('YYYY'),2]).format('yyyy-MMM')]: [
                        moment([moment().add(2, 'year').format('YYYY'), 2, 1]).toDate(),
                        moment([moment().add(2, 'year').format('YYYY'), 2]).endOf('month').toDate()
                    ],
                     [moment([moment().add(2, 'year').format('YYYY'),3]).format('yyyy-MMM')]: [
                        moment([moment().add(2, 'year').format('YYYY'), 3, 1]).toDate(),
                        moment([moment().add(2, 'year').format('YYYY'), 3]).endOf('month').toDate()
                    ],
                    [moment([moment().add(2, 'year').format('YYYY'),4]).format('yyyy-MMM')]: [
                        moment([moment().add(2, 'year').format('YYYY'), 4, 1]).toDate(),
                        moment([moment().add(2, 'year').format('YYYY'), 4]).endOf('month').toDate()
                    ],
                     [moment([moment().add(2, 'year').format('YYYY'),5]).format('yyyy-MMM')]: [
                        moment([moment().add(2, 'year').format('YYYY'), 5, 1]).toDate(),
                        moment([moment().add(2, 'year').format('YYYY'), 5]).endOf('month').toDate()
                    ],
                     [moment([moment().add(2, 'year').format('YYYY'),6]).format('yyyy-MMM')]: [
                        moment([moment().add(2, 'year').format('YYYY'), 6, 1]).toDate(),
                        moment([moment().add(2, 'year').format('YYYY'), 6]).endOf('month').toDate()
                    ],
                     [moment([moment().add(2, 'year').format('YYYY'),7]).format('yyyy-MMM')]: [
                        moment([moment().add(2, 'year').format('YYYY'), 7, 1]).toDate(),
                        moment([moment().add(2, 'year').format('YYYY'), 7]).endOf('month').toDate()
                    ],
                    [moment([moment().add(2, 'year').format('YYYY'),8]).format('yyyy-MMM')]: [
                        moment([moment().add(2, 'year').format('YYYY'), 8, 1]).toDate(),
                        moment([moment().add(2, 'year').format('YYYY'), 8]).endOf('month').toDate()
                    ],
                     [moment([moment().add(2, 'year').format('YYYY'),9]).format('yyyy-MMM')]: [
                        moment([moment().add(2, 'year').format('YYYY'), 9, 1]).toDate(),
                        moment([moment().add(2, 'year').format('YYYY'), 9]).endOf('month').toDate()
                    ],
                    [moment([moment().add(2, 'year').format('YYYY'),10]).format('yyyy-MMM')]: [
                        moment([moment().add(2, 'year').format('YYYY'), 10, 1]).toDate(),
                        moment([moment().add(2, 'year').format('YYYY'), 10]).endOf('month').toDate()
                    ],
                     [moment([moment().add(2, 'year').format('YYYY'),11]).format('yyyy-MMM')]: [
                        moment([moment().add(2, 'year').format('YYYY'), 11, 1]).toDate(),
                        moment([moment().add(2, 'year').format('YYYY'), 11]).endOf('month').toDate()
                    ],
             } ,
             buttonShortcuts: [
                    {
                        text: "Select month",
                        onClick: () => [
                            console.log("Haciendo click")
                            // moment([moment().format('YYYY'), 0, 1]).toDate(),
                            // moment([moment().format('YYYY'), 0]).endOf('month').toDate()
                        ]
                    },
            ],
             shortcuts: [
                    // 2022
                    {
                        text: moment([moment().format('YYYY'),0]).format('yyyy-MMM').toString(),
                        onClick: () => [
                            // moment([moment().format('YYYY'), 0, 1]).toDate(),
                            // moment([moment().format('YYYY'), 0]).endOf('month').toDate()
                            
                            // var startDate = moment([moment().format('YYYY'), 0, 1]).toDate();
                            // var endDate = moment([moment().format('YYYY'), 0]).endOf('month').toDate();
        
                            // this.searchDateRange =[startDate , endDate];
                        ]
                    },
                    {
                        text: moment([moment().format('YYYY'),1]).format('yyyy-MMM').toString(),
                        onClick: () => [
                            moment([moment().format('YYYY'), 1, 1]).toDate(),
                            moment([moment().format('YYYY'), 1]).endOf('month').toDate()
                        ]
                    },
                    {
                        text: moment([moment().format('YYYY'),2]).format('yyyy-MMM').toString(),
                        onClick: () => [
                            moment([moment().format('YYYY'), 2, 1]).toDate(),
                            moment([moment().format('YYYY'), 2]).endOf('month').toDate()
                        ]
                    },
                    {
                        text: moment([moment().format('YYYY'),3]).format('yyyy-MMM').toString(),
                        onClick: () => [
                            moment([moment().format('YYYY'), 3, 1]).toDate(),
                            moment([moment().format('YYYY'), 3]).endOf('month').toDate()
                        ]
                    },
                    {
                        text: moment([moment().format('YYYY'),4]).format('yyyy-MMM').toString(),
                        onClick: () => [
                            moment([moment().format('YYYY'), 4, 1]).toDate(),
                            moment([moment().format('YYYY'), 4]).endOf('month').toDate()
                        ]
                    },
                    {
                        text: moment([moment().format('YYYY'),5]).format('yyyy-MMM').toString(),
                        onClick: () => [
                            moment([moment().format('YYYY'), 5, 1]).toDate(),
                            moment([moment().format('YYYY'), 5]).endOf('month').toDate()
                        ]
                    },
                    {
                        text: moment([moment().format('YYYY'),6]).format('yyyy-MMM').toString(),
                        onClick: () => [
                            moment([moment().format('YYYY'), 6, 1]).toDate(),
                            moment([moment().format('YYYY'), 6]).endOf('month').toDate()
                        ]
                    },
                    {
                        text: moment([moment().format('YYYY'),7]).format('yyyy-MMM').toString(),
                        onClick: () => [
                            moment([moment().format('YYYY'), 7, 1]).toDate(),
                            moment([moment().format('YYYY'), 7]).endOf('month').toDate()
                        ]
                    },
                    {
                        text: moment([moment().format('YYYY'),8]).format('yyyy-MMM').toString(),
                        onClick: () => [
                            moment([moment().format('YYYY'), 8, 1]).toDate(),
                            moment([moment().format('YYYY'), 8]).endOf('month').toDate()
                        ]
                    },
                    {
                        text: moment([moment().format('YYYY'),9]).format('yyyy-MMM').toString(),
                        onClick: () => [
                            moment([moment().format('YYYY'), 9, 1]).toDate(),
                            moment([moment().format('YYYY'), 9]).endOf('month').toDate()
                        ]
                    },
                    {
                        text: moment([moment().format('YYYY'),10]).format('yyyy-MMM').toString(),
                        onClick: () => [
                            moment([moment().format('YYYY'), 10, 1]).toDate(),
                            moment([moment().format('YYYY'), 10]).endOf('month').toDate()
                        ]
                    },
                    {
                        text: moment([moment().format('YYYY'),11]).format('yyyy-MMM').toString(),
                        onClick: () => [
                            moment([moment().format('YYYY'), 11, 1]).toDate(),
                            moment([moment().format('YYYY'), 11]).endOf('month').toDate()
                        ]
                    },      
                    // 2023   
                    {
                        text: " == 2023 ==",
                    },  
                    {
                        text: moment([moment().add(1, 'year').format('YYYY'),0]).format('yyyy-MMM').toString(),
                        onClick: () => [
                            moment([moment().add(1, 'year').format('YYYY'), 0, 1]).toDate(),
                            moment([moment().add(1, 'year').format('YYYY'), 0]).endOf('month').toDate()
                        ]
                    }, 
                    {
                        text: moment([moment().add(1, 'year').format('YYYY'),1]).format('yyyy-MMM').toString(),
                        onClick: () => [
                            moment([moment().add(1, 'year').format('YYYY'), 1, 1]).toDate(),
                            moment([moment().add(1, 'year').format('YYYY'), 1]).endOf('month').toDate()
                        ]
                    }, 
                    {
                        text: moment([moment().add(1, 'year').format('YYYY'),2]).format('yyyy-MMM').toString(),
                        onClick: () => [
                            moment([moment().add(1, 'year').format('YYYY'), 2, 1]).toDate(),
                            moment([moment().add(1, 'year').format('YYYY'), 2]).endOf('month').toDate()
                        ]
                    }, 
                    {
                        text: moment([moment().add(1, 'year').format('YYYY'),3]).format('yyyy-MMM').toString(),
                        onClick: () => [
                            moment([moment().add(1, 'year').format('YYYY'), 3, 1]).toDate(),
                            moment([moment().add(1, 'year').format('YYYY'), 3]).endOf('month').toDate()
                        ]
                    }, 
                    {
                        text: moment([moment().add(1, 'year').format('YYYY'),4]).format('yyyy-MMM').toString(),
                        onClick: () => [
                            moment([moment().add(1, 'year').format('YYYY'), 4, 1]).toDate(),
                            moment([moment().add(1, 'year').format('YYYY'), 4]).endOf('month').toDate()
                        ]
                    }, 
                    {
                        text: moment([moment().add(1, 'year').format('YYYY'),5]).format('yyyy-MMM').toString(),
                        onClick: () => [
                            moment([moment().add(1, 'year').format('YYYY'), 5, 1]).toDate(),
                            moment([moment().add(1, 'year').format('YYYY'), 5]).endOf('month').toDate()
                        ]
                    }, 
                    {
                        text: moment([moment().add(1, 'year').format('YYYY'),6]).format('yyyy-MMM').toString(),
                        onClick: () => [
                            moment([moment().add(1, 'year').format('YYYY'), 6, 1]).toDate(),
                            moment([moment().add(1, 'year').format('YYYY'), 6]).endOf('month').toDate()
                        ]
                    }, 
                    {
                        text: moment([moment().add(1, 'year').format('YYYY'),7]).format('yyyy-MMM').toString(),
                        onClick: () => [
                            moment([moment().add(1, 'year').format('YYYY'), 7, 1]).toDate(),
                            moment([moment().add(1, 'year').format('YYYY'), 7]).endOf('month').toDate()
                        ]
                    }, 
                    {
                        text: moment([moment().add(1, 'year').format('YYYY'),8]).format('yyyy-MMM').toString(),
                        onClick: () => [
                            moment([moment().add(1, 'year').format('YYYY'), 8, 1]).toDate(),
                            moment([moment().add(1, 'year').format('YYYY'), 8]).endOf('month').toDate()
                        ]
                    }, 
                    {
                        text: moment([moment().add(1, 'year').format('YYYY'),9]).format('yyyy-MMM').toString(),
                        onClick: () => [
                            moment([moment().add(1, 'year').format('YYYY'), 9, 1]).toDate(),
                            moment([moment().add(1, 'year').format('YYYY'), 9]).endOf('month').toDate()
                        ]
                    }, 
                    {
                        text: moment([moment().add(1, 'year').format('YYYY'),10]).format('yyyy-MMM').toString(),
                        onClick: () => [
                            moment([moment().add(1, 'year').format('YYYY'), 10, 1]).toDate(),
                            moment([moment().add(1, 'year').format('YYYY'), 10]).endOf('month').toDate()
                        ]
                    },    
                    {
                        text: moment([moment().add(1, 'year').format('YYYY'),11]).format('yyyy-MMM').toString(),
                        onClick: () => [
                            moment([moment().add(1, 'year').format('YYYY'), 11, 1]).toDate(),
                            moment([moment().add(1, 'year').format('YYYY'), 11]).endOf('month').toDate()
                        ]
                    }, 
                    {
                        text: moment([moment().add(1, 'year').format('YYYY'),12]).format('yyyy-MMM').toString(),
                        onClick: () => [
                            moment([moment().add(1, 'year').format('YYYY'), 12, 1]).toDate(),
                            moment([moment().add(1, 'year').format('YYYY'), 12]).endOf('month').toDate()
                        ]
                    },                                                                                                                                                                                                                                                                                                                                                                                                                                          
            ],    
             shortcutsOld: [{
                    text: [moment([moment().format('YYYY'),0]).format('yyyy-MMM')], onClick: () => [
                        moment([moment().format('YYYY'), 0, 1]).toDate(),
                        moment([moment().format('YYYY'), 0]).endOf('month').toDate()
                    ],
                     [moment([moment().format('YYYY'),1]).format('yyyy-MMM')]: [
                        moment([moment().format('YYYY'), 1, 1]).toDate(),
                        moment([moment().format('YYYY'), 1]).endOf('month').toDate()
                    ],
                    [moment([moment().format('YYYY'),2]).format('yyyy-MMM')]: [
                        moment([moment().format('YYYY'), 2, 1]).toDate(),
                        moment([moment().format('YYYY'), 2]).endOf('month').toDate()
                    ],
                    [moment([moment().format('YYYY'),3]).format('yyyy-MMM')]: [
                        moment([moment().format('YYYY'), 3, 1]).toDate(),
                        moment([moment().format('YYYY'), 3]).endOf('month').toDate()
                    ],
                    [moment([moment().format('YYYY'),4]).format('yyyy-MMM')]: [
                        moment([moment().format('YYYY'), 4, 1]).toDate(),
                        moment([moment().format('YYYY'), 4]).endOf('month').toDate()
                    ],
                     [moment([moment().format('YYYY'),5]).format('yyyy-MMM')]: [
                        moment([moment().format('YYYY'), 5, 1]).toDate(),
                        moment([moment().format('YYYY'), 5]).endOf('month').toDate()
                    ],
                    [moment([moment().format('YYYY'),6]).format('yyyy-MMM')]: [
                        moment([moment().format('YYYY'), 6, 1]).toDate(),
                        moment([moment().format('YYYY'), 6]).endOf('month').toDate()
                    ],
                    [moment([moment().format('YYYY'),7]).format('yyyy-MMM')]: [
                        moment([moment().format('YYYY'), 7, 1]).toDate(),
                        moment([moment().format('YYYY'), 7]).endOf('month').toDate()
                    ],
                     [moment([moment().format('YYYY'),8]).format('yyyy-MMM')]: [
                        moment([moment().format('YYYY'), 8, 1]).toDate(),
                        moment([moment().format('YYYY'), 8]).endOf('month').toDate()
                    ],
                    [moment([moment().format('YYYY'),9]).format('yyyy-MMM')]: [
                        moment([moment().format('YYYY'), 9, 1]).toDate(),
                        moment([moment().format('YYYY'), 9]).endOf('month').toDate()
                    ],
                    [moment([moment().format('YYYY'),10]).format('yyyy-MMM')]: [
                        moment([moment().format('YYYY'), 10, 1]).toDate(),
                        moment([moment().format('YYYY'), 10]).endOf('month').toDate()
                    ],
                    [moment([moment().format('YYYY'),11]).format('yyyy-MMM')]: [
                        moment([moment().format('YYYY'), 11, 1]).toDate(),
                        moment([moment().format('YYYY'), 11]).endOf('month').toDate()
                    ],
                   

                    [moment([moment().add(1, 'year').format('YYYY'),0]).format('yyyy-MMM')]: [
                        moment([moment().add(1, 'year').format('YYYY'), 0, 1]).toDate(),
                        moment([moment().add(1, 'year').format('YYYY'), 0]).endOf('month').toDate()
                    ],
                     [moment([moment().add(1, 'year').format('YYYY'),1]).format('yyyy-MMM')]: [
                        moment([moment().add(1, 'year').format('YYYY'), 1, 1]).toDate(),
                        moment([moment().add(1, 'year').format('YYYY'), 1]).endOf('month').toDate()
                    ],
                    [moment([moment().add(1, 'year').format('YYYY'),2]).format('yyyy-MMM')]: [
                        moment([moment().add(1, 'year').format('YYYY'), 2, 1]).toDate(),
                        moment([moment().add(1, 'year').format('YYYY'), 2]).endOf('month').toDate()
                    ],
                     [moment([moment().add(1, 'year').format('YYYY'),3]).format('yyyy-MMM')]: [
                        moment([moment().add(1, 'year').format('YYYY'), 3, 1]).toDate(),
                        moment([moment().add(1, 'year').format('YYYY'), 3]).endOf('month').toDate()
                    ],
                    [moment([moment().add(1, 'year').format('YYYY'),4]).format('yyyy-MMM')]: [
                        moment([moment().add(1, 'year').format('YYYY'), 4, 1]).toDate(),
                        moment([moment().add(1, 'year').format('YYYY'), 4]).endOf('month').toDate()
                    ],
                     [moment([moment().add(1, 'year').format('YYYY'),5]).format('yyyy-MMM')]: [
                        moment([moment().add(1, 'year').format('YYYY'), 5, 1]).toDate(),
                        moment([moment().add(1, 'year').format('YYYY'), 5]).endOf('month').toDate()
                    ],
                     [moment([moment().add(1, 'year').format('YYYY'),6]).format('yyyy-MMM')]: [
                        moment([moment().add(1, 'year').format('YYYY'), 6, 1]).toDate(),
                        moment([moment().add(1, 'year').format('YYYY'), 6]).endOf('month').toDate()
                    ],
                     [moment([moment().add(1, 'year').format('YYYY'),7]).format('yyyy-MMM')]: [
                        moment([moment().add(1, 'year').format('YYYY'), 7, 1]).toDate(),
                        moment([moment().add(1, 'year').format('YYYY'), 7]).endOf('month').toDate()
                    ],
                    [moment([moment().add(1, 'year').format('YYYY'),8]).format('yyyy-MMM')]: [
                        moment([moment().add(1, 'year').format('YYYY'), 8, 1]).toDate(),
                        moment([moment().add(1, 'year').format('YYYY'), 8]).endOf('month').toDate()
                    ],
                     [moment([moment().add(1, 'year').format('YYYY'),9]).format('yyyy-MMM')]: [
                        moment([moment().add(1, 'year').format('YYYY'), 9, 1]).toDate(),
                        moment([moment().add(1, 'year').format('YYYY'), 9]).endOf('month').toDate()
                    ],
                    [moment([moment().add(1, 'year').format('YYYY'),10]).format('yyyy-MMM')]: [
                        moment([moment().add(1, 'year').format('YYYY'), 10, 1]).toDate(),
                        moment([moment().add(1, 'year').format('YYYY'), 10]).endOf('month').toDate()
                    ],
                     [moment([moment().add(1, 'year').format('YYYY'),11]).format('yyyy-MMM')]: [
                        moment([moment().add(1, 'year').format('YYYY'), 11, 1]).toDate(),
                        moment([moment().add(1, 'year').format('YYYY'), 11]).endOf('month').toDate()
                    ],



                     [moment([moment().add(2, 'year').format('YYYY'),0]).format('yyyy-MMM')]: [
                        moment([moment().add(2, 'year').format('YYYY'), 0, 1]).toDate(),
                        moment([moment().add(2, 'year').format('YYYY'), 0]).endOf('month').toDate()
                    ],
                     [moment([moment().add(2, 'year').format('YYYY'),1]).format('yyyy-MMM')]: [
                        moment([moment().add(2, 'year').format('YYYY'), 1, 1]).toDate(),
                        moment([moment().add(2, 'year').format('YYYY'), 1]).endOf('month').toDate()
                    ],
                    [moment([moment().add(2, 'year').format('YYYY'),2]).format('yyyy-MMM')]: [
                        moment([moment().add(2, 'year').format('YYYY'), 2, 1]).toDate(),
                        moment([moment().add(2, 'year').format('YYYY'), 2]).endOf('month').toDate()
                    ],
                     [moment([moment().add(2, 'year').format('YYYY'),3]).format('yyyy-MMM')]: [
                        moment([moment().add(2, 'year').format('YYYY'), 3, 1]).toDate(),
                        moment([moment().add(2, 'year').format('YYYY'), 3]).endOf('month').toDate()
                    ],
                    [moment([moment().add(2, 'year').format('YYYY'),4]).format('yyyy-MMM')]: [
                        moment([moment().add(2, 'year').format('YYYY'), 4, 1]).toDate(),
                        moment([moment().add(2, 'year').format('YYYY'), 4]).endOf('month').toDate()
                    ],
                     [moment([moment().add(2, 'year').format('YYYY'),5]).format('yyyy-MMM')]: [
                        moment([moment().add(2, 'year').format('YYYY'), 5, 1]).toDate(),
                        moment([moment().add(2, 'year').format('YYYY'), 5]).endOf('month').toDate()
                    ],
                     [moment([moment().add(2, 'year').format('YYYY'),6]).format('yyyy-MMM')]: [
                        moment([moment().add(2, 'year').format('YYYY'), 6, 1]).toDate(),
                        moment([moment().add(2, 'year').format('YYYY'), 6]).endOf('month').toDate()
                    ],
                     [moment([moment().add(2, 'year').format('YYYY'),7]).format('yyyy-MMM')]: [
                        moment([moment().add(2, 'year').format('YYYY'), 7, 1]).toDate(),
                        moment([moment().add(2, 'year').format('YYYY'), 7]).endOf('month').toDate()
                    ],
                    [moment([moment().add(2, 'year').format('YYYY'),8]).format('yyyy-MMM')]: [
                        moment([moment().add(2, 'year').format('YYYY'), 8, 1]).toDate(),
                        moment([moment().add(2, 'year').format('YYYY'), 8]).endOf('month').toDate()
                    ],
                     [moment([moment().add(2, 'year').format('YYYY'),9]).format('yyyy-MMM')]: [
                        moment([moment().add(2, 'year').format('YYYY'), 9, 1]).toDate(),
                        moment([moment().add(2, 'year').format('YYYY'), 9]).endOf('month').toDate()
                    ],
                    [moment([moment().add(2, 'year').format('YYYY'),10]).format('yyyy-MMM')]: [
                        moment([moment().add(2, 'year').format('YYYY'), 10, 1]).toDate(),
                        moment([moment().add(2, 'year').format('YYYY'), 10]).endOf('month').toDate()
                    ],
                     [moment([moment().add(2, 'year').format('YYYY'),11]).format('yyyy-MMM')]: [
                        moment([moment().add(2, 'year').format('YYYY'), 11, 1]).toDate(),
                        moment([moment().add(2, 'year').format('YYYY'), 11]).endOf('month').toDate()
                    ],
             }]            
            //  ranges: {
            //          [moment([moment().format('YYYY'),0]).format('yyyy-MMM')]: [
            //             moment([moment().format('YYYY'), 0, 1]).toDate(),
            //             moment([moment().format('YYYY'), 1]).endOf('month').toDate()
            //         ],
            //          [moment([moment().format('YYYY'),1]).format('yyyy-MMM')]: [
            //             moment([moment().format('YYYY'), 1, 1]).toDate(),
            //             moment([moment().format('YYYY'), 2]).endOf('month').toDate()
            //         ],
            //         [moment([moment().format('YYYY'),2]).format('yyyy-MMM')]: [
            //             moment([moment().format('YYYY'), 2, 1]).toDate(),
            //             moment([moment().format('YYYY'), 3]).endOf('month').toDate()
            //         ],
            //         [moment([moment().format('YYYY'),3]).format('yyyy-MMM')]: [
            //             moment([moment().format('YYYY'), 3, 1]).toDate(),
            //             moment([moment().format('YYYY'), 4]).endOf('month').toDate()
            //         ],
            //         [moment([moment().format('YYYY'),4]).format('yyyy-MMM')]: [
            //             moment([moment().format('YYYY'), 4, 1]).toDate(),
            //             moment([moment().format('YYYY'), 5]).endOf('month').toDate()
            //         ],
            //          [moment([moment().format('YYYY'),5]).format('yyyy-MMM')]: [
            //             moment([moment().format('YYYY'), 5, 1]).toDate(),
            //             moment([moment().format('YYYY'), 6]).endOf('month').toDate()
            //         ],
            //         [moment([moment().format('YYYY'),6]).format('yyyy-MMM')]: [
            //             moment([moment().format('YYYY'), 6, 1]).toDate(),
            //             moment([moment().format('YYYY'), 7]).endOf('month').toDate()
            //         ],
            //         [moment([moment().format('YYYY'),7]).format('yyyy-MMM')]: [
            //             moment([moment().format('YYYY'), 7, 1]).toDate(),
            //             moment([moment().format('YYYY'), 8]).endOf('month').toDate()
            //         ],
            //          [moment([moment().format('YYYY'),8]).format('yyyy-MMM')]: [
            //             moment([moment().format('YYYY'), 8, 1]).toDate(),
            //             moment([moment().format('YYYY'), 9]).endOf('month').toDate()
            //         ],
            //         [moment([moment().format('YYYY'),9]).format('yyyy-MMM')]: [
            //             moment([moment().format('YYYY'), 9, 1]).toDate(),
            //             moment([moment().format('YYYY'), 10]).endOf('month').toDate()
            //         ],
            //         [moment([moment().format('YYYY'),10]).format('yyyy-MMM')]: [
            //             moment([moment().format('YYYY'), 10, 1]).toDate(),
            //             moment([moment().format('YYYY'), 11]).endOf('month').toDate()
            //         ],
            //          [moment([moment().format('YYYY'),11]).format('yyyy-MMM')]: [
            //             moment([moment().format('YYYY'), 11, 1]).toDate(),
            //             moment([moment().add(1, 'year').format('YYYY'), 0]).endOf('month').toDate()
            //         ],

            //         [moment([moment().add(1, 'year').format('YYYY'),0]).format('yyyy-MMM')]: [
            //             moment([moment().add(1, 'year').format('YYYY'), 0, 1]).toDate(),
            //             moment([moment().add(1, 'year').format('YYYY'), 1]).endOf('month').toDate()
            //         ],
            //          [moment([moment().add(1, 'year').format('YYYY'),1]).format('yyyy-MMM')]: [
            //             moment([moment().add(1, 'year').format('YYYY'), 1, 1]).toDate(),
            //             moment([moment().add(1, 'year').format('YYYY'), 2]).endOf('month').toDate()
            //         ],
            //         [moment([moment().add(1, 'year').format('YYYY'),2]).format('yyyy-MMM')]: [
            //             moment([moment().add(1, 'year').format('YYYY'), 1, 1]).toDate(),
            //             moment([moment().add(1, 'year').format('YYYY'), 3]).endOf('month').toDate()
            //         ],
            //          [moment([moment().add(1, 'year').format('YYYY'),3]).format('yyyy-MMM')]: [
            //             moment([moment().add(1, 'year').format('YYYY'), 3, 1]).toDate(),
            //             moment([moment().add(1, 'year').format('YYYY'), 4]).endOf('month').toDate()
            //         ],
            //         [moment([moment().add(1, 'year').format('YYYY'),4]).format('yyyy-MMM')]: [
            //             moment([moment().add(1, 'year').format('YYYY'), 4, 1]).toDate(),
            //             moment([moment().add(1, 'year').format('YYYY'), 5]).endOf('month').toDate()
            //         ],
            //          [moment([moment().add(1, 'year').format('YYYY'),5]).format('yyyy-MMM')]: [
            //             moment([moment().add(1, 'year').format('YYYY'), 5, 1]).toDate(),
            //             moment([moment().add(1, 'year').format('YYYY'), 6]).endOf('month').toDate()
            //         ],
            //          [moment([moment().add(1, 'year').format('YYYY'),6]).format('yyyy-MMM')]: [
            //             moment([moment().add(1, 'year').format('YYYY'), 6, 1]).toDate(),
            //             moment([moment().add(1, 'year').format('YYYY'), 7]).endOf('month').toDate()
            //         ],
            //          [moment([moment().add(1, 'year').format('YYYY'),7]).format('yyyy-MMM')]: [
            //             moment([moment().add(1, 'year').format('YYYY'), 7, 1]).toDate(),
            //             moment([moment().add(1, 'year').format('YYYY'), 8]).endOf('month').toDate()
            //         ],
            //         [moment([moment().add(1, 'year').format('YYYY'),8]).format('yyyy-MMM')]: [
            //             moment([moment().add(1, 'year').format('YYYY'), 8, 1]).toDate(),
            //             moment([moment().add(1, 'year').format('YYYY'), 9]).endOf('month').toDate()
            //         ],
            //          [moment([moment().add(1, 'year').format('YYYY'),9]).format('yyyy-MMM')]: [
            //             moment([moment().add(1, 'year').format('YYYY'), 9, 1]).toDate(),
            //             moment([moment().add(1, 'year').format('YYYY'), 10]).endOf('month').toDate()
            //         ],
            //         [moment([moment().add(1, 'year').format('YYYY'),10]).format('yyyy-MMM')]: [
            //             moment([moment().add(1, 'year').format('YYYY'), 10, 1]).toDate(),
            //             moment([moment().add(1, 'year').format('YYYY'), 11]).endOf('month').toDate()
            //         ],
            //          [moment([moment().add(1, 'year').format('YYYY'),11]).format('yyyy-MMM')]: [
            //             moment([moment().add(1, 'year').format('YYYY'), 11, 1]).toDate(),
            //             moment([moment().add(2, 'year').format('YYYY'), 0]).endOf('month').toDate()
            //         ],

            //          [moment([moment().add(2, 'year').format('YYYY'),0]).format('yyyy-MMM')]: [
            //             moment([moment().add(2, 'year').format('YYYY'), 0, 1]).toDate(),
            //             moment([moment().add(2, 'year').format('YYYY'), 1]).endOf('month').toDate()
            //         ],
            //          [moment([moment().add(2, 'year').format('YYYY'),1]).format('yyyy-MMM')]: [
            //             moment([moment().add(2, 'year').format('YYYY'), 1, 1]).toDate(),
            //             moment([moment().add(2, 'year').format('YYYY'), 2]).endOf('month').toDate()
            //         ],
            //         [moment([moment().add(2, 'year').format('YYYY'),2]).format('yyyy-MMM')]: [
            //             moment([moment().add(2, 'year').format('YYYY'), 1, 1]).toDate(),
            //             moment([moment().add(2, 'year').format('YYYY'), 3]).endOf('month').toDate()
            //         ],
            //          [moment([moment().add(2, 'year').format('YYYY'),3]).format('yyyy-MMM')]: [
            //             moment([moment().add(2, 'year').format('YYYY'), 3, 1]).toDate(),
            //             moment([moment().add(2, 'year').format('YYYY'), 4]).endOf('month').toDate()
            //         ],
            //         [moment([moment().add(2, 'year').format('YYYY'),4]).format('yyyy-MMM')]: [
            //             moment([moment().add(2, 'year').format('YYYY'), 4, 1]).toDate(),
            //             moment([moment().add(2, 'year').format('YYYY'), 5]).endOf('month').toDate()
            //         ],
            //          [moment([moment().add(2, 'year').format('YYYY'),5]).format('yyyy-MMM')]: [
            //             moment([moment().add(2, 'year').format('YYYY'), 5, 1]).toDate(),
            //             moment([moment().add(2, 'year').format('YYYY'), 6]).endOf('month').toDate()
            //         ],
            //          [moment([moment().add(2, 'year').format('YYYY'),6]).format('yyyy-MMM')]: [
            //             moment([moment().add(2, 'year').format('YYYY'), 6, 1]).toDate(),
            //             moment([moment().add(2, 'year').format('YYYY'), 7]).endOf('month').toDate()
            //         ],
            //          [moment([moment().add(2, 'year').format('YYYY'),7]).format('yyyy-MMM')]: [
            //             moment([moment().add(2, 'year').format('YYYY'), 7, 1]).toDate(),
            //             moment([moment().add(2, 'year').format('YYYY'), 8]).endOf('month').toDate()
            //         ],
            //         [moment([moment().add(2, 'year').format('YYYY'),8]).format('yyyy-MMM')]: [
            //             moment([moment().add(2, 'year').format('YYYY'), 8, 1]).toDate(),
            //             moment([moment().add(2, 'year').format('YYYY'), 9]).endOf('month').toDate()
            //         ],
            //          [moment([moment().add(2, 'year').format('YYYY'),9]).format('yyyy-MMM')]: [
            //             moment([moment().add(2, 'year').format('YYYY'), 9, 1]).toDate(),
            //             moment([moment().add(2, 'year').format('YYYY'), 10]).endOf('month').toDate()
            //         ],
            //         [moment([moment().add(2, 'year').format('YYYY'),10]).format('yyyy-MMM')]: [
            //             moment([moment().add(2, 'year').format('YYYY'), 10, 1]).toDate(),
            //             moment([moment().add(1, 'year').format('YYYY'), 11]).endOf('month').toDate()
            //         ],
            //          [moment([moment().add(2, 'year').format('YYYY'),11]).format('yyyy-MMM')]: [
            //             moment([moment().add(2, 'year').format('YYYY'), 11, 1]).toDate(),
            //             moment([moment().add(3, 'year').format('YYYY'), 0]).endOf('month').toDate()
            //         ],
            //  }
        }
    },
    computed: {
    customShortcuts() {
       let dataList = [];
        for(var i = 0; i<=12; i++){
            if(i<12){
                var element ={
                    text: moment([moment().format('YYYY'), i]).format('yyyy-MMM').toString(),
                    onClick: (picker) => [ 
                        moment([moment().format('YYYY'), i, i++]).toDate(),
                        moment([moment().format('YYYY'), i]).endOf('month').toDate(),
                    ],
                }
                dataList.push(element)
            }
        }
        // for(var i = 0; i<=12; i++){
        //     if(i<12){
        //         var element ={
        //             text: moment([moment().add(1, 'year').format('YYYY'),i]).format('yyyy-MMM').toString(),
        //             onClick: () => [
        //                 moment([moment().add(1, 'year').format('YYYY'), i, i++]).toDate(),
        //                 moment([moment().add(1, 'year').format('YYYY'), i]).endOf('month').toDate()
        //             ]
        //         }
        //         dataList.push(element)
        //     }
        // } 
        // for(var i = 0; i<=12; i++){
        //     if(i<12){
        //         var element ={
        //             text: moment([moment().add(2, 'year').format('YYYY'),i]).format('yyyy-MMM').toString(),
        //             onClick: () => [
        //                 moment([moment().add(2, 'year').format('YYYY'), i, i++]).toDate(),
        //                 moment([moment().add(2, 'year').format('YYYY'), i]).endOf('month').toDate()
        //             ]
        //         }
        //         dataList.push(element)
        //     }
        // }                
        return dataList;
    },  

  },
    methods: {
       
    }
}
</script>

<style>
div.vue-daterange-picker div.form-control.reportrange-text{
    width: 195px !important;
    text-align: center;
    height: 31px !important;
}
/* .ranges { display: none; } */
</style>