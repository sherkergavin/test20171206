/**
 * Created by JM-SD09 on 2015/9/7.
 */
Ext.define('inas.model.work.switchWindowModel', {
    extend: 'Ext.data.Model',
    fields: [{name: 'data_item_name'},
        {name: 'data_value'},
        {name: 'entity_name'},
        {name: 'id'},
        {name: 'op_order'},
        {name: 'user_name'},
        {name: 'order_time', type: Ext.data.Types.DATE, dateFormat: 'time'},
        {name: 'repl_order_time',type: Ext.data.Types.DATE, dateFormat: 'time'},
        {name: 'pressure_before'},
        {name: 'pressure2_before'},
        {name: 'pressure3_before'},
        {name: 'pressure_after'},
        {name: 'pressure2_after'},
        {name: 'pressure3_after'},
        {name: 'pressure_all'},
        {name: 'data_format_id'},
        {name: 'entity_type_id'},
        {name: 'description'}
        //{name:'data_value'}
    ]
});