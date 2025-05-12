import db from "../models/index"; // Import mô hình cơ sở dữ liệu

let getTopDoctorHome = async (limit) => {
  try {
    let doctors = await db.User.findAll({
      limit: limit,
      where: { roleId: "R2" },
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: db.Allcode,
          as: "positionData",
          attributes: ["valueEn", "valueVi"],
        },
        {
          model: db.Allcode,
          as: "genderData",
          attributes: ["valueEn", "valueVi"],
        },
      ],
      raw: true,
      nest: true,
      group: ["User.id"], // Loại bỏ bản ghi trùng lặp dựa trên id của User
    });
    return doctors;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bác sĩ:", error);
  }
};
let getAllDoctors = async () => {
  try {
    let doctors = await db.User.findAll({
      where: { roleId: "R2" },
      attributes: {
        exclude: ["password", "image"],
      },
    });
    return doctors;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bác sĩ:", error);
  }
};
let postInfoDoctor = async (data) => {
  try {
    if (
      !data.doctorId ||
      !data.contentHTML ||
      !data.contentMarkdown ||
      !data.action
    ) {
      return {
        errCode: 1,
        message: "Thiếu thông tin",
      };
    }
    if (data.action === "CREATE") {
      // Lưu thông tin bác sĩ vào cơ sở dữ liệu
      await db.Markdown.create({
        contentHTML: data.contentHTML,
        contentMarkdown: data.contentMarkdown,
        description: data.description,
        doctorId: data.doctorId,
      });
    }
    if (data.action === "EDIT") {
      // Cập nhật thông tin bác sĩ vào cơ sở dữ liệu
      let doctorMarkdown = await db.Markdown.findOne({
        where: { doctorId: data.doctorId },
        raw: false, // Chọn chế độ raw: false để có thể cập nhật
      });
      if (doctorMarkdown) {
        doctorMarkdown.contentHTML = data.contentHTML;
        doctorMarkdown.contentMarkdown = data.contentMarkdown;
        doctorMarkdown.description = data.description;
        //doctorMarkdown.updatedAt = new Date();
        await doctorMarkdown.save();
        return {
          errCode: 0,
          message: "Lưu thông tin bác sĩ thành công",
        };
      } else {
        return {
          errCode: 2,
          message: "Không tìm thấy thông tin bác sĩ",
        };
      }
    }
  } catch (error) {
    console.error("Lỗi khi lưu thông tin bác sĩ:", error);
    return {
      errCode: -1,
      message: "Lỗi server khi lưu thông tin bác sĩ",
    };
  }
};
let getDetailDoctorById = async (id) => {
  try {
    if (!id) {
      return {
        errCode: 1,
        message: "Thiếu thông tin",
      };
    }
    // Lấy thông tin bác sĩ theo id từ cơ sở dữ liệu lấy theo User để lấy Position
    let info = await db.User.findOne({
      where: { id: id },
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: db.Markdown,
          as: "doctorData",
          attributes: ["description", "contentHTML", "contentMarkdown"],
        },
        {
          model: db.Allcode,
          as: "positionData",
          attributes: ["valueEn", "valueVi"],
        },
      ],
      raw: false,
      nest: true,
    });
    if (info && info.image) {
      info.image = Buffer.from(info.image, "base64").toString("binary"); // Chuyển đổi base64 thành nhị phân
    }
    if (!info) {
      return {
        errCode: 2,
        message: "Không tìm thấy thông tin bác sĩ",
      };
    } else {
      return {
        errCode: 0,
        message: "Lấy thông tin bác sĩ thành công",
        data: info,
      };
    }
  } catch (error) {
    console.error("Lỗi khi lấy thông tin bác sĩ:", error);
    return {
      errCode: -1,
      message: "Lỗi server khi lấy thông tin bác sĩ",
    };
  }
};
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  postInfoDoctor: postInfoDoctor,
  getDetailDoctorById: getDetailDoctorById,
};
