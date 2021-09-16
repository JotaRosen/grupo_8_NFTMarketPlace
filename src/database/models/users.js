module.exports = (Sequelize, DataTypes) =>{

    const User =  Sequelize.define( 'User', {
        userId:{
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true

        },
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        profile_pic:{
            type: DataTypes.STRING
        }
    }, {
        timestamps: false,
        tableName: 'users'
    });


    User.associate = ({Product}) => {
        User.belongsToMany( Product , {
            as: "Favorites",
            foreignKey: "userId",
            through: "nft_favorites",
            timestamps: false
        });

        User.belongsToMany( Product , {
            as: "Owned_prods",
            foreignKey: "ownerId",
            through: "nft_colections",
            timestamps: false
        });
    }


    return User;

}