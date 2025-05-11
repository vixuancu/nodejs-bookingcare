import db from "../models/index"; // Import mô hình cơ sở dữ liệu

let getTopDoctorHome = async (limit) => {
  try {
    let doctors = await db.User.findAll({
      where: { roleId: "R2" },
      limit: limit,
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["password"],
      },
      // include: [
      //   {
      //     model: db.Allcode,
      //     as: "positionData",
      //     attributes: ["valueEn", "valueVi"],
      //   },
      //   {
      //     model: db.Allcode,
      //     as: "genderData",
      //     attributes: ["valueEn", "valueVi"],
      //   },
      // ],
    });
    return doctors;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bác sĩ:", error);
  }
};
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
};
