module.exports = (sequelize, type) => {
    return sequelize.define("google_user", {
        id: {
            type: type.BIGINT(20),
            primaryKey: true,
            autoIncrement: true
        },
        sub: type.STRING,
        name: type.STRING,
        image_url: type.STRING,
        email: type.STRING
    }, {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    });
};