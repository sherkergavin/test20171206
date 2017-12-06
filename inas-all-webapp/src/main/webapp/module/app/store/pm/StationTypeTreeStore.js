Ext.define('inas.store.pm.StationTypeTreeStore', {
    extend:'Ext.data.TreeStore',
    //model:'inas.model.data.StationTypeTreeModel',
    proxy: {
        type: 'ajax',
        url: projectGP('/data/stationTree'),
        reader: {
            type: 'json',
            root: 'children'
        }
    }  ,
    folderSort: true,
    autoLoad: false,
    root: {
        expanded: false
    }
})
