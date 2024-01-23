import { Client, credentials } from "@grpc/grpc-js";

const client = new Client("localhost:8080", credentials.createInsecure());

client.waitForReady(5000, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  client.close();
});
