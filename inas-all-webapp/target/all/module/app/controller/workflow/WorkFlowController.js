Ext.define('inas.controller.workflow.WorkFlowController',{
    extend: 'Ext.app.Controller',
    views: ['workflow.WorkFlowView'],
    stores:['workflow.WorkFlowInfosStore','workflow.TaskStateStore'],
    models:['workflow.WorkFlowInfoModel'],
    refs:[
        {
            ref: 'workFlowView',
            selector: 'workFlowView'
        }
    ],
    init:function(){
        this.control({
            'workFlowView':{
                render:this.doload
            },
            'workFlowView>grid[name="taskInfoGrid"]':{
                itemdblclick:this.getTaskInfo
            }
            //,
            //'workFlowView>toolbar>button[action="add"]':{
            //    click:this.addNewProcess
            //}
        })
    },

    doload:function(){
        var me=this;
        var wfView=this.getWorkFlowView();
        var grid = wfView.down('grid');
        var wfFomType=wfView.wf_formType;
        alert('yemiangetwfType==='+wfFomType);
        grid.getStore().load({
            method:'GET',
            params: {
                procDefKey:wfFomType
            }
        });
    },

    //getTaskInfo:function(t, record, item, index, e, eOpts ){
    //    var procId=record.get('processInstanceId');
    //    //alert("111="+procId);
    //    var addWin=Ext.create('inas.view.workflow.WfFormWindown');
    //    var infoFm=addWin.down('form[name="infoFm"]');
    //    var infoGrid=addWin.down('grid[name="taskList"]');
    //
    //    infoFm.getForm().load({
    //        url: projectGP('/workflow/getProcessInfo'),
    //        params:{
    //            procId:procId
    //        },
    //        method:'GET',
    //        success:function(fm,action){
    //            fm.setValues();
    //        }
    //    });
    //    });
    //
    //
    //    infoGrid.getStore().load({
    //        params:{
    //            procId:procId
    //        }
    //    });
    //    addWin.show();
    //},

    getTaskInfo:function(){
        win=Ext.create('inas.view.workflow.TaskInfoWin');
        win.setTitle('请假单详情');
        win.show();
    }
});