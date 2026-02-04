// convert prisma object into regular js object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

// format number with decimal places
export function formateNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split(".");

  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}

// check price with two decimal places
export function isValidAmount(str: string) {
  const parts = str.split(".");
  if (
    parts[0].length === 0 ||
    !parts[0].split("").every((c) => c >= "0" && c <= "9")
  ) {
    return false;
  }

  if (parts.length === 2) {
    if (
      parts[1].length !== 2 ||
      !parts[1].split("").every((c) => c >= "0" && c <= "9")
    ) {
      return false;
    }
  } else if (parts.length > 2) {
    return false;
  }

  return true;
}
