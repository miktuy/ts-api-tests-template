import { cleanEnv, url, str } from "envalid";

export const CONFIG = cleanEnv(process.env, {
  PETSTORE_URL: url({
    default: 'http://localhost',
    desc: 'API URL to be tested'
  }),
  PETSTORE_API_PREFIX_PATH: str({
    default: '/v2',
    desc: 'Prefix part in url path to be pretended to all request'
  }),
  PETSTORE_SWAGGER_URL: url({
    default: 'http://localhost/v2/swagger.json',
    desc: 'Swagger documentation'
  })
})