require("dotenv").config();
const { Sequelize } = require("sequelize");

// Khởi tạo Sequelize với cấu hình từ .env
const sequelize = new Sequelize("examdb", "root", null, {
  host: "127.0.0.1",
  dialect: `mysql`,
  logging: false, // Tắt logging để giảm tải console
});

// Hàm kết nối cơ sở dữ liệu
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối cơ sở dữ liệu thành công!");
  } catch (error) {
    console.error("Không thể kết nối đến cơ sở dữ liệu:", error);
    process.exit(1); // Thoát ứng dụng nếu không kết nối được
  }
};

module.exports = connectDB;
