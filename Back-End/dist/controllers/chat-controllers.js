import User from "../models/User.js";
import OpenAI from "openai";
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
        }
        const chats = user.chats.map(({ role, content }) => ({
            role: role, // Ensure the role is correctly typed
            content, // Content should already be a string
        }));
        chats.push({ role: "user", content: message });
        user.chats.push({ role: "user", content: message });
        const openai = new OpenAI({
            apiKey: process.env.OPEN_AI_SECRET,
            organization: process.env.OPEN_AI_ORGANIZATION
        });
        try {
            const chatResponse = openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: chats,
            });
            const message = (await chatResponse).choices[0].message;
            // Update user chats and save
            user.chats.push(message);
            await user.save();
        }
        catch (error) {
            if (error.response?.status === 429) {
                console.error("Quota exceeded:", error.response.data);
                return res.status(429).json({ message: "Quota exceeded. Please try again later." });
            }
            else {
                console.error("OpenAI API error:", error.response?.data || error.message);
                return res.status(500).json({ message: "Something went wrong with OpenAI API." });
            }
        }
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.error("Error during chat generation");
        return res.status(500).json({ message: "Something went wrong" });
    }
};
export const sendChatsToUser = async (req, res, next) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        return res.status(200).json({ message: "OK", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=chat-controllers.js.map