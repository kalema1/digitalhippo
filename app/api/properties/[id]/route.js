import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/services/getSessionUser";

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

/*
 * deletes /api/properties/:id
 * params {request} - request from the database
 */
export async function DELETE(request, { params }) {
  try {
    const propertyId = params.id;

    const sessionUser = await getSessionUser();

    // check for session
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;

    //connect to the database
    await connectDB();

    // properties data from the property model
    const property = await Property.findById(propertyId);

    if (!property) {
      return new Response("Property Not Found", { status: 404 });
    }

    //verif ownership
    if (property.owner.toString() !== userId) {
      return new Response("Unauthorized user", { status: 401 });
    }

    await property.deleteOne();

    return new Response("Property Deleted", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
