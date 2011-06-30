var Routes = function() {
    this._routes = {};
}

Routes.prototype.addRoute = function(name, url) {
    this._routes[name] = url;

    this.__defineGetter__(name, function() {
        return url;
    });
}

Routes.prototype.getRoute = function(name) {
    return this._routes[name];
}

module.exports = new Routes();
