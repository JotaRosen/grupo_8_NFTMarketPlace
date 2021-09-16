module.exports = (Sequelize, DataTypes) =>{
    const Product =  Sequelize.define( 'Product', {
        id:{
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true

        },
        image: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        price: {
            type: DataTypes.FLOAT
        },
        pieceName: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        }
    }, 
    {
        timestamps: false,
        tableName: 'nfts'
    });

    Product.associate = ({User}) =>{
        // Favorite table ---- There many users that can like many nfts
        Product.belongsToMany(User, {
            as: "Likers",
            foreignKey: "productId",
            through: "nft_favorites",
            timestamps: false
        });

        Product.belongsToMany(User, {
            as: "Owner",
            foreignKey: "productId",
            through: "nft_colections",
            timestamps: false
        });

     }

    return Product;
}