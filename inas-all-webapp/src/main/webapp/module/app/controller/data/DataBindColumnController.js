Ext.define('inas.controller.data.DataBindColumnController', {
    extend: 'Ext.app.Controller',
    stores: ['pm.DataBindColumnStore'],
    refs: [
        {
            ref: 'dataBindColumnWindow',
            selector: 'dataBindColumnWindow'
        },
        {
            ref: 'bind',
            selector: 'bind'
        }
    ],
    init: function () {
        this.control({
            'dataBindColumnWindow':{
              render:this.initWindow
            },

            'dataBindColumnWindow button[action="save"]': {
                click: this.saveColumn
            },
            'dataBindColumnWindow button[action="add"]': {
                click: this.addColumn
            },
            'dataBindColumnWindow button[action="reset"]': {
                click: this.resetColumn
            }
        })
    },
    initWindow:function(){

        //var window=this.getDataBindColumnWindow();
        //window.down('grid').store.load();
        var dbp = this.getBind();
        var tp = dbp.down('treepanel');
        var record = tp.getSelectionModel().selected.items[0];
        var bind_id=record.data.id;
        var bindWind=this.getDataBindColumnWindow();
        Ext.Ajax.request({
            url: projectGP('/bindRowCell/bindDataRowList'),
            method:"POST",
            params: {
                bindId:bind_id
            },
            success: function (response) {
                var json = Ext.JSON.decode(response.responseText);
                if (json.success) {
                    var res=json.data;
                    var myCheckboxItems=[];
                    for(var i=0;i<res.length;i++)
                    {
                        var d=res[i];
                        myCheckboxItems.push({
                            boxLabel : d.name,
                            name : d.name,
                            inputValue: d.id,
                            checked: d.checked
                        });
                    }
                }
                var CHp=bindWind.down('checkboxgroup[name="checkedGp"]');
                CHp.add({boxLabel: '全选/反选', name: 'all'});
                CHp.add(myCheckboxItems);//
            }
        });
    },
    saveColumn: function (btn) {
        btn.setDisabled(true);
        var dbp = this.getBind();
        var tp = dbp.down('treepanel');
        var record = tp.getSelectionModel().selected.items[0];

        var jsonArray = [];
        var window = this.getDataBindColumnWindow();
        var grid = window.down('gridpanel[name="columGrid"]');
        Ext.each(grid.store.getModifiedRecords(), function (item) {
            if (item.data.data_format_id != '') {
                jsonArray.push(item.data);
            }

        });
        var checkedGp=window.down('checkboxgroup[name="checkedGp"]');
        var allArray=[];
        var allItems=checkedGp.items;
        for(var i=0;i<allItems.length;i++){
            var value=allItems.get(i).inputValue;
            if(value!='on'){
                allArray.push(value);
            }
        }
        var cbItems = checkedGp.getChecked();
        var chgArray=[];
        Ext.Array.each(cbItems, function(item){
            if(item.inputValue!='on'){
                chgArray.push(item.inputValue);
            }
        });
        //alert('len=='+jsonArray.length);
        //if (jsonArray.length > 0 || cbItems.length>0) {
        //jsonArray与cbItems可以为空，相当于删除所有绑定过的站点的操作，checked=0
            Ext.Ajax.request({
                url: projectGP('/data/saveDataBindColumnRecords'),
                method:"POST",
                params: {
                    columnEn: Ext.encode(jsonArray),
                    cbItems:Ext.encode(chgArray),
                    allRowArray:Ext.encode(allArray),
                    bind_id:record.data.id
                },
                success: function (response) {
                    Jm.Msg.success('保存成功！');
                    btn.setDisabled(false);
                    var text = Ext.JSON.decode(response.responseText).success;
                    if (text) {
                        grid.store.load({
                            params: {
                                bind_id: record.data.id
                            },
                            callback: function (records, operation, success) {
                            }
                        });
                    }
                },
                failure: function(response) {

                    Jm.Msg.error("保存失败",function(){
                        btn.setDisabled(false);
                    });
                }

            });
        //}
    },
    addColumn: function () {
        var window = this.getDataBindColumnWindow();
        var grid = window.down('gridpanel[name="columGrid"]');
        grid.getStore().insert(grid.getStore().getCount(), Ext.create('inas.model.data.DataBindColumnModel'));
        window.cellEditing.startEditByPosition({
            row: grid.getStore().getCount() - 1,
            column: 0
        });
    },
    resetColumn: function () {
        var window = this.getDataBindColumnWindow();
        var grid = window.down('gridpanel[name="columGrid"]');
        grid.store.load({
            params: {
                bind_id: window.bind_id
            },
            callback: function (records, operation, success) {
            }


        });

        //
        Ext.Ajax.request({
            url: projectGP('/bindRowCell/bindDataRowList'),
            method:"POST",
            params: {
                bindId:window.bind_id
            },
            success: function (response) {
                var json = Ext.JSON.decode(response.responseText);
                if (json.success) {
                    var res=json.data;
                    var myCheckboxItems=[];
                    for(var i=0;i<res.length;i++)
                    {
                        var d=res[i];
                        myCheckboxItems.push({
                            boxLabel : d.name,
                            name : d.name,
                            inputValue: d.id,
                            checked: d.checked
                        });
                    }
                }
                var checkGp=window.down('checkboxgroup[name="checkedGp"]');
                checkGp.removeAll();
                checkGp.add({boxLabel: '全选', name: 'all'});
                checkGp.add(myCheckboxItems);
            }
        });

    }



});