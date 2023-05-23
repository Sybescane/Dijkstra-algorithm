import { Graph } from "./graph.js";

const buttonAddVert = document.querySelector('#btn-add-vert');
const buttonAddEdge = document.querySelector('#btn-add-edge');
const buttonCreate = document.querySelector('#btn-create');
const firstVertEdge = document.querySelector('#from-vert-edge');
const lastVertEdge = document.querySelector('#to-vert-edge');
const weightEdge = document.querySelector('#weightEdge');
const firstVertPath = document.querySelector('#from-vert-path');
const lastVertPath = document.querySelector('#to-vert-path');
const field = document.querySelector("#field");

const graph = new Graph();
let count = 0

let cy = cytoscape({
   container: document.getElementById('field'),
   elements: [],
   style: cytoscape.stylesheet()
  .selector('edge')
      .css({   
         'width': 3,
         'line-color': '#ccc',
         'target-arrow-color': '#ccc',
         'target-arrow-shape': 'triangle',
         'curve-style': 'bezier',
         'label': 'data(label)',
         'font-size': '18px',
         'color': 'red'
      })
    .selector('node')
      .css({
        'content': 'data(id)',
        'text-valign': 'center',
        'color': 'white',
        'text-outline-width': 2,
        'text-outline-color': '#888',
        'background-color': '#888'
      })
    .selector(':selected')
      .css({
        'background-color': 'black',
        'line-color': 'black',
        'target-arrow-color': 'black',
        'source-arrow-color': 'black',
        'text-outline-color': 'black'
      }),
   })


function initApp(){
   // cy.add([
   //    { group: 'nodes', data: { id: 'n1' }, position: { x: 100, y: 100 },},
   //   { group: 'nodes', data: { id: 'n2' }, position: { x: 200, y: 200 }},
   //   { group: 'edges', data: { id: 'e1-2', source: 'n1', target: 'n2', label: 0 } }
   // ])
   // count = 2
   // graph.addVertex(1)
   // graph.addVertex(2)
   // graph.addEdge(1,2,0)
}
initApp()

buttonAddVert.addEventListener('click', () => {
   cy.add([
      { group: 'nodes', data: { id: 'n' + ++count }, position: { x: 100, y: 100 }}
   ])
   graph.addVertex(count)
})

buttonAddEdge.addEventListener('click', () => {
   const from = Number(firstVertEdge.value)
   const to = Number(lastVertEdge.value)
   const weight = Number(weightEdge.value) 

   if(graph.check(from, to)){
      try {
        cy.add({
            group: 'edges', data: {id: `e${from}-${to}`, source: 'n'+from, target: 'n'+to, label: weight}
         })
         graph.addEdge(from, to, weight)
      } catch (error) { 
         alert('This edge already exist')
      }
   }
})

buttonCreate.addEventListener('click', () => {
   const startVert = Number(firstVertPath.value)
   const finishVert = Number(lastVertPath.value)

   
   console.log(graph.vertices)
   console.log(graph.dijkstra(1))
})

