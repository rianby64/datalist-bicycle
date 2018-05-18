'use strict';
(() => {

  class MyBike extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.innerHTML = `
      <input value="value 1">
      <input list="mylist" name="l" hidden>
      <datalist id="mylist">
        <option value="1">value 1</option>
        <option value="2">value 2</option>
        <option value="3">value 3</option>
        <option value="4">value 4</option>
        <option value="5">value 5</option>
      </datalist>`;

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

      var viewer = this.querySelector('input:nth-child(1)');
      var master = this.querySelector('input:nth-child(2)');
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
    }
  }
  customElements.define("my-bike", MyBike);

})();
