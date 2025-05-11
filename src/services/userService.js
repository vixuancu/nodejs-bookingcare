import db from "../models/index";
import bcrypt from "bcryptjs"; // Thư viện mã hóa mật khẩu

// Hàm kiểm tra email có tồn tại không
const checkUserByEmail = async (email) => {
  try {
    let userData = await db.User.findOne({
      where: { email: email },
      raw: true,
      attributes: ["email", "roleId", "password", "firstName", "lastName"],
    });

    return userData; // Trả về thông tin người dùng nếu tìm thấy
  } catch (error) {
    console.error("Lỗi khi kiểm tra email:", error);
    throw new Error("Lỗi khi kiểm tra email: " + error.message);
  }
};
let handleUserLogin = async (email, password) => {
  try {
    // Kiểm tra email có tồn tại không
    let userData = await checkUserByEmail(email);

    if (!userData) {
      return {
        errCode: 2,
        message: "User not found",
      };
    }

    // So sánh mật khẩu đã nhập với mật khẩu đã mã hóa
    let isPasswordValid = await bcrypt.compare(password, userData.password);

    if (!isPasswordValid) {
      return {
        errCode: 3,
        message: "Mật khẩu không đúng",
      };
    }
    // Xóa mật khẩu trước khi trả về thông tin người dùng
    delete userData.password;
    // Nếu đăng nhập thành công
    return {
      errCode: 0,
      message: "Đăng nhập thành công",
      user: userData,
    };
  } catch (error) {
    console.error("Lỗi khi đăng nhập người dùng:", error);
    return {
      errCode: 1,
      message: "Có lỗi xảy ra trong quá trình đăng nhập",
    };
  }
};
let getAllUsers = async (userId) => {
  try {
    let users = "";
    if (userId === "ALL") {
      users = await db.User.findAll({
        attributes: { exclude: ["password"] },
      });
    }
    if (userId && userId !== "ALL") {
      users = await db.User.findOne({
        where: { id: userId },
        attributes: { exclude: ["password"] },
      });
    }
    return users;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};
let hashUserPassword = async (password) => {
  try {
    let salt = await bcrypt.genSalt(10); // Tạo salt với độ dài 10
    let hashPassword = await bcrypt.hashSync(password, salt); // Mã hóa mật khẩu với salt
    return hashPassword; // Trả về mật khẩu đã mã hóa
  } catch (e) {
    console.log(e); // Nếu có lỗi xảy ra, trả về lỗi
  }
};
let createNewUser = async (data) => {
  //không cần new Promise vì async/await đã xử lý promise
  try {
    // Kiểm tra xem email đã tồn tại chưa
    let existingUser = await checkUserByEmail(data.email);
    if (existingUser) {
      return {
        errCode: 1,
        message: "Email đã tồn tại",
      };
    }
    const passwordHash = await hashUserPassword(data.password); // Mã hóa mật khẩu
    await db.User.create({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: passwordHash,
      address: data.address,
      phonenumber: data.phonenumber,
      gender: data.gender === "1" ? true : false, // Chuyển đổi giá trị giới tính thành boolean
      roleId: data.roleId,
      positionId: data.positionId,
      image: data.avatar ? data.avatar : null,
    });
    return {
      errCode: 0,
      message: "Tạo người dùng thành công",
    };
  } catch (error) {
    throw new Error("Lỗi khi tạo người dùng: " + error.message);
  }
};
let deleteUserById = async (userId) => {
  try {
    const deleted = await db.User.destroy({
      where: { id: userId },
    });
    if (deleted == 0) {
      return {
        errCode: 2,
        message: "Người dùng không tồn tại",
      };
    }
    return {
      errCode: 0,
      message: "Xóa người dùng thành công",
    };
  } catch (error) {
    console.error("Lỗi khi xóa người dùng:", error);
    return {
      errCode: 1,
      message: "Có lỗi xảy ra khi xóa người dùng",
    };
  }
};
let updateUserData = async (data) => {
  try {
    if (!data.id) {
      return {
        errCode: 1,
        message: "Thiếu tham số id",
      };
    }
    // Cập nhật thông tin người dùng
    let [updatedRows] = await db.User.update(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phonenumber: data.phonenumber,
        gender: data.gender === "1" ? true : false, // Chuyển đổi giá trị giới tính thành boolean
        roleId: data.roleId,
        positionId: data.positionId,
        image: data.avatar ? data.avatar : null,
      },
      {
        where: { id: data.id },
      }
    );

    if (updatedRows === 0) {
      return {
        errCode: 2,
        message:
          "Người dùng không tồn tại hoặc không có thay đổi nào được thực hiện",
      };
    }

    return {
      errCode: 0,
      message: "Cập nhật người dùng thành công",
    };
  } catch (error) {
    console.error("Lỗi khi cập nhật người dùng:", error);
    return {
      errCode: 1,
      message: "Có lỗi xảy ra khi cập nhật người dùng",
    };
  }
};
let getAllCode = async (typeInput) => {
  try {
    if (!typeInput) {
      return {
        errCode: 1,
        message: "Thiếu tham số type",
      };
    }
    let res = await db.Allcode.findAll({
      where: { type: typeInput },
    });
    return res;
  } catch (error) {
    console.error("Lỗi khi lấy mã:", error);
    return {
      errCode: -1,
      message: "Có lỗi xảy ra trong quá trình lấy mã",
    };
  }
};
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUserById: deleteUserById,
  updateUserData: updateUserData,
  getAllCode: getAllCode,
};
