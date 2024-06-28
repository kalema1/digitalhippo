import connectDB from "@/config/database";
import { SOMETHING_WENT_WRONG } from "@/constants/constants";
import Property from "@/models/Property";

// GET: /api/properties/search

export async function GET(request) {
  try {
    await connectDB();

    //get search query from url
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");

    const locationPattern = new RegExp(location, "i");

    // match location patterns against database fields
    let query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.state": locationPattern },
        { "location.city": locationPattern },
        { "location.zipcode": locationPattern },
      ],
    };

    //only check for property if it's not "All"
    if (propertyType && propertyType !== "All") {
      const patternType = new RegExp(propertyType, "i");
      query.type = patternType;
    }

    const properties = await Property.find(query);

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(SOMETHING_WENT_WRONG, { status: 500 });
  }
}
