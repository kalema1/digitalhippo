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

/*
 * post data to the database
 */
export async function POST(request) {
  try {
    const formData = await request.formData();

    //access all values from amenities and images
    const amenities = formData.getAll("amenities");
    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");

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
      images,
    };

    console.log(propertyData);

    return new Response(JSON.stringify(), { status: 200 });
  } catch (error) {
    return new Response("Failed to add Property", { status: 500 });
  }
}
