/**
 * Created by WangJm on 2015/4/12.
 */
Ext.define('inas.store,main.TreeNavigation',{
    extend:'Ext.data.TreeStore',
    model:'inas.model.main.Navigation',
    proxy: {
        type: 'ajax',
        url: projectGlobalPath('/data/tree1.json'),
        reader: {
            type: 'json',
            successProperty: 'success'
        }
    }
});