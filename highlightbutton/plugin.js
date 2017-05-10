"use strict";
(function() {
  CKEDITOR.plugins.add("highlightbutton", {
    requires: "toolbar",
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

      // Add toolbar button for this command.
      editor.ui.addButton &&
        editor.ui.addButton("highlightButton", {
          label: "Highlight",
          // toolbar: 'insert,10'
          // You may want to set some icon here.
          // icon: 'someIcon'
          command: commandName
        });
    }
  });
})();
