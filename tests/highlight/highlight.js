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
  "test no-op with collapsed selection": function() {
    var bot = this.editorBot;
    var initialHtml = "<p>^foo</p>";
    var initialHtmlWithoutSelection = "<p>foo</p>";
    bot.setHtmlWithSelection(initialHtml);
    bot.execCommand(cmdName);

    // we can't use getHtmlWithSelection here.
    // technically this places the caret inside a highlight span,
    // but if the user never types, the span will go away when actually retrieving editor data.
    var updatedContent = this.editorBot.editor.getData();
    assert.areSame(
      initialHtmlWithoutSelection,
      updatedContent,
      "nothing happens in a collapsed selection"
    );
  },
  "test multi element selection": function() {
    var bot = this.editorBot;
    bot.setHtmlWithSelection("<p>[foo</p><p>bar]</p>");

    bot.execCommand(cmdName);

    var updatedContent = bender.tools.getHtmlWithSelection(
      this.editorBot.editor
    );
    var expectedContent =
      '<p><span class="highlight">[foo</span></p>' +
      '<p><span class="highlight">bar]</span></p>';
    assert.areSame(expectedContent, updatedContent, "two spans created");
  },
  "test partial overlapping selection": function() {
    var bot = this.editorBot;
    bot.setHtmlWithSelection("<p>fo[o</p><p>b]ar</p>");

    bot.execCommand(cmdName);

    var updatedContent = bender.tools.getHtmlWithSelection(
      this.editorBot.editor
    );
    var expectedContent =
      '<p>fo<span class="highlight">[o</span></p>' +
      '<p><span class="highlight">b]</span>ar</p>';
    assert.areSame(expectedContent, updatedContent, "two spans created");
  }
});
