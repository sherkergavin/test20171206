/**
 * Created by JM-SD09 on 2015/9/7.
 */
Ext.define('inas.store.work.switchTreeStore', {
    extend: 'Ext.data.TreeStore',
    proxy:{
        type:'ajax',
        url:projectGP("/data/stationTree2"),
        render:{
            type:'json',
            root:'children'
        }
    },
    folderSort: true,
    autoLoad: false,
    root: {
        expanded: false
    }

});