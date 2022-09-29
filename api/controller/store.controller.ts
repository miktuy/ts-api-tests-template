import {JsonRequestWithValidation as JsonRequest} from "../request";
import {BaseController} from "./base.controller";
import {definitions, operations} from "../../.temp/types";
import {allureStep} from "../../utils/allureStep";

export class StoreController extends BaseController {
  API_URL: string = 'store';

  @allureStep(`[StoreController] getInventory`)
  async getInventory() {
    return (
      await new JsonRequest()
        .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
        .url(`${this.API_URL}/inventory`)
        .headers({token: this.options.token})
        .cookieJar(this.options.cookieJar)
        .send<operations['getInventory']['responses']['200']['schema']>()
    ).body
  }

  @allureStep(`[StoreController] placeOrder`)
  async placeOrder(order: Omit<definitions['Order'], 'id'>) {
    return (await new JsonRequest()
        .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
        .url(`${this.API_URL}/order`)
        .headers({token: this.options.token})
        .method('POST')
        .body(order)
        .send<operations['placeOrder']['responses']['200']['schema']>()
    ).body
  }

  @allureStep(`[StoreController] getOrderById`)
  async getOrderById(id: number | string) {
    return (await new JsonRequest()
        .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
        .url(`${this.API_URL}/order/${id}`)
        .headers({token: this.options.token})
        .send<operations['getOrderById']['responses']['200']['schema']>()
    )
  }
}