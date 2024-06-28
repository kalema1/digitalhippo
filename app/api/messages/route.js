import connectDB from "@/config/database";
import { SOMETHING_WENT_WRONG } from "@/constants/constants";
import Message from "@/models/Message";
import { getSessionUser } from "@/services/getSessionUser";

export const dynamic = "force-dynamic";

//POST: /api/messages
export async function POST(request) {
  try {
    await connectDB();

    const { name, email, phone, message, recipient, property } = request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { user } = sessionUser;

    // can not send message to self
    if (user.id === recipient) {
      return new Response(
        JSON.stringify({ message: "can not send to a message to yourself" }),
        {
          status: 400,
        }
      );
    }

    const newMessage = new Message({
      sender: user.id,
      recipient,
      phone,
      name,
      email,
      property,
      body: message,
    });

    await newMessage.save();

    return new Response(JSON.stringify({ message: "Message Sent" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(SOMETHING_WENT_WRONG, {
      status: 500,
    });
  }
}
