/**
 * Created by JM-SD09 on 2015/9/24.
 */
Ext.define('inas.model.data.MiddleGridModel', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'entity_name'
    }, {
        name: 'data_item_name'
    }, {
        name: 'id'
    }, {
        name: 'op_order'
    }, {
        name: 'data_item_id'
    }, {
        name: 'entity_id'
    }, {
        name: 'deleted'
    }, {
        name: 'order_time',
        type: Ext.data.Types.DATE,
        dateFormat: 'time'
    }, {
        name: 'repl_order_time',
        type: Ext.data.Types.DATE,
        dateFormat: 'time'
    }, {
        name: 'description'
    }, {
        name: 'user_name'
    }, {
        name: 'user_id'
    }, {
        name: 'data_format_id'
    }, {
        name: 'entity_type_id'
    }, {
        name: 'pressure_before'
    }, {
        name: 'pressure2_before'
    }, {
        name: 'pressure3_before'
    }, {
        name: 'pressure_after'
    }, {
        name: 'pressure2_after'
    }, {
        name: 'pressure3_after'
    }, {
        name: 'pressure_all'
    }]
});