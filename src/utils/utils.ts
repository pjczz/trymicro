export function deepClone(obj) {
  // 如果是基础类型（数字、字符串、布尔值、null、undefined）
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 如果是数组
  if (Array.isArray(obj)) {
    const arrCopy = [];
    for (let i = 0; i < obj.length; i++) {
      arrCopy[i] = deepClone(obj[i]);
    }
    return arrCopy;
  }

  // 如果是对象
  const objCopy = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      objCopy[key] = deepClone(obj[key]);
    }
  }
  return objCopy;
}
