How to translated text to Job Hunt
1. Open locale.json in your favorite text editor
2. Give a programmer facing name for the text to be translated. This text should ideally be all caps and use snake case (LIKE_THIS).
3. Add the translation of the programmer string to what the user would see.  There should be 1 for each language.
4. Call `translate(LIKE_THIS, request)` to translate your text.
5. If 4 failed and you see your programmer text as an end user, check that your text is correctly added to the locale.json and that the server has picked up on the changes.

How to add a language to Job Hunt
1. Add the general locale string to the SupportedLanguages object
2. In every programmer string translation, add your general locale string followed by the text that should be shown when that text is translated
3. Double check that your language exists in all possible programmer strings.  Missing text will result in the programmer string showing up instead.
