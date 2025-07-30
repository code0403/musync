import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const currentUserId = req.auth.userId;
        const users = await User.find({clerkId : {$ne : currentUserId}});
        res.status(200).json(users);
    } catch (error) {
        console.log(`Error in the getAllUsers controller`, error);
        next(error);
    }
};


export const getAllMessages = async (req, res, next) => {
    try {
        const myId = req.auth.userId;
		const { userId } = req.params;

		const messages = await Message.find({
			$or: [
				{ senderId: userId, receiverId: myId },
				{ senderId: myId, receiverId: userId },
			],
		}).sort({ createdAt: 1 });

		res.status(200).json(messages);
    } catch (error) {
        console.log(`Error in the getAllMessages controller`, error);
        next(error);
    }
};