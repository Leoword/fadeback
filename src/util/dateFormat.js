module.exports = function (time) {
    var dateObj = new Date(time);

    var year = dateObj.getFullYear();

	var month = dateObj.getMonth() + 1;
	month = month >= 10 ? month : `0${month}`;

	var date = dateObj.getDate();
    date = date >= 10 ? date : `0${date}`;
    
    var hour = dateObj.getHours();

    var minute = dateObj.getMinutes();

	var result = `${year}-${month}-${date} ${hour}:${minute}`;

	return result;
}