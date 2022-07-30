import { prisma } from "../../db/client";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let { url, slug } = req.body;
    console.log(url, slug);
    if (!url || !slug) {
      res.status(300).json({ error: "Field can not be empty" });
    } else {
      const newUrl = await prisma.shortLink.create({
        data: {
          url: url,
          Slug: slug,
        },
      });
      res.status(200).json({ msg: newUrl });
    }
  } else {
    res.status(200).json({ msg: "worng method" });
  }
}
