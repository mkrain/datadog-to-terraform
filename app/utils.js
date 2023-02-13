function literalString(value) {
  if (typeof value === "string") {
    if (value.includes("\n")) {
      return `<<EOF\n${value}\nEOF`;
    }
    return `"${value}"`;
  } else if (Array.isArray(value)) {
    let result = "[";
    value.forEach((elem, index) => {
      result += literalString(elem);
      if (index !== value.length - 1) result += ",";
    });
    return result + "]";
  }
  return value;
}

export function assignmentString(key, value) {
  if (value === null) return "";
  const displayValue = literalString(value);
  return `\n${key} = ${displayValue}`;
}

export function map(contents, converter) {
  let result = "";
  Object.entries(contents).forEach(([key, value]) => {
    result += converter(key, value);
  });
  return result;
}

export function block(name, contents, converter) {
  return `\n${name} {${map(contents, converter)}\n}`;
}

export function blockList(array, blockName, contentConverter) {
  let result = "";
  array.forEach((elem) => {
    result += block(blockName, elem, contentConverter);
  });
  return result;
}

export function convertFromDefinition(definitionSet, k, v) {
  if (typeof definitionSet[k] !== "function") {
    const message = `Can't convert key '${k}' for '${definitionSet.toString().match(/ (\w+)/)[1]}' with value ${JSON.stringify(v)}`;
    console.log(`${message}`);
    return "";
  };
  return definitionSet[k](v);
}
