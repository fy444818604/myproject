/**
 * Created by Administrator on 2018-04-02.
 */
exports.getTree = function(list, parentId){
    var re = new Array();
    for (var i = 0; i < list.length; i++) {
        var pid = list[i].pid;
        if (pid == parentId) {
            var child = exports.getTree(list, list[i].id);
            if (child.length > 0) {
                list[i].children = child;
            }
            re.push(list[i]);
        }
    }
    return re;
}

/**
 * 树状的算法
 * @params list     代转化数组
 * @params parentId 起始节点
 */
function getTrees(list, parentId) {
    var items = {};
    for (var i = 0; i < list.length; i++) {
        var key = list[i].pid;
        if (items[key]) {
            items[key].push(list[i]);
        } else {
            items[key] = [];
            items[key].push(list[i]);
        }
    }
    return formatTree(items, parentId);
}

function formatTree(items, parentId) {
    var result = [];
    if (!items[parentId]) {
        return result;
    }
    for (var t in items[parentId]) {
        var children = formatTree(items, items[parentId][t].id);
        if(children.length > 0){
            items[parentId][t].children = formatTree(items, items[parentId][t].id)
        };
        result.push(items[parentId][t]);
    }
    return result;
}