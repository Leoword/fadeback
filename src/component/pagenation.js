
var _ = require('underscore');

module.exports = function getDataList(pagenationId, length, showNumber, showRow, callback, currentNumber) {
	var pagenation = $(`${pagenationId} ul`);
	// var currentNumber = 1;

	if (!pagenation) {
		return;
	}

	var totalNumber = Math.ceil(length / showRow) === 0 ? 1 :  Math.ceil(length / showRow);

	pagenationInit (pagenationId, showNumber, currentNumber, totalNumber, showRow, callback);
}

function pagenationInit (pagenationId, showNumber, currentNumber, totalNumber, showRow, callback) {
	if	(showNumber <= 3) {
		return false;
	}
	
	var pagenation = $(`${pagenationId} ul`);

	callback(currentNumber, showRow);

	pagenation.empty();

	var itemList = [];
	
	if (totalNumber <= showNumber) {
		for (var i = 1; i <= totalNumber; i++) {
			itemList.push(i);
		}
	} else {

		if (currentNumber <= showNumber - 2) {

			for (var i = 1; i < showNumber; i++) {
				itemList.push(i);
			}

			itemList.push('...');
		} else if (totalNumber - currentNumber < showNumber - 2) {

			for (var i = 0; i < showNumber - 1; i++) {
				itemList.unshift(totalNumber - i);
			}

			itemList.unshift('...');

		} else {
			itemList.push('...');

			for (var i = Math.ceil(currentNumber - (showNumber - 3)/2);
				i < Math.ceil(currentNumber + (showNumber - 3)/2) + 1; i++) {
					itemList.push(i);
			}

			itemList.push('...');
		}
	}

	pagenation.append(`
		<li aria-label="previous">
			<a aria-label="previous" class="rounded-0">
				<span aria-hidden="true">&laquo;</span>
			</a>
		</li>`);

	_.each(itemList, function (item, index) {
		pagenation.append(`
		<li aria-serial=${item}>
			<a aria-label="page" class="rounded-0">
				<span aria-hidden="true">${item}</span>
			</a>
		</li>`);
	});

	pagenation.append(`
		<li aria-label="next">
			<a aria-label="next" class="rounded-0">
				<span aria-hidden="true">&raquo;</span>
			</a>
		</li>`);

	$(`${pagenationId} ul li`).removeClass('active');

	$(`${pagenationId} ul li[aria-serial=${currentNumber}]`).addClass('active');

	$(`${pagenationId} ul li`).click(function (item) {

		var number = parseInt($(item.currentTarget).attr('aria-serial'));
		var label = $(item.currentTarget).attr('aria-label');

		if (number) {
			currentNumber = number;
		}

		if (label === 'previous') {
			currentNumber = 1;
		}

		if (label === 'next') {
			currentNumber = totalNumber;
		}

		$(`${pagenationId} ul li`).unbind('click');
		
		pagenationInit (pagenationId, showNumber, currentNumber, totalNumber, showRow, callback);
	});
}