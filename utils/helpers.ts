import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { inspect as utilInspect } from "util";
import _slugify from "slugify";

export function inspect(data: any) {
  console.log(utilInspect(data, { showHidden: false, depth: null, colors: true }));
}

export function getDirname(importURL: string) {
  return dirname(fileURLToPath(importURL));
}

export function withDirname(importURL: string, path: string) {
  return join(getDirname(importURL), path);
}

export function slugify(str: string) {
  return _slugify(str.replace(/:/g, "").substring(0, 32), { replacement: "_", lower: true, trim: true, strict: true });
}
