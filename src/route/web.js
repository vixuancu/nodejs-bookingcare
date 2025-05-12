import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.dgetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);
  //user controller
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/allcode", userController.getAllCode);
  //doctor controller
  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome); // lấy danh sách bác sĩ hàng đầu
  router.get("/api/get-all-doctors", doctorController.getAllDoctors); // lấy danh sách tất cả bác sĩ
  router.post("/api/save-info-doctor", doctorController.postInfoDoctor); // lưu thông tin bác sĩ
  router.get(
    "/api/get-detail-doctor-by-id",
    doctorController.getDetailDoctorById
  ); // lấy thông tin chi tiết bác sĩ theo id

  return app.use("/", router);
  // return app.use('/api/v1', router);
  // return app.use('/api/v2', router);
};

module.exports = initWebRoutes;
// export default initWebRoutes;
