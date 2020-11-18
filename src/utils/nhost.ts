import nhost from "nhost-js-sdk";
import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;

const config = {
  base_url: "https://backend-xgqvvidg.nhost.app",
  client_storage: Storage,
  client_storage_type: "capacitor",
};

nhost.initializeApp(config);

const auth = nhost.auth();
const storage = nhost.storage();

export { auth, storage };