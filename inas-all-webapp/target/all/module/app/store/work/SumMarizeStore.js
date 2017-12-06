/**
 * Created by JM-SD09 on 2015/8/26.
 */
Ext.define('inas.store.work.SumMarizeStore',{
    extend:'Ext.data.Store',
    model:'inas.model.work.SumMarizeModel',
    pageSize:Jm.Constant.PAGESZIE,
    proxy:{
        type:'ajax',
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        url:projectGP('/sumMarize/getSumMarizeByDate'),
        reader:{
            type:'json',
            root:'data',
            totalProperty:'totalProperty'
        }
    }
});