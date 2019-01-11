var _ = require('underscore');

var tableFactory = require('./table');
var createPagenation = require('./pagenation');

var ajax = require('../util/ajax');

module.exports = function () {
    var allAdmin = $('#all-admin');

    allAdmin.append(tableFactory({
        username: '用户名',
        name: '姓名',
        admin: '管理员',
        'give-admin': '操作'
    }));

    adminComponent.getAdminList();
}

var adminComponent = {
    adminList: [],
    currentNumber: 1,
    getAdminList() {
        ajax(`/api/admin/user?timestamp=${new Date().getTime()}`, 'get', {
            success(res) {
                adminComponent.adminList = _.map(res, function (item, index) {
                    return {
                        serial: index + 1,
                        id: item.id,
                        username: item.account,
                        name: item.name,
                        isAdmin: item.isAdmin
                    }
                });

                adminComponent.filterUser();
                adminComponent.filteredResult();
            }
        })
    },
    renderTable(list) {
        var adminTable = $('#all-admin table tbody');
    
        adminTable.empty();

        _.each(list, function (user) {
            adminTable.append(`
                <tr>
                    <td class="pointer username" data-click="true">
                        <div><a>${user.username}</a></div>
                    </td>
                    <td class="name"><div>${user.name}</div></td>
                    <td class="admin"><div>${user.isAdmin ? '是' : '否'}</div></td>
                    <td class="give-admin"><div>${user.isAdmin ? `<button class="danger" data-operate="delete"  data-retrive="${user.id}">删除</button>` :
                        `<button class="success" data-operate="give" data-retrive="${user.id}">赋予</button>`}</div></td>
                </tr>
            `)
        });

        
        adminComponent.addAdmin();
        adminComponent.deleteAdmin();
    },
    deleteAdmin() {
        var deleteBtn = $('#all-admin table tbody tr td button[data-operate="delete"]');

        deleteBtn.click(function (event) {
            var userId = $(event.currentTarget).attr('data-retrive');

            adminComponent.updateAdmin(userId, false);
        });
    },
    addAdmin() {
        var addeBtn = $('#all-admin table tbody tr td button[data-operate="give"]');

        addeBtn.click(function (event) {
            var userId = $(event.currentTarget).attr('data-retrive');

            adminComponent.updateAdmin(userId, true);
        });
    },
    updateAdmin(accountId, isAdmin) {
        ajax(`/api/admin/user/${accountId}`, 'put', {
            data: window.JSON.stringify({
                isAdmin: isAdmin
            }),
            success: function () {
                adminComponent.getAdminList();
            }
        })
    },
    filterUser() {
        var searchBtn = $('#all-admin .filters button[data-operate="search"]');

        searchBtn.click(function () {
            adminComponent.currentNumber = 1;

            adminComponent.filteredResult();
        });
    },
    filteredResult() {
        var people = $('#all-admin .filters select[name="isAdmin"]').val();
        var username = $('#all-admin .filters input[name="username"]').val();
        var name = $('#all-admin .filters input[name="name"]').val();

        var usernameRegexp = new RegExp(username);
        var nameRegexp = new RegExp(name);

        var newList = _.filter(adminComponent.adminList, function (item) {
            var isAdmin = item.isAdmin ? '1' : '-1';

            var flag = false;

            if (people === '0') {
                flag = true;
            } else {
                flag = people === isAdmin;
            }

            flag = flag && usernameRegexp.test(item.username) && nameRegexp.test(item.name);

            return flag;
        });

        createPagenation('#page-alladmin', newList.length, 5, 14, function (currentNumber, showRow) {
            var arr = newList.slice((currentNumber - 1) * showRow, currentNumber * showRow);

            adminComponent.currentNumber = currentNumber;

            adminComponent.renderTable(arr);
        }, adminComponent.currentNumber);

    }
}