// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

var removeCellFromArray = function(array, cell) {
    return _(array).reject(function(el) { return el.x === cell.x && el.y === cell.y; });
}
