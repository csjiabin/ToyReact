"use strict";
class ElementWrapper {
  constructor(type) {
    this.type = type
    this.props = Object.create(null)
    this.children = []
    // this.root = document.createElement(type);
  }
  setAttribute(name, value) {
    // if (name.match(/^on([\s\S]+)$/)) {
    //   let eventName = RegExp.$1.replace(/^[\s\S]/, (s) => s.toLowerCase());
    //   this.root.addEventListener(eventName, value);
    // } else {
    //   if (name === "className") {
    //     name = "class";
    //   }
    //   this.root.setAttribute(name, value);
    // }
    this.props[name] = value
  }
  appendChild(vchild) {
    this.children.push(vchild)
    // let range = document.createRange();
    // if (this.root.children.length) {
    //   range.setStartAfter(this.root.lastChild);
    //   range.setEndAfter(this.root.lastChild);
    // } else {
    //   range.setStart(this.root, 0);
    //   range.setEnd(this.root, 0);
    // }
    // vchild.mountTo(range);
  }
  mountTo(range) {
    range.deleteContents();
    let element = document.createElement(this.type);
    for (const name in this.props) {
      let value = this.props[name];
      element.setAttribute(name, value);
      if (name.match(/^on([\s\S]+)$/)) {
        let eventName = RegExp.$1.replace(/^[\s\S]/, (s) => s.toLowerCase());
        element.addEventListener(eventName, value);
      }
      if (name === "className") {
        element.setAttribute("class", value);
      }
      element.setAttribute(name, value);
    }
    for (const child of this.children) {
      let range = document.createRange();
      if (element.children.length) {
        range.setStartAfter(element.lastChild);
        range.setEndAfter(element.lastChild);
      } else {
        range.setStart(element, 0);
        range.setEnd(element, 0);
      }
      child.mountTo(range);
    }
    range.insertNode(element);
  }
}

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content);
  }
  mountTo(range) {
    range.deleteContents();
    range.insertNode(this.root);
  }
}

export class Component {
  constructor() {
    this.children = [];
    this.props = Object.create(null);
  }
  setAttribute(name, value) {
    if (name.match(/^on([\s\S]+)$/)) {
      // console.log(RegExp.$1);
    }
    this.props[name] = value;
    this[name] = value;
  }

  mountTo(range) {
    this.range = range;
    this.update();
  }

  update() {
    // let placeholder = document.createElement("placeholder");
    // let range = document.createRange();
    // range.setStart(this.range.endContainer, this.range.endOffset);
    // range.setEnd(this.range.endContainer, this.range.endOffset);
    // range.insertNode(placeholder);
    
    // this.range.deleteContents();

    let vdom = this.render();
    vdom.mountTo(this.range);
    // placeholder.parentNode.removeChild(placeholder)
  }

  appendChild(vchild) {
    this.children.push(vchild);
  }
  setState(state) {
    let merge = (oldState, newState) => {
      for (const p in newState) {
        if (typeof newState[p] === "object" && newState[p] != null) {
          if (typeof oldState[p] !== "object") {
            if (newState[p] instanceof Array) {
              oldState[p] = [];
            } else {
              oldState[p] = {};
            }
          }
          merge(oldState[p], newState[p]);
        } else {
          oldState[p] = newState[p];
        }
      }
    };
    if (!this.state && state) {
      this.state = {};
    }
    merge(this.state, state);
    this.update();
  }
}

const createElement = (type, attributes, ...children) => {
  // console.log(arguments);
  let element;
  if (typeof type === "string") {
    element = new ElementWrapper(type);
  } else {
    element = new type();
  }
  for (const name in attributes) {
    element.setAttribute(name, attributes[name]);
  }
  let insertChildren = (children) => {
    for (let child of children) {
      if (typeof child === "object" && child instanceof Array) {
        insertChildren(child);
      } else {
        if (child === null || child === void 0) {
          child = "";
        }
        if (
          !(child instanceof Component) &&
          !(child instanceof ElementWrapper) &&
          !(child instanceof TextWrapper)
        ) {
          child = String(child);
        }
        if (typeof child === "string") {
          child = new TextWrapper(child);
        }
        element.appendChild(child);
      }
    }
  };
  insertChildren(children);
  return element;
};

const render = (vdom, element) => {
  let range = document.createRange();
  if (element.children.length) {
    range.setStartAfter(element.lastChild);
    range.setEndAfter(element.lastChild);
  } else {
    range.setStart(element, 0);
    range.setEnd(element, 0);
  }
  vdom.mountTo(range);
};

export default {
  Component,
  createElement,
  render,
};
