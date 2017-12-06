/**
 * Created by WangJm on 2015/5/11.
 */
Ext.define('inas.model.pm.DataItemModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'entity_id', type: 'int'},
        {name: 'data_item_name', type: 'string'},
        {name: 'data_format_id', type: 'id'},
        {name: 'type', type: 'int'},
        {name:'roll_interval',type:'string'},
        {name:'pressure_data_item_id',type:'int'},
        {name: 'lo', type: 'int'}
    ]
});