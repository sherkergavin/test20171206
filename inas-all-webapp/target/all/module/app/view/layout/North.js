/**
 * Created by WangJm on 2015/4/11.
 */
Ext.define('inas.view.layout.North', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.layoutNorth',
    initComponent: function () {
        Ext.apply(this, {
            region: 'north',
            layout: 'fit',
            height: 55,
            scripts: true,
            listeners: {
                'beforerender': function (t, eOpts) {
                    var me = t;
                    Ext.Ajax.request({
                        async: false,
                        //url: projectGP('/navigation/modules'),
                        url: projectGP('/navigation/apps'),
                        success: function (response) {
                            var temp = '<div class="headerbg" id="headerDiv"></div> ' +
                                '<div class="headergn">' +
                                '<ul class="ul2">';
                            var text = Ext.decode(response.responseText);
                            var module = text.data;
                            var projectName = projectGP('').substring(1);
                            temp += '<li class="headerbt3"><a id="LogoutButton" href="#"></a></li>';
                            temp += '<li class="headerbt1"><a id="PasswordButton" href="#"></a></li>';
                            temp += '<li class="xian"><a href="#"></li>';
                            for (var i = 0; i < module.length; i++) {
                                var tempVariate = module[i];
                                if (tempVariate.priority < 900) {
                                    temp += '<li class="headergn' + tempVariate.priority + '">'
                                    var key = tempVariate.key.toLowerCase();
                                    if (projectName == key) {
                                        temp += '<a id="' + tempVariate.key + '" class="runModule" href="#">'
                                    } else {
                                        temp += '<a id="' + tempVariate.key + '" class="runModule" href="#">'//'" href="' + tempVariate.fullUrl + '">'
                                    }
                                    temp += '<img src="' + projectGP('/images/inas/header/' + tempVariate.key + '.png') + '" width="33",height="30">' +
                                        '<p>' + tempVariate.label + '</p>' +
                                        '</a></li>'
                                }
                            }
                            temp += '</ul>' +
                                '</div>' +
                                '<div class="headerbbg"></div>';
                            me.html = temp;
                        }
                    });
                }
            }
        });
        this.callParent(arguments);
    }
});