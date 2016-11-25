import _ from 'underscore';

function completement(pred) {
    return function() {
        return !pred.apply(null, _.toArray(arguments));
    }
}

console.log(123);
