
module.exports = function (Sequelize, sequelize, DataTypes){
    return sequelize.define("customer_form",{
        
        cf_id : {
            type : Sequelize.UUID,
            defaultValue: Sequelize.UUID4,
            primaryKey : true,
        },
        cf_customer_id : {
            allowNull : false,
            type : Sequelize.UUID,
            references : {
                key : 'user_id',
                model : 'users'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        cf_a1 : {
            type : DataTypes.STRING(300)
        },
        cf_a2 : {
            type : DataTypes.STRING(300)
        },
        cf_a3 : {
            type : DataTypes.STRING(300)
        },
        cf_a4 : {
            type : DataTypes.STRING(300)
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
        tableName : "customer_form",
    })
}
