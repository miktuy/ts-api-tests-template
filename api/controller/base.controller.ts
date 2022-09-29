import type {CookieJar} from "tough-cookie";

export type ControllerOptions = {
  token?: string,
  cookieJar: CookieJar,
  prefixUrl: string,
  prefixPath: string,
}

export class BaseController {
  constructor(protected readonly options: ControllerOptions) {

  }

}