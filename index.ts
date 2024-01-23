import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import {
  CalculatorClient,
  CalculatorDefinition,
} from "./proto/proto/calculator/Calculator";
import { ProtoGrpcType } from "./proto/proto/calculator";
import { CalculationRequest } from "./proto/proto/calculator/CalculationRequest";

const PROTO_PATH = __dirname + "/proto/proto/calculator.proto";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const CalculatorService = grpc.loadPackageDefinition(packageDefinition)
  .calculator as any;

const client = new CalculatorService.Calculator(
  "localhost:8080",
  grpc.credentials.createInsecure(),
) as CalculatorClient;

let then = performance.now();
client.Divide({ a: 10, b: 0 }, async (err, response) => {
  if (err) {
    console.log("Error: ", err);
  }
  if (response) {
    console.log("Division: ", response.result);
    const now = performance.now();
    console.log("Time taken in ms: ", now - then);
  }
});

then = performance.now();
client.Sum({ numbers: [100, 100, 100] }, async (err: any, response: any) => {
  if (err) {
    console.log("Error: ", err);
  }
  if (response) {
    console.log("Addition: ", response.result);
    const now = performance.now();
    console.log("Time taken in ms: ", now - then);
  }
});
