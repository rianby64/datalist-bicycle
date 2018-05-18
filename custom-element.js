'use strict';
(() => {

  var lastId = 0;
  class MyBike extends HTMLElement {
    constructor() {
      super();
      lastId++;
    }
    connectedCallback() {
      var datalist = document.createElement('datalist');
      datalist.id = 'my-list';
      var master = document.createElement('input');
      master.setAttribute('list', 'my-list');
      var viewer = document.createElement('input');

      var toggle = e => {
        var value = e.target.value;
        var found = [...master.list.options].find(option => option.value == value);
        if (found) {
          viewer.value = found.label;
        } else {
          viewer.value = '';
        }
        viewer.hidden = false;
        master.hidden = true;
      };

      viewer.addEventListener('click', e => {
        var label = e.target.value;
        var found = [...master.list.options].find(option => option.label == label);
        if (found) {
          master.value = found.value;
        }
        viewer.hidden = true;
        master.hidden = false;
        master.focus();
        master.select();
      });
      master.addEventListener('change', toggle);
      master.addEventListener('blur', toggle);
      master.hidden = true;

      var opt1 = document.createElement('option');
      opt1.setAttribute('value', 1);
      opt1.setAttribute('label', 'my label1');
      datalist.appendChild(opt1);

      this.innerHTML = '';
      var df = document.createDocumentFragment();
      df.appendChild(datalist);
      df.appendChild(master);
      df.appendChild(viewer);
      this.appendChild(df);
    }
  }
  customElements.define("my-bike", MyBike);

})();
