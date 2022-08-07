import * as pkg from "../package.json";
import { ConstructorOptions } from "./utils/typings";
import axios from 'axios'
import FormData from 'form-data'


function useragent(ua?) {
  return `${ua ? ua : ""} ${pkg.name}/v${pkg.version}`.trim();
}

function apibase(api) {
  if (api !== undefined) return api;
  else return "https://api.fuzzysearch.net";
}
class Fuzzysearch {
  private api: string;
  private ua: string;
  private key: string;

  constructor(options: ConstructorOptions) {
    this.api = apibase(options.apibase);
    this.key = options.apikey;
    this.ua = useragent(options.useragent);
  }

  async find(image: Buffer, type: "close" | "exact" | "force" = "close") {
    try {
      let data = new FormData()
      data.append("image",image, "probably_porn.png")

      let req = await axios.post(`${this.api}/image?${type}`,data, {
        headers: {
          'accept': 'application/json',
          'Content-Type': `multipart/form-data; boundary=${data.getBoundary()}`,
          "X-API-KEY": this.key
        },
      })
      return req.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default Fuzzysearch;
module.exports = Fuzzysearch
