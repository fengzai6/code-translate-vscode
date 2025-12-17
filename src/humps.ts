/**
 * humps - Underscore-to-camelCase converter (and vice versa)
 * Copyright © 2012+ Dom Christie
 * Released under the MIT license.
 */

interface HumpsOptions {
  separator?: string;
  split?: RegExp;
  process?: (
    string: string,
    convert: (str: string) => string,
    options?: HumpsOptions
  ) => string;
}

const toString = Object.prototype.toString;

const isFunction = (obj: unknown): obj is Function => typeof obj === "function";
const isObject = (obj: unknown): obj is object => obj === Object(obj);
const isArray = (obj: unknown): obj is unknown[] =>
  toString.call(obj) === "[object Array]";
const isDate = (obj: unknown): obj is Date =>
  toString.call(obj) === "[object Date]";
const isRegExp = (obj: unknown): obj is RegExp =>
  toString.call(obj) === "[object RegExp]";
const isBoolean = (obj: unknown): obj is boolean =>
  toString.call(obj) === "[object Boolean]";
const isNumerical = (obj: unknown): boolean => {
  const num = Number(obj);
  return num === num;
};

function processKeys(
  convert: (key: string, options?: HumpsOptions) => string,
  obj: unknown,
  options?: HumpsOptions
): unknown {
  if (
    !isObject(obj) ||
    isDate(obj) ||
    isRegExp(obj) ||
    isBoolean(obj) ||
    isFunction(obj)
  ) {
    return obj;
  }

  if (isArray(obj)) {
    return obj.map((item) => processKeys(convert, item, options));
  }

  const output: Record<string, unknown> = {};
  for (const key in obj as Record<string, unknown>) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      output[convert(key, options)] = processKeys(
        convert,
        (obj as Record<string, unknown>)[key],
        options
      );
    }
  }
  return output;
}

function separateWords(string: string, options?: HumpsOptions): string {
  const separator = options?.separator || "_";
  const split = options?.split || /(?=[A-Z])/;
  return string.split(split).join(separator);
}

export function camelize(string: string): string {
  if (isNumerical(string)) {
    return string;
  }
  const result = string.replace(/[-_\s]+(.)?/g, (_, chr) =>
    chr ? chr.toUpperCase() : ""
  );
  return result.charAt(0).toLowerCase() + result.slice(1);
}

export function pascalize(string: string): string {
  const camelized = camelize(string);
  return camelized.charAt(0).toUpperCase() + camelized.slice(1);
}

export function decamelize(string: string, options?: HumpsOptions): string {
  return separateWords(string, options).toLowerCase();
}

function processor(
  convert: (str: string, options?: HumpsOptions) => string,
  options?:
    | HumpsOptions
    | ((
        str: string,
        convert: (s: string) => string,
        opts?: HumpsOptions
      ) => string)
): (string: string, options?: HumpsOptions) => string {
  const callback =
    options && typeof options === "object" && "process" in options
      ? options.process
      : options;

  if (typeof callback !== "function") {
    return convert;
  }

  return (string: string, opts?: HumpsOptions) =>
    callback(string, convert, opts);
}

export const humps = {
  camelize,
  decamelize,
  pascalize,
  depascalize: decamelize,
  camelizeKeys: (object: unknown, options?: HumpsOptions) =>
    processKeys(processor(camelize, options), object),
  decamelizeKeys: (object: unknown, options?: HumpsOptions) =>
    processKeys(processor(decamelize, options), object, options),
  pascalizeKeys: (object: unknown, options?: HumpsOptions) =>
    processKeys(processor(pascalize, options), object),
  depascalizeKeys: (object: unknown, options?: HumpsOptions) =>
    processKeys(processor(decamelize, options), object, options),
};

export default humps;
