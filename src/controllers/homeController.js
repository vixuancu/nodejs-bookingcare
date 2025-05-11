import e from "express";
import db from "../models/index.js";
import CRUDservice from "../services/CRUDservice.js"; // Import CRUDservice để sử dụng các hàm trong đó
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll({
      raw: true, // Chỉ lấy dữ liệu thô
      // nest: true, // Lấy dữ liệu theo cấu trúc lồng nhau
    });
    console.log(">>> check data: ", data); // Kiểm tra dữ liệu lấy được từ cơ sở dữ liệu
    return res.render("homepage.ejs", {
      data: JSON.stringify(data), // Truyền dữ liệu vào view
    });
  } catch (error) {
    console.log("error find all Users", error);
  }
};
let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};
let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};
//
let postCRUD = async (req, res) => {
  await CRUDservice.createNewUser(req.body); // Gọi hàm createNewUser từ CRUDservice
  return res.send("post crud from server");
};
//
let dgetCRUD = async (req, res) => {
  let data = await CRUDservice.getAllUser(); // Gọi hàm getAllUser từ CRUDservice
  return res.render("displayCRUD.ejs", {
    users: data, // Truyền dữ liệu vào view
  });
};
let getEditCRUD = async (req, res) => {
  let userId = req.query.id; // Lấy id từ query string
  if (userId) {
    let userData = await CRUDservice.getUserInfoById(userId); // Gọi hàm getUserInfoById từ CRUDservice

    return res.render("editCRUD.ejs", {
      user: userData, // Truyền dữ liệu vào view
    });
  } else {
    return res.send("User not found"); // Nếu không tìm thấy user, trả về thông báo lỗi
  }
};
let putCRUD = async (req, res) => {
  let data = req.body; // Lấy dữ liệu từ request body
  await CRUDservice.updateUserData(data); // Gọi hàm updateUserData từ CRUDservice
  return res.send("update the user succeed"); // Trả về thông báo thành công
};
let deleteCRUD = async (req, res) => {
  let id = req.query.id; // Lấy id từ query string
  if (id) {
    await CRUDservice.deleteUserById(id); // Gọi hàm deleteUserById từ CRUDservice
    return res.send("delete success"); // Trả về thông báo thành công
  } else {
    return res.send("User not found"); // Nếu không tìm thấy user, trả về thông báo lỗi
  }
};
module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  dgetCRUD: dgetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
  // handlePostCRUD: handlePostCRUD,
  // displayGetCRUD: displayGetCRUD,
  // getEditCRUD: getEditCRUD,
  // putCRUD: putCRUD,
  // deleteCRUD: deleteCRUD,
  // getUploadFile: getUploadFile,
  // postUploadFile: postUploadFile,
  // getDownloadFile: getDownloadFile
};
