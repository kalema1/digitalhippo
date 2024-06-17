const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

//fetch the properties data
export async function fetchProperties() {
  try {
    //handle case when the domain is not available
    if (!apiDomain) {
      return [];
    }

    const response = await fetch(`${apiDomain}/properties`);

    if (!response.ok) {
      throw new Error("Failed to fetch Data");
    }

    return response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

/*
 * fetch single property
 * params {id} - id of the property to be fetched
 */
export async function fetchProperty(id) {
  try {
    //handle case when the domain is not available
    if (!apiDomain) {
      return null;
    }

    const response = await fetch(`${apiDomain}/properties/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch Data");
    }

    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
