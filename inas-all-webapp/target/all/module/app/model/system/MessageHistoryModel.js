/**
 * Created by WangJm on 2015/6/11.
 */
Ext.define('inas.model.system.MessageHistoryModel',{
    extend:'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name:'sendDate' },
        {name:'context',type:'string'},
        {name:'recipient',type:'string'},
        {name:'messageGroupName',type:'string'},
        {name:'message_group_id',type:'int'}
    ]
});