
module.exports = function (Sequelize, sequelize, DataTypes){
    return sequelize.define("vendor_customer",{
        
        vc_id : {
            type : Sequelize.UUID,
            defaultValue: Sequelize.UUID4,
            primaryKey : true,
        },
        vc_vendor_id : {
            allowNull : false,
            type : Sequelize.UUID,
            references : {
                key : 'user_id',
                model : 'users'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        vc_customer_id : {
            allowNull : false,
            type : Sequelize.UUID,
            references : {
                key : 'user_id',
                model : 'users'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
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
        tableName : "vendor_customer",
    })
}
