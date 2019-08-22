"use babel";

import main from "./main";
import settings from "./settings";
import editorHelper from "./editor-helper";
import notificationHelper from "./notification-helper";
import fs from "fs";
import path from "path";
import process from "child_process";

export default {
  // formats the active text editor
  formatActiveTextEditor() {
      if ((editor = atom.workspace.getActiveTextEditor())) {
        if (editorHelper.hasCitronGrammar(editor) || settings.shouldIgnoreGrammar()) {
          this.formatTextEditor(editor, editorHelper.getSelectedRange(editor));
        } else {
          atom.notifications.addInfo(
            "Citron Formatter only formats Citron source code", {
              dismissable: false
            }
          );
        }
      }
    },

    // formats the given text editor
    formatTextEditor(editor, range = null) {
      try {
        const {
          status, stdout, stderr, error
        } = this.runFormat(
          editorHelper.getTextInRange(editor, range),
          editor
        );

        if (status == 0 && !error) {
          editorHelper.insertText(editor, range, stdout.toString());
          notificationHelper.dismissNotifications();
        } else {
          notificationHelper.showErrorNotifcation("Citron Formatter Error", {
            detail: stderr || error
          });
        }
      } catch (exception) {
        notificationHelper.showErrorNotifcation("Citron Formatter Exception", {
          detail: exception,
          stack: exception.stack
        });
      }
    },

    // runs mix format process and returns response
    runFormat(text, editor) {
      let command = "citron";
      let args = ["-ml", settings.maxLineLength(), "-il", settings.indentLength(),
        "--tidy", "-"
      ];
      let options = this.getCommandOptions(text, editor);

      if (settings.shouldRunSpeculatively()) {
        args.unshift('AST setSpeculative: 1');
        args.unshift('--qe');
      }

      if (!settings.shouldRunCitronDirectly()) {
        command = settings.getCitronPath();
        // args.unshift(settings.getCitronPath());
      }
      console.log(command, args, options);

      return process.spawnSync(command, args, options);
    },

    getCommandOptions(text, editor) {
      let options = {
        input: text
      };

      projectPath = main.getActiveTextEditorRootPath();
      if (projectPath && editor) {
        // set cwd to dir of nearest .formatter.exs file
        options.cwd = this.nearestFormatterConfig(projectPath, editor);
      }

      // batch files must executed in separate shell on Windows
      if (main.isWindowsPlatform()) {
        options.shell = true;
      }

      return options;
    },

    nearestFormatterConfig(projectPath, editor) {
      let currentPath = path.dirname(editor.getPath());

      while (currentPath != projectPath) {
        formatterPath = path.join(currentPath, ".formatter.ctr");
        if (fs.existsSync(formatterPath)) {
          return currentPath;
        }
        currentPath = path.dirname(currentPath);
      }

      return projectPath;
    }
};
