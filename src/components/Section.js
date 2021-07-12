export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem = (item) => {
    this._container.prepend(item);
  }

  _clear = () => {
    this._container.innerHTML = '';
  }

  renderItems = (items) => {
    this._clear();
    items.forEach(item => this._renderer(item));
  }
}
