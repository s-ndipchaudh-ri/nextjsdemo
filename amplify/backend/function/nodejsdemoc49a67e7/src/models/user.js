
module.exports = function (Sequelize, sequelize, DataTypes){
    return sequelize.define("users",{
        
        ur_id : {
            type : Sequelize.UUID,
            defaultValue: Sequelize.UUID4,
            primaryKey : true,
            field : "user_id"
        },
        ur_name : {
            allowNull : false,
            field:"user_name",
            type: DataTypes.STRING(200)
        },
        ur_email : {
            allowNull : false,
            field:"user_email",
            type: DataTypes.STRING(200),
            unique : true
        },
        ur_address : {
            allowNull : false,
            field:"user_address",
            type: DataTypes.TEXT
        },
        ur_phone : {
            allowNull : false,
            field:"user_phone_no",
            type: DataTypes.STRING(20)
        },
        ur_password : {
            allowNull : false,
            field: " user_password",
            type : DataTypes.STRING(300),
        },
        ur_isDeleted : {
            allowNull : false,
            defaultValue : '0',
            type : DataTypes.ENUM('0','1'),
            field : "user_is_deleted"
        },
        ur_isBlocked : {
            allowNull : false,
            defaultValue : '0',
            type : DataTypes.ENUM('0','1'),
            field : "user_is_blocked"
        },
        ur_role : {
            allowNull : false,
            defaultValue : '2',
            type : DataTypes.ENUM('0','1','2'),   //0 app user // 1 vendor //2 customers
            field : "user_role"
        },
        ur_type : {
            allowNull : false,
            defaultValue : '2',
            type : DataTypes.ENUM('0','1','2'),   //0 app user // 1 vendor //2 customers
            field : "user_type"
        },
        createdAt: {
            type : DataTypes.DATE,
            defaultValue : DataTypes.NOW(0)
        },
        updatedAt: {
            type : DataTypes.DATE,
            defaultValue : DataTypes.NOW(0),
            function(){
                return moment(this.getDataValue('updatedAt')).format('DD.MM.YYYY')
            }
        },   
    },{
        tableName : "users",
       
    })
}
