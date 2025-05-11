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
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
};
