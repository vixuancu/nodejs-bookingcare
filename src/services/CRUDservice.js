import bcrypt from "bcryptjs"; // Thư viện mã hóa mật khẩu
import db from "../models/index.js"; // Import mô hình cơ sở dữ liệu

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let salt = await bcrypt.genSalt(10); // Tạo salt với độ dài 10
      let hashPassword = await bcrypt.hashSync(password, salt); // Mã hóa mật khẩu với salt
      resolve(hashPassword); // Trả về mật khẩu đã mã hóa
    } catch (e) {
      reject(e); // Nếu có lỗi xảy ra, trả về lỗi
    }
  });
};
let createNewUser = async (data) => {
  //không cần new Promise vì async/await đã xử lý promise
  try {
    const passwordHash = await hashUserPassword(data.password); // Mã hóa mật khẩu
    const newUser = await db.User.create(
      {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: passwordHash,
        address: data.address,
        phonenumber: data.phonenumber,
        gender: data.gender === "1" ? true : false, // Chuyển đổi giá trị giới tính thành boolean
        roleId: data.roleId,
      },
      {
        raw: true, // Chỉ lấy dữ liệu thô
      }
    );
    console.log(">>> create new user success: ", newUser);
    return newUser; // Trả về user vừa tạo
  } catch (error) {
    throw new Error("Lỗi khi tạo người dùng: " + error.message);
  }
};

let getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      raw: true, // Chỉ lấy dữ liệu thô
    });
    return users; // Trả về danh sách người dùng
  } catch (error) {
    throw new Error("Lỗi khi getAll users: " + error.message);
  }
};
let getUserInfoById = async (userId) => {
  try {
    let user = await db.User.findOne({
      where: { id: userId },
      raw: true, // Chỉ lấy dữ liệu thô
    });
    if (user) {
      return user; // Trả về thông tin người dùng
    } else {
      return {}; // Nếu không tìm thấy người dùng, trả về đối tượng rỗng
    }
  } catch (error) {
    throw new Error("Lỗi khi get user by id: " + error.message);
  }
};
let updateUserData = async (data) => {
  try {
    let user = await db.User.findOne({
      where: { id: data.id },
    });
    if (user) {
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.address = data.address;
    }
    await user.save(); // Lưu thay đổi vào cơ sở dữ liệu
    return user; // Trả về người dùng đã cập nhật
  } catch (error) {
    throw new Error("Lỗi khi cập nhật người dùng: " + error.message);
  }
};
let deleteUserById = async (userId) => {
  try {
    let user = await db.User.findOne({
      where: { id: userId },
    });
    if (user) {
      await user.destroy(); // Xóa người dùng khỏi cơ sở dữ liệu
    }
  } catch (error) {
    throw new Error("Lỗi khi xóa người dùng: " + error.message);
  }
};
module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInfoById: getUserInfoById,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById,
  // getHomePage: getHomePage,
  // getAboutPage: getAboutPage,
  // getCRUD: getCRUD,
  // postCRUD: postCRUD,
  // handlePostCRUD: handlePostCRUD,
  // displayGetCRUD: displayGetCRUD,
  // getEditCRUD: getEditCRUD,
  // putCRUD: putCRUD,
  // deleteCRUD: deleteCRUD,
  // getUploadFile: getUploadFile,
  // postUploadFile: postUploadFile,
  // getDownloadFile: getDownloadFile
};
