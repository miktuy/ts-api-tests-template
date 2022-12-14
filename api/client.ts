import {PetController} from "./controller/pet.controller";
import {StoreController} from "./controller/store.controller";
import {UserController} from "./controller/user.controller";
import {CookieJar} from "tough-cookie";
import {ControllerOptions} from "./controller/base.controller";
import {CONFIG} from "../config/env";

export class ApiClient {
  public readonly pet: PetController;
  public readonly store: StoreController;
  public readonly user: UserController;

  private constructor(options?:Partial<ControllerOptions>) {
    const defaultOptions = {
      cookieJar: new CookieJar(),
      prefixUrl: CONFIG.PETSTORE_URL,
      prefixPath: CONFIG.PETSTORE_API_PREFIX_PATH
    };
    const mergedOptions = { ...defaultOptions, ...options};

    this.pet = new PetController(mergedOptions);
    this.store = new StoreController(mergedOptions);
    this.user = new UserController(mergedOptions);
  }
  static unauthorized() {
    return new ApiClient();
  }

  static async loginAs(credentials: {username: string, password: string}) {
    return new ApiClient({
      token: await ApiClient.unauthorized().user.login(credentials)
    })
  }
}