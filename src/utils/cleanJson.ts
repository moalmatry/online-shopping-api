export default function cleanAndFormatJSON(input: string): string {
  // Remove unwanted characters
  const cleanedInput = input.replace(/[^a-zA-Z0-9{}[\]":,.\s]/g, '');

  // Parse the cleaned string into a JSON object
  const jsonObject = JSON.parse(cleanedInput);

  // Format the JSON object as a string with proper indentation
  const formattedJSON = JSON.stringify(jsonObject, null, 2);

  return formattedJSON;
}
