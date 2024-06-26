import connectDB from "@/config/database";
import Property from "@/models/Property";

/*
 * gets /api/properties/user/:userId
 * params {request} - request from the database
 */
export async function GET(request, { params }) {
  try {
    //connect to the database
    await connectDB();

    const userId = params.userId;

    if (!userId) {
      return new Response("User ID is required", { status: 400 });
    }

    // properties data from the property model
    const properties = await Property.find({ owner: userId });

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
