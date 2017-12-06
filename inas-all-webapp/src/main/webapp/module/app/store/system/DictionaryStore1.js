/**
 * Created by WangJm on 2015/6/11.
 */
Ext.define('inas.store.system.DictionaryStore',{
    extend:'Ext.data.Store',
    model:'inas.model.system.DictionaryModel',
    proxy: {
        type: 'ajax',
        url: projectGP('/module/getSystemDictionaryByType'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader: {
            type: 'json',
            root:'data'
        }
    }
});