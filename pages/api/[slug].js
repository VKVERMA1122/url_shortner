import { prisma } from "../../db/client";

export default async (req, res) => {
  const slug = req.query["slug"];

  if (!slug || typeof slug == String) {
    res.statusCode = 404;
    res.send(JSON.stringify({ msg: "plz use with slug " }));
    return;
  }

  const data = await prisma.shortLink.findFirst({
    where: {
      Slug: {
        equals: slug,
      },
    },
  });

  if (!data) {
    res.statusCode = 404;
    res.send(JSON.stringify({ msg: "slug not found" }));
    return;
  }

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=1000000000, stale-while-revalidate");

  return res.json(data);
};
