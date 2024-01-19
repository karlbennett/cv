window.byTag = (tagName) => (instance) => tagName === instance.type;
window.byAttributeName = (name) => (instance) => !!instance.props[name];