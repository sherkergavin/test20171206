/**
 * Created by luyufei on 2016/3/23.
 */

Ext.define('inas.model.workflow.FamenCaozuoRoleModel',{
    extend:'Ext.data.Model',
    fields:[
        {name:'fm_add',type:'auto'},
        {name:'fm_manager_approve',type:'auto'},
        {name:'fm_officer_approve',type:'auto'},
        {name:'fm_dispatcher',type:'auto'},
        {name:'fm_remove',type:'auto'}
    ],
    //一对多
    hasMany : {model: 'inas.model.workflow.FamenCaozuoModel', name: 'list'}
});


Ext.define('inas.model.workflow.FamenCaozuoModel', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'code',type:'string'
        }
        ,
        {
            name: 'type',type:'int'
        }
        ,
        {
            name: 'place',type:'string'
        }
        ,
        {
            name: 'filing_date',type: Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
            name: 'planing_start_date',type: Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
            name: 'planing_end_date',type: Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
            name: 'actual_start_date',type: Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
            name: 'actual_end_date',type: Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
            name: 'fill_unit',type:'string'
        }
        ,
        {
            name: 'dn',type:'int'
        }
        ,
        {
            name: 'job_content',type:'string'
        }
        ,
        {
            name: 'status',type:'string'
        }
        ,
        {
            name: 'is_monitoring_center',type:'int'
        }
        ,
        {
            name: 'before_job',type:'int'
        }
        ,
        {
            name: 'after_job',type:'int'
        }
        ,
        {
            name: 'before_finish',type:'int'
        }
        ,
        {
            name: 'after_finish',type:'int'
        }
        ,
        {
            name: 'attachment_file_1', type: 'string'
        }
        ,
        {
            name: 'attachment_file_2', type: 'string'
        }
        ,
        {
            name: 'attachment_file_3', type: 'string'
        }
        ,
        {
            name: 'attachment_file_4', type: 'string'
        }
        ,
        {
            name:'id' , type:'int'
        }
        ,
        {
            name:'permitUpdate',type:'boolean'
        }
        ,
        {
            name:'permitDelete',type:'boolean'
        }
    ],
    //多对一
    belongsTo: 'inas.model.workflow.FamenCaozuoRoleModel'
});
