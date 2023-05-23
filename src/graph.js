export class Graph {
   constructor(){
      this.vertices = {}
   }

   addVertex(value) {
      if (!this.vertices[value]) {
        this.vertices[value] = {};
      }
    }
    
    addEdge(v1, v2, cost) {
      if (!(v2 in this.vertices[v1])){
        this.vertices[v1][v2] = cost
      }
    }

   check(v1, v2){
      if(!(v1 in this.vertices) || !(v2 in this.vertices) || v1 == v2 ){
         alert('Incorrect data')
         return false

      }
      return true
   }

   // ToGraph(){
   //    let graph = []
   //    let entries = Object.entries(this.vertices)

   //    for (let i = 0; i < entries.length; i++) {
   //       graph[i] = []
   //       for (let j = 0; j < entries.length; j++) {
   //          graph[i].push(0)
   //       }
   //    }

   //    for (let i = 0; i < entries.length; i++) {
   //       let help = entries[i][1]
   //       help.forEach(el => {
   //          graph[i][el[0] - 1] = el[1]
   //       });
   //    }

   //    return graph
   // }

   findNearestVertex(distances, visited) {
      let minDistance = Infinity;
      let nearestVertex = null;
    
      Object.keys(distances).forEach(vertex => {
        if (!visited[vertex] && distances[vertex] < minDistance) {
          minDistance = distances[vertex];
          nearestVertex = vertex;
        }
      });
    
      return nearestVertex;
    }

   dijkstra(startVertex) {
      let graph = this.vertices
      let visited = {};
      let distances = {}; // кратчайшие пути из стартовой вершины
      let previous = {}; // предыдущие вершины
        
      let vertices = Object.keys(graph); // список вершин графа
      
      // по умолчанию все расстояния неизвестны (бесконечны)
      vertices.forEach(vertex => {
        distances[vertex] = Infinity;
        previous[vertex] = null;
      });
    
      // расстояние до стартовой вершины равно 0
      distances[startVertex] = 0;
    
      function handleVertex(vertex) {
        // расстояние до вершины
        let activeVertexDistance = distances[vertex]; 
        
        // смежные вершины (с расстоянием до них)
        let neighbours = graph[activeVertex];
        
        // для всех смежных вершин пересчитать расстояния
        Object.keys(neighbours).forEach(neighbourVertex => {
          // известное на данный момент расстояние
          let currentNeighbourDistance = distances[neighbourVertex];
          // вычисленное расстояние
          let newNeighbourDistance = activeVertexDistance + neighbours[neighbourVertex];
          
          if (newNeighbourDistance < currentNeighbourDistance) {
            distances[neighbourVertex] = newNeighbourDistance;
            previous[neighbourVertex] = vertex;
          }
        });
        
        // пометить вершину как посещенную
        visited[vertex] = 1;
      }
      
      // ищем самую близкую вершину из необработанных
      let activeVertex = this.findNearestVertex(distances, visited);
    
      // продолжаем цикл, пока остаются необработанные вершины 
      while(activeVertex) {
        handleVertex(activeVertex);
        activeVertex = this.findNearestVertex(distances, visited);
      }
      
      return { distances, previous };
    }
}