Ext.define('inas.store.pm.HomeInformationTipsStore', {
    extend:'Ext.data.Store',
    model: 'inas.model.pm.HomeInformationTipsModel',
    proxy: {
        type: 'ajax',
      //  url :projectGP('/module/app/myjson/HomeInformationTipsJson.json'),
        url :projectOamGp('/workflow/getCurrentMineTasks'),
        reader:{
            type:'json',
            //totalProperty:'ce',
            root:'root'
            //idProperty:'grid-example'
        }
    }
    //autoLoad: true
});

