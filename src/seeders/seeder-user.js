"use strict";

module.exports = {
  //up dùng để thêm dữ liệu mẫu vào bảng
  //down dùng để xóa dữ liệu mẫu
  up: async (queryInterface, Sequelize) => {
    // Thêm dữ liệu mẫu vào bảng Users
    await queryInterface.bulkInsert("Users", [
      {
        email: "admin@gmail.com",
        firstName: "Xuân",
        lastName: "Cử",
        password: "123456",
        address: "Hà Nội",
        gender: 1,
        roleId: "R1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
