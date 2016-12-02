import _ from 'underscore';

function complement(PRED) {
    return function (...args) {
        return !PRED.apply(null, args);
    };
}

function isEven(n) {
    return (n % 2) === 0;
}

function plucker(FIELD) {
    return function(obj) {
        return (obj && obj[FIELD]);
    };
}

function finder(valueFun, bestFun, coll) {
    return _.reduce(coll, function(best, current) {
        var bestValue = valueFun(best);
        var currentValue = valueFun(current);
        return (bestValue === bestFun(bestValue, currentValue)) ? best: current;
    });
}

function repeat(times, VALUE) {
    return _.map(_.range(times), function() {
        return VALUE;
    })
}

function iterateUntil(func, checkFunc, init) {
    var data = [];
    var result = func(init);

    while (checkFunc(result)) {
        data.push(result);
        result = func(result);
    }

    return data;
}

function always(VALUE) {
    return function() {
        return VALUE;
    }
}

function existy(x) { return x != null }

function truthy(x) { return (x !== false) && existy(x) }

function doWhen(cond, action) {
    if(truthy(cond))
        return action();
    else
        return undefined;
}

function invoker(NAME, METHOD) {
    return function(target) {
        if (!existy(target)) {
            fail('must provide a target');
        }

        var targetMethod = target[NAME];
        var args = _.rest(arguments);

        return doWhen((existy(targetMethod) && METHOD === targetMethod), function() {
            return targetMethod.apply(target, args);
        });
    }
}

var rev = invoker('reverse', Array.prototype.reverse);

Array.prototype.reverse = function() {}

console.log(
    _.map([[1,2,3]], rev),
    _.map([[1,2,3]], function(value) {
        return value.reverse();
    })
    // f() === g()
    // iterateUntil(function(n) { return n + n; }, function(n) { return n <= 1024 }, 1)

);





if (module.hot) {
    module.hot.accept();
}
