/**
 * Greg Rigatti
 * buttons.js made  in order to separate out bulky btn functions and increase legibility in main js document.
 */

//individual button variables for ease of use and legibility
var btnSubmit = document.getElementById("btnSubmit");
var btnLeft = document.getElementById("btnLeft");
var btnRight = document.getElementById("btnRight");

//variable containing an array of all buttons for ease of iteration
var btnsAll = document.querySelectorAll("button");

var currentPromptDisplayed = 1;

//btns object to hold different btns functions
//const btns = new Object();
const btns = {
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
		alert("Submitted!");
	},

	refresh:function(){
		document.location.reload(true);
	},
}

//Add OnLoad/Document.ready?
//listeners unique to specific buttons
btnLeft.addEventListener("click", btns.back);
btnRight.addEventListener("click", btns.next);
btnSubmit.addEventListener("click", btns.submit);

//scroll through prompts upon left and right arrow press
function initArrowKeys(){
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
}
