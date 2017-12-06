Ext.define('inas.store.pm.DataSpecComboStore',{
    extend:'Ext.data.Store',
    model:'inas.model.pm.SourceTypeModel',
    proxy: {
        type: 'ajax',
        //actionMethods:{
        //    create: "POST", read: "POST", update: "POST", destroy: "POST"
        //},
        url:projectGP('/data/dataSpecCombo.json'),
        reader:{
            type:'json',
            root:'data'
        }
    }
});