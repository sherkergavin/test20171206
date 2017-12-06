Ext.define('inas.controller.workflow.ChongxiController',{
    extend: 'Ext.app.Controller',
    views: ['workflow.ChongxiView'],
    stores:['workflow.WorkFlowInfosStore','system.DictionaryStore'],
    models:['workflow.WorkFlowInfoModel'],
    refs:[
        {
            ref: 'chongxiView',
            selector: 'chongxiView'
        }
    ],
    init:function(){
        this.control({
            'chongxiView':{
                render:this.doload
            },
            'chongxiView>toolbar>button[action="add"]':{
                click:this.doAdd
            },
            'chongxiView>grid[name="taskInfoGrid"]':{
                itemdblclick:this.getTaskInfo
            },
            'chongxiView>toolbar>button[action="search"]':{
                click:this.doSearch
            }
        })
    },

    doload:function(){
        var me=this;
        var wfView=this.getChongxiView();
        var grid = wfView.down('grid');
        var wfFomType=wfView.wf_formType;
        //alert('yemiangetwfType==='+wfFomType);
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
        var wfView=this.getChongxiView();
        var wfFomType=wfView.wf_formType;
        var win=Ext.create('inas.view.workflow.TaskInfoWin');
        var repId=reportIp("/cxxd.cpt");
        subUrl='http://'+projectHOST()+projectGP('/workflow/tempstartProcessByKey');
        win.html='<iframe src="'+repId+'&submitUrl='+subUrl+'?procDefKey='+wfFomType+'&taskkey=start'+'&op=write" scrolling="auto" style="width:100%;height:100%;margin:0;padding:0"  frameborder="0"></iframe>';
        win.setTitle('启动冲洗消毒申请单');
        win.show();
    },




    getTaskInfo:function(t, record, item, index, e, eOpts){
        var taskId=record.get('id');
        var taskKey=record.raw.taskDefinitionKey;
        var procId=record.get('processInstanceId');
        var win=Ext.create('inas.view.workflow.TaskInfoWin');
        Ext.Ajax.request({
            method:"GET",
            url:projectGP('/workflow/getHistoryVariables'),
            params:{
                'processInstanceId':procId
            },
            success: function(response){
                var text = response.responseText;
                var repId=reportIp("/cxxd.cpt");
                subUrl='http://'+projectHOST()+projectGP('/workflow/completeTask');
                win.html='<iframe src="'+repId+text+'&submitUrl='+subUrl+'?taskId='+taskId+'&taskKey='+taskKey+'" scrolling="auto" style="width:100%;height:100%;margin:0;padding:0"  frameborder="0"></iframe>';

                win.setTitle('冲洗消毒申请单详情');
                win.show();
            }
        })
    }
    ,


    doSearch:function(){
        var me=this;
        var wfView=me.getChongxiView();
        var grid = wfView.down('grid');
        var wfFomType=wfView.wf_formType;
        var search_startTime=  wfView.down('datefield[name="search_startTime"]').getValue();
        var search_endTime=wfView.down('datefield[name="search_endTime"]').getValue();
        var search_state=wfView.down('combobox[name="search_state"]').getValue();

        grid.getStore().load({
            method:'POST',
            params: {
                procDefKey:wfFomType,
                search_start_time:search_startTime,
                search_end_time:search_endTime,
                search_state:search_state
            }
        });

    }

});