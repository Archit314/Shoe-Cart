'use strict';
// const {
//   Model
// } = require('sequelize');
import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Define association with Media
      Brand.hasMany(models.Media, {
        foreignKey: 'owner_id',
        constraints: false,
        scope: {
          owner_type: 'BRAND'
        },
        as: 'media'
      });

      // Define association with CategoryBrand
      Brand.belongsToMany(models.Category, {
        through: models.CategoryBrand,
        foreignKey: 'brand_id',
        otherKey: 'category_id',
        as: 'categories',
      })
    }
  }
  Brand.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Brand',
    tableName: 'Brands',
    timestamps: true
  });
  return Brand;
};