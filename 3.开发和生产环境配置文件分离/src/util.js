import _ from 'lodash'


function print() {
    const res = _.join([1, 2, 2, 3, 4.5], '-');
    console.log(res);
}

export {print}
