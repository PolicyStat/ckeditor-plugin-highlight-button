/* bender-tags: editor,unit */
/* bender-ckeditor-plugins: highlightbutton,toolbar */

bender.editor = { config: {} };

var cmdName = "highlight";

bender.test({
  "test basic highlight": function() {
    var bot = this.editorBot;
    bot.setHtmlWithSelection("<p>[foo]</p>");

    bot.execCommand(cmdName);

    var updatedContent = bender.tools.getHtmlWithSelection(
      this.editorBot.editor
    );
    var expectedContent = '<p><span class="highlight">[foo]</span></p>';
    assert.areSame(
      expectedContent,
      updatedContent,
      "inside of p was highlighted"
    );
  },
  "test no-op with collapsed selection": function() {},
  "test multi element selection": function() {},
  "test partial overlapping selection": function() {}
});
