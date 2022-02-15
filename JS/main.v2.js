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

var btnSubmit = document.getElementById("btnSubmit");
var btnLeft = document.getElementById("btnLeft");
var btnRight = document.getElementById("btnRight");
var currentPromptDisplayed = 1;

//end of variable declaration

$(document).ready(function(){

	var prompts = $('#prompts');

	$.ajax({
		type: 'GET',
		url: 'https://www.reddit.com/r/WritingPrompts/top/.json?limit=3',
		success: function(promptsJSON) { //the data pulled by the GET function is stored as promptsJSON
			console.log('success', promptsJSON); //output the json to make sure it is correct
			$.each(promptsJSON.data.children, function(i, prompt){ //.each lets you iterate over the 3 json objects pulled, performing same action for each one
				
				var li = allPrompts[i].div;
				allPrompts[i].promptValue = prompt.data.title; //store each prompt for use elsewhere

				li.innerHTML = '<h2>'+(i+1)+'/3 '+prompt.data.title+'</h2>' + li.innerHTML;
			});
		}
	});
});

btns = {
	next:function(){
		//console.log('next');
		switch(currentPromptDisplayed){
			case 1:
				allPrompts[0].div.classList.add('hidden');
				allPrompts[1].div.classList.remove('hidden');
				currentPromptDisplayed = 2;
				break;
			case 2:
				allPrompts[1].div.classList.add('hidden');
				allPrompts[2].div.classList.remove('hidden');
				currentPromptDisplayed = 3;
				break;
			case 3:
				allPrompts[2].div.classList.add('hidden');
				allPrompts[0].div.classList.remove('hidden');
				currentPromptDisplayed = 1;
				break;
		}
	},

	back:function(){
		//console.log('back');
		switch(currentPromptDisplayed){
			case 1:
				allPrompts[0].div.classList.add('hidden');
				allPrompts[2].div.classList.remove('hidden');
				currentPromptDisplayed = 3;
				break;
			case 2:
				allPrompts[1].div.classList.add('hidden');
				allPrompts[0].div.classList.remove('hidden');
				currentPromptDisplayed = 1;
				break;
			case 3:
				allPrompts[2].div.classList.add('hidden');
				allPrompts[1].div.classList.remove('hidden');
				currentPromptDisplayed = 2;
				break;
		}
	},
	//save json to browser's local storage
	submit:function(){
		var objectsToSave = {
			one:{prompt:allPrompts[0].promptValue, input:document.getElementById("text1").value},
			two:{prompt:allPrompts[1].promptValue, input:document.getElementById("text2").value},
			three:{prompt:allPrompts[2].promptValue, input:document.getElementById("text3").value}
		};
		window.localStorage.setItem("Submission", JSON.stringify(objectsToSave));
		console.log('done', JSON.stringify(objectsToSave));
	}
}

allPrompts[1].div.classList.add('hidden');
allPrompts[2].div.classList.add('hidden');

btnLeft.addEventListener("click", btns.back);
btnRight.addEventListener("click", btns.next);
btnSubmit.addEventListener("click", btns.submit);

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