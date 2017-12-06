Ext.define('inas.model.workflow.WorkFlowInfoModel', {
    extend: 'Ext.data.Model',
    fields: [

        {
            name: 'parentTaskId',type:'string'
        },
        {
            name: 'processDefinitionId',type:'string'
        },{
            name: 'processInstanceId',type:'string'

        },{
            name: 'executionId',type:'string'
        },{
            name: 'formKey',type:'string'
        },{
            name: 'taskDefinitionKey',type:'string'
        },{
            name: 'url',type:'string'
        },
        {
            name:'id',type:'string'
        },
        {
            name: 'name',type:'string'
        },
        {
            name: 'owner',type:'string'

        },
        {
            name: 'assignee',type:'string'
        },
        {
            name:'claimTime',type:'string'
        },

        {
            name: 'startTime',type:'string'
        }
        ,
        {
            name: 'endTime',type:'string'
        },
        {
            name: 'state',type:'string'
        },{
            name:'context',type:'string'
        }
        ,{
            name:'startUser',type:'string'
        }
        ,{
            name:'fillUnit',type:'string'
        }
        ,{
            name:'isMonitoringCenter',type:'string'
        }
        //{name: 'createTime', type: Ext.data.Types.DATE, dateFormat: 'time'},
    ]
});