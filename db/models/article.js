'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Article.init(
    { firstName: DataTypes.STRING },
    { titleEn: DataTypes.STRING },
    { contentEn: DataTypes.STRING },
    { titleUa: DataTypes.STRING },
    { contentUa: DataTypes.STRING },
    { titleRu: DataTypes.STRING },
    { contentRu: DataTypes.STRING },
    {
      sequelize,
      modelName: 'Article',
    },
  );
  return Article;
};
