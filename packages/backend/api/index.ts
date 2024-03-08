import { getAppName } from "@packages/common";
import { server } from "./server";

server.listen().then(({ url }) => {
  console.log(`${getAppName()} backend ready at ${url}`);
});
