var Routes = function() {
    this._routes = {};
};

Routes.prototype.addRoute = function(name, url) {
    this._routes[name] = url;

    this.__defineGetter__(name, function() {
        return url;
    });
};

Routes.prototype.getRoute = function(name) {
    return this._routes[name];
};

Routes.prototype.exposeHelpers = function(app) {
    var self = this;
    app.helpers({'linkTo': function(name) { return self[name]; }});
};

module.exports = new Routes();
