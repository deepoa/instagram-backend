// models/User.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  // Add other fields as needed

  // Optional method to associate user with other models
  static associate(models: any) {
    // Define associations here
  }
}

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

export default User;
