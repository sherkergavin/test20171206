/**
 * Created by luyufei on 2016/4/15.
 */
/**
 * Created by luyufei on 2016/3/23.
 */

Ext.define('inas.model.workflow.ChongxiRoleModel',{
    extend:'Ext.data.Model',
    fields:[
        {name:'cx_add',type:'auto'},
        {name:'cx_manager_approve',type:'auto'},
        {name:'cx_officer_approve',type:'auto'},
        {name:'cx_dispatcher',type:'auto'},
        {name:'cx_remove',type:'auto'}
    ],
    //一对多
    hasMany : {model: 'inas.model.workflow.ChongxiModel', name: 'list'}
});

Ext.define('inas.model.workflow.ChongxiModel', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'code',type:'string'
        },
        {
            name: 'id',type:'int'
        }
        ,
        {
            name: 'place',type:'string'
        },
        {
            name:'caliber_of_pipeline',type:'string'
        }
        ,
        {
            name: 'filing_date',type: Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
            name: 'plan_start_blunt_turb_date',type: Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
            name: 'plan_end_blunt_turb_date',type: Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
            name: 'plan_start_ch_injection_date',type: Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
            name: 'plan_end_ch_injection_date',type: Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
            name: 'plan_start_rush_ch_date',type: Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
            name: 'plan_end_rush_ch_date',type: Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
            name: 'actual_start_blunt_turb_date',type: Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
            name: 'actual_end_blunt_turb_date',type: Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
            name: 'actual_start_ch_injection_date',type: Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
            name: 'actual_end_ch_injection_date',type: Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
            name: 'actual_start_rush_ch_date',type: Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
            name: 'actual_end_rush_ch_date',type: Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
            name: 'fill_unit',type:'string'
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
        },
        {
            name: 'lo', type: 'int'
        }, {
            name: 'deleted', type: 'int'
        }
    ],
    //多对一
    belongsTo: 'inas.model.workflow.ChongxiRoleModel'
});

