var Routes = function() {
    this._routes = {};
};

Routes.prototype.addRoute = function(name, url) {
    this._routes[name] = url;

    this.__defineGetter__(name, function() {
        return url;
    });
};

Routes.prototype.getRoute = function(name, values, qsParams) {
    var r = this._routes[name];
    if ( arguments.length === 1 ) {
        return r;
    }

    values = values || {};
    qsParams = qsParams || {};

    var withValues = Object.keys(values).reduce(function(key, r) {
            return r.replace(':' + key, values[key]);
        }, r),
        andedQs = Object.keys(qsParams).map(function(k) { return encodeURIComponent(k) + '=' + encodeURIComponent(qsParams[k]); })
                        .reduce(function(a, b) { return a + '&' + b; });
        withQs = withValues + (withValues.indexOf('?') === -1 ? '?' : '') + andedQs;

    return withQs;
};

Routes.prototype.allForPrefix = function(prefix) {
    var self = this,
        rs = {},
        regex = new RegExp('^' + prefix),
        newRoutes = new Routes();
    Object.keys(this._routes).forEach(function(r) {
        if ( regex.exec(self._routes[r]) ) {
            rs[r] = self._routes[r];
        }
    });

    newRoutes._routes = rs;
    return newRoutes;
};

Routes.prototype.exposeHelpers = function(app) {
    var self = this;
    app.helpers({'linkTo': function(name) { return self[name]; }});
};

module.exports = new Routes();
