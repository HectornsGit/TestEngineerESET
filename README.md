# ESET_LOG_COLLECTOR AUTOMATED TESTS

    Automated tests for "ESET Log Collector" using node 16 and nut.js

---

## Pre-requisites:

- [ESET_Log_Collector](https://www.eset.com/int/support/log-collector/) (english version).
- [ESET sysInspector](https://www.eset.com/es/soporte/sysinspector/).
- [Node version 16](https://nodejs.org/en/download/releases).
- [NPM](https://docs.npmjs.com/) (or YARN)
- [Node version manager(Optional)](https://github.com/coreybutler/nvm-windows)

## Dependencies:

- [nut.js](https://nutjs.dev/)
- [nut.js template matcher](https://nutjs.dev/plugins/template-matcher)

---

## Notes:

**Only works for the English version!**
**Developed for Windows10 cant ensure its correct operation in other windows OS!**

**Some of the test only work under certain conditions. (They are noted below)**
**If you have visual settings different from windows default preset, the tests WON'T work.**

---

## Instructions:

1. Drop **ESET_Log_Collector** and **sysInspector** in the **desktop** (I can't ensure if everything will work if these are in another directory).
1. Extract the zip files.
1. Open **start.bat** as **administrator**.
1. Run `npm install` and wait for the dependencies to install.
1. Open **ESET_Log_Collector** as **administrator** and keep the window visible at the side of the screen.
1. Run `node tests/<name_of_the_test>.js` **if you have no previous logs** add an "f" as an argument.
   E.g. `node tests/<name_of_the_test>.js f`
1. Await without using the mouse neither the keyboard before it ends.

---

## Test listing

### [test1] Default settings test.

- Test using **all presets set to its current value**.

### [test2] Logs age limit set to 1.

- Test using **current settings** and **logs age limit** set to **1**.

### [test3] collection profile set to "Threat detection".

- Test using **current settings** and **collection profile** set to **"Threat detection"**.
- This **test only works** if **Collection profile** is set to **Default**.

### [test4] Set collection profile to "All".

- Test using **current settings** and **collection profile** set to **"All"**.
- This test only works if Collection profile is set to Default

### [test5] Set output collection mode to "Filtered binary".

- Test using **current settings** and **output collection mode** set to **"Original binary from disk"**.
- This **test only works** if **output collection mode** is set to **"Original binary from disk"**

### [test6] Set up a password to the output files.

- Test using **current settings** checking the **"Protect archive by password checkbox"**.
- This **test only works** if **"Protect archive by password checkbox"** is **unchecked**.

### [test7] Set collection profile to "None".

- Test using **current settings** and **collection profile** set to **"None"**
- This **test only works** if **Collection profile** is set to **Default**.

### [test8] Set output directory to " ".

- Test using **current settings** and **output directory** set to **""**
- This **test only works** if **Collection profile** is **not** set to **"None"**.
