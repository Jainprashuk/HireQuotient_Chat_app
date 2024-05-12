import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import User from "../models/user.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message: sentMessage } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // Check if the receiver is active
        const receiver = await User.findById(receiverId);
        if (!receiver) {
            return res.status(404).json({ error: "Receiver not found" });
        }

        if (receiver.status === "active") {
            // Proceed with sending the message
            let conversation = await Conversation.findOne({
                participants: { $all: [senderId, receiverId] },
            });

            if (!conversation) {
                conversation = await Conversation.create({
                    participants: [senderId, receiverId],
                });
            }

            const newMessage = new Message({
                senderId,
                receiverId,
                message: sentMessage,
            });

            if (newMessage) {
                conversation.messages.push(newMessage._id);
            }

            // await conversation.save();
            // await newMessage.save();

            // this will run in parallel
            await Promise.all([conversation.save(), newMessage.save()]);

            // SOCKET IO FUNCTIONALITY WILL GO HERE
            const receiverSocketId = getReceiverSocketId(receiverId);
            if (receiverSocketId) {
                // io.to(<socket_id>).emit() used to send events to specific client
                io.to(receiverSocketId).emit("newMessage", newMessage);
            }

            return res.status(201).json(newMessage);
        } else if (receiver.status === "busy") {
            // Automatically generate response with timeout
            try {
                const response = await Promise.race([
                    getLLMResponse("The user is currently busy. Please try again later."),
                    new Promise((resolve, reject) => {
                        setTimeout(() => reject(new Error('Response timeout')), 10000);
                    })
                ]);
                
                // Create a new message containing the LLM response and the original message
                const newMessage = new Message({
                    senderId: req.user._id,
                    receiverId,
                    message: `${response}: ${sentMessage}`,
                });

                // Save the message to the conversation
                let conversation = await Conversation.findOne({
                    participants: { $all: [senderId, receiverId] },
                });

                if (!conversation) {
                    conversation = await Conversation.create({
                        participants: [senderId, receiverId],
                    });
                }

                conversation.messages.push(newMessage._id);
                await Promise.all([conversation.save(), newMessage.save()]);

                // SOCKET IO FUNCTIONALITY WILL GO HERE
                const receiverSocketId = getReceiverSocketId(receiverId);
                if (receiverSocketId) {
                    // io.to(<socket_id>).emit() used to send events to specific client
                    io.to(receiverSocketId).emit("newMessage", newMessage);
                }

                return res.status(200).json(newMessage);
            } catch (error) {
                // If LLM response times out, send standard message
                const newMessage = new Message({
                    senderId: req.user._id,
                    receiverId,
                    message: "The user is currently unavailable. Please try again later.",
                });

                // Save the message to the conversation
                let conversation = await Conversation.findOne({
                    participants: { $all: [senderId, receiverId] },
                });

                if (!conversation) {
                    conversation = await Conversation.create({
                        participants: [senderId, receiverId],
                    });
                }

                conversation.messages.push(newMessage._id);
                await Promise.all([conversation.save(), newMessage.save()]);

                // SOCKET IO FUNCTIONALITY WILL GO HERE
                const receiverSocketId = getReceiverSocketId(receiverId);
                if (receiverSocketId) {
                    // io.to(<socket_id>).emit() used to send events to specific client
                    io.to(receiverSocketId).emit("newMessage", newMessage);
                }

                return res.status(200).json(newMessage);
            }
        } else {
            // Handle other statuses as needed
            return res.status(400).json({ error: "User status not supported" });
        }
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// import openai from 'openai';
// const openaiClient = new openai.OpenAI({ apiKey: 'sk-proj-wPEEb4gTAgsegOcr2kXfT3BlbkFJFL6xglmZUTExyExzRYe0' });
// export const sendMessage = async (req, res) => {
//     try {
//         const { message: sentMessage } = req.body;
//         const { id: receiverId } = req.params;
//         const senderId = req.user._id;

//         // Check if the receiver is active
//         const receiver = await User.findById(receiverId);
//         if (!receiver) {
//             return res.status(404).json({ error: "Receiver not found" });
//         }

//         if (receiver.status === "active") {
//             // Proceed with sending the message
//             let conversation = await Conversation.findOne({
//                 participants: { $all: [senderId, receiverId] },
//             });

//             if (!conversation) {
//                 conversation = await Conversation.create({
//                     participants: [senderId, receiverId],
//                 });
//             }

//             const newMessage = new Message({
//                 senderId,
//                 receiverId,
//                 message: sentMessage,
//             });

//             if (newMessage) {
//                 conversation.messages.push(newMessage._id);
//             }

//             // await conversation.save();
//             // await newMessage.save();

//             // this will run in parallel
//             await Promise.all([conversation.save(), newMessage.save()]);

//             // SOCKET IO FUNCTIONALITY WILL GO HERE
//             const receiverSocketId = getReceiverSocketId(receiverId);
//             if (receiverSocketId) {
//                 // io.to(<socket_id>).emit() used to send events to specific client
//                 io.to(receiverSocketId).emit("newMessage", newMessage);
//             }

//             return res.status(201).json(newMessage);
//         } else if (receiver.status === "busy") {
//             // Automatically generate response with OpenAI API
//             const response = await openaiClient.completions.create({
//                 model: 'text-davinci-003', // Specify the model you want to use
//                 prompt: "The user is currently busy. Please try again later.",
//                 max_tokens: 50,
//             });

//             // Create a new message containing the OpenAI response and the original message
//             const newMessage = new Message({
//                 senderId: req.user._id,
//                 receiverId,
//                 message: `This is a response from OpenAI: ${response.choices[0].text}`,
//             });

//             // Save the message to the conversation
//             let conversation = await Conversation.findOne({
//                 participants: { $all: [senderId, receiverId] },
//             });

//             if (!conversation) {
//                 conversation = await Conversation.create({
//                     participants: [senderId, receiverId],
//                 });
//             }

//             conversation.messages.push(newMessage._id);
//             await Promise.all([conversation.save(), newMessage.save()]);

//             // SOCKET IO FUNCTIONALITY WILL GO HERE
//             const receiverSocketId = getReceiverSocketId(receiverId);
//             if (receiverSocketId) {
//                 // io.to(<socket_id>).emit() used to send events to specific client
//                 io.to(receiverSocketId).emit("newMessage", newMessage);
//             }

//             return res.status(200).json(newMessage);
//         } else {
//             // Handle other statuses as needed
//             return res.status(400).json({ error: "User status not supported" });
//         }
//     } catch (error) {
//         console.log("Error in sendMessage controller: ", error.message);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };



export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};


async function getLLMResponse(prompt) {
	return new Promise((resolve) => {   
	const timeout = Math.random() * (15000 - 5000) + 5000;
	setTimeout(() => {
	resolve('This is a mock response from the LLM based on user input');
	}, timeout);
	});
};
