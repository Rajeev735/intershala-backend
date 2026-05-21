import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError";
import User, { IUser, UserRole } from "../models/user.model";

interface RegisterUserInput {
  name: string;
  email: string;
  password: string;

}

interface LoginUserInput {
  email: string;
  password: string;
}

class AuthService {
  
  private generateToken(userId: string, role: UserRole): string {
    return jwt.sign(
      {
        id: userId,
        role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );
  }

  // REGISTER USER
  async registerUser(data: RegisterUserInput) {
    const { name, email, password } = data;

    // CHECK EXISTING USER
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("User already exists");
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER
    const user: IUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: UserRole.SALES,
    });

    // GENERATE TOKEN
    const token = this.generateToken(
      user._id.toString(),
      user.role
    );

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },

      token,
    };
  }

  // LOGIN USER
  async loginUser(data: LoginUserInput) {
    const { email, password } = data;

    // FIND USER
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // COMPARE PASSWORD
    const isPasswordMatched = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatched) {
      throw new Error("Invalid email or password");
    }

    // GENERATE TOKEN
    const token = this.generateToken(
      user._id.toString(),
      user.role
    );

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },

      token,
    };
  }
  async createSalesUser(data: RegisterUserInput) {
  const { name, email, password } =
    data;

  const existingUser =
    await User.findOne({ email });

  if (existingUser) {
    throw new AppError(
      "User already exists",
      400

    );
  }

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,

    role: UserRole.SALES,
  });

  return user;
}
}

export default new AuthService();