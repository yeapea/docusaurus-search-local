import lunr from "lunr";

/**
 * Split a sentence to tokens.
 *
 * @param text - Text to be tokenized.
 * @param language - Languages used.
 *
 * @returns Tokens.
 */
export function tokenize(text: string, language: string[]): string[] {
  // Some languages have their own tokenizer.
  if (language.length === 1 && ["ja", "jp", "th"].includes(language[0])) {
    return ((lunr as any)[language[0]] as typeof lunr)
      .tokenizer(text)
      .map((token) => token.toString());
  }

  return text.toLowerCase().match(/[^-\s]+/g) || [];
}
