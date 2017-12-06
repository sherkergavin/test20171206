Ext.define('inas.model.system.UserModel',{
    extend:'Ext.data.Model',
    fields:[
        {name:'id',type:'int'},
        {name:'user_name',type:'string'},
        {name:'staff_emp_name',type:'string'},
        {name:'staff_real_name',type:'string'},
        {name:'lo'} //设置type时，null会被置成0
    ]
});