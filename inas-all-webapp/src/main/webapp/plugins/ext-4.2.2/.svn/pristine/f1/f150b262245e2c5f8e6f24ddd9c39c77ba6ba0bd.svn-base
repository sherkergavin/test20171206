/**
 * Created by WangJm on 2015/5/13.
 */
Ext.define('Jm.button.Button', {
    extend: 'Ext.button.Button',
    xtype: 'jbutton',
    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            listeners: {
                'beforerender': function (t, eOpts) {
                    var action = me.action;

                    if ('undefined' == typeof(t.iconCls)) {
                        t.iconCls = action;
                    }
                    if ('' == t.text || 'undefined' == typeof(t.text)) {
                        if (action == 'add') {
                            t.text = Jm.Constant.ADD;
                        } else if (action == 'edit') {
                            t.text = Jm.Constant.EDIT;
                        } else if (action == 'delete') {
                            t.text = Jm.Constant.DELETE;
                        } else if (action == 'search') {
                            t.text = Jm.Constant.SEARCH;
                        } else if (action == 'reset') {
                            t.text = Jm.Constant.RESET;
                        } else if (action == 'refresh') {
                            t.text = Jm.Constant.REFRESH;
                        } else if (action == 'save') {
                            t.text = Jm.Constant.SAVE;
                        } else if (action == 'print') {
                            t.text = Jm.Constant.PRINT;
                        } else if (action == 'submit') {
                            t.text = Jm.Constant.SUBMIT;
                        } else if (action == 'close') {
                            t.text = Jm.Constant.CLOSE;
                        } else if (action == 'confirm') {
                            t.text = Jm.Constant.CONFIRM
                        }
                    }
                }
            }
        });
        this.callParent(arguments);
    }
});