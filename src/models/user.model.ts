import mongoose ,{Document,Schema} from "mongoose";

export enum UserRole{
  ADMIN="admin",
  SALES="sales"
}

export interface IUser extends Document{
  name:string;
  email:string;
  password:string;
  role:UserRole;
  createdAt:Date;
  updatedAt:Date;
}

const userSchema=new Schema<IUser>(
  {
    name:{
      type:String,
      required:true,
      trim:true,
    },
    email:{
      type:String,
      required:true,
      unique:true,
      lowercase:true,
      trim:true,
    },
    password:{
      type:String,
      required:true,

    },
    role:{
      type:String,
      enum:Object.values(UserRole),
      default:UserRole.ADMIN,
    },
  },
  {
   timestamps:true,
  }
 
);
const User=mongoose.model<IUser>("User",userSchema);

export default User;