/**
 * Created by JM-SD09 on 2015/8/26.
 */
Ext.define('inas.store.work.MakePlanStore',{
    extend:'Ext.data.Store',
    model:'inas.model.work.MakePlanModel',
    pageSize:15,
    proxy:{
        type:'ajax',
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        url:projectGP('/makePlan/findMakePlanListBetweenDate'),
        reader:{
            type:'json',
            root:'data',
            totalProperty:'totalProperty'
        }
    }
});