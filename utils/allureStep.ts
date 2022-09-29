import {allure} from "allure-mocha/dist/MochaAllureReporter";

export function allureStep(msg: string) {
  return (target: Object, property: string, descriptor: PropertyDescriptor) => {
    const originalFunction = descriptor.value;

    descriptor.value = function (...args: any[]) {
      return allure.step(
        msg,
        async () => {
          allure.createAttachment(
            `[${msg}] ARGUMENTS:`,
            JSON.stringify(args, null, 2),
            'application/json' as any
          );
          const result =  await originalFunction.apply(this, args);
          console.log(result)

          allure.createAttachment(
            `[${msg}] RESULT:`,
            JSON.stringify(result, null, 2),
            'application/json' as any
          );
          return result
        }
      )
    };
    return descriptor
  }
}