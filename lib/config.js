"use babel";

export default {
  formatOnSave: {
    title: "Format on Save",
    description: "Automatically format files on save.",
    type: "string",
    enum: [
      { value: "always", description: "Always" },
      {
        value: "whenFormatterFilePresent",
        description:
          "Only if project includes a .formatter.exs file in its root"
      },
      { value: "never", description: "Never" }
    ],
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
    description:
      "Use a specific `citron` executable by providing its absolute path.",
    type: "string",
    default: "citron",
    order: 3
  }
};
