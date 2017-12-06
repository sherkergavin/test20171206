/**
 * Created by WangJm on 2015/4/10.
 */
Ext.override('Ext.form.field.Time',{
    getValue : function(){
        return this.value;
    },
    setValue : function(v){
        this.value = v;
        this.setRawValue(this.formatValue(v));
        return this;
    },
    formatValue : function(v){
        if(v.length >8){
            var jsondate = eval("new " + v.substr(1, v.length - 2)).toLocaleTimeString();
            jsondate = jsondate.length == 8 ? jsondate.substr(0, 5) : '0' + jsondate.substr(0, 4); //toLocaleTimeString比较弱智，返回的如果小时是小于10 小时位就只有1位
            return jsondate;
        }
        return v;
    }
});
Ext.Loader.setConfig({enabled: true});

Ext.Loader.setPath({
    enabled : true,
    'Ext.ux': extGP('/examples/ux'),
    'Jm': extGP('/support/Jm'),
    'Ext.app': extGP('/examples/portal/classes')

    //ext 5的版本需要用到，4目前未发现有作用
    //'Ext': extGP('/src')
});

Ext.application({

    name: 'inas',
    appFolder: projectGP('/module/app'),

    autoCreateViewport: true,
    //autoCreateViewport:'inas.view.data2.Main'
    controllers:['main.MainLayout']
});