import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        age: Sequelize.INTEGER,
        weight: Sequelize.DECIMAL(10, 2),
        height: Sequelize.DECIMAL(10, 2),
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.HelpOrder, { foreignKey: 'id' });
  }
}

export default Student;
