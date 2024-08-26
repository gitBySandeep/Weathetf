import sequelize from "../DBConnection/dbconnection.js";
import { DataTypes } from "sequelize";
import bcrypt from 'bcryptjs';

export const User = sequelize.define("user",{
    id:{
        type : DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        set(values){
           let saltkey = bcrypt.genSaltSync(10);
           let encrptedpassword = bcrypt.hashSync(values,saltkey);
           this.setDataValue("password",encrptedpassword);
        }
    }
});

User.checkPass = (originalPass,encrptedpassword)=>{
    console.log(bcrypt.compareSync(originalPass,encrptedpassword));
    return bcrypt.compareSync(originalPass,encrptedpassword);
};

sequelize.sync()
.then(()=>{
    console.log("User table created Successfully");
}).catch((err=>{
    console.log("Error in User table");
}));

export default User;