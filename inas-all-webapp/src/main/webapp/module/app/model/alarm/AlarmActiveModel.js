Ext.define('inas.model.alarm.AlarmActiveModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id',type:'int'},
        {name:'policy_id',type:'int'},
        {name:'data_item_id',type:'int'},
        {name:'type',type:'int'},
        {name:'severity',type:'int'},
        {name:'type_name',type:'string'},
        {name:'severity_name',type:'string'},
        {name:'time_stamp',type: Ext.data.Types.DATE, dateFormat: 'time'},
        {name:'fire_count',type:'int'},
        {name:'entity_name',type:'String'},
        {name:'data_item_name',type:'String'},
        {name:'acknowledged',type:'int'},
        {name:'cleaned',type:'int'},
        {name:'message',type:'String'}


    //    "acknowledged": 0,
    //"class": "com.inas.model.alarm.AlarmActiveVO",
    //"cleaned": 0,
    //"create_date": 1450366870000,
    //"creator": null,
    //"data_format_id": null,
    //
    //"data_item_name": "呵呵呵",
    //"data_time": null,
    //"data_value": null,
    //"deleted": 0,
    //"edit_date": 1450366870000,
    //"editor": null,
    //"entity_name": "泰和水厂一车间",
    //"fire_count": 1,
    //"first_fire_time": 1450366870000,
    //"id": 2,
    //"last_fire_time": 1450366870000,
    //"lo": null,
    //"message": "测试1",
    //"policy_id": 50,
    //"severity": 40,
    //"time_stamp": 1450367028000,
    //"type": 37,
    //"version": 1

    ]
});