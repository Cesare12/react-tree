import {
    convertTreeToList,
    convertListToTree
} from '../src/util/treeUtil'

it('convertListToTree - case1', () => {
    const tree = [{
        key: '0',
        title: '1-',
        children: [],
        parentId: '-1'
    }]
    const $list = convertTreeToList(tree);

    return expect(convertListToTree($list)).toEqual(tree)
});

it('convertListToTree - case2', () => {
    const tree = [{
        key: '0',
        title: '1-',
        children: [{
            key: '0-0',
            title: '1-',
            children: [],
            parentId: '0'
        }],
        parentId: '-1'
    }]
    const $list = convertTreeToList(tree);

    return expect(convertListToTree($list)).toEqual(tree)
});
