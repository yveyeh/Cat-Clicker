$(function () {
	///////////////////////////////
	//////////// Model ////////////
	///////////////////////////////
	model = {

		//Creating local Storage
		init: function () {
			if (!localStorage.cats) {
				localStorage.cats = JSON.stringify([]);
			}
		},

		//Declare's Cat JSON Object
		setCat: function (name, url, clicks) {
			cat = {
				name: name,
				url: url,
				clicks: clicks
			};
			model.addCat(cat);
			return cat;
		},

		//Add cat to local storage
		addCat: function (cat) {
			var data = JSON.parse(localStorage.cats);
			octopus.allCats.push(cat);
			localStorage.cats = JSON.stringify(data);
		},

		//Returns all cats from local storage
		getAllCats: function () {
			model.init();
			return JSON.parse(localStorage.cats);
		}
	};


	///////////////////////////////
	//////////// Octopus //////////
	///////////////////////////////
	octopus = {

		allCats: model.getAllCats(), //holds array of cats returned from model
		currentCounter: [], //Hold temporally updated clicks of current cat
		currentIdNum: 0, //Holds index position of current cat from localStorage

		//Add new cat to the cat array in local storage
		addNewCats: function () {
			model.init();
			//localStorage.clear();		
			if (model.getAllCats().length == 0) {
				for (var i = 1; i < 6; i++) {
					model.setCat('cat' + i, 'assets/img/cat_picture' + i + '.jpg', 0);
				}
			}
		},

		//Create buttons to render to the view
		createButtons: function () {
			var catlist = $('#catlist');
			var button = '';
			for (var i = 0; i < octopus.allCats.length; i++) {
				button += '<button id="button' + i + '" class="btn btn-primary"><i class="fa fa-github fa-1x"></i>' + ' ' + octopus.allCats[i].name + '</button> '

			}
			var adminButton = '<button id="adminButton" class="btn btn-success"><i class="fa fa-user fa-1x"></i> Admin</button> ';
			catlist.html(button + adminButton);

		},


		//Bind each button to it's cat 
		bindButtonToCat: function (idNumber) {
			$("#button" + idNumber).click(function () {
				for (var i = 0; i < octopus.allCats.length; i++) {
					if (idNumber == i) {
						view.initCounter(octopus.allCats[i].clicks);
						view.displayImage(octopus.allCats[i].url);
						octopus.currentIdNum = i;
						octopus.currentCounter = octopus.setArray(octopus.allCats[i]);
						$('#form').hide();
						break;
					}
				}
			});
		},

		//Return current cat array
		setArray: function (array) {
			return array;
		},

		/*Looping through cat array in order to provide the 
		 *right id number to the bindButtonToCat function*/
		bindButton: function () {
			for (var i = 0; i < octopus.allCats.length; i++) {
				octopus.bindButtonToCat(i);
			}
		},

		//bind counter to cat
		bindCounterToCat: function () {
			$('#cat').click(function () {
				view.initCounter(octopus.updateClicks());
			});
		},

		//Increaments number of clicks done on cat image
		updateClicks: function () {
			var count = parseInt(octopus.currentCounter.clicks) + 1;
			octopus.allCats[octopus.currentIdNum].clicks = count;
			octopus.allCats[octopus.currentIdNum].clicks = count;
			localStorage.cats = JSON.stringify(octopus.allCats);
			return count;
		},

		//Saves changes made on cat on 
		saveFormInput: function () {
			$('#save').click(function () {
				octopus.allCats[octopus.currentIdNum].name = $('#name').val();
				octopus.allCats[octopus.currentIdNum].url = $('#image').val();
				octopus.allCats[octopus.currentIdNum].clicks = $('#clicks').val();
				localStorage.cats = JSON.stringify(octopus.allCats);
			});
		},

		//Keeps neccessary  functions to update view
		init: function () {
			octopus.addNewCats();
			octopus.createButtons();
			octopus.bindButton();
			octopus.bindCounterToCat();
		}

	};

	///////////////////////////////
	//////////// View /////////////
	///////////////////////////////
	view = {

		//Render number of clicks as text
		initCounter: function (counts) {
			$("#cat" + " > .counter").text(counts);
		},

		//display images
		displayImage: function (path) {
			var img = $('#clicker');
			img.attr('src', path);
		},

		//Renders a default view when app is loaded for the first time
		renderInitView: function () {
			var cat = $('#cat');
			var click = 'Number of clicks: <span class="counter">' + octopus.allCats[0].clicks + '</span><br><br>';
			var image = '<img id="clicker" class="img-responsive img-thumbnail" height="480" width="640" src="' + octopus.allCats[0].url + '">';
			octopus.currentCounter = octopus.setArray(octopus.allCats[0]);
			cat.html(click + image);
		},

		// display the form an admin will use to edit cats
		displayForm: function () {
			$('#adminButton').click(function () {
				var adminForm = $('#adminForm');
				var form = '';
				form = '<form id="form" class="form-inline">' +
					'<input id="name" placeholder="Name" class="form-control">' +
					'<input id="image" placeholder="Image url" class="form-control">' +
					'<input id="clicks" class="form-control">' +
					'<button id="save" class="btn btn-success"><i class="fa fa-save fa-1x"></i> Save</button>' +
					'<button id="cancel" class="btn btn-danger"><i class="fa fa-remove fa-1x"></i> Cancel</button></form>';
				adminForm.html(form);
				view.parseFormInput();
				octopus.saveFormInput();
			});
		},

		//Injects values of the current cat into the form when in admin mode  
		parseFormInput: function () {
			$('#name').val(octopus.allCats[octopus.currentIdNum].name);
			$('#image').val(octopus.allCats[octopus.currentIdNum].url);
			$('#clicks').val(octopus.allCats[octopus.currentIdNum].clicks);
		},

		//Renders to DOM
		init: function () {
			octopus.init();
			view.renderInitView();
			view.displayForm();
		}
	};

	//Initialize the app
	view.init();
}());