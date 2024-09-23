import { cloneDeep } from "lodash";

export function deletePropertyPath (obj: any, path: string | string[]) {

  if (!obj || !path) {
    return;
  }

  if (typeof path === 'string') {
    if (obj[path]) {
      delete obj[path]
      return;
    }
  }

  let keys: string[] = []

  if (typeof path === 'string') {
    keys = path.split('.');
  } else {
    keys = path as string[]
  }

  if (!Array.isArray(keys)) {
    return;
  }

  const lastKey = keys.pop();

  if (!lastKey) return;
  
  keys.forEach(key => {
    obj = obj[key];
    if (typeof obj === 'undefined') {
      return;
    }
  })

  delete obj[lastKey];
};

export function deepMerge(...objs: any[]) {
  const [obj, obj2, ...otherObjs] = objs;
  const obj1 = obj;
  for (let key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (obj2[key] instanceof Object && obj1[key] instanceof Object) {
        if (Array.isArray(obj1[key])) {
          obj1[key] = obj2[key];
        } else {
          obj1[key] = deepMerge(obj1[key], obj2[key]);
        }
      } else {
        obj1[key] = obj2[key];
      }
    }
  }
  if (otherObjs && otherObjs.length > 0) deepMerge(obj1, ...otherObjs);
  return obj1;
}

