import React from 'react';
import marked from 'marked';

export default class Markdown extends React.Component {
  getMarkdownText(markdown) {
    var rawMarkup = marked(markdown, { sanitize: true });
    return { __html: rawMarkup };
  }
  render() {
    return (
      <div
        dangerouslySetInnerHTML={this.getMarkdownText(
          this.props.markdown,
        )}
      />
    );
  }
}
