export function formatIndian(num: number): string {
  // Convert the number to a string
  const numStr = num.toString();

  // Split on decimal point if present
  const [integerPart, decimalPart] = numStr.split(".");

  // Extract the last three digits
  const lastThree = integerPart.slice(-3);
  // Get the remaining digits (if any)
  let otherNumbers = integerPart.slice(0, -3);

  // Format the remaining digits in groups of two
  if (otherNumbers !== "") {
    // Insert commas every two digits from the right
    otherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + ",";
  }

  // Rejoin the parts and include the decimal part if it exists
  let formattedNumber = otherNumbers + lastThree;
  if (decimalPart) {
    formattedNumber += "." + decimalPart;
  }

  return formattedNumber;
}
