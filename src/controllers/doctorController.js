import doctorService from "../services/doctorService"; // Import dịch vụ bác sĩ
let getTopDoctorHome = async (req, res) => {
  try {
    // Lấy danh sách bác sĩ hàng đầu từ service
    let limit = req.query.limit ? parseInt(req.query.limit) : 10; // Số lượng bác sĩ tối đa
    let doctors = await doctorService.getTopDoctorHome(+limit);
    return res.status(200).json({
      errCode: 0,
      message: "Lấy danh sách bác sĩ thành công",
      data: doctors,
    });
  } catch (error) {
    console.error("Lỗi khi lấy top bác sĩ:", error);
    return res.status(500).json({
      errCode: -1,
      message: "Lỗi server khi lấy top bác sĩ",
    });
  }
};
let getAllDoctors = async (req, res) => {
  try {
    // Lấy danh sách tất cả bác sĩ từ service
    let doctors = await doctorService.getAllDoctors();
    return res.status(200).json({
      errCode: 0,
      message: "Lấy danh sách bác sĩ thành công",
      data: doctors,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bác sĩ:", error);
    return res.status(500).json({
      errCode: -1,
      message: "Lỗi server khi lấy danh sách bác sĩ",
    });
  }
};
let postInfoDoctor = async (req, res) => {
  try {
    // Lưu thông tin bác sĩ từ request body
    let message = await doctorService.postInfoDoctor(req.body);
    return res.status(200).json({
      errCode: message.errCode,
      message: message.message,
    });
  } catch (error) {
    console.error("Lỗi khi lưu thông tin bác sĩ:", error);
    return res.status(500).json({
      errCode: -1,
      message: "Lỗi server khi lưu thông tin bác sĩ",
    });
  }
};
let getDetailDoctorById = async (req, res) => {
  try {
    // Lấy thông tin chi tiết bác sĩ theo id từ service
    let info = await doctorService.getDetailDoctorById(req.query.id);
    return res.status(200).json({
      errCode: info.errCode,
      message: info.message,
      data: info.data ? info.data : {},
    });
  } catch (error) {
    console.error("Lỗi khi lấy thông tin bác sĩ:", error);
    return res.status(500).json({
      errCode: -1,
      message: "Lỗi server khi lấy thông tin bác sĩ",
    });
  }
};
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  postInfoDoctor: postInfoDoctor,
  getDetailDoctorById: getDetailDoctorById,
};
