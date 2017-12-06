
Ext.define('inas.store.data.AreaStore',{
    extend:'Ext.data.TreeStore',
    //model:'inas.model.data.AreaModel',
    //autoLoad: true,
    proxy: {
        type: 'ajax',
        url:projectGP('/area/getArea'),
        reader:{
            type:'json'
            //,
            //successProperty: 'success'
        }
    }
    ,
    root:{
        text:'全市'
    }
});