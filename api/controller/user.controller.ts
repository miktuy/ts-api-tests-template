import {BaseController} from "./base.controller";
import {JsonRequestWithValidation as JsonRequest} from "../request";
import {operations, definitions} from "../../.temp/types";
import {allureStep} from "../../utils/allureStep";

export class UserController extends BaseController {
  API_URL: string = 'user';

  @allureStep(`[UserController] login`)
  async login(credentials: { username: string, password: string }): Promise<string> {
    return (await new JsonRequest()
        .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
        .url(`${this.API_URL}/login`)
        .searchParams(credentials)
        .send<operations['loginUser']['responses']['200']['schema']>()
    ).headers['token'] as string
  }

  @allureStep(`[UserController] register`)
  async register(userToCreate: Omit<definitions["User"], "id" | "userStatus">) {
    return (await new JsonRequest()
        .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
        .url(`${this.API_URL}/register`)
        .method('POST')
        .body(userToCreate)
        .send<operations['registerUser']['responses']['200']['schema']>()
    ).body
  }
}