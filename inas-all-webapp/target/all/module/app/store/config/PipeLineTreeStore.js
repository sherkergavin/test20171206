/**
 * Created by WangJm on 2015/9/21.
 */
Ext.define('inas.store.config.PipeLineTreeStore', {
    extend:'Ext.data.TreeStore',
    proxy: {
        type: 'ajax',
        url: projectGP('/config/getPipeLineTreeList'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader: {
            type: 'json',
            root: 'children'
        }
    },
    folderSort: false,
    autoLoad: false,
    root: {
        expanded: false
    }
});