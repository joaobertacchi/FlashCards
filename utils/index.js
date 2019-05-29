// @flow

export function getValues <T:Object>(o: T): Array<$Values<T>> {
  return Object.values(o);
}

export default { getValues };
