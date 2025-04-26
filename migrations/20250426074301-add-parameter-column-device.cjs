'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // minPh: {
    //   type: Sequelize.DOUBLE,
    //   allowNull: false,
    //   defaultValue: 6.0
    // },
    // maxPh: {
    //   type: Sequelize.DOUBLE,
    //   allowNull: false,
    //   defaultValue: 7.0
    // },
    // minPPM: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   defaultValue: 560
    // },
    // maxPPM: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   defaultValue: 840
    // },
    await queryInterface.addColumn('devices', 'minPh', {
      type: Sequelize.DOUBLE,
      allowNull: false,
      defaultValue: 5.5
    })
    await queryInterface.addColumn('devices', 'maxPh', {
      type: Sequelize.DOUBLE,
      allowNull: false,
      defaultValue: 6.5
    })
    await queryInterface.addColumn('devices', 'minPPM', {
      type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 560
    })
    await queryInterface.addColumn('devices', 'maxPPM', {
      type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 840
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('devices', 'minPh')
    await queryInterface.removeColumn('devices', 'maxPh')
    await queryInterface.removeColumn('devices', 'minPPM')
    await queryInterface.removeColumn('devices', 'maxPPM')
  }
};
