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

/*
 * put data to the database
 * PUT/api/properties/:id
 */
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const propertyId = params.id;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;

    const formData = await request.formData();

    //access all values from amenities
    const amenities = formData.getAll("amenities");

    // get proerty t update
    const existingProperty = await Property.findById(propertyId);

    if (!existingProperty) {
      return new Response("Property does not exist", { status: 404 });
    }

    // verify ownership
    if (existingProperty.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // create property object for the database
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };

    // update property in database
    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      propertyData
    );

    return new Response(JSON.stringify(updatedProperty), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to add Property", { status: 500 });
  }
}
