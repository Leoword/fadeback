require('./style/index.less');

window.$ = require('jquery/dist/jquery.js');

var toggleMenu = require('./component/menu.js');
var createAllFeedback = require('./component/allFeedback');
var createownFeedback = require('./component/ownFeedback');
var createAllAdmin = require('./component/adminList');
var tabTool = require('./component/tab');

$('documnet').ready(function () {
    toggleMenu();

    createAllFeedback();
    createownFeedback();
    createAllAdmin();
    tabTool();
});