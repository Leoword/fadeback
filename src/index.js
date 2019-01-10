require('./style/index.less');

window.$ = require('jquery/dist/jquery.js');

var toggleMenu = require('./component/menu.js');

var tabTool = require('./component/tab');

$('documnet').ready(function () {
    toggleMenu();

    tabTool();
});