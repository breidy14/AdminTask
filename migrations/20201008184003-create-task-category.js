    'use strict';
    module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('TaskCategories', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        taskId: {
            type: Sequelize.INTEGER,
            references:{
            model:{tableName: 'Tasks'},
            key: 'id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
            }
        },
        categoryId: {
            type: Sequelize.INTEGER,
            references:{
            model:{tableName: 'Categories'},
            key: 'id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
            }
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('TaskCategories');
    }
    };