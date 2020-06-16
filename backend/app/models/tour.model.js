module.exports = (sequelize, Sequelize) => {
    const Tour = sequelize.define("tours",{
        title : {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        },
    });
    return Tour;
};