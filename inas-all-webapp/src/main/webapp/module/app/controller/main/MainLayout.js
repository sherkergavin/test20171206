/**
 * Created by WangJm on 2015/4/12.
 */
Ext.define('inas.controller.main.MainLayout', {
    extend: 'Ext.app.Controller',
    views: [
        'inas.view.layout.North',
        'inas.view.layout.South',
        'inas.view.layout.West',
        'inas.view.layout.Center'
    ],
    refs: [{
        ref: 'navigation',
        selector: 'navigation'
    }, {
        ref: 'maintab',
        selector: 'maintab'
    }, {
        ref: 'topModule',
        selector: 'topModule'
    }, {
        ref: 'layoutNorth',
        selector: 'layoutNorth'
    }],
    config: {
        moduleId: null,
        moduleCode: null
    },
    models: [
        'inas.model.main.Navigation'
    ],
    init: function () {
        var me = this;
        me.control({
            'navigation': {
                render: me.navigationRender
            },
            'layoutNorth': {
                render : me.initHeader
            }
        });
    },
    initHeader : function(p,e){
        var passwordButton = Ext.get('PasswordButton');
        var logoutButton = Ext.get('LogoutButton');

        passwordButton.on('click',function(){
            Ext.create('inas.view.system.UpdatePassword').show();
        });
        logoutButton.on('click',function(){
            window.location.href=projectGP('/module-jsp/app/logout.jsp');
        });
    },
    navigationRender: function (p) {
        var me = this;
        Ext.getDoc().on(
            "keydown",
            function (e) {
                if (e.getKey() == 8 && (e.getTarget().type == "text" || e.getTarget().type == "textarea" || e.getTarget().type == "password") && !e.getTarget().readOnly
                    && !e.getTarget().disabled) {
                } else if (e.getKey() == 8 && (e.getTarget().type == "text" || e.getTarget().type == "textarea" || e.getTarget().type == "password") && e.getTarget().readOnly) {
                    e.preventDefault();
                } else if (e.getKey() == 8) {
                    e.preventDefault();
                }
            });
        // 窗体标题栏不能移出浏览器
        Ext.override(Ext.Window, {
            constrainHeader: true
        });
        /*GWJ 得到项目代码:OAM,SM....*/
        this.getuniqueState(me);
        /*GWJ 加载导航*/
        this.navigationAjax(p,me.getModuleCode());
        Ext.EventManager.on('OAM','click',function(){
            if(me.getModuleCode() != 'OAM'){
                /*GWJ 关闭所有选项卡*/
                me.closeAllTab();
                me.setModuleCode('OAM');
                p.removeAll(true);
                me.navigationAjax(p,me.getModuleCode());
            }else{
                return;
            }

        });
        Ext.EventManager.on('SM','click',function(){
            if(me.getModuleCode() != 'SM'){
                me.closeAllTab();
                me.setModuleCode('SM');
                p.removeAll(true);
                me.navigationAjax(p,me.getModuleCode());
            }else{
                return;
            }
        });
        Ext.EventManager.on('PM','click',function(){
            if(me.getModuleCode() != 'PM'){
                me.closeAllTab();
                me.setModuleCode('PM');
                p.removeAll(true);
                me.navigationAjax(p,me.getModuleCode());
            }else{
                return;
            }
        });
        Ext.EventManager.on('AM','click',function(){
            if(me.getModuleCode() != 'AM'){
                me.closeAllTab();
                me.setModuleCode('AM');
                p.removeAll(true);
                me.navigationAjax(p,me.getModuleCode());
            }else{
                return;
            }
        });
    },
    getuniqueState:function(me){//GWJ me:inas.controller.main.MainLayout
        Ext.Ajax.request({
            async: false,
            url: projectGP('/navigation/apps'),
            success: function (response) {
                var text = Ext.decode(response.responseText);
                var module = text.data;
                var projectName = projectGP('').substring(1);
                for (var i = 0; i < module.length; i++) {
                    var code = module[i].key.toLowerCase();
                    if (projectName == code) {
                        me.setModuleCode(module[i].key);
                    }
                }
            }
        });
    },////GWJ getuniqueState结束
    navigationAjax:function(p,code){//GWJ p:父级panel,code:项目代码(oam,sm...)
        if(code==null){
            code='OAM';
        }
        Ext.Ajax.request({
            url: projectGP('/navigation/getNavigationRoot'),
            method: 'post',
            params: {
                code: code
            },
            success: function (response) {
                var json = Ext.JSON.decode(response.responseText);
                Ext.each(json.data, function (el) {
                    var panel = Ext.create('Ext.panel.Panel', {
                        id: el.id,
                        title: el.name,
                        border: false,
                        iconCls: el.iconCls,
                        layout: 'fit',
                        listeners: {
                            added: function (p2, animate, eOpts) {
                                var store = Ext.create('Ext.data.TreeStore', {
                                    autoLoad: false,
                                    proxy: {
                                        type: 'ajax',
                                        url: projectGP('/navigation/findNodesByParentId'),
                                        actionMethods: {
                                            create: "POST", read: "POST", update: "POST", destroy: "POST"
                                        },
                                        reader: {
                                            type: 'json'
                                        }
                                        ,
                                        extraParams: {
                                            id: el.id
                                        }
                                    },
                                    listeners: {
                                        'beforeexpand': function (node, eOpts) {
                                            this.proxy.extraParams.parentId = node.raw.id;
                                        }

                                    }
                                });
                                store.load({
                                    params: {
                                        parentId: p2.id
                                    },
                                    callback: function (records, operation, success) {
                                    }
                                });
                                var treepanel = Ext.create('Ext.tree.Panel', {
                                    rootVisible: false,
                                    border: false,
                                    autoScroll: true,
                                    containerScroll: true,
                                    autoLoad: false,
                                    store: store,
                                    listeners: {
                                        itemclick: function (tp, record, item, index, e, eOpts) {
                                            if (record.raw.view) {
                                                if (record.raw.controller != null) {

                                                    var controllerArray = record.raw.controller.split(',');
                                                    for (var ctlIndex in controllerArray) {
                                                        inas.getApplication().getController(controllerArray[ctlIndex]);
                                                    }
                                                }
                                                var tpanel = Ext.getCmp('center-tabpanel');
                                                if (record.raw.view != null) {
                                                    var temp = tpanel.queryById('tabpanelid-' + record.raw.id);
                                                    if (temp == null) {
                                                        temp = Ext.create(record.raw.view);
                                                        temp.id = 'tabpanelid-' + record.raw.id;
                                                        temp.title = record.raw.text;
                                                        temp.closable = true;
                                                        temp.iconCls = record.raw.iconCls;
                                                        temp.on('close', function (p, e) {
                                                            p.destroy();
                                                        });
                                                        tpanel.add(temp);
                                                        tpanel.setActiveTab(temp);
                                                    } else {
                                                        tpanel.setActiveTab(temp);
                                                    }
                                                }
                                            } else {
                                                Jm.Msg.error('该功能模块尚在开发中');
                                            }
                                        }
                                    }
                                });
                                //treepanel.expandAll();
                                panel.add(treepanel);
                            }
                        }
                    });
                    p.add(panel);
                });
            },
            failure: function (request) {
                Jm.Msg.error('连接服务器失败');
            },
            method: 'post'
        });
    },////GWJ navigationAjax结束
    closeAllTab:function(){
        this.getMaintab().removeAll(true);
    }
});