/**
 * Created by WangJm on 2015/8/6.
 */
Ext.define('inas.model.work.DailyShiftModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'user_id', type: 'int'},
        {name: 'user_mmanager_id', type: 'int'},
        {name: 'user_moperator_id', type: 'int'},
        {name: 'user_amanager_id', type: 'int'},
        {name: 'user_aoperator_id', type: 'int'},
        {name: 'user_emanager_id', type: 'int'},
        {name: 'user_eoperator_id', type: 'int'},
        {name: 'mweather', type: 'string'},
        {name: 'aweather', type: 'string'},
        {name: 'eweather', type: 'string'},
        {name: 'mhighest', type: 'string'},
        {name: 'ahighest', type: 'string'},
        {name: 'ehighest', type: 'string'},
        {name: 'mlowest', type: 'string'},
        {name: 'alowest', type: 'string'},
        {name: 'elowest', type: 'string'}
    ]
});