import { AST } from "eslint";

// Decorator that accepts a custom save function and applies to the class
function Save(
  key: string,
  o?: { customSave?: (result: any, second: any) => void }
) {
  return function (constructor: Function) {
    const classPrototype = constructor.prototype;

    console.log("key", key);

    // Wrap each method in the class prototype with the custom save logic
    for (const key of Object.getOwnPropertyNames(classPrototype)) {
      const originalMethod = classPrototype[key];

      // Only wrap functions, skip constructor and non-function properties
      if (typeof originalMethod === "function" && key !== "constructor") {
        Object.defineProperty(classPrototype, key, {
          value: function (...args: any[]) {
            // Log the method call
            console.log(`Calling ${key} with`, args);

            // Call the original method and get its result
            const result = originalMethod.apply(this, args);

            // If custom save logic is provided, use it, otherwise use default save logic
            if (o?.customSave) {
              o.customSave(result, "titi");
            } else {
              console.log(`Default saving result of ${key}:`, result);
            }

            // Return the original result
            return result;
          },
        });
      }
    }
  };
}

// Using the decorator on a class with custom save logic
@Save("key1", {
  customSave: (result, titi) => {
    console.log(`Custom saving result:`, result);
    // Simulate custom save logic here
  },
})
class DataService {
  saveData(data: string) {
    // Some logic to "save" the data
    return `Data "${data}" has been processed and saved.`;
  }

  saveAnotherData(data: string) {
    // Some logic to "save" the data
    return `Another data "${data}" has been processed and saved.`;
  }
}

// Example usage
const service = new DataService();
service.saveData("Hello, Custom Save!");

service.saveAnotherData("Hello, Default Save!");
