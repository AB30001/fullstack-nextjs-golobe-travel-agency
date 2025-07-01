import { Hotel } from "@/lib/db/models";
export async function GET(req) {
  const searchParams = Object.fromEntries(new URL(req.url).searchParams);
  const limit = searchParams?.limit || 10;
  const searchQuery = searchParams?.searchQuery;

  try {
    if (!!!searchQuery) {
      const hotels = await Hotel.find({})
        .limit(limit)
        .select("address -_id")
        .exec();

      return Response.json(
        hotels.map((hotel) => {
          return {
            city: hotel.address.city,
            country: hotel.address.country,
            type: "place",
          };
        }),
      );
    }

    const regex = new RegExp(
      `${searchQuery.match(/.{1,2}/g).join("+?.*")}`,
      "i",
    );
    const hotels = await Hotel.find({
      query: { $regex: regex },
    })
      .limit(limit)
      .select("address -_id")
      .exec();

    const stringified = hotels.map((hotel) => {
      return JSON.stringify({
        city: hotel.address.city,
        country: hotel.address.country,
        type: "place",
      }); // stringified to later remove duplicates and one in array is type place and another is type hotel
    });

    // eslint-disable-next-line no-undef
    const filterDuplicates = Array.from(new Set(stringified), (x) =>
      JSON.parse(x),
    );

    return Response.json(filterDuplicates);
  } catch (e) {
    console.log(e);
    return Response.json({});
  }
}
