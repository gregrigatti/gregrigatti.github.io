/**
 * Greg Rigatti
 * This script references both jquery (https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js) and
 * buttons.js, a custom file.
 */

//this site provided this framework for creating an array of objects:
//https://stackoverflow.com/questions/37077617/javascript-store-multiple-objects-in-array-and-access-their-properties-via
var prompts = {
	promptOne : {div:document.getElementById("prompt0"), promptValue:"", textBox:document.getElementById("text1")},
	promptTwo : {div:document.getElementById("prompt1"), promptValue:"", textBox:document.getElementById("text2")},
	promptThree : {div:document.getElementById("prompt2"), promptValue:"", textBox:document.getElementById("text3")}
};
var allPrompts = [];

for(var key in prompts){
	allPrompts.push(prompts[key]);
}

var currentPromptDisplayed = 1;

var btnRefresh = document.getElementById("btnRefresh");
btnRefresh.addEventListener("click", btns.refresh);
//end of variable declaration

$(document).ready(function(){

	var prompts = $('#prompts'); //do i need this
	allPrompts[1].div.classList.add('hidden');
	allPrompts[2].div.classList.add('hidden');
	
	if(!window.navigator.onLine){
		//put an error message in place of the prompts
		//example: "Prompts cannot be pulled--No Internet Connection"
		//add a "Refresh?" button
		//remove back, next, submit btns
		btnLeft.classList.add('hidden');
		btnRight.classList.add('hidden');
		btnSubmit.classList.add('hidden');
		//remove textareas
		allPrompts[0].textBox.classList.add('hidden');
		allPrompts[0].div.innerHTML = '<h2>'+"Prompts Cannot be Pulled--No Internet Connection"+'</h2>';
		//TO FIX only $.ajax is within document.ready with the if, therefore it is only one skipped by the return
	}
	else{
		btnRefresh.classList.add('hidden');
		
		//tie left and right keyboard arrow keys to the "btns.back" and "btns.next" functions
		initArrowKeys();

		$.ajax({
			type: 'GET',
			url: 'https://www.reddit.com/r/WritingPrompts/top/.json?limit=3',
			success: function(promptsJSON) { //the data pulled by the GET function is stored as promptsJSON
				console.log('success', promptsJSON); //output the json to make sure it is correct
				$.each(promptsJSON.data.children, function(i, prompt){ //.each lets you iterate over the 3 json objects pulled, performing same action for each one
					
					var li = allPrompts[i].div;
					allPrompts[i].promptValue = prompt.data.title; //store each prompt for use elsewhere

					li.innerHTML = '<h2>'+(i+1)+'/3 '+prompt.data.title+'</h2>' + li.innerHTML;

					//whatever is in the first argument of .each becomes the prompt in function. Bc I put prompts.data.children in the
					//first argument, that is what prompt refers to, that whole thing. Therefore prompt.data.title is shorthand for
					//prompts.data.children.data.title
				});
			}
		});
	}
});

//console.log(btnsAll[0]);