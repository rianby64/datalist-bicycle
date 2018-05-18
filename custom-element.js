'use strict';
(() => {
  var lastId = 0;
  class MyBike extends HTMLElement {
    constructor() {
      super();
    }

    _turnToViewer(e) {
      var value = e.target.value;
      var found = [...this.master.list.options].find(option => option.value == value);
      if (found) {
        this.viewer.value = found.label;
      } else {
        this.viewer.value = '';
      }
      this.viewer.hidden = false;
      this.master.hidden = true;
    }

    _turnToMaster(e) {
      var label = e.target.value;
      var found = [...this.master.list.options].find(option => option.label == label);
      if (found) {
        this.master.value = found.value;
      }
      this.viewer.hidden = true;
      this.master.hidden = false;
      this.master.focus();
      this.master.select();
    }

    connectedCallback() {
      var datalistid = `${this.localName}-list-${++lastId}`;
      var datalist = document.createElement('datalist');
      this.master = document.createElement('input');
      this.viewer = document.createElement('input');

      this.viewer.addEventListener('click', this._turnToMaster.bind(this));
      this.master.addEventListener('change', this._turnToViewer.bind(this));
      this.master.addEventListener('blur', this._turnToViewer.bind(this));
      this.master.hidden = true;

      this.innerHTML = '';
      datalist.id = datalistid;
      this.master.setAttribute('list', datalistid);
      var df = document.createDocumentFragment();
      df.appendChild(datalist);
      df.appendChild(this.master);
      df.appendChild(this.viewer);
      this.appendChild(df);
    }
  }
  customElements.define("my-bike", MyBike);

})();
