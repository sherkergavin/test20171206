/**
 * Created by WangJm on 2015/10/8.
 */
Ext.define('inas.model.config.PipeLineGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'data_item_id', type: 'int'},
        {name: 'entity_id', type: 'int'},
        {name: 'link_id', type: 'int'},
        {name: 'direction', type : 'int'}
    ]
});