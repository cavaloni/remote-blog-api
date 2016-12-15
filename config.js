exports.DATABASE_URL = //proces.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       'mongodb://localhost/blogseed';
exports.PORT = process.env.PORT || 8080;
