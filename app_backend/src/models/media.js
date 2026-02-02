'use strict';
// const {
//   Model
// } = require('sequelize');
import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class Media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Define association with Category
      Media.belongsTo(models.Category, {
        foreignKey: 'owner_id',
        constraints: false,
        as: 'category'
      });

      // Define association with Brand
      Media.belongsTo(models.Brand, {
        foreignKey: 'owner_id',
        constraints: false,
        as: 'brand'
      });
    }
  }
  Media.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    owner_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    owner_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: true
    },
    meta: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Media',
    tableName: 'Media',
    timestamps: true
  });
  return Media;
};