function dijkstra(graph, start, end) {
  const distances = {};
  const previous = {};
  const nodes = new PriorityQueue();

  for (let node in graph) {
      distances[node] = node === start ? 0 : Infinity;
      nodes.enqueue(node, distances[node]);
  }

  while (!nodes.isEmpty()) {
      const current = nodes.dequeue();
      if (current === end) {
          const path = [];
          let node = current;
          while (previous[node]) {
              path.push(node);
              node = previous[node];
          }
          return { distance: distances[end], path: path.concat(start).reverse() };
      }

      if (distances[current] === Infinity) {
          break;
      }

      for (let neighbor in graph[current]) {
          const alt = distances[current] + graph[current][neighbor];
          if (alt < distances[neighbor]) {
              distances[neighbor] = alt;
              previous[neighbor] = current;
              nodes.enqueue(neighbor, alt);
          }
      }
  }

  return null;
}

class PriorityQueue {
  constructor() {
      this.values = [];
  }

  enqueue(value, priority) {
      this.values.push({ value, priority });
      this.sort();
  }

  dequeue() {
      return this.values.shift().value;
  }

  isEmpty() {
      return this.values.length === 0;
  }

  sort() {
      this.values.sort((a, b) => a.priority - b.priority);
  }
}

function highlightVisitedNodes(visitedNodes) {
  for (const city in coordinates) {
      if (visitedNodes.includes(city)) {
          updateNodeStyle(city, 'visited-node');
      }
  }
}

function updateNodeStyle(city, className) {
  const nodes = document.getElementsByClassName('node');
  for (const node of nodes) {
      if (node.textContent === city) {
          node.classList.add(className);
      }
  }
}

// Resto del código...


function createNode(city, x, y) {
    const node = document.createElement('div');
    node.className = 'node';
    node.textContent = city;
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    document.getElementById('graph-container').appendChild(node);
}

function createEdge(startX, startY, endX, endY) {
    const edge = document.createElement('div');
    edge.className = 'line';
    edge.style.width = `${Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2)}px`;
    edge.style.transform = `rotate(${Math.atan2(endY - startY, endX - startX)}rad)`;
    edge.style.left = `${startX}px`;
    edge.style.top = `${startY}px`;
    document.getElementById('graph-container').appendChild(edge);
}

// Define el grafo de conexiones y distancias entre ciudades
const graph = {
    Madrid: { Bogota: 170, Barranquilla: 90, Medellin: 55, Bucaramanga: 67, Cali: 100 },
    Bogota: { SantaMarta: 150, Cucuta: 40, Armenia: 40, Popayan: 50 },
    Barranquilla: { SantaMarta: 15, Cucuta: 70, Armenia: 20, Popayan: 60 },
    Medellin: { SantaMarta: 70, Cucuta: 47, Armenia: 33, Popayan: 27 },
    Cali: { SantaMarta: 20, Cucuta: 38, Armenia: 10, Popayan: 40 },
    Bucaramanga: { SantaMarta: 98, Cucuta: 10, Armenia: 23, Popayan: 69 },
    Armenia: { Pereira: 60 },
    Popayan: { Pasto: 20 },
    Cucuta: { Arauca: 30 },
    SantaMarta: { Valledupar: 17 },
    Valledupar: {},
    Pereira: { Valledupar: 18 },
    Pasto: { Valledupar: 15 },
    Arauca: { Valledupar: 20 },
};

// Coordenadas para posicionar los nodos
const coordinates = {
  Madrid: { x: 50, y: 358 },
  Bogota: { x: 200, y: 180 },
  Barranquilla: { x: 200, y: 270 },
  Medellin: { x: 200, y: 357 },
  Cali: { x: 200, y: 450 },
  Bucaramanga: { x: 200, y: 540 },
  Armenia: { x: 370, y: 190 },
  Popayan: { x: 370, y: 290 },
  Cucuta: { x: 370, y: 500 },
  Pereira: { x: 530, y: 228 },
  SantaMarta: { x: 370, y: 400 },
  Valledupar: { x: 700, y: 358 },
  Pasto: { x: 530, y: 320 },
  Arauca: { x: 530, y: 470 },
};


// Crear nodos en la página
for (const city in coordinates) {
    createNode(city, coordinates[city].x, coordinates[city].y);
}


  const startNode = 'Madrid';
  const endNode = 'Valledupar';
  
  const result = dijkstra(graph, startNode, endNode);
  const resultDiv = document.getElementById('result');

  if (result) {
    resultDiv.innerHTML = `<p>La distancia más corta desde ${startNode} a ${endNode} es: ${result.distance} km</p>`;
    resultDiv.innerHTML += `<p>Camino: ${result.path.join(' -> ')}</p>`;
    highlightVisitedNodes(result.path);
} else {
    resultDiv.innerHTML = `<p>No se encontró un camino desde ${startNode} a ${endNode}</p>`;
}
  