// Получаем все объекты из html
const buttonAdd = document.querySelector('#btn-add');
const buttonCreate = document.querySelector('#btn-create');
const firstVert = document.querySelector('#from-vert');
const lastVert = document.querySelector('#to-vert')
const field = document.querySelector(".field")

// массив вершин и счетчик для их номеров
let vertList = []
let vert_count = 0;


// Событие для создания вершины
buttonAdd.addEventListener("click", () => {
   let element = document.createElement("div");
   // событие для переноса вершины 
   element.addEventListener('mousedown', (event) => {
      element.style.position = 'absolute';
      element.style.zIndex = 1000;

      field.append(element);
      moveAt(event.pageX, event.pageY);

  
      function moveAt(pageX, pageY) {
         element.style.left = pageX - element.offsetWidth / 2 + 'px';
         element.style.top = pageY - element.offsetHeight / 2 + 'px';
      }

      function onMouseMove(event) {
         moveAt(event.pageX, event.pageY);
      }

      document.addEventListener('mousemove', onMouseMove);

      element.onmouseup = function() {
         document.removeEventListener('mousemove', onMouseMove);
         element.onmouseup = null;
      };
   })
   element.addEventListener('click', () => {
      
   })

   element.innerHTML = vert_count++;
   element.classList.add("vert");
   field.appendChild(element);
   vertList.push(element);
})


