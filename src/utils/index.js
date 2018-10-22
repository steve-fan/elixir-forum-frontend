import update from 'immutability-helper';
import * as R from 'ramda';

// 插入或更新列表中第一个属性名称对应的值与指定元素匹配的元素。
export function updateElem(list, propName, elem) {
    const index = R.findIndex(R.propEq(propName, elem[propName]))(list);

    if (index < 0) {
        return update(list, {$push: [elem]});
    }

    return R.update(index, elem, list);
}

export function removeElem(list, propName, elem) {
    const propEqual = R.propEq(propName, elem[propName])
    return R.reject(propEqual, list)
}
