
$(function(){

    // model
	var model = {

		cats : [],

		catlist : function() {
			var numberOfButtons = 6;
			return numberOfButtons;
		}

	}

	// view
	var view = {
        
		count : 0,

		// get the number of cats to know number of buttons to display
		countCats : function (){
			var catlist = $('#catlist');
			var button = '';
			for (var i = 1; i <= octopus.getCatlist(); i++) {
		     	button += '<button id="button'+i+'">cat ' + i +'</button> ' 
			     
			}
			var adminButton='<button id="adminButton">Admin</button> '
			catlist.html(button + adminButton);     
	    
	    },

	    //display images
		displayImage : function(path){
			var img = $('#clicker');
			img.attr('src', path);
		},

		bindButton : function(){
			for (var i=1; i<=octopus.getCatlist(); i++){
				octopus.bindButtonToCat(i);
			}
		},

		
	   	countClicks : function(){

			octopus.bindCounterToCat();
		},

		initCounter : function(counts){
			$("#cat"+" > .counter").text(counts);
		},

		// display the form an admin will use to add cats
		displayForm: function(){
			$('#adminButton').click(function(){
				var adminForm = $('#adminForm');
				var form = '';
				form = '<form><input id="name" placeholder="Name"><br>'+
				'<input id="image" placeholder="Image url"><br>'+
				'<input id="clicks"><br>'+
				'<button id="save">Save</button>'+
				'<button id="cancel">Cancel</button></form>'
				adminForm.html(form);
			});
		},

		renderView : function(){
			view.countCats();
			view.bindButton();
			view.countClicks();
		}
	}

	//octopus
	var octopus = {
        
        //bind button to cat  
		bindButtonToCat : function(idNumber){
			$("#button"+idNumber).click(function(){
				view.count = 0;
				view.initCounter(view.count);
				var path = 'img/cat_picture'+idNumber+'.jpg';
				view.displayImage(path);
			});
		},

		//bind counter to cat
		bindCounterToCat : function(){
			$('#cat').click(function(){
				view.count = $("#cat"+" > .counter").text();
				view.count = parseInt(view.count) + 1;
				view.initCounter(view.count);
			});
		},

		//get the catlist
		getCatlist : function (){
			return  model.catlist();
		},

		// saving the added cat to the model
		getNewCat: function(){
			var catname = $('#name').val();
			var image = $('#image').val();
			var clicks = 0;
			$('#save').submit(function(e){
				
			});
		}
		

	}

	//render view to DOM
	
	view.renderView();
	view.displayForm();

}());
