Ext.define('inas.store.pm.FormatGroupStore', {
    extend:'Ext.data.Store',
    fields:[
                {name:'id'},
                {name:'dictionaryId'},
                {name:'name'},
                {name:'value'}
            ],
    proxy: {
        type: 'ajax',
        url: projectGP('/formatValue/getDataValueInfo'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader: {
            type: 'json',
            root:'data'
            }
        },
    sorters: {property: 'id', direction: 'ASC'},
    autoLoad: false,
    groupField:'name'
});

