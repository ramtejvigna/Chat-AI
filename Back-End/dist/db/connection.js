import { connect, disconnect } from 'mongoose';
async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    }
    catch (error) {
        console.log(error);
        throw new Error("Cannot connect to Database");
    }
}
async function disconnectDatabase() {
    try {
        await disconnect();
    }
    catch (err) {
        console.log(err);
        throw new Error("Couldn't disconnect from Database");
    }
}
export { connectToDatabase, disconnectDatabase };
//# sourceMappingURL=connection.js.map