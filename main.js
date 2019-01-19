var promptOne = document.getElementById("prompt0");
var promptTwo = document.getElementById("prompt1");
var promptThree = document.getElementById("prompt2");
var testNav = document.getElementById("navbar");
var btnLeft = document.getElementById("btnLeft");
var btnRight = document.getElementById("btnRight");
var currentPromptDisplayed = 1;

$(document).ready(function(){

	var prompts = $('#prompts');

	$.ajax({
		type: 'GET',
		url: 'https://www.reddit.com/r/WritingPrompts/top/.json?limit=3',
		success: function(promptsJSON) { //the data pulled by the GET function is stored as promptsJSON
			console.log('success', promptsJSON); //output the json to make sure it is correct
			$.each(promptsJSON.data.children, function(i, prompt){ //.each lets you iterate over the 3 json objects pulled, performing same action for each one
				
				var li = document.getElementById('prompt'+i);
				
				li.innerHTML = '<h2>'+(i+1)+'/3 '+prompt.data.title+'</h2>' + li.innerHTML;

				//whatever is in the first argument of .each becomes the prompt in function. Bc I put prompts.data.children in the
				//first argument, that is what prompt refers to, that whole thing. Therefore prompt.data.title is shorthand for
				//prompts.data.children.data.title
			});
		}
	});
});

btns = {
	next:function(){
		switch(currentPromptDisplayed){
			case 1:
				promptOne.classList.add('hidden');
				promptTwo.classList.remove('hidden');
				currentPromptDisplayed = 2;
				break;
			case 2:
				promptTwo.classList.add('hidden');
				promptThree.classList.remove('hidden');
				currentPromptDisplayed = 3;
				break;
			case 3:
				promptThree.classList.add('hidden');
				promptOne.classList.remove('hidden');
				currentPromptDisplayed = 1;
				break;
		}
	},

	back:function(){
		switch(currentPromptDisplayed){
			case 1:
				promptOne.classList.add('hidden');
				promptThree.classList.remove('hidden');
				currentPromptDisplayed = 3;
				break;
			case 2:
				promptTwo.classList.add('hidden');
				promptOne.classList.remove('hidden');
				currentPromptDisplayed = 1;
				break;
			case 3:
				promptThree.classList.add('hidden');
				promptTwo.classList.remove('hidden');
				currentPromptDisplayed = 2;
				break;
		}
	}
}

promptTwo.classList.add('hidden');
promptThree.classList.add('hidden');

btnLeft.addEventListener("click", btns.back);
btnRight.addEventListener("click", btns.next);

//scroll through prompts upon left and right arrow press
document.onkeydown = function(e){
	switch(e.key){
		case "ArrowLeft": //left arrow key
			btns.back();
			break;
		case "ArrowRight": //right arrow key
			btns.next();
			break;
	}
};