//this site provided this framework for creating an array of objects:
//https://stackoverflow.com/questions/37077617/javascript-store-multiple-objects-in-array-and-access-their-properties-via

var promptOne = {div:document.getElementById("prompt0"), h2:document.getElementById("prompt0text"), promptValue:"", textBox:document.getElementById("text1")};
var promptTwo = {div:document.getElementById("prompt1"), h2:document.getElementById("prompt1text"), promptValue:"", textBox:document.getElementById("text2")};
var promptThree = {div:document.getElementById("prompt2"), h2:document.getElementById("prompt2text"), promptValue:"", textBox:document.getElementById("text3")};

var allPrompts = [promptOne, promptTwo, promptThree];

var jsonSubmissions;
var submissionsObject;

var btnSubmit = document.getElementById("btnSubmit");
var btnLeft = document.getElementById("btnLeft");
var btnRight = document.getElementById("btnRight");
var currentPromptDisplayed = 1;

//end of variable declaration

$(document).ready(function(){
	jsonSubmissions = localStorage.getItem("Submission");

	if(jsonSubmissions===null){
		console.log("null");
		promptOne.h2.innerHTML = "No submissions found!"
		promptOne.textBox.classList.add('hidden');
		btnLeft.classList.add('hidden');
		btnRight.classList.add('hidden');
		btnSubmit.classList.add('hidden');
	}

	else{
		console.log("JSON: " + jsonSubmissions);

		submissionsObject = JSON.parse(jsonSubmissions);
		console.log("Object: " + submissionsObject.one.prompt);

		promptOne.h2.innerHTML = "1/3 " + submissionsObject.one.prompt;
		promptOne.textBox.innerHTML = submissionsObject.one.input;

		promptTwo.h2.innerHTML = "2/3 " + submissionsObject.two.prompt;
		promptTwo.textBox.innerHTML = submissionsObject.two.input;

		promptThree.h2.innerHTML = "3/3 " + submissionsObject.three.prompt;
		promptThree.textBox.innerHTML = submissionsObject.three.input;
	}
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
	//something is off with my definition of allPrompts[1].textBox
	submit:function(){
		var objectsToSave = {
			one:{prompt:allPrompts[0].promptValue, input:document.getElementById("text1").value},
			two:{prompt:allPrompts[1].promptValue, input:document.getElementById("text2").value},
			three:{prompt:allPrompts[2].promptValue, input:document.getElementById("text3").value}
			//three:{prompt:allPrompts[2].promptValue, input:allPrompts[2].textBox.value} why doesn't allPrompts[2]textBox.value work
		};
		//localStorage['inputcache'] = JSON.stringify(objectsToSave);
		//how to use a variable to differentiate submission names?
		window.localStorage.setItem("Submission", JSON.stringify(objectsToSave));
		//use these two lines for retrieving: 
		//let newObject = window.localStorage.getItem("Submission");
		//console.log(JSON.parse(newObject))
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