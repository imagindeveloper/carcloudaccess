# @imagindeveloper/carcloudaccess

Todo

---

## Table of Contents

- **[Configuration Files](#configuration-files)**

- **[Development Scripts](#development-scripts)**

  <details>
    <summary>Expand to see all development scripts available in ./package.json.</summary>

  - [build](#yarn-build)
  - [build-docs](#yarn-build-docs)
  - [build-dev](#yarn-build-dev)
  - [build-dev-dist](#yarn-build-dev-dist)
  - [build-dev-docs](#yarn-build-dev-docs)
  - [build-dev-ts](#yarn-build-dev-ts)
  - [clean-dev](#yarn-clean-dev)
  - [clean-dist](#yarn-clean-dist)
  - [clean-docs](#yarn-clean-docs)
  - [clean-dev-dist](#yarn-clean-dev-dist)
  - [clean-dev-docs](#yarn-clean-dev-docs)
  - [clean-dev-packageJson](#yarn-clean-dev-packagejson)
  - [cleanup](#yarn-cleanup)
  - [cleanup-everything](#yarn-cleanup-everything)
  - [copy-packageJsonToDev](#yarn-copy-packagejsontodev)
  - [release](#yarn-release)
  - [watch](#yarn-watch)
  - [watch-docs](#yarn-watch-docs)
  - [watch-tsc](#yarn-watch-tsc)
  - [watch-rollup](#yarn-watch-rollup)

</details>

- **[Project Structure](#project-structure)**

  - [Structure Overview](#structure-overview)

  - [Directories](#directories)
    - [bin](#bin)
    - [dev](#dev)
    - [dist](#dist)
    - [docs](#docs)
    - [docsSrc](#docssrc)
    - [src](#src)

- **[Build Your Package](#build-your-package)**

  - [Development Build](#development-build)
  - [Production Build](#production-build)

- **[Publish Your Package](#publish-your-package)**

  - [Prepare for release](#prepare-for-release)
  - [Release a new package version](#release-a-new-package-version)

---

---

## Configuration Files

Some files at the root project level are configuration files for various packages used in this template. I encourage you to open these up and at least skim through them. Play around and see how the process and build is affected when changing or adding config options.

| Package    | Config File       | Description                                                                                            | Prod | Dev |
| ---------- | ----------------- | ------------------------------------------------------------------------------------------------------ | :--: | :-: |
| Rollup     | rollup.config.ts  | Uses process.env.ROLLUP_WATCH = 'true' or 'false' to switch output location and other options          |  X   |  x  |
| Typescript | tsconfig.json     | Used for production builds                                                                             |  x   |     |
| Typescript | tsconfig.dev.json | Used for development builds                                                                            |      |  x  |
| JSDoc      | jsdoc.js          | Uses process.env.JSDOC_ENV = 'development' or 'production' to switch output location and other options |  x   |  x  |
| Babel      | .babelrc          | Used to transpile code in production and development                                                   |  x   |  x  |
| ESLint     | .eslintrc.js      | Used by our code editor to enforce code standards and styling                                          |      |  x  |
| Prettier   | .prettierrc       | Used by our code editor (VS Code) for styling our code                                                 |      |  x  |

---

---

## Development scripts

There are more scripts in the `./package.json` file than are listed here but these are the frequently used ones. Add your own or modify the existing ones if needed.

All of these commands are to be run in the terminal from the root project directory, and can be found in the `./package.json` file. You can also substitute `npm add` for `yarn` in the commands if you prefer to use NPM.

---

### `yarn build`

Builds the _production_ Rollup build and outputs to the `./dist` folder.

- Removes the contents of the `./dist` folder before each run

- This script is run automatically before every `yarn release`

---

### `yarn build-docs`

This will build the **production** documentation via JSDoc.

See [Production Documentation](#-production-documentation)

- Cleans all files from the `./docs` folder before each run.

- Outputs JSDoc build files to `./docs/`.

- See the `./jsdoc.js` config file to adjust the documentation options, output, plugins, templates, etc.

---

### `yarn build-dev`

Concurrently runs all of the **development** `yarn-dev-*` scripts.

---

### `yarn build-dev-dist`

Builds the _development_ Rollup outputs to the `./dev/dist` folder.

- Removes the contents of the `./dev/dist` folder before each run

- This script will run automatically before each run of `yarn release`

---

### `yarn build-dev-docs`

Builds the **development** version of the documentation via JSDoc

See [Documentation during Development](#-documentation-during-development)

- Cleans all files from the `./dev/docs` folder before each run.

- Outputs JSDoc build files to `./dev/docs/`

- See `./jsdoc.js` config file to adjust the documentation options, output, plugins, template, etc.

---

### `yarn build-dev-ts`

An alternative to [`yarn watch-tsc`](#yarn-watchtsc)

This script will run the Typescript compiler `tsc -p tsconfig.dev.json --module commonjs` and will output files to `./dist/lib`. Change the `outDir` option in `./tsconfig.dev.json` if you want it going to another folder.

Also, you can run the `tsc` command with no `-p` (configuration path) flag if you would like to use the default path to the _production_ `./tsconfig.json` Typescript config file. This will instead output Typescript build files to `./dist/lib/`. Remember that everything inside the `./dist` folder will be included as part of your NPM package. It's typically not necessary to include this `lib` folder in your final package so we only use `tsc` for debug purposes in _development_.

---

### `yarn clean`

Delete everything from the `./dev/` and `./dist/` folders.

---

### `yarn clean-dev`

Delete everything from the `./dev/` folder.

---

### `yarn clean-dist`

Delete everything from the `./dist/` folder.

---

### `yarn clean-docs`

Delete everything from the `./docs` folder

---

### `yarn clean-dev-dist`

This script will delete everything inside the `./dev/dist` folder.

---

### `yarn clean-dev-docs`

Delete everything from the `./dev/docs` folder.

---

### `yarn clean-dev-packageJson`

Delete the package.json copy from `./dev/package.json`.

---

### `yarn cleanup`

Deletes the copied `./dev/package.json`.

Completely removes the `./dist` and `./dist` folders.

---

### `yarn cleanup-everything`

Runs `yarn cleanup` and completely removes the `./node_modules/` folder and all contents of that folder.

---

### `yarn copy-packageJsonToDev`

First deletes `./dev/package.json` to start with a fresh file.

Then copies the root `package.json` into the `./dev` folder. Directly importing your package from the `./dev` folder will use the `main`, `module`, or `browser` keys from the `./dev/package.json` to better simulate a production package on NPM.

---

### `yarn release`

- will do the following, in listed order, to publish your package:
  - clean the `/dist/` folder
  - run `yarn build` script
  - run `yarn publish` script
  - ask for a new version number
  - publish the contents of the `./dist/` folder to both NPM and Yarn, using the value of `package.json.name` and the new version number
  - run `git push --tags` to update your repository with a commit tagged with the newest version

---

### `yarn watch`

This script will run the `watchAll.js` script located in the root `bin` directory and allow you to more easily watch all portions of the development process, reloading with file changes each time.

- Outputs development files to relevant sub-directories of the `./dev/` directory.
- will simultaneously run TSC, Rollup, and JSDoc in watch modes, watching for changes in the `./src`, `./docs` and `./docsSrc` folders, with all outputs going to the `./dev` folder.
- Under the hood this command runs the `watchAll.js` file found in the `/bin` folder. Feel free to modify that file if you want to adjust/add/remove any of the commands that are run concurrently.

> NOTE:
> This command is resource intensive and may be slow on older PCs. You may be better off either removing a few of the commands from the `bin/watchAll.js` script which this script implements, or running the individual watch scripts (`watch-docs` `watch-rollup` `watch-tsc`) themselves, in separate windows as needed.

---

### `yarn watch-docs`

Continuously rebuilds the documentation using JSDoc and Nodemon, and outputs files to `./dev/docs/`.

Watches the `./src` and `./docSrc` folders and rebuilds on changes.

Related configuration file: `./jsdoc.js`

---

### `yarn watch-tsc`

Continuously type checks your Typescript source code with `tsc --watch`.

Compiles the Typescript code and outputs the files to `./dev/lib/`.

Watches the `./src` folder and rebuilds on changes.

Related configuration file: `./tsconfig.dev.json`

---

---

## Project Structure

`!` - denotes a folder + sub-folders ignored by git (see `.gitignore` file) and not included when committing and pushing to a remote repository. You can safely delete or clear these folders before _committing and pushing to a remote repository_.

`*` - denotes a folder + sub-folders ignored when publishing to NPM/Yarn with `yarn release`. You can safely delete or clear these folders before _publishing your package_.

### Structure Overview

```none
## Folder Structure Overview ##

  bin/

  <!*>
  dev/
    dist/
      - development rollup build, mirrors root /dist folder structure

    docs/
      - production documentation build with JSDoc, considered part of source code.

    package.json
      - copy of the root package.json file,
      - simulates a final package so you can import directly from the ./dev folder

  <!>
  dist/
    - browser/
      - minified
      - single file

    - cjs/
      - CommonJs/Node)
      - code-split
      - module

    - module/
      - ESM Module
      - ES2015+
      - code-split
      - module

    - types/
      - Typescript `.d.ts` type definition files
      - auto populated from your ./src code

    - bundle.min.js
      - UMD (universal bundle)
      - browser and node
      - minified
      - single file

    - bundle.min.js.gz
      - UMD
      - Universal Bundle, browser and node
      - minified
      - gzipped

  docs/

  docsSrc/
    - static/
    - tutorials/

  src/
    - index.ts (main entry)
    - ... more source code

  README.md
    - home page of the documentation page and npmjs.com package

  package.json
    - scripts and package settings

  + various package configuration files []()

```

---

## Directories

### `bin`

A directory containing node helper scripts used in `package.json` scripts.

---

### `dev`

A directory which contains all of the output when running any of the development scripts in `package.json`

- Directory will not be created until the first time you run a development script that outputs here.

- Not included in the source code repository nor in the published package code

- Clear all folder contents via `yarn cleanDev`

---

### `dist`

A directory which contains all of the output from `yarn build` script in `package.json`.

This is also the directory that will be uploaded to NPM/Yarn when you publish your package with `yarn publish`.

- Directory will not be created until the first time you run the `build` script.

- Not included in the source code repository.

- Clear folder contents via `yarn clean-dist`

---

### `docs`

A directory containing the output from `yarn build-docs`

GitHub can automatically update your documentation site every time you push changes to this folder to your remote repository. Set this folder as the gh-pages source in your repository settings:

[See this GitHub help article for more information](https://help.github.com/en/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

- Clear folder contents via `yarn docs-clean`

---

### `docsSrc`

A directory containing static assets, tutorials, and anything else you would like to include when building the documentation files.

---

### `src`

A directory containing all source code typescript files.

---

## Build Your Package

This template utilizes the NPM module [Rollup](https://rollupjs.org/guide/en/) and various associated plugins in order to package your module into multiple formats (the 'universal' part of this template).

The build outputs to `./dist/` and is controlled via the `rollup.config.ts` config file.

By default this template is setup to output the following formats: `Default:UMD(Universal)` - `CJS(CommonJS/Node)` `ESM(ES Module)`. This and other options can be changed in the rollup config file.

A `types` folder is also output into `./dist/`, which will contain all of the Typescript type definition files (.d.ts) for your package. Change the output location in the `tsconfig.json` and/or `tsconfig.dev.json` Typescript config files.

### Development build

`yarn build-dev` or `yarn watch` or `yarn watch-rollup`

Will build the package with Rollup and output everything to `./dev/dist/`. A copy of the `./package.json` file will also be placed in the root of `./dev/` folder.

### Production build

`yarn build`

Will build the package with Rollup and output everything to `./dist/`. The contents of that folder are what gets uploaded to NPM and Yarn when you publish your package.

---

---

## Publish Your Package

### Prepare for release

Follow the steps listed [HERE](https://yarnpkg.com/lang/en/docs/publishing-a-package/) to get setup and ready to publish your package. You will need to be logged in to NPM with your credentials to be able to publish a package.

- Make sure you've setup your root `package.json` file

- Make sure you've setup your root `README.md` file

### Release a new package version

It is advised that you commit and push all of your source code to your remote repository before running the `release` script. If done correctly, the last 2 commits in your remote repo, after publishing, should be `<vX.X.X>` and then `<new source code commit>`.

This is a final step and the version number you choose is permanent, once published it cannot be changed. If you mess up or need to change something after publishing, you will have to bump the version (x.x.+1) by running `yarn release` again.

We recommend using the [yarn pack](https://yarnpkg.com/lang/en/docs/cli/pack/) or [yarn link](https://yarnpkg.com/lang/en/docs/cli/link/) commands to test local development before publishing.

**`yarn pack`** creates gzipped NPM package file

- creates a gzipped file identical to what will be uploaded to NPM as the final package contents. Use this to ensure you're uploading what you think you are to NPM, upon release.

**`yarn release`** to **publish** your package.

- This script will run `yarn build` before attempting to publish your package.
- You will be prompted to enter a new version number before publishing is completed. Once entered, the package.json "version" field will be changed to reflect the new version, saved, and git committed.
- After successfully publishing the package, `git push --tags` is run to push a commit to remote source with the new version as the commit name.
