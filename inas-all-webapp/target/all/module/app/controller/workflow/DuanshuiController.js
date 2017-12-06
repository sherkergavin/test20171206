Ext.define('inas.controller.workflow.DuanshuiController',{
    extend: 'Ext.app.Controller',
    views: ['workflow.DuanshuiView'],
    stores:['workflow.WorkFlowInfosStore','system.DictionaryStore'],
    models:['workflow.WorkFlowInfoModel'],
    refs:[
        {
            ref: 'duanshuiView',
            selector: 'duanshuiView'
        }
    ],
    init:function(){
        this.control({
            'duanshuiView':{
                render:this.doload
            },
            'duanshuiView>toolbar>button[action="add"]':{
                click:this.doAdd
            },
            'duanshuiView>grid[name="taskInfoGrid"]':{
                itemdblclick:this.getTaskInfo
            },
            'duanshuiView>toolbar>button[action="search"]':{
                click:this.doSearch
            }
        })
    },


    doAdd:function(){
        var wfView=this.getDuanshuiView();
        var wfFomType=wfView.wf_formType;
        var win=Ext.create('inas.view.workflow.TaskInfoWin');
        var repId=reportIp("/ds.cpt");
        subUrl='http://'+projectHOST()+projectGP('/workflow/tempstartProcessByKey');
        win.html='<iframe src="'+repId+'&submitUrl='+subUrl+'?procDefKey='+wfFomType+'&op=write" scrolling="auto" style="width:100%;height:100%;margin:0;padding:0"  frameborder="0"></iframe>';
        win.setTitle('启动断水申请单');
        win.show();
    },

    doload:function(){
        var me=this;
        var wfView=this.getDuanshuiView();
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


    getTaskInfo:function(t, record, item, index, e, eOpts){
        var taskId=record.get('id');
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
                var cptSrc=reportIp('/ds.cpt');
                subUrl='http://'+projectHOST()+projectGP('/workflow/completeTask');
                    win.html='<iframe src="'+cptSrc+'&op=write'+text+'&submitUrl='+subUrl+'?taskId='+taskId+'"scrolling="auto" style="width:100%;height:100%;margin:0;padding:0"  frameborder="0"></iframe>';
                console.log(win.html);
                    win.setTitle('断水申请单详情');
                    win.show();
            }
        })
    }
    ,


    doSearch:function(){
        var me=this;
        var wfView=me.getDuanshuiView();
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