const userService = require("../services/userService"); // Import hàm handleUserLogin từ userService
let handleLogin = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
      return res.status(500).json({
        errCode: 1,
        message: "Missing inputs parameter",
      });
    }
    let result = await userService.handleUserLogin(email, password); // Gọi hàm handleUserLogin từ userService
    return res.status(200).json({
      errCode: result.errCode,
      message: result.message,
      user: result.user ? result.user : {},
    });
    // console.log(">>> check login", email, password);
    // return res.status(200).json({
    //   errCode: 0,
    //   message: "oke",
    // });
  } catch (error) {
    console.error("Lỗi khi xử lý đăng nhập:", error);
    return res.status(500).json({
      errCode: -1,
      message: "Lỗi server",
    });
  }
};

let handleGetAllUsers = async (req, res) => {
  try {
    let id = req.query.id; // all, id
    if (!id) {
      return res.status(200).json({
        errCode: 0,
        message: "ok",
        users: [],
      });
    }
    let users = await userService.getAllUsers(id);
    console.log(">>> check all users", users);
    return res.status(200).json({
      errCode: 0,
      message: "ok",
      users,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng:", error);
    return res.status(500).json({
      errCode: -1,
      message: "Lỗi server",
    });
  }
};
let handleCreateNewUser = async (req, res) => {
  try {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json({
      errCode: message.errCode,
      message: message.message,
    });
  } catch (error) {
    console.error("Lỗi khi tạo người dùng mới:", error);
    return res.status(500).json({
      errCode: -1,
      message: "Lỗi server",
    });
  }
};
let handleEditUser = async (req, res) => {
  try {
    let message = await userService.updateUserData(req.body);
    return res.status(200).json({
      errCode: message.errCode,
      message: message.message,
    });
  } catch (error) {
    console.error("Lỗi khi chỉnh sửa người dùng:", error);
    return res.status(500).json({
      errCode: -1,
      message: "Lỗi server",
    });
  }
};
let handleDeleteUser = async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(200).json({
        errCode: 1,
        message: "Thiếu tham số id",
      });
    }
    let message = await userService.deleteUserById(req.body.id);
    return res.status(200).json({
      errCode: message.errCode,
      message: message.message,
    });
  } catch (error) {
    console.error("Lỗi khi xóa người dùng:", error);
    return res.status(500).json({
      errCode: -1,
      message: "Lỗi server",
    });
  }
};
let getAllCode = async (req, res) => {
  try {
    let data = await userService.getAllCode(req.query.type);
    return res.status(200).json({
      errCode: 0,
      data,
    });
  } catch (error) {
    console.error("Lỗi khi lấy mã:", error);
    return res.status(500).json({
      errCode: -1,
      message: "Lỗi server",
    });
  }
};
module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  getAllCode: getAllCode,
};
