# Advent of Code 2020

## Setup
I'm writing this for [deno] in Sublime Text, and I haven't found a Sublime extension for Deno. As such, you need to generate `deno-runtime.d.ts` for the regular TypeScript Language Server to know about Deno's built-ins:

```sh
deno types >deno-runtime.d.ts
```

[deno]: https://deno.land/