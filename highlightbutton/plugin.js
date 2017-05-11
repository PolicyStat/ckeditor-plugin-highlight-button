"use strict";
(function() {
  CKEDITOR.plugins.add("highlightbutton", {
    requires: "toolbar",
    hidpi: true,
    icons: "highlightbutton",
    highlightStyleDef: {
      name: "Highlight",
      element: "span",
      attributes: { class: "highlight" }
    },
    init: function(editor) {
      var highlightStyle = new CKEDITOR.style(this.highlightStyleDef);
      var commandName = "highlight";
      editor.addCommand(commandName, new CKEDITOR.styleCommand(highlightStyle));

      editor.attachStyleStateChange(highlightStyle, function(state) {
        !editor.readOnly && editor.getCommand(commandName).setState(state);
      });

      editor.ui.addButton &&
        editor.ui.addButton("highlightButton", {
          label: "Highlight",
          command: commandName
        });
    }
  });
})();
