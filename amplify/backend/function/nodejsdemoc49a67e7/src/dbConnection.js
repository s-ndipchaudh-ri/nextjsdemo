
const Sequelize = require("sequelize");
let dbConfig = {
	DB : 'metamappoc',
	name : 'postgres',
	password : 'postgres',
	host : 'localhost'
}
if(process.env.NODE_ENV == 'dev'){
	console.log('inside server config')
	dbConfig.DB = 'amplifyguide'
	dbConfig.name = 'postgres'
	dbConfig.password = '1234567890'
	dbConfig.host = 'amplifyguide.cwm1smfrswaz.ap-south-1.rds.amazonaws.com'
}
var sequelize = new Sequelize(
	dbConfig.DB, // db name
	dbConfig.name, // username
	dbConfig.password, // password
	{
		host: dbConfig.host, // host
		dialect: "postgres", 
		acquireConnectionTimeout: 5000,
		pool: {
			min: 0,
			max: 100,
			createTimeoutMillis: 8000,
			acquireTimeoutMillis: 8000,
			idleTimeoutMillis: 8000,
			reapIntervalMillis: 1000,
			createRetryIntervalMillis: 100,
			propagateCreateError: false
		}
		//  , port: 5433
	});

var connectDB = async () => {
	try {

		console.log("Connect to Database");
		await sequelize.authenticate()
			.then(() => {
				sequelize.sync();
				console.log("database connected !");
			})
			.catch(err => {
				console.error("Unable to connect to the database:", err);
			});
	} catch (error) {
		throw error;

	} 
};

module.exports = {
	connectDB: connectDB,
	sequelize: sequelize
};