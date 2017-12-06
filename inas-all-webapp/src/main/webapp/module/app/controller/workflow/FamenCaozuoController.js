Ext.define('inas.controller.workflow.FamenCaozuoController',{
    extend: 'Ext.app.Controller',
    views: ['workflow.FamenCaozuoView'],
    stores:['workflow.WorkFlowInfosStore','system.DictionaryStore'],
    models:['workflow.WorkFlowInfoModel'],
    refs:[
        {
            ref: 'famenView',
            selector: 'famenView'
        }
    ],
    init:function(){
        this.control({
            'famenView':{
                render:this.doload
            },
            'famenView>toolbar>button[action="add"]':{
                click:this.doAdd
            },
            'famenView>grid[name="taskInfoGrid"]':{
                itemdblclick:this.getTaskInfo
            },
            'famenView>toolbar>button[action="search"]':{
                click:this.doSearch
            }
        })
    },

    doload:function(){
        var me=this;
        var wfView=this.getFamenView();
        var grid = wfView.down('grid');
        var wfFomType=wfView.wf_formType;
        var search_startTime=  wfView.down('datefield[name="search_startTime"]').getValue();
        var search_endTime=wfView.down('datefield[name="search_endTime"]').getValue();
        grid.getStore().load({
            method:'GET',
            params: {
                search_start_time:search_startTime,
                search_end_time:search_endTime,
                procDefKey:wfFomType
            }
        });
        var stateComb=wfView.down('combobox[name=search_state]');
        stateComb.getStore().load({
            params:{
                'type':Jm.DB.Constant.DICTIONARY_TYPE_TASKSTATE
            }
        });
    },


    doAdd:function(){
        var wfView=this.getFamenView();
        var wfFomType=wfView.wf_formType;
        var win=Ext.create('inas.view.workflow.TaskInfoWin');
        var repId=reportIp("/Fam.cpt");

        var subUrl='http://'+projectHOST()+projectGP('/workflow/tempstartProcessByKey');
        win.html='<iframe src="'+repId+'&submitUrl='+subUrl+'?procDefKey='+wfFomType+'&taskkey=start'+'&op=write" scrolling="auto" style="width:100%;height:100%;margin:0;padding:0"  frameborder="0"></iframe>';
        win.setTitle('启动阀门操作单');
        win.show();
    },


    getTaskInfo:function(t, record, item, index, e, eOpts){
        var taskId=record.get('id');
        var procId=record.get('processInstanceId');
        var taskKey=record.raw.taskDefinitionKey;
        var win=Ext.create('inas.view.workflow.TaskInfoWin');
        Ext.Ajax.request({
            method:"GET",
            url:projectGP('/workflow/getHistoryVariables'),
            params:{
                'processInstanceId':procId
            },
            success: function(response){
                var text = response.responseText;
                var repId=reportIp("/Fam.cpt");
                var subUrl='http://'+projectHOST()+projectGP('/workflow/completeTask?taskId=');
                win.html='<iframe src="'+repId+'&op=write'+text+'&submitUrl='+subUrl+taskId+'&taskKey='+taskKey+'" scrolling="auto" style="width:100%;height:100%;margin:0;padding:0"  frameborder="0"></iframe>';
                //alert(win.html);
                win.setTitle('阀门操作单详情');
                win.show();
            }
        })

    },

    doSearch:function(){
        var me=this;
        var wfView=me.getFamenView();
        var grid = wfView.down('grid');
        var wfFomType=wfView.wf_formType;
        var search_startTime=  wfView.down('datefield[name="search_startTime"]').getValue();
        var search_endTime=wfView.down('datefield[name="search_endTime"]').getValue();
        var search_state=wfView.down('combobox[name="search_state"]').getValue();
        var search_Context=wfView.down('textfield[name="search_Context"]').getValue();

        grid.getStore().load({
            method:'POST',
            params: {
                procDefKey:wfFomType,
                search_start_time:search_startTime,
                search_end_time:search_endTime,
                search_state:search_state,
                search_Context:search_Context
            }
        });

    }
});