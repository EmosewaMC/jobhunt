// open the locale file and save a handle to it, then add
// a function to translate a programmer side string to a
// user side string

import * as Locale from "../gameData/locale.json" with {
	type: "json",
};

const locale = JSON.parse(JSON.stringify(Locale.default))[0];

/// Translate a programmer side string to a user side string
/// @param programmerString - the string to translate
/// @param language - the language to translate to
/// @returns the translated string
/// NOTE: Returns the programmerString if the user's language is not found
/// or if the programmerString is not found
export function language_translate(programmerString: string, language: string) {
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
  if (!request) return programmerString;
  let acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return programmerString;
  if (acceptLanguage.length > 0) acceptLanguage = acceptLanguage.substring(0, 2);
  if (!acceptLanguage) return programmerString;

  return language_translate(programmerString, acceptLanguage);
}
