const React = require("react");

// Reps
const { isGrip, cropString } = require("./rep-utils");
const { MODE } = require("./constants");

// Shortcuts
const DOM = React.DOM;

/**
 * Renders DOM #text node.
 */
let TextNode = React.createClass({
  displayName: "TextNode",

  propTypes: {
    object: React.PropTypes.object.isRequired,
    // @TODO Change this to Object.values once it's supported in Node's version of V8
    mode: React.PropTypes.oneOf(Object.keys(MODE).map(key => MODE[key])),
  },

  getTextContent: function (grip) {
    return cropString(grip.preview.textContent);
  },

  getTitle: function (grip) {
    const title = "#text";
    if (this.props.objectLink) {
      return this.props.objectLink({
        object: grip
      }, title);
    }
    return title;
  },

  render: function () {
    let {
      object: grip,
      mode = MODE.SHORT,
    } = this.props;

    let baseConfig = {className: "objectBox objectBox-textNode"};
    if (this.props.onDOMNodeMouseOver) {
      Object.assign(baseConfig, {
        onMouseOver: _ => this.props.onDOMNodeMouseOver(grip)
      });
    }

    if (this.props.onDOMNodeMouseOut) {
      Object.assign(baseConfig, {
        onMouseOut: this.props.onDOMNodeMouseOut
      });
    }

    if (mode === MODE.TINY) {
      return DOM.span(baseConfig, this.getTitle(grip));
    }

    return (
      DOM.span(baseConfig,
        this.getTitle(grip),
        DOM.span({className: "nodeValue"},
          " ",
          `"${this.getTextContent(grip)}"`
        )
      )
    );
  },
});

// Registration

function supportsObject(grip, type) {
  if (!isGrip(grip)) {
    return false;
  }

  return (grip.preview && grip.class == "Text");
}

module.exports = {
  rep: TextNode,
  supportsObject: supportsObject
};
