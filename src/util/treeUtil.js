/**
 * Flat nest tree data into flatten list. This is used for virtual list render.
 * @param treeNodeList Origin data node list
 */
export function convertTreeToList(treeNodeList) {
    const flattenList = [];

    function dig(list) {
        list.forEach((treeNode) => {
            flattenList.push(treeNode);
            treeNode.children && treeNode.children.length > 0 && dig(treeNode.children);
        })
    }

    dig(treeNodeList);

    flattenList.map(item => item.parentId = item.key.split('-').slice(0, -1).join('-'));
    flattenList[0].parentId = '-1'
    return flattenList;
}

/**
 * Transform flatten list into nest tree data. This is used for virtual list render.
 * @param flattenList Origin data flatten list
 */
export function convertListToTree(flattenList) {
    const treeNodeList = [];
    const length = flattenList.length;

    let record = {}, node;
    flattenList.forEach(item => {
        item.children = [];
        record[item.key] = item;
    });

    for (let i = 0; i < length; i++) {
        node = flattenList[i];
        if (node.parentId !== '-1') {
            record[node.parentId].children.push(node);
        } else {
            treeNodeList.push(node);
        }
    }

    return treeNodeList
}

/**
* Add child node to flatten list
* @param flattenData Origin data flatten list
* @param index Clicked parent node
*/
export function add(flattenData, index) {
    let num = 0;
    let last = '0';

    for (let i = 0; i < flattenData.length; i++) {
        if (index === flattenData[i].parentId) {
            last = flattenData[i].key.split('-').slice(-1);
            if (num <= Number(last)) {
                num = Number(last) + 1;
            }
        }
    }

    const currentIndex = `${index}-${num}`;
    const title = Number(num) + 1;

    flattenData.push({ key: `${currentIndex}`, title: `${title}-`, parentId: index })

    return flattenData
}

