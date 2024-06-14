import connectDB from "@/config/database";
import Property from "@/models/Property";

/*
 * gets /api/properties
 * params {request} - request from the database
 */
export async function GET(request) {
  try {
    //connect to the database
    await connectDB();

    // properties data from the property model
    const properties = await Property.find({});

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
