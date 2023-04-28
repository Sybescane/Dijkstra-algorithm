// Получаем все объекты из html
const buttonAdd = document.querySelector('#btn-add');
const buttonCreate = document.querySelector('#btn-create');
const firstVert = document.querySelector('#from-vert');
const lastVert = document.querySelector('#to-vert');
const field = document.querySelector("#field");
const canvas = document.querySelector('#canvas');

// массив вершин и счетчик для их номеров
let vertList = [];
let vert_count = 0;

// Настройки canvas
let ctx = canvas.getContext('2d');

// Событие для создания вершины
buttonAdd.addEventListener("click", () => {
   let element = document.createElement("div");
   element.innerHTML = vert_count++;
   element.classList.add("vert");
   field.prepend(element);
   vertList.push(element);

   // событие для переноса вершины 
   element.addEventListener('mousedown', (event) => {
      let box = field.getBoundingClientRect();
      let limits = {
         top: box.top + element.offsetHeight /2,
         right: box.right - element.offsetWidth,
         bottom: box.bottom - element.offsetHeight,
         left: box.left + element.offsetWidth / 2
       };
      // (2) подготовить к перемещению:
      // разместить поверх остального содержимого и в абсолютных координатах
       element.style.zIndex = 1000;
       // переместим в body, чтобы мяч был точно не внутри position:relative
       document.body.append(element);
       // и установим абсолютно спозиционированный мяч под курсор

       moveAt(event.pageX, event.pageY);

       // передвинуть мяч под координаты курсора
      // и сдвинуть на половину ширины/высоты для центрирования
      function moveAt(pageX, pageY) {
         if(pageX > limits.right){
            element.style.left = limits.right + 'px';
         }
         else if (pageX > limits.left){
            element.style.left = pageX - element.offsetWidth / 2 + 'px';
         }
         if (pageY > limits.bottom){
            element.style.top = limits.bottom + 'px';
         }
         else if (pageY > limits.top){
            element.style.top = pageY - element.offsetHeight / 2 + 'px';
         }
      }

      function onMouseMove(e) {
         moveAt(e.pageX, e.pageY);
      }

      // (3) перемещать по экрану
      document.addEventListener('mousemove', onMouseMove);

      // (4) положить мяч, удалить более ненужные обработчики событий
      element.onmouseup = function() {
         document.removeEventListener('mousemove', onMouseMove);
         element.onmouseup = null;
      }
   });
})


