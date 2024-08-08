import { Router } from "express";
import userRoutes from "./user.js";
import chatRoutes from "./chat.js";
const appRouter = Router();
appRouter.use("/user", userRoutes);
appRouter.use("/chat", chatRoutes);
export default appRouter;
//# sourceMappingURL=index.js.map