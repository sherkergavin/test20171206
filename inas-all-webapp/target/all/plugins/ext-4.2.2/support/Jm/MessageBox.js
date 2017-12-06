/**
 * Created by WangJm on 2015/5/13.
 */
Ext.define('Jm.window.MessageBox', {
    extend: 'Ext.window.MessageBox',
    show: function (cfg) {
        var cfg = cfg || {};
        if (!cfg.msg) {
            cfg.msg = Jm.Constant.SYSTEMMSG;
        }
        if (!cfg.title){
            cfg.title = Jm.Constant.SYSTEMTITLE;
        }
        if (!cfg.buttons){
            cfg.buttons = Ext.Msg.OK;
        }
        return Ext.Msg.show({
            title: cfg.title,
            msg: cfg.msg + Jm.Base.BLANK + Jm.Base.BLANK,
            icon: cfg.icon,
            fn: cfg.fn,
            buttons: cfg.buttons
        })
    },
    error: function (msg, fn) {
        var cfg = {
            msg: msg,
            icon: Ext.Msg.ERROR,
            fn: fn
        };
        return this.show(cfg);
    },
    info: function (msg, fn) {
        var cfg = {
            msg: msg,
            icon: Ext.Msg.INFO,
            fn: fn
        };
        return this.show(cfg);
    },
    warning: function (msg, fn) {
        var cfg = {
            msg: msg,
            icon: Ext.Msg.WARNING,
            fn: fn
        };
        return this.show(cfg);
    },
    query: function (msg, fn) {
        var cfg = {
            title: Jm.Constant.SYSTEMCONFIRM,
            msg: msg + Jm.Base.BLANK + Jm.Base.BLANK,
            icon: Ext.Msg.QUESTION,
            fn: fn,
            buttons: Ext.Msg.YESNO
        };
        return this.show(cfg);
    },
    confirm: function (msg, fn) {
        var cfg = {
            title: Jm.Constant.SYSTEMCONFIRM,
            msg: msg + Jm.Base.BLANK + Jm.Base.BLANK,
            icon: Ext.Msg.QUESTION,
            fn: fn,
            buttons: Ext.Msg.OKCANCEL
        };
        return this.show(cfg);
    },
    success:function(msg){
        return Ext.example.msg(Jm.Constant.SYSTEMTITLE,msg);
    }
}, function () {
    Jm.MessageBox = Jm.Msg = new this();
});