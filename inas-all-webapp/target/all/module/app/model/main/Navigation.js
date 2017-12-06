/**
 * Created by WangJm on 2015/4/12.
 */
Ext.define('inas.model.main.Navigation',{
    extend:'Ext.data.Model',
    //requires: [
    //    'Ext.data.reader.Json'
    //],
    fields:[
        //{name:'id',type:'string'},
        {name:'text',type:'string'},
        {name:'leaf',type:'boolean'}
    ]
});