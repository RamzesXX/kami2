export default class Solver {
  constructor(field) {
    this.field = field;
    this.graph = this.fieldToGraph(field);
  }

  fieldToGraph(field) {
    field = field || this.field;

    const height = field.length;
    const width = field[0].length;
    let graph = {};

    for (var h = 0; h < height; h++) {
      for (var w = 0; w < width; w++) {
        let vertice = {
          color: field[h][w],
          adjacent: []
        };
        switch (w % 4) {
          case 0:
            if (w > 0) {
              vertice.adjacent.push(h * width + w - 1);
            }
            vertice.adjacent.push(h * width + w + 1);
            if (h < height - 1) {
              vertice.adjacent.push((h + 1) * width + w + 1);
            }
            break;

          case 1:
            if (h > 0) {
              vertice.adjacent.push((h - 1) * width + w - 1);
            }
            vertice.adjacent.push(h * width + w - 1);
            if (w < width - 1) {
              vertice.adjacent.push(h * width + w + 1);
            }
            break;

          case 2:
            if (h > 0) {
              vertice.adjacent.push((h - 1) * width + w + 1);
            }
            vertice.adjacent.push(h * width + w - 1);
            vertice.adjacent.push(h * width + w + 1);
            break;
          case 3:
            vertice.adjacent.push(h * width + w - 1);
            if (w < width - 1) {
              vertice.adjacent.push(h * width + w + 1);
            }
            if (h < height - 1) {
              vertice.adjacent.push((h + 1) * width + w - 1);
            }
            break;
        }
        graph[h * width + w] = vertice;
      }
    }

    return (this.graph = graph);
  }

  // We check all verices:
  // if it has adjacent with the same color we reconnect all adjacent verex  to it emove current
  simplifyGraph(graph) {
    graph = graph || this.graph;
    for (let key in Object.keys(graph)) {
      let vertice = graph[key];
      let acceptorId = vertice.adjacent.find(
        verticeId => vertice.color === graph[verticeId].color
      );

      if (acceptorId) {
        let acceptor = graph[acceptorId];

        acceptor.adjacent = [...acceptor.adjacent, ...vertice.adjacent].filter(
          verticeId => verticeId !== acceptorId
        );

        vertice.adjacent.forEach(verticeId => {
          let verticeForUpdate = graph[verticeId];
          if (verticeId != acceptorId) {
            verticeForUpdate.adjacent.push(acceptorId);
          }

          verticeForUpdate.adjacent = verticeForUpdate.adjacent.filter(
            (x, i, origin) => origin.indexOf(x) === i && x != key
          );
        });
        delete graph[key];
      }
    }
    console.log(graph);
    return graph;
  }
}
