import lunr from "lunr";

// The `require`s below are required for testing `ja`.
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("lunr-languages/lunr.stemmer.support")(lunr);
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("lunr-languages/tinyseg")(lunr);
// eslint-disable-next-line @typescript-eslint/no-var-requires
require(`lunr-languages/lunr.ja`)(lunr);

import { tokenize } from "./tokenize";

describe("tokenize", () => {
  test.each<[string, string[]]>([["Hello-World", ["hello", "world"]]])(
    "tokenize('%s', ['en']) should return %j",
    (text, tokens) => {
      expect(tokenize(text, ["en"])).toEqual(tokens);
    }
  );

  test.each<[string, string[]]>([
    [
      "População portuguesa é composta",
      ["população", "portuguesa", "é", "composta"],
    ],
  ])("tokenize('%s', ['en', 'pt']) should return %j", (text, tokens) => {
    expect(tokenize(text, ["en", "pt"])).toEqual(tokens);
  });

  test.each<[string, string[]]>([
    ["私は電車が好きです。", ["私", "は", "電車", "が", "好き", "です", "。"]],
  ])("tokenize('%s', ['ja']) should return %j", (text, tokens) => {
    expect(tokenize(text, ["ja"])).toEqual(tokens);
  });
});
