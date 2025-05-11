"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Thay đổi kiểu dữ liệu của cột 'image' thành BLOB
    await queryInterface.changeColumn("Users", "image", {
      type: Sequelize.BLOB,
      allowNull: true, // Cho phép giá trị null (nếu cần)
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Khôi phục kiểu dữ liệu của cột 'image' về STRING
    await queryInterface.changeColumn("Users", "image", {
      type: Sequelize.STRING,
      allowNull: true, // Cho phép giá trị null (nếu cần)
    });
  },
};
