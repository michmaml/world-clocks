/*
* Link to the database with a sample user
*/

dbPassword = 'mongodb://user-mjs:KPTHgbdwj12@cluster0-shard-00-00-x2lx2.mongodb.net:27017,cluster0-shard-00-01-x2lx2.mongodb.net:27017,cluster0-shard-00-02-x2lx2.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
module.exports = {
    mongoURI: dbPassword
};