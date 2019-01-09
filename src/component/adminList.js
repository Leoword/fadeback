var tableFactory = require('./table');

module.exports = function () {
    var allAdmin = $('#all-admin');

    allAdmin.append(tableFactory({
        serial: '序号',
        title: '标题',
        deal: '处理人员',
        'create-time': '创建时间'
    }));
}