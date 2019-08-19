"use babel";

import main from "./main";
import { dirname, join } from "path";
import fs from "fs";

export default {
  // returns citronExecutable setting
  getCitronExecutableSetting() {
    return atom.config.get("atom-citron-formatter.citronExecutable");
  },

  // returns quoted citronExecutable path
  getCitronPath() {
    return this.quotePath(this.getCitronExecutableSetting());
  },

  // returns quoted mixExecutable path
  getMixPath() {
    return this.quotePath(
      join(dirname(this.getCitronExecutableSetting()), "mix")
    );
  },

  // double quote path if it contains spaces
  quotePath(path) {
    return /\s/g.test(path) ? `"${path}"` : path;
  },

  // returns true if project includes a .formatter.exs file
  isFormatterFilePresent() {
    const path = main.getActiveTextEditorRootPath();
    return path && fs.existsSync(join(path, ".formatter.exs"));
  },

  // returns true if package is enabled
  isPackageEnabled() {
    return !atom.packages.isPackageDisabled("atom-citron-formatter");
  },

  // returns true if files should be formatted on save
  shouldFormatOnSave() {
    switch (atom.config.get("atom-citron-formatter.formatOnSave")) {
      case "always":
        return true;
        break;
      case "whenFormatterFilePresent":
        return this.isFormatterFilePresent();
        break;
      default:
        return false;
    }
  },

  // returns true if citronExecutable setting has default value
  shouldRunCitronDirectly() {
    return this.getCitronExecutableSetting() === "citron";
  },

  upgradeSettings() {
    // remove mixExecutable setting (used prior to v0.3.0)
    atom.config.unset("atom-citron-formatter.mixExecutable");
  },

  maxLineLength() {
    return atom.config.get("atom-citron-formatter.maxLineLength");
  },

  indentLength() {
    return atom.config.get("atom-citron-formatter.indentLength");
  },

  shouldRunSpeculatively() {
    return atom.config.get("atom-citron-formatter.speculative");
  }
};
