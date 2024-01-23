import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

const PROTO_PATH = __dirname + "/proto/proto/calculator.proto";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const CalculatorService =
  (grpc.loadPackageDefinition(packageDefinition).calculator as unknown) as ProtoGrpcType);

const client = new CalculatorService.Calculator(
  "localhost:8080",
  grpc.credentials.createInsecure(),
);

const then = performance.now();
client.add({ a: 10, b: 20 }, async (err: any, response: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Addition: ", response.result);
  const now = performance.now();
  console.log("Time taken in ms: ", now - then);
});
