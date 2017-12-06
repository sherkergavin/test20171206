/**
 * Created by WangJm on 2015/8/6.
 */
Ext.define('inas.model.work.DailyItemModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'content', type: 'string'},
        {name: 'daily_time', type: 'string'},
        {name: 'equip', type: 'string'},
        {name: 'user_id', type: 'int'},
        {name: 'system_organization_id', type: 'int'}
    ]
});