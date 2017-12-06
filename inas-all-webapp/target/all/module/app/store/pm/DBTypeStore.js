//Ext.define('inas.store.data.BDTypeStore',{
//    extend:'Ext.data.TreeStore',
//    model:'inas.model.data.DBTypeModel',
//    proxy: {
//        type: 'ajax',
//        url:projectGP('/data/area.json'),
//        reader:{
//            type:'json'
//            //,
//            //root:'root'
//        }
//    }
//});


Ext.define('inas.store.pm.DBTypeStore', {
    extend: 'Ext.data.TreeStore',
    model: 'inas.model.pm.DBTypeModel',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: projectGP('/dbType/allSourceTree'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader: {
            type: 'json',
            root: 'children'
        }
    }
});

