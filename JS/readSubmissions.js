//this site provided this framework for creating an array of objects:
//https://stackoverflow.com/questions/37077617/javascript-store-multiple-objects-in-array-and-access-their-properties-via

var promptOne = {div:document.getElementById("prompt0"), h2:document.getElementById("prompt0text"), promptValue:"", textBox:document.getElementById("text1")};
var promptTwo = {div:document.getElementById("prompt1"), h2:document.getElementById("prompt1text"), promptValue:"", textBox:document.getElementById("text2")};
var promptThree = {div:document.getElementById("prompt2"), h2:document.getElementById("prompt2text"), promptValue:"", textBox:document.getElementById("text3")};

var allPrompts = [promptOne, promptTwo, promptThree];

var jsonSubmissions;
var submissionsObject;

var currentPromptDisplayed = 1;

//end of variable declaration

$(document).ready(function(){
	jsonSubmissions = localStorage.getItem("Submission");
	console.log("JSON: " + jsonSubmissions);

	if(jsonSubmissions === null){
		console.log("empty");
		promptOne.h2.innerHTML="No Submissions Found!";
		promptOne.textBox.classList.add('hidden');
		
		for(each of btnsAll){
			each.classList.add('hidden');
		}
	}

	else{
		//tie left and right keyboard arrow keys to the "btns.back" and "btns.next" functions
		initArrowKeys();
		
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

allPrompts[1].div.classList.add('hidden');
allPrompts[2].div.classList.add('hidden');