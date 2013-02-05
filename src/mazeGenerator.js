var MazeGenerator = function(rows, cols) {
  this.graph = new Graph(rows, cols);
  this.cellStack = [];
  this.path      = [];

  var self = this;

  var recurse = function(cell) {
    cell.visit();
    var neighbors = self.graph.cellUnvisitedNeighbors(cell);
    if(neighbors.length > 0) {
      var randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
      self.cellStack.push(cell);
      self.graph.removeEdgeBetween(cell, randomNeighbor);
      recurse(randomNeighbor);
    }
    else {
      var waitingCell = self.cellStack.pop();
      if(waitingCell) {
        recurse(waitingCell);
      }
    }
  };
 
  var solve = function(cell) {
    if (cell.marked === true) { return false; }

    if (cell === self.graph.getCellAt(self.graph.width - 1, self.graph.height - 1)) { 
        self.path.push(cell);
        return true;
    }

    cell.marked = true;
    self.path.push(cell);

    var paths = self.graph.cellDisconnectedNeighbors(cell);
    for (var i = 0; i < paths.length; i++) {
      if (solve(paths[i]) === true) {
        return true;
      }
    }
    
    cell.marked = false;
    self.path = removeCellFromArray(self.path, cell);
    return false;
  }

  this.getSolution = function() {
    self.path     = [];
    var startCell = this.graph.getCellAt(0,0);      
    solve(startCell);
  };

  this.generate = function() {
    var initialCell = this.graph.getCellAt(0, 0);
    recurse(initialCell);
  };
};
