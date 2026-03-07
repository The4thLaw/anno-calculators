/*global console */
/*global $ */
/*global prompt */
/*global Cookies */
var anno = {
	computationTimer: null,
	cookieName: null,
	saveDialog: null,
	
	getPopulationClass: function ($element) {
		'use strict';
		
		return $($element.parents('section[data-pop-class]').get(0)).data('pop-class');
	},

	getPopulationCounts: function () {
		'use strict';
		
		var counts = {};
		$('input.pop_count').each(function () {
			var $this = $(this),
				count,
				popClass,
				popArr;
			
			count = $this.val();
			count = count === '' ? 0 : parseInt(count, 10);
			
			popClass = anno.getPopulationClass($this);
			
			if (typeof (counts[popClass]) === 'undefined') {
				counts[popClass] = [];
			}
			counts[popClass].push(count);
		});
		return counts;
	},

	getProductOrMaterialClass: function (element) {
		'use strict';

		var i,
			classes;
		
		classes = $(element).attr('class').split(/ /);

		for (i = 0; i < classes.length; i += 1) {
			if (classes[i].match(/^(prod_|mat_)/)) {
				return classes[i];
			}
		}
	},

	generateMarkup: function (game) {
		'use strict';

		$('[data-sum-of]').each(function () {
			$(this).addClass($(this).data('sum-of'));
		});
		
		// Add the summary class where relevant
		$('#summaries .product, #summaries .material').addClass('summary');

		$('.product, .material').each(function () {
			$(this).append('<img src="img/' + game + '/' + anno.getProductOrMaterialClass(this) + '.png" >');

			$(this).append('<span class="count--rounded">0</span><span class="count">0</span>');
			if (!$(this).is('.summary')) {
				$(this).append(' @ <input class="mdl-textfield__input efficiency" type="number" value="100">%');
			}
		});

		// Now, generate IDs for efficiencies
		$('.chain input').each(function () {
			var $this = $(this),
				id = $this.attr('id'),
				section,
				sectionId,
				chain,
				productClass;

			if ((typeof (id) === 'undefined') || id === '') {
				// Gen from section, first product and current product
				section = $this.parents('section').get(0);
				sectionId = $(section).attr('id');
				chain = $this.parents('.chain').get(0);
				productClass = anno.getProductOrMaterialClass($('> .product', chain));
				id = 'eff_' + sectionId + '_' + productClass;
				if ($($this.parent()).is('.material')) {
					id += '_' + anno.getProductOrMaterialClass($this.parent());
				}
				$this.attr('id', id);
			}
		});
	},

	getEfficiency: function (scope) {
		'use strict';

		var efficiency = $('input.efficiency', scope).val();
		return efficiency === '' ? 1 : parseInt(efficiency, 10) / 100;
	},

	setCount: function (element, count) {
		'use strict';

		$(element).data('raw-count', count);
		var roundedCount = Math.ceil(count);
		count = Math.round(count * 100) / 100;
		$('.count', element).html(count);
		$('.count--rounded', element).html(roundedCount);

		if (count === 0) {
			$(element).addClass('no-need');
		} else {
			$(element).removeClass('no-need');
		}
	},

	computeMaterial: function (element) {
		'use strict';

		var factoryName = $(element).data('factory'),
			factory = $('.' + factoryName, $(element).parents('.chain').get(0)),
			efficiency = anno.getEfficiency(element),
			count = parseFloat(factory.data('raw-count')) * parseFloat($(element).data('ratio')) / efficiency;
		anno.setCount(element, count);
	},

	doCompute: function () {
		'use strict';

		var overallPopulationCounts = anno.getPopulationCounts();

		$('.product:not(.summary)').each(function () {
			var $this = $(this),
				efficiency,
				supports,
				count = 0,
				i,
				specificPopulationCounts;
			
			efficiency = anno.getEfficiency(this);
			supports = $this.data('supports').split(/,/);
			specificPopulationCounts = overallPopulationCounts[anno.getPopulationClass($this)];
			
			for (i = 0; i < specificPopulationCounts.length; i += 1) {
				if (specificPopulationCounts[i] > 0 && supports[i] > 0) {
					count += specificPopulationCounts[i] / supports[i] / efficiency;
				}
			}
			anno.setCount(this, count);
		});

		$('.material.chain--level-1').each(function () {
			anno.computeMaterial(this);
		});
		$('.material.chain--level-2').each(function () {
			anno.computeMaterial(this);
		});
		$('.material.chain--level-3').each(function () {
			anno.computeMaterial(this);
		});

		$('[data-sum-of]').each(function () {
			var elements = $('.' + $(this).data('sum-of') + ':not(.summary)'),
				sum = 0;
			elements.each(function () {
				sum += parseFloat($(this).data('raw-count'));
			});
			anno.setCount(this, sum);
		});
	},

	compute: function () {
		'use strict';

		clearTimeout(anno.computationTimer);
		anno.computationTimer = setTimeout(anno.doCompute, 100);
	},

	getSaveData: function () {
		'use strict';

		var efficiencies = {};

		$('.efficiency').each(function () {
			var $this = $(this);
			if ($this.val() !== '100') {
				efficiencies[$this.attr('id')] = $this.val();
			}
		});

		return {
			population: anno.getPopulationCounts(),
			efficiencies: efficiencies
		};
	},
	
	saveCity: function () {
		'use strict';
		
		anno.saveDialog.dialog('open');
	},

	doSaveCity: function () {
		'use strict';

		var cityName, data = {};

		cityName = $('#save-dialog-name').val();

		// Restore previous data
		data = Cookies.getJSON(anno.cookieName);
		if (typeof (data) === 'undefined') {
			data = {};
		}
		// Include new one
		data[cityName] = anno.getSaveData();

		Cookies.set(anno.cookieName, data, { expires: 365 });
		
		// Refresh save list
		anno.fillSaveList();
		
		// Hide dialog
		anno.saveDialog.dialog('close');
	},

	loadCity: function () {
		'use strict';
		
		var fullData, data;
		
		fullData = Cookies.getJSON(anno.cookieName);
		data = fullData[$('#save-list').val()];
		
		// Load population
		$.each(data.population, function (popClass, values) {
			$('#population section[data-pop-class="' + popClass + '"] input.pop_count').each(function (i) {
				if (values[i] > 0) {
					$(this).val(values[i]);
					// Fix MDL
					$(this).parent().addClass('is-dirty');
				}
			});
		});
		
		// Load efficiencies
		// Reset them all, first
		$('.efficiency').val('100');
		$.each(data.efficiencies, function (id, value) {
			$('#' + id).val(value);
		});
		
		anno.compute();
	},
	
	deleteCity: function () {
		'use strict';
		
		var cityName, fullData;
		
		cityName = $('#save-list').val();
		fullData = Cookies.getJSON(anno.cookieName);
		
		delete fullData[cityName];
		
		Cookies.set(anno.cookieName, fullData, { expires: 365 });
		
		// Refresh save list
		anno.fillSaveList();
	},
	
	fillSaveList: function () {
		'use strict';
		
		var data, $select;
		
		$select = $('#save-list');
		$select.html('');
		
		data = Cookies.getJSON(anno.cookieName);
		$.each(data, function (key) {
			$select.append('<option value="' + key + '">' + key + '</option>');
		});
	},
	
	init: function (game) {
		'use strict';
		
		anno.cookieName = 'anno' + game;
		anno.generateMarkup(game);
		
		// Initialise clickable headers
		$('h5, h6').click(function () {
			var sectionContent = $('+ div', this);
			sectionContent.slideToggle();
		});
		
		// Initialise load/save buttons
		$('#btn-save').click(anno.saveCity);
		$('#btn-load').click(anno.loadCity);
		$('#btn-delete').click(anno.deleteCity);
		
		// Initialise dialog
		anno.saveDialog = $('#save-dialog').dialog({
			autoOpen: false,
			modal: true,
			buttons: {
				'Save': anno.doSaveCity,
				'Cancel': function () {
					anno.saveDialog.dialog('close');
				}
			},
			close: function () {
				$('#save-dialog form')[0].reset();
			}
		});
		$('#save-dialog form').on('submit', function (event) {
			event.preventDefault();
			anno.doSaveCity();
		});
		
		// Bind change handlers
		$('input.pop_count, input.efficiency').change(anno.compute);
		$('input.pop_count, input.efficiency').keyup(anno.compute);
		$('input.pop_count, input.efficiency').click(anno.compute);

		// Handle option to round counts
		$('.count--rounded').hide();
		$('#opt-round-counts').change(function () {
			if ($(this).is(':checked')) {
				$('.count--rounded').show();
				$('.count').hide();
			} else {
				$('.count--rounded').hide();
				$('.count').show();
			}
		});
		$('#opt-round-counts').change();
		
		// Initialise save list
		anno.fillSaveList();
	}

};

