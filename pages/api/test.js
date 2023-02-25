export default async function (req, res) {
  const res2 = await fetch(
    "https://hacker-news.firebaseio.com/v0/item/30167605.json"
  );
  const data = await res2.json();
  res.send(JSON.stringify(data));
}
