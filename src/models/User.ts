// models/User.ts
import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../config/database";

class User extends Model {
  public id!: number;
  public mobileNumber!: number;
  public userName!: string;
  public email!: string;
  public password!: string;

  // Add other fields as needed

  // Optional method to associate user with other models
  static associate(models: any) {
    // Define associations here
  }

  // Initialization method
  static initialize(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        mobileNumber: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        userName: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        // Add other fields as needed
      },
      {
        sequelize,
        modelName: "User",
      }
    );
  }
}

// Call the initialize method to set up the model
User.initialize(sequelize);

export default User;
