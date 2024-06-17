import connectDB from "@/config/database";
import Property from "@/models/Property";

/*
 * gets /api/properties/:id
 * params {request} - request from the database
 */
export async function GET(request, { params }) {
  try {
    //connect to the database
    await connectDB();

    // properties data from the property model
    const property = await Property.findById(params.id);

    if (!property) {
      return new Response("Property Not Found", { status: 404 });
    }

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
