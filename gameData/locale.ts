// open the locale file and save a handle to it, then add
// a function to translate a programmer side string to a
// user side string

export const text = await Deno.readTextFile("gameData/locale.json");
const locale = JSON.parse(text);

/// Translate a programmer side string to a user side string
/// @param programmerString - the string to translate
/// @param language - the language to translate to
/// @returns the translated string
/// NOTE: Returns the programmerString if the user's language is not found
/// or if the programmerString is not found
export function _translate(programmerString: string, language: string) {
  let toReturn = programmerString;
  if (locale[programmerString]) toReturn = locale[programmerString][language];

  return toReturn;
}

/// Translate a programmer side string to a user side string
/// @param programmerString - the string to translate
/// @param request - the request object to get the user's language
/// @returns the translated string
/// NOTE: Returns the programmerString if the user's language is not found
/// or if the programmerString is not found
export function translate(programmerString: string, request: Request) {
  let acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return null;
  if (acceptLanguage.length > 0) acceptLanguage = acceptLanguage.substring(0, 2);
  if (!acceptLanguage) return null;

  return _translate(programmerString, acceptLanguage);
}
