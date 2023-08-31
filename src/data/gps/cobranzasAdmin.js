export const fields = [{
        key: "file_code",
        sortable: true
    },
    {
        key: "sale_date",
        sortable: false,
        variant: 'secondary'
    },
    {
        key: "start_date_file",
        sortable: false
    },
    {
        key: "client",
        sortable: true
            //variant: 'danger'
    },
    // {
    //     key: "tax_invoice",
    //     sortable: false
    //         //variant: 'danger'
    // },
    {
        key: "percent_collection",
        sortable: true
    },
    {
        key: "confirmations",
        sortable: false
            //variant: 'danger'
    }
];


export const clientsItemsFields = [{
        key: "client",
        sortable: true
    },
    {
        key: "pending",
        sortable: false
    }
];