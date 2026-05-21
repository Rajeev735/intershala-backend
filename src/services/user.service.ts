import User, {
  UserRole,
} from "../models/user.model";

class UserService {
  // GET ALL SALES USERS
  async getSalesUsers() {
    const salesUsers = await User.find({
      role: UserRole.SALES,
    }).select("-password");

    return salesUsers;
  }
}

export default new UserService();