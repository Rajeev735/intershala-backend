import bcrypt from "bcryptjs";

import User, {
  UserRole,
} from "../models/user.model";

const createAdmin = async () => {
  try {
    const adminExists =
      await User.findOne({
        email: "admin@gmail.com",
      });

    if (adminExists) {
      console.log(
        "Admin already exists"
      );

      return;
    }

    const hashedPassword =
      await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,

      role: UserRole.ADMIN,
    });

    console.log(
      "Admin created successfully"
    );
  } catch (error) {
    console.log(error);
  }
};

export default createAdmin;