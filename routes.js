var URL = require('url');

var Routes = function() {
    this._routes = {};
};

Routes.prototype.addRoute = function(name, url) {
    this._routes[name] = url;

    this.__defineGetter__(name, function() {
        return url;
    });
};

Routes.prototype.getRoute = function(name, values, qsParams, hashParam) {
    var r = this._routes[name];
    if ( arguments.length === 1 ) {
        return r;
    }

    values = values || {};
    qsParams = qsParams || {};

    var withValues = Object.keys(values).reduce(function(r, key) {
            return r.replace(':' + key, values[key]);
        }, r),
        andedQs = Object.keys(qsParams).map(function(k) { return encodeURIComponent(k) + '=' + encodeURIComponent(qsParams[k]); })
                        .reduce(function(a, b) { return a + '&' + b; }, ''),
        qs = andedQs.length > 0 ? '?' + andedQs : '';

    return URL.format({pathname: withValues, search: qs, hash: hashParam});
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
    app.helpers({'linkTo': self.getRoute.bind(self)});
};

module.exports = new Routes();
