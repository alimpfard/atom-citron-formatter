"use babel";

export default {
  formatOnSave: {
    title: "Format on Save",
    description: "Automatically format files on save.",
    type: "string",
    enum: [{
      value: "always",
      description: "Always"
    }, {
      value: "whenFormatterFilePresent",
      description: "Only if project includes a .formatter.exs file in its root"
    }, {
      value: "never",
      description: "Never"
    }],
    default: "always",
    order: 1
  },
  showErrorNotifications: {
    title: "Show Error Notifications",
    description: "Show error notifications when formatting fails.",
    type: "boolean",
    default: true,
    order: 2
  },
  citronExecutable: {
    title: "Citron Executable",
    description: "Use a specific `citron` executable by providing its absolute path.",
    type: "string",
    default: "citron",
    order: 3
  },
  maxLineLength: {
    title: "Max Preferred Line length (might get ignored)",
    type: 'integer',
    default: 80,
    order: 4
  },
  indentLength: {
    title: "Indent Size (in spaces)",
    type: 'integer',
    default: 2,
    order: 5
  },
  speculative: {
    title: "Enable speculative parse (will attempt to fix incorrect code)",
    type: 'boolean',
    default: false,
    order: 6
  },
  anygrammar: {
    title: "Allow the formatter to try format any grammar (this is usually a bad idea)",
    type: 'boolean',
    default: false,
    order: 7
  }
};
