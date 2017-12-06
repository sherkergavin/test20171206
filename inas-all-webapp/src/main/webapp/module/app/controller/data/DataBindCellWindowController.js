Ext.define('inas.controller.data.DataBindCellWindowController', {
    extend: 'Ext.app.Controller',
    views: ['pm.DataBindCellWindow'],
    refs: [
        {
            ref: 'dataBindCellWindow',
            selector: 'dataBindCellWindow'
        }
    ],
    init: function () {
        this.control({
            'dataBindCellWindow>toolbar>button[action="save"]':{
                    click:this.doSave
            },
            'dataBindCellWindow>toolbar>button[action="reset"]':{
                click:this.doReset
            }
        });

    },
    doSome:function(){
      alert('aaa')
    },
    doSave:function(){
        //alert('add')
        var win=this.getDataBindCellWindow();
        var grid=win.down('gridpanel');
        var jsonArray=[];
        //所有新添加或被修改的records数据记录集
        Ext.each(grid.store.getModifiedRecords(), function (record) {
            if (record.data.dti_id != '') {
                jsonArray.push(record.data);
            }
        });
        if (jsonArray.length > 0) {
            //alert(Ext.encode(jsonArray))
            Ext.Ajax.request({
                url: projectGP('/bindRowCell/saveBindCellList'),
                method:'post',
                params: {
                    grdRecodeList: Ext.encode(jsonArray),
                    bindId:win.bind_id
                },
                success: function (response) {
                    var myResObj = Ext.JSON.decode(response.responseText);
                    if (myResObj.success){
                        grid.store.load({
                            params: {
                                bindId: win.bind_id
                            }
                            ,
                            callback: function (records, operation, success) {
                            }
                        });
                    }
                }
            });
        }
    },

    doReset:function(){
        var win=this.getDataBindCellWindow();
        var grid=win.down('gridpanel');
        grid.store.load({
            params: {
                bindId: win.bind_id
            }
        });
    }
    })