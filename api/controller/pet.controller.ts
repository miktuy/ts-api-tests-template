import {URLSearchParams} from "url";
import {JsonRequestWithValidation as JsonRequest} from "../request";
import {BaseController} from "./base.controller";
import {definitions, operations} from "../../.temp/types";
import {allureStep} from "../../utils/allureStep";

export class PetController extends BaseController {
  API_URL: string = 'pet';

  @allureStep(`[PetController] getById`)
  async getById(id: number | string) {
    return (await new JsonRequest()
        .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
        .url(`${this.API_URL}/${id}`)
        .headers({token: this.options.token})
        .send<operations['getPetById']['responses']['200']['schema']>()
    ).body
  }

  @allureStep(`[PetController] findByTags`)
  async findByTags(tags: string | string[]) {
    return (await new JsonRequest()
        .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
        .url(`${this.API_URL}/findByTags`)
        .headers({token: this.options.token})
        .searchParams(new URLSearchParams({tags}))
        .send<operations['findPetsByTags']['responses']['200']['schema']>()
    ).body
  }

  @allureStep(`[PetController] findByStatus`)
  async findByStatus(status: string | string[]) {
    return (await new JsonRequest()
        .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
        .url(`${this.API_URL}/findByStatus`)
        .headers({token: this.options.token})
        .cookieJar(this.options.cookieJar)
        .searchParams(new URLSearchParams({status}))
        .send<operations['findPetsByStatus']['responses']['200']['schema']>()
    ).body
  }

  @allureStep(`[PetController] addNew`)
  async addNew(pet: Omit<definitions['Pet'], 'id'>) {
    return (await new JsonRequest()
        .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
        .url(`${this.API_URL}`)
        .headers({token: this.options.token})
        .cookieJar(this.options.cookieJar)
        .method('POST')
        .body(pet)
        .send<operations['addPet']['responses']['200']['schema']>()
    ).body
  }

  @allureStep(`[PetController] delete`)
  async delete(id: number | string) {
    return (await new JsonRequest()
        .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
        .url(`${this.API_URL}/${id}`)
        .headers({token: this.options.token})
        .cookieJar(this.options.cookieJar)
        .method('DELETE')
        .send()
    ).body
  }

  @allureStep(`[PetController] update`)
  async update(pet: definitions['Pet']) {
    return (await new JsonRequest()
        .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
        .url(`${this.API_URL}`)
        .headers({token: this.options.token})
        .cookieJar(this.options.cookieJar)
        .method('PUT')
        .body(pet)
        .send<operations['updatePet']['responses']['200']['schema']>()
    ).body
  }
}