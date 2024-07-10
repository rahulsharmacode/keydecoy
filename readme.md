# Token Decoy

The Token Decoy package is designed to enhance the security of tokens by generating decoy patterns and mutations. It splits tokens into chunks and manipulates the keys associated with these chunks, applying different patterns and mutations to protect the real tokens from being easily identified.

## Features

- Chunk Division: Split tokens into specified sizes.
- Key Mutation: Add prefixes or suffixes to keys.
- Pattern Encoding: Encode keys using various patterns.
- Pattern Decoding: Retrieve the original token chunks from encoded keys.
- Key and Value Mapping: Map parent keys to generated pattern chunks, including fake data for non-existent keys.


## Testing data
- const keys = [
    "a","b","c","d","e","f","g","h","i","j","l","l","m","n","o"
];
- const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIzMTMwMDY4LCJpYXQiOjE3MjA1MzgwNjgsImp0aSI6ImQ1MDg4M2M1NGNjYzQ3MzI4OTlhNDVkMzlmY2RiMWNlIiwidXNlcl9pZCI6MSwicm9sZSI6MX0.Ae9CGz9Cma2zGZ9EPOZO1sdfMb-IvqPDJfSAFZqjGWQ";
- const pattern = ["skip1","skip2","skip3","odd","even","serial","reverse"];
- const size = 5;

- generatePatternArray({keys : constant.keys , token : constant.token, pattern :constant.pattern[3], size :5, mutate: {state : true , content : "op",type : "SUFIX"} , });
- matchAndConcatenate({keys : constant.keys, pattern :constant.pattern[3], size :5 , patternArray : patternArray , mutate : {state : true , content : "op",type : "SUFIX"} });

## Installation

To install the Token Decoy package, use the following command:

```bash
npm install keydecoy

