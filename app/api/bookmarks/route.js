import connectDB from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
import { getSessionUser } from "@/services/getSessionUser";
import { SOMETHING_WENT_WRONG } from "@/constants/constants";

export const dynamic = "force-dynamic";

//GET: /api/bookmarks
export async function GET(request) {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;

    // find user in database
    const user = await User.findOne({ _id: userId });

    // get user's bookmarks
    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });

    return new Response(JSON.stringify(bookmarks), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(SOMETHING_WENT_WRONG, { status: 500 });
  }
}

// POST: /api/bookmarks
export async function POST(request) {
  try {
    await connectDB();

    // get property id from request
    const { propertyId } = await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;

    // find user in database
    const user = await User.findOne({ _id: userId });

    // check if property is bookmarked
    let isBookmarked = !!user.bookmarks.includes(propertyId);

    let message;

    if (isBookmarked) {
      // remove it if bookmarked
      user.bookmarks.pull(propertyId);
      message = "Bookmark removed Successfully";
      isBookmarked = false;
    } else {
      // if not bookmarked, mark it
      user.bookmarks.push(propertyId);
      message = "Bookmark added Successfully";
      isBookmarked = true;
    }

    await user.save();

    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something Went wrong", { status: 500 });
  }
}
