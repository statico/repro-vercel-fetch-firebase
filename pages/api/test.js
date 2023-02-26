import { createHmac } from "crypto";

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

  // Check the signature per https://api.slack.com/authentication/verifying-requests-from-slack
  const signingSecret = "sekrit";
  if (process.env.NODE_ENV === "production" && !signingSecret) {
    throw new Error("SLACK_SIGNING_SECRET is required in production");
  }
  if (signingSecret) {
    const hmac = createHmac("sha256", signingSecret);
    hmac.update(
      ["v0", req.headers["x-slack-request-timestamp"], rawBody].join(":")
    );
    const sig = "v0=" + hmac.digest("hex");
    if (sig !== req.headers["x-slack-signature"]) {
      // throw new Error("Invalid signature");
      console.log("invalid signature");
    }
    console.log("signature ok");
  }

  const res2 = await fetch(
    "https://hacker-news.firebaseio.com/v0/item/30167605.json"
  );
  const data = await res2.json();
  res.send(JSON.stringify(data));
}
