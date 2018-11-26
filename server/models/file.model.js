module.exports = (sequelize, type) => {
    return sequelize.define("files", {
        id: {
            type: type.BIGINT(20),
            primaryKey: true,
            autoIncrement: true
        },
        etag: type.STRING,
        size: type.BIGINT(20),
        name: type.STRING,
        local_path: type.STRING,
        status: {
            type: type.INTEGER,
            defaultValue: 0
        }
    }, {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    });
};