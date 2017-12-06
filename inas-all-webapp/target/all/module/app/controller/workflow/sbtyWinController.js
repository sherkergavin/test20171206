Ext.define('inas.controller.workflow.sbtyWinController',{
    extend: 'Ext.app.Controller',
    views: ['workflow.ShebeiTingyiWin'],
    stores:['system.OrganiztionStore'],
    refs:[
        {
            ref: 'ShebeiTingyiWin',
            selector: 'ShebeiTingyiWin'
        },
        {
            ref:'sbtyForm',
            selector:'ShebeiTingyiWin>form[name="sbtyForm"]'
        },
        {
            ref:'startBtn',
            selector:'ShebeiTingyiWin>toolbar>button[action="save"]'
        },
        {
            ref:'resetBtn',
            selector:'ShebeiTingyiWin>toolbar>button[action="reset"]'
        },
        {
            ref:'passBtn',
            selector:'ShebeiTingyiWin>toolbar>button[name="pass"]'
        },
        {
            ref:'rejectBtn',
            selector:'ShebeiTingyiWin>toolbar>button[name="reject"]'
        },
        {
            ref: 'shebeiView',
            selector: 'shebeiView'
        }
    ],
    init:function(){
        this.control({

            'ShebeiTingyiWin':{
                afterrender:this.doTaskKeyShow
            },
            'ShebeiTingyiWin button[action="print"]':{
                click:this.printForm
            },
            'ShebeiTingyiWin>toolbar>button[action="save"]':{
                click:this.startForm
            },
            'ShebeiTingyiWin>toolbar>button[action="reset"]':{
                click:this.doReset
            },
            'ShebeiTingyiWin>toolbar>button[name="pass"]':{
                click:this.doApprove
            },
            'ShebeiTingyiWin>toolbar>button[name="reject"]':{
                click:this.doApprove
            },
            'ShebeiTingyiWin button[name="imgBtn"]':{
                click:this.downLoadImg
            },
            'ShebeiTingyiWin button[name="docBtn"]':{
                click:this.downLoadDoc
            }
        })
    },


    /**
     * 填报模块
     */
    nofillBlock:function(readFlag){
        var sform=this.getSbtyForm();
        //获取模块对应的控价，根据标示设置控件属性
        sform.down('datefield[name="filingDate"]').setReadOnly( readFlag );
        sform.down('textfield[name="code"]').setReadOnly( readFlag );

        //sform.down('combobox[name="fillUnit"]').setReadOnly( readFlag );
        //sform.down('combobox[name="fillUnit"]').setReadOnly( true );
        sform.down('treepicker[name="fillUnit"]').store.load();
        sform.down('textfield[name="jobOverview"]').setReadOnly( readFlag );

        sform.down('datefield[name="scheduled_start_date"]').setReadOnly( readFlag );
        sform.down('datefield[name="scheduled_end_date"]').setReadOnly( readFlag );
        sform.down('datefield[name="actual_start_date"]').setReadOnly( !readFlag );
        sform.down('datefield[name="actual_end_date"]').setReadOnly( !readFlag );

        sform.down('textarea[name="maintenanceItem"]').setReadOnly( readFlag );
        sform.down('textarea[name="stopDevices"]').setReadOnly( readFlag );

        sform.down('fileuploadfield[name="sketchingImg"]').setDisabled( readFlag );
        sform.down('fileuploadfield[name="docs"]').setDisabled( readFlag );
        //对应上传按钮的下载按钮获取与
        sform.down('button[name="imgBtn"]').setDisabled(!readFlag);
        sform.down('button[name="docBtn"]').setDisabled(!readFlag);
    },

    /**
     * 预审批模块
     */
    nocheckBlock:function(readFlag){
        var sform=this.getSbtyForm();
        //获取模块对应的控价，根据标示设置控件属性
        //是否送往中心审批的按钮与审批意见
        sform.down('radiogroup[name="group1"]').setDisabled( readFlag );
        sform.down('radiogroup[name="group2"]').setDisabled( readFlag );
        sform.down('textarea[name="approvalOpinion"]').setReadOnly( readFlag );

    },

    /**
     * 确认完成情况模块是否只读
     */
    noconfirmBlock:function(readFlag){
        var sform=this.getSbtyForm();
        //获取模块对应的控价，根据标示设置控件属性
        sform.down('radiogroup[name="cmpGp"]').setDisabled( readFlag );
        sform.down('textarea[name="description"]').setReadOnly( readFlag );
        sform.down('textfield[name="fillingPerson"]').setReadOnly( readFlag );
        sform.down('datefield[name="fillingTime"]').setReadOnly( readFlag );
        sform.down('datefield[name="actual_start_date"]').setReadOnly( readFlag );
        sform.down('datefield[name="actual_start_date"]').allowBlank=readFlag;
        sform.down('datefield[name="actual_end_date"]').setReadOnly( readFlag );
        sform.down('datefield[name="actual_end_date"]').allowBlank=readFlag;
    },


    /**
     * 文件下载
     */
    downLoadFile:function(fielValue){
        var me=this;

        if(fielValue!=null && fielValue!='' && fielValue!=""){

            var lastIndext=fielValue.lastIndexOf("/");//获取到最后一个‘/’的下标
            var lastPath=fielValue.substr(-0,lastIndext);
            var lastName=fielValue.substr(lastIndext+1,fielValue.length-1);
            var trrIndex=lastName.lastIndexOf(".");
            var fielTrue=lastName.substr(0,trrIndex);//文件名称
            var trrTrue=lastName.substr(trrIndex,lastName.length);//文件后缀
            var fielPath=Jm.DB.FTP_DOWN+fielValue;
            var loadPath=encodeURI(encodeURI(fielPath));
            var url = projectGP('/module-jsp/app/download.jsp?fileName='+fielTrue+"&trrTrue="+trrTrue+'&filepath='+loadPath);
            window.open(url);
        }else{
            Jm.MessageBox.error('本次申请没有上传相关文件！');
        }
            //}
    },


    /**
     * 下载相关图片
     */
    downLoadImg:function(){
        var me=this;
        var sbtyWin=me.getShebeiTingyiWin();
        this.downLoadFile(sbtyWin.getImgPath());
    },


    /**
     * 下载相关文档
     */
    downLoadDoc:function(){
        var me=this;
        var sbtyWin=me.getShebeiTingyiWin();
        this.downLoadFile(sbtyWin.getDocPath());
    },


    doTaskKeyShow:function(t){
        var me=this;
        var sbtyWin=me.getShebeiTingyiWin();
        var taskkey=sbtyWin.getTaskKey();
        var sbtyForm=me.getSbtyForm();
        var startBtn=me.getStartBtn();
        var resetBtn=me.getResetBtn();
        var passBtn=me.getPassBtn();
        var rejectBtn=me.getRejectBtn();
        var taskState=sbtyWin.getTaskState();
        var procId=sbtyWin.getProcId();
        var fillUnitPicker=sbtyForm.getForm().findField('fillUnit');
        fillUnitPicker.store.load();
        sbtyForm.getForm().load({
            url: projectGP('/workflow/getExtHistoryVariables'),
            params:{
                processInstanceId:procId
            },
            method:'GET',
            success:function(fm,action){
                var sign1=sbtyForm.down('textfield[name="managerId"]');
                var sign2=sbtyForm.down('textfield[name="listerId"]');
                var sign3=sbtyForm.down('textfield[name="waterCompany"]');
                var sign4=sbtyForm.down('textfield[name="waterSupplyDispatchId"]');
                //sketchingImg 复值未成功
                //alert(action.result.data.sketchingImg);
                sbtyWin.setImgPath(action.result.data.sketchingImg);
                sbtyWin.setDocPath(action.result.data.docs);
                //sbtyForm.down('fileuploadfield[name="sketchingImg"]').emptyText='2222';
                //alert(taskkey+'==='+taskState);
                if(taskkey=='start'){
                    //启用可填报的所有表格
                    //禁用审批按钮
                    passBtn.hide();
                    rejectBtn.hide();
                    startBtn.show();
                    resetBtn.show();
                    //表单控件权限
                    me.nofillBlock(false);
                    me.nocheckBlock(true);
                    me.noconfirmBlock(true);
                    //是否有签章权限
                    sign1.setReadOnly(true);
                    sign2.setReadOnly(true);
                    sign3.setReadOnly(true);
                    sign4.setReadOnly(true);
                    console.log('Jm.USER.ORGNIZATION_ID=='+Jm.USER.ORGNIZATION_ID);
                    fillUnitPicker.setValue(Jm.USER.ORGNIZATION_ID);
                    sign2.setValue(Jm.USER.REAL_NAME);//启动人即为制表人
                    sbtyWin.setTitle('表单填报');
                }
                if(null==taskkey || taskkey=='' || taskkey==0 ){
                    //关闭所有按钮
                    passBtn.hide();
                    rejectBtn.hide();
                    startBtn.hide();
                    resetBtn.hide();
                    //表单控件权限
                    me.nofillBlock(true);
                    me.nocheckBlock(true);
                    me.noconfirmBlock(true);
                    //是否有签章权限
                    sign1.setReadOnly(true);
                    sign2.setReadOnly(true);
                    sign3.setReadOnly(true);
                    sign4.setReadOnly(true);
                    sbtyWin.setTitle('查看明细');
                }
                //对于审批先关的按钮，需根据任务所在状态查看是否可操作
                if(taskState=='mine_turn' || taskState=='forme_claim') {
                    if (taskkey.match('usertask')) {
                        //禁用启动流程的按钮，与填报控件
                        passBtn.show();
                        rejectBtn.show();
                        startBtn.hide();
                        resetBtn.hide();
                        //暂时关闭所有审批按钮，由每部审批单独启用对应的控件与签名按钮
                        me.nofillBlock(true);
                        me.nocheckBlock(true);
                        me.noconfirmBlock(true);
                        sign1.setReadOnly(true);
                        sign2.setReadOnly(true);
                        sign3.setReadOnly(true);
                        sign4.setReadOnly(true);
                        //普通审批模块
                        if (taskkey == 'usertask1' || taskkey == 'usertask2' || taskkey == 'usertask3'
                            || taskkey == 'usertask5' || taskkey == 'usertask6') {
                            //保留其签名控件，后禁用所有控件
                            var realName=Jm.USER.REAL_NAME;
                            //alert('1='+taskkey);
                            if (taskkey == 'usertask1') {
                                sign1.setValue(realName);
                                sbtyWin.setTitle('负责人审批');
                            }
                            if (taskkey == 'usertask3') {
                                sign3.setValue(realName);
                                sbtyWin.setTitle('制水公司审批');
                            }
                            //供水调度室需要有审批意见填写权限
                            if (taskkey == 'usertask5') {
                                sign4.setValue(realName);
                                sbtyForm.down('textarea[name="approvalOpinion"]').setReadOnly( false );
                                sbtyWin.setTitle('供水调度室审批');
                            }if(taskkey == 'usertask6'){
                                sbtyWin.setTitle('中心审批');
                            }}

                        //预审批模块
                        if (taskkey == 'usertask4') {
                            //预审批启用是否送往中心审批模块控件
                            me.nocheckBlock(false);
                            sbtyWin.setTitle('预审批中');
                        }
                        //调度员确认完成情况,启用完成情况确认模块控件
                        if (taskkey == 'usertask7') {
                            //alert(11);
                            me.noconfirmBlock(false);
                            passBtn.setText("确认");
                            passBtn.show();
                            rejectBtn.hide();
                            sbtyWin.setTitle('调度员审批中');
                        }
                    }
                }else if(taskState=='finished' || taskState=='running'){
                    //禁用所有控件，隐藏所有按钮，流程发起后只能查看任务信息
                    passBtn.hide();
                    rejectBtn.hide();
                    startBtn.hide();
                    resetBtn.hide();
                    //表单控件权限
                    me.nofillBlock(true);
                    me.nocheckBlock(true);
                    me.noconfirmBlock(true);
                    //是否有签章权限
                    sign1.setReadOnly(true);
                    sign2.setReadOnly(true);
                    sign3.setReadOnly(true);
                    sign4.setReadOnly(true);
                    sbtyWin.setTitle('查看明细');
                }
            }
        });
        //对应的签名的权限

    },





    /**
     * 处理提交参数，
     * 提交路径
     */
    doSubmit:function(btn,subUrl,approveFlag){
        var me=this;
        var sform=me.getSbtyForm();
        //获取模块对应的控价，根据标示设置控件属性
        sform.down('datefield[name="filingDate"]').name='inas_filingDate';
        sform.down('textfield[name="code"]').name='inas_code';
        sform.down('treepicker[name="fillUnit"]').name='inas_fillUnit';

        sform.down('textfield[name="jobOverview"]').name='inas_jobOverview';
        sform.down('datefield[name="scheduled_start_date"]').name='inas_scheduled_start_date';
        sform.down('datefield[name="scheduled_end_date"]').name='inas_scheduled_end_date';
        sform.down('datefield[name="actual_start_date"]').name='inas_actual_start_date';
        sform.down('datefield[name="actual_end_date"]').name='inas_actual_end_date';

        sform.down('textarea[name="maintenanceItem"]').name='inas_maintenanceItem';
        sform.down('textarea[name="stopDevices"]').name='inas_stopDevices';
        //文件上传修改name无效，因此不修改其提交时的name
        //sform.down('fileuploadfield[name="sketchingImg"]').name='inas_sketchingImg';
        //sform.down('fileuploadfield[name="docs"]').name='inas_docs';

        //是否送往中心审批/备案
        sform.down('radiogroup[name="group1"]').getChecked()[0].name='inas_isMonitoringCenter';
        sform.down('radiogroup[name="group2"]').getChecked()[0].name='inas_isDispatchCenter';
        sform.down('textarea[name="approvalOpinion"]').name='inas_approvalOpinion';

        //工作完成情况
        sform.down('radiogroup[name="cmpGp"]').getChecked()[0].name='inas_completeState';
        sform.down('textarea[name="description"]').name='inas_description';
        sform.down('textfield[name="fillingPerson"]').name='inas_fillingPerson';
        sform.down('datefield[name="fillingTime"]').name='inas_fillingTime';

        sform.down('textfield[name="managerId"]').name='inas_managerId';
        sform.down('textfield[name="listerId"]').name='inas_listerId';
        sform.down('textfield[name="waterCompany"]').name='inas_waterCompany';
        sform.down('textfield[name="waterSupplyDispatchId"]').name='inas_waterSupplyDispatchId';

        var procDefKey=this.getShebeiTingyiWin().wf_formType;
        var taskId=this.getShebeiTingyiWin().getTaskId();
        sform.down('hiddenfield[name="procDefKey"]').setValue(procDefKey);
        sform.down('hiddenfield[name="taskId"]').setValue(taskId);
        sform.down('hiddenfield[name="approve"]').setValue(approveFlag);
        sform.down('hiddenfield[name="approve"]').name='inas_approve';

        if(null!=subUrl && ''!=subUrl ){
            if (sform.getForm().isValid()){
                sform.getForm().submit({
                    method:'POST',
                    url:projectGP(subUrl),//启动流程/完成流程
                    success:function(form, action){
                        //提示成功，关闭当前窗口
                        Jm.Msg.success('提交成功！');
                        btn.setDisabled(false);//禁用但前使用的按钮，避免二次提交
                        me.getShebeiTingyiWin().close();
                        var grid = me.getShebeiView().down('grid');
                        grid.getStore().load({
                            method:'GET',
                            params: {
                                procDefKey:procDefKey
                            }
                        });
                    },
                    failure: function (form, action) {
                        Jm.MessageBox.error(action.result.msg);
                    }
                });
        }else {
                Jm.MessageBox.error("表单填入的值不合法!");
            }
        }else{
            Jm.MessageBox.error('为获取到提交路径！');
        }
},



    //启动流程
    startForm:function(btn){
        var subUrl='/workflow/startProcessByKey';
        this.doSubmit(btn,subUrl,null);
    },

    //流程审批
    doApprove:function(btn){
        var approveFlag;
       if(btn.name=='pass'){
            approveFlag=1;
       }
        if(btn.name=='reject'){
            approveFlag=-1;
        }
        var subUrl='/workflow/completeExtTask';
        this.doSubmit(btn,subUrl,approveFlag);
    },


    //打印表单
    printForm:function(){
        var procId=this.getShebeiTingyiWin().getProcId();
        var win=Ext.create('inas.view.workflow.TaskInfoWin');
        var cptSrc=reportIp('/printSbty.cpt');
        if(null!=procId && procId!='' && procId!=0){
            Ext.Ajax.request({
                method:'GET',
                url:projectGP('/workflow/getHistoryVariables'),
                params:{
                    'processInstanceId':procId
                },
                success: function(response){
                    var text = response.responseText;
                    win.html='<iframe src="'+cptSrc+text+'&op=write" scrolling="auto" style="width:100%;height:100%;margin:0;padding:0"  frameborder="0"></iframe>';
                    //win.html='<iframe src="http://localhost:8080/report/ReportServer?reportlet=workflow/printSbty.cpt'+text+'&op=write" scrolling="auto" style="width:100%;height:100%;margin:0;padding:0"  frameborder="0"></iframe>';
                    win.setTitle('打印设备停役单');
                    win.show();
                }
            })
        }else{
            win.html='<iframe src="'+cptSrc+'&op=write" scrolling="auto" style="width:100%;height:100%;margin:0;padding:0"  frameborder="0"></iframe>';
            win.setTitle('打印设备停役单');
            win.show();
        }
    },
    //重置表单
    doReset:function(){
        var me=this;
        var sform=me.getSbtyForm();
        sform.getForm().reset(true);
    }

});