module.exports = (sequelize, type) => {
    return sequelize.define("user_socket", {
        id: {
            type: type.BIGINT(20),
            primaryKey: true,
            autoIncrement: true
        },
        user_id: type.BIGINT(20),
        socket_id: type.STRING
    }, {
        timestamps: false
    });
};