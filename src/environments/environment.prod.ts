import info from "../info.json";

export const environment = {

  api             : info.serverInfo.api,
  host            : info.serverInfo.host,
  build           : info.serverInfo.build,
  release         : info.serverInfo.release,
  production      : true

};
