import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
const port = process.env.PORT || 5000;
connectToDatabase()
    .then(() => {
    app.listen(port, () => {
        console.log('Server is running on port 3000');
    });
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map