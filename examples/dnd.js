~function(){
  var dnd = {

  on: function( expression, config ) {

    var els = document.querySelectorAll(expression);

    [].forEach.call(els, function (el) {

      el.addEventListener('dragstart', function (e) {
        e.dataTransfer.effectAllowed = 'move';
        config.start ? config.start(this, e) : 0;
      }, false);

      el.addEventListener('dragenter', function (e) {
        config.enter ? config.enter(this, e) : 0;
      }, false);

      el.addEventListener('dragover', function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        config.over ? config.over(this, e) : 0;
      }, false);

      el.addEventListener('dragleave', function (e) {
        config.leave ? config.leave(this, e) : 0;
      }, false );

      el.addEventListener('drop', function (e) {
        e.stopPropagation();
        e.preventDefault();
        config.drop ? config.drop(e.dataTransfer, this, e) : 0;
      }, false);

      el.addEventListener('dragend', function (e) {
        config.end ? config.end(this, e) : 0;
      }, false);
    });
  }
};

var uid = 1;

var dealType = {
  drag_box: {value: 1, name: 'drag_box'}, 
  drag_switch: {value: 2, name: 'drag_switch'}, 
  drag_container: {value: 3, name: 'drag_container'}, 
  drag_trash: {value: 4, name: 'drag_trash'}
};

function addEvent(type){
  dnd.on('.' + type.name, {
    'start': function (el, e) {
      el.style.opacity = '0.4';

      dndEl = el;
      if(el && el.attributes['dnd-id'])
      e.dataTransfer.setData('text/html', el.attributes['dnd-id'].value);
    },
    'enter': function (el) {
      el.classList.add('dropping');
    },
    'leave': function (el) {
      el.classList.remove('dropping');
    },
    'drop': function (data, el, e) {
      if(type.value == dealType.drag_box.value)
      {
        if (dndEl != el) {
          dndEl.innerHTML = el.innerHTML;
          el.innerHTML = data.getData('text/html');
        }
        el.classList.remove('dropping');
      }
      else if(type.value == dealType.drag_switch.value)
      {
        if (dndEl != el) {
          dndEl.innerHTML = el.innerHTML;
          el.innerHTML = data.getData('text/html');
        }
        el.classList.remove('dropping');
      }
      else if(type.value == dealType.drag_container.value)
      {
        if (dndEl != el) {
          var len = el.childNodes.length;
          var pos = 0;
          var i = 0;
          for(i = 0; i < len; i++)
          {
            if(el.childNodes[i].offsetTop + el.childNodes[i].clientHeight > e.y)
            {
              pos = i;
              break;
            }
          }
          pos = i;
          //e2 = document.getElementById('from_' + data.getData('text/html'));
          // console.dir(data.getData('text/html'));
          e2 = document.querySelectorAll("[dnd-id=" + data.getData('text/html') + "]")
          e2 = e2[0];
          e2.style.opacity = '1';
          e2.style.className = 'drag_switch';
          //el.innerHTML = el.innerHTML + e2.outerHTML;
          
          // el.appendChild(e2.cloneNode(true));
          var newNode = e2.cloneNode(true);
          newNode.attributes.uuid = uid++;
          el.insertBefore(newNode, el.childNodes[pos]);
          // console.dir(el.childNodes);
        }
        el.classList.remove('dropping');
      }
      else if(type.value == dealType.drag_trash.value)
      {
        if (dndEl != el && dndEl.className != 'drag_box') {
          dndEl.style.opacity = '1';
          // e2.parentNode.removeChild(e2);
          // dndEl.removeChild(e2);
          dndEl.innerHTML = '';
        }
        el.classList.remove('dropping');
      }
    },
    'end': function (el) {
      el.style.opacity = '1';
    }
  });
}

addEvent(dealType.drag_box);
addEvent(dealType.drag_switch);
addEvent(dealType.drag_container);
addEvent(dealType.drag_trash);

}();