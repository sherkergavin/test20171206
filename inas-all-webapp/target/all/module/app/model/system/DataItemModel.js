/**
 * Created by WangJm on 2015/5/11.
 */
Ext.define('inas.model.system.DataItemModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'entity_id', type: 'int'},
        {name: 'data_item_name', type: 'string'},
        {name: 'data_format_id', type: 'id'},
        {name: 'lo', type: 'int'}
    ]
});