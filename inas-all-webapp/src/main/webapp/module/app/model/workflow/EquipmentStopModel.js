/**
 * Created by luyufei on 2016/3/23.
 */

Ext.define('inas.model.workflow.EquipmentStopRoleModel',{
    extend:'Ext.data.Model',
    fields:[
        {name:'sbty_fg_approve',type:'auto'},
        {name:'sbty_cm_approve',type:'auto'},
        {name:'sbty_officer_approve',type:'auto'},
        {name:'sbty_manager_approve',type:'auto'},
        {name:'sbty_dp_approve',type:'auto'},
        {name:'sbty_remove',type:'auto'},
        {name:'sbty_add',type:'auto'},
        {name:'sbty_dispatcher',type:'auto'}
    ],
    //一对多
    hasMany : {model: 'inas.model.workflow.EquipmentStopModel', name: 'list'}
});

Ext.define('inas.model.workflow.EquipmentStopModel', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'id',type:'int'
        }
        ,
        {
            name: 'filing_date',type:Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
            name: 'place',type:'string'
        }
        ,
        {
           name:'status' ,type:'string'
        },
        {
            name: 'job_content',type: 'string'
        }
        ,
        {
          name:'code',type :'String'
        }
        ,
        {
            name: 'type',type: 'int'
        }
        ,
        {
            name: 'is_monitoring_center',type:'int'
        }
        ,
        {
            name: 'fill_unit',type: 'string'
        }
        ,
        {
            name: 'planing_start_date',type: Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
            name: 'planing_end_date',type:Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
            name: 'actual_start_time',type:Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
            name: 'actual_end_time',type:Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
            name: 'lister',type:'string'
        }
        ,
        {
            name: 'lister_time',type:Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
            name: 'factory_manager',type:'string'
        }
        ,
        {
            name: 'factory_manager_date',type:Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
            name: 'company_manager',type:'string'
        }
        ,
        {
            name: 'company_manager_date', type:Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
            name: 'dispatche_manager', type: 'string'
        }
        ,
        {
            name: 'dispatche_manager_date', type: Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
            name: 'dispatche_center_director', type: 'string'
        }
        ,
        {
            name:'dispatche_center_director_date' , type: Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
            name:'dispatcher',type:'string'
        }
        ,
        {
            name:'dispatcher_date', type: Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
            name:'version' , type: 'int'
        }
        ,
        {
            name:'create_date',type: Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
            name:'creator', type: 'string'
        }
        ,
        {
            name :'edit_date' , type: Ext.data.Types.DATE, dateFormat: 'time'
        }
        ,
        {
           name :'editor', type:'string'
        }
        ,
        {
             name:'lo' , type:'int'
        }
        ,
        {
            name:'deleted' ,type:'int'
        },
        {
            name:'check_result' ,type:'String'
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
            name :'equipment_stop_content' , type:'string'
        },{
            name:'influence_content',type:'string'
        }
    ],
   belongsTo: 'inas.model.workflow.EquipmentStopRoleModel'
});
