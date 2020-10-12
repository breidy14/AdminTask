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
            onDelete: 'cascade',
            onUpdate: 'cascade'
            }
        },
        categoryId: {
            type: Sequelize.INTEGER,
            references:{
            model:{tableName: 'Categories'},
            key: 'id',
            onDelete: 'cascade',
            onUpdate: 'cascade'
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