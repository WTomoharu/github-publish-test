const esbuild = require('esbuild')
const fs = require('fs-extra');

// remove old dist dir
fs.removeSync("./dist")

// build src
esbuild.build({
  entryPoints: ["index.js"],
  outbase: '.',
  outdir: './dist',

  platform: "node",
  target: ["node12"],
  format: "cjs",

  bundle: true,
  minify: false,
  sourcemap: "external",
}).then(() => {
  console.log(`build succeeded`);
}).catch(() => {
})

// copy static files
for (const file of [
  "package.json",
]) {
  fs.copySync(`./${file}`, `./dist/${file}`)
}
