export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function (req, res) {
  // Read the body in as a string
  const rawBody = await new Promise((resolve) => {
    let buffer = "";
    req.on("data", (chunk) => {
      buffer += chunk;
    });
    req.on("end", () => {
      resolve(buffer);
    });
  });

  const res2 = await fetch(
    "https://hacker-news.firebaseio.com/v0/item/30167605.json"
  );
  const data = await res2.json();
  res.send(JSON.stringify(data));
}
