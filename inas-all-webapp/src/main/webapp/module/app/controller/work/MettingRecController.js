/**
 * Created by ZS on 2015/8/06.
 */
Ext.define('inas.controller.work.MettingRecController',{
    extend:'Ext.app.Controller',
    stores:['work.MettingRecStore'],
    refs:[{
        ref:'mettingRecPanel',
        selector:'mettingRecPanel'
    },
        {
            ref: 'metRecGrid',
            selector: 'mettingRecPanel>grid'
        }
    ],
    init:function(){
        this.control({
            'mettingRecPanel':{
                render:this.doLoad
            },
            'mettingRecPanel>grid':{
                itemdblclick:this.editMet
            },
            'mettingRecPanel button[action="search"]': {
                click: this.searchMets
            },
            'mettingRecPanel button[action="add"]': {
                click: this.addMet
            },
            'mettingRecPanel button[action="edit"]': {
                click: this.editMet
            },
            'mettingRecPanel button[action="delete"]': {
                click: this.delMet
            }
        });
    },
    doLoad:function(){
        var me = this;
        var grid = me.getMetRecGrid();
        var staTime=me.getMettingRecPanel().down('datefield[name="staTime"]').getValue();
        var endTime=me.getMettingRecPanel().down('datefield[name="endTime"]').getValue();
        var recStore = me.getStore('work.MettingRecStore');
        recStore.on("beforeload",function(){
            Ext.apply(recStore.proxy.extraParams, {
                'staTime':Ext.Date.format(staTime, 'Y-m-d'),
                'endTime':Ext.Date.format(endTime, 'Y-m-d')
            });
        });
        grid.down('pagingtoolbar').store.load({
            params: {
                'staTime':Ext.Date.format(staTime, 'Y-m-d'),
                'endTime':Ext.Date.format(endTime, 'Y-m-d'),
                start:0,
                limit: 5
            }
        });


    },
    searchMets:function(btn){
        var me = this;
        var grid = me.getMetRecGrid();
        var staTime=me.getMettingRecPanel().down('datefield[name="staTime"]').getValue();
        var endTime=me.getMettingRecPanel().down('datefield[name="endTime"]').getValue();
        var code=me.getMettingRecPanel().down('textfield[name="code"]').getValue();
        var name=me.getMettingRecPanel().down('textfield[name="name"]').getValue();
        var attendance=me.getMettingRecPanel().down('textfield[name="attendance"]').getValue();
        var address=me.getMettingRecPanel().down('textfield[name="address"]').getValue();
        grid.getStore().on("beforeload",function(){
            Ext.apply(grid.getStore().proxy.extraParams, {
                'staTime':Ext.Date.format(staTime, 'Y-m-d'),
                page:0,
                'endTime':Ext.Date.format(endTime, 'Y-m-d'),
                'code':code,
                'name':name,
                'attendance':attendance,
                'address':address
            });
        });
        grid.getStore().loadPage(1);
    }
    ,
    addMet:function(){
        var addWin=Ext.create('inas.view.work.MettingRecWindown');
        addWin.setTitle('新增会议纪要');
        addWin.show();
    }
    ,
    editMet:function(){
        var me = this;
        var grid = me.getMetRecGrid();
        var selRec = grid.getSelectionModel().getSelection()[0];
        if(selRec){
            var edtWin=Ext.create('inas.view.work.MettingRecWindown');
            edtWin.setTitle('修改会议纪要');
            selRec=grid.getStore().findRecord('id',selRec.get('id'));
            edtWin.down('form').getForm().loadRecord(selRec);
            edtWin.down('form').down('fileuploadfield[name="met_img1"]').emptyText=selRec.get('img1');
            edtWin.down('form').down('fileuploadfield[name="met_doc1"]').emptyText=selRec.get('doc1');
            edtWin.down('form').down('fileuploadfield[name="met_img2"]').emptyText=selRec.get('img2');
            edtWin.down('form').down('fileuploadfield[name="met_doc2"]').emptyText=selRec.get('doc2');
            edtWin.down('form').down('fileuploadfield[name="met_img3"]').emptyText=selRec.get('img3');
            edtWin.down('form').down('fileuploadfield[name="met_doc3"]').emptyText=selRec.get('doc3');
            edtWin.down('form').down('fileuploadfield[name="met_img4"]').emptyText=selRec.get('img4');
            edtWin.down('form').down('fileuploadfield[name="met_doc4"]').emptyText=selRec.get('doc4');
            edtWin.down('form').down('datefield[name="hyTime"]').setValue(selRec.get('time'));
            edtWin.show();
        }else{
            Jm.Msg.warning('请选中所需要编辑的数据！');
        }
    }
    ,
    delMet:function(){
        var me = this;
        var grid = me.getMetRecGrid();
        var selRec = grid.getSelectionModel().getSelection()[0];
        if(selRec){
            Jm.Msg.confirm('确定删除该行数据吗？',function(btn){
                if(btn=='ok'){

                    Ext.Ajax.request({
                        method:'POST',
                        url:projectGP('/mettingRec/delMettingRecById'),
                        params: {
                            id:selRec.get('id')
                        },
                        success: function(response){
                            var text = response.responseText;
                            grid.store.reload();
                        }
                    });
                }

            });
        }else{
            Jm.Msg.warning('请选中需要删除的数据！');
        }
    }


});