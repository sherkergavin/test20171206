/**
 * Created by ZS on 2015/7/29.
 */
Ext.define('inas.controller.work.WorkHistoryController',{
    extend:'Ext.app.Controller',
    views:['work.WorkHistory'],
    stores:['work.WorkHistoryStore'],
    refs:[{
        ref:'historyPanel',
        selector:'historyPanel'
    },{
        ref:'historyGrid',
        selector:'historyPanel>grid'
    }
    ],
    init:function(){
        this.control({
            'historyPanel':{
                render:this.doLoad
            },
            'historyPanel grid':{
                itemdblclick: this.rowClick
            },
            'historyPanel button[action="search"]': {
                click: this.searchInstructions
            }
        });
    },
    doLoad:function() {

        var me = this;
        var hiGrid = me.getHistoryGrid();
        var curDate = new Date();
        var staTime=Ext.Date.format(curDate, 'Y-m');
        hiGrid.store.load({
            params: {
                searchMonth: staTime
            },
            callback: function (records, operation, success) {
                //for(var i=0;i<records.length;i++){
                //    alert('date='+records[i].get('daily_date'))
                //}
                me.getHistoryPanel().down('datefield[name="searchMonth"]').setValue(staTime);
            }

        });
    }
    ,

    searchInstructions:function(btn){
        var me = this;
        var grid = me.getHistoryGrid();
        var searchM=me.getHistoryPanel().down('datefield[name="searchMonth"]').getValue();
        grid.store.load(
            {
                //TODO
                params: {
                    searchMonth: Ext.Date.format(searchM, 'Y-m')
                }
            }
        );
    }
    ,
    rowClick:function(){
        var me = this;
        var hiGrid = me.getHistoryGrid();
        var selRec = hiGrid.getSelectionModel().getSelection()[0];
        Ext.Ajax.request({
            method:'POST',
            url:projectGP('/dailyShift/getDailyShiftsByDate'),
            params: {
                dailyDateStr:selRec.get('daily_date')
            },
            success: function(response){
                var infoWin=Ext.create('Ext.window.Window',{
                    width:1200,
                    height:850,
                    layout:'fit',
                    modal : true
                });
                var infoV=Ext.create('inas.view.work.DailyItemView');
                infoV.setDailyDate(selRec.get('daily_date'));
                var temp = Ext.getCmp('center-tabpanel');
                var temp2 = temp.queryById('tabpanelid-16');
                if(temp2 !=null){
                    temp2.close();
                }
                var addBtn = infoV.down('button[action="add"]');
                var saveBtn = infoV.down('button[action="save"]');
                infoWin.setTitle(Ext.Date.format(selRec.get('daily_date'),'Y-m-d'));
                addBtn.setDisabled(true);
                saveBtn.setDisabled(true);
                infoWin.add(infoV);
                infoWin.doLayout();
                infoWin.show();
            }
        });
    }


});