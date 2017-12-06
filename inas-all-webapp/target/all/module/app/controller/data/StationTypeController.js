/**
 * Created by WangJm on 2015/4/13.
 */
Ext.define('inas.controller.data.StationTypeController',{
    extend:'Ext.app.Controller',
    models:['data.StationTypeModel'],
    stores:['data.StationTypeStore'],
    refs:[{
        ref:'StationType',
        selector:'StationType'
    }],
    init:function(){
        this.control({
            'StationType':{
                render:this.doLoad,
              itemdblclick: this.rowEdit
            },
            'StationType button[action="add"]': {
                click: this.addConfig
            },
            'StationType button[action="edit"]': {
                click: this.editConfig
            },
            'StationType button[action="delete"]': {
                click: this.deleteConfig
            }
        });
    },
    doLoad:function(){
        this.getStationType().getStore().load();

    },
    addConfig:function(btn){
        var grid=this.getStationType();
        var window=Ext.create('inas.view.data.CategoryWindow');
        //window.on('close',function(){
        //    grid.store.load();
        //});
        window.show();


    },
    rowEdit: function (r, record, item, index, e, eOpts) {
        var window=Ext.create('inas.view.data.CategoryWindow');
//        userWindow.down('combo').store.load();
        window.down('form').getForm().loadRecord(record);

        window.show();
    },
    editConfig:function(btn){
        var grid=this.getStationType();

        var window=Ext.create('inas.view.data.CategoryWindow');
        var record = grid.getSelectionModel().getSelection()[0];

        if(record ){
            //编辑后发生位置BUG需通过更新后的STORE找回RECORD
          record=grid.getStore().findRecord('id',record.get('id'));
            window.down('form').getForm().loadRecord(record);
            window.show();

        }else{
            Jm.Msg.warning('请选中一行数据！');
        }


    },
    deleteConfig:function(btn){
        var grid=this.getStationType();
        var record = this.getStationType().getSelectionModel().getSelection()[0];
        if(record ){
            Jm.Msg.confirm('确定删除该行数据吗？',function(btn){
                if(btn=='ok'){

                    Ext.Ajax.request({
                        url:projectGP('/data/deleteEntityType'),
                        params: {
                            id:record.get('id')

                        },
                        success: function(response){
                            var text = response.responseText;
                            grid.store.reload();
                        }
                    });
                }

            });


        }else{
            Jm.Msg.warning('请选中一行数据！');
        }




    }
});