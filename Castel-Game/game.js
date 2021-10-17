
/*jshint esversion: 6 */
/* jshint browser: true */
(function () {
   'use strict';
   // this function is strict...
}());
// I create an abject that I will use to  call the variables instead of using global variables
// I will call the variable name by using const game.plus the name of the varia
const game = {
	playersInput: "",
    items : ["money","card","crown","key","sword"],
    itemLocations:[1,3,5,6,8],
	backpack : [],
	map : [],
	mapLocation :4,
    saveTheLocattion:"",
	startBtn : document.querySelector("#start"),
	images : [],
	blockedPathMessages : [],
	gameMessage : "",
	//Create an array of actions the game understands
	//and a variable to store the current action
        //template literal looks, trying to use literal template
	actionsIKnow : ["north", "east", "south", "west", "take", "use", "drop"],
	//make it global
	 action: "",
	 itemsIKnow :["money","card","crown","key","sword"],
	 item : "",
     //need a variale to save the backpack of the player
     saveTheItem:"",
     //entering the commmad
     enterBtn : document.getElementById("enter"),
     enterBtn1 : document.getElementById("enter1"),
     enterBtn2 : document.getElementById("enter2"),
     enterBtn3 : document.getElementById("enter3"),
     enterBtn4 : document.getElementById("enter4"),

	 //The img element
	 image: document.getElementById("locImage"),
     intro:document.getElementById("intro"),
     endOfTheGame:document.getElementById("enImage"),
     gameDisplay:document.getElementById("gameDisplay"),

	 //The input and output fields
	  output :document.querySelector("#output"),
	 input :document.querySelector("#input"),

	 //The button
	  button :document.querySelector("#button"),
      //save
      save:document.getElementById("saveTheGame"),
      help:document.getElementById('helpDiv'),
      helpButton:document.getElementById('helpButton'),
      closeButton:document.getElementById('closeButton'),
      //restore
      restore:document.getElementById("restoreTheGame"),
      //Restart
      restart:document.getElementById("restartTheGame"),
	  //Reset these variables from the previous turn
      backpackIndexNumber: function () {
          return this.backpack.indexOf(this.item);
      },
      // creating variables to old the array location an the item to use for a room
       lockRoom :8,
       isLocked:true,
       // second
       secondLockRoom:7,
       //create new message
	  // backpackIndexNumber : this.backpack.indexOf(this.item)

      // taking the id
    north:document.getElementById("north"),
    east:document.getElementById("east"),
    west:document.getElementById("west"),
    south:document.getElementById("south"),
};
// adding a function to display a sound when the player start the game
function sound()
{
    var soundAudio = new Audio();
    // souce of the Audio
    soundAudio.src="imagesCastle/battle003.mp3";
    soundAudio.play();
}
// function for the sound
function soundFunction()
{
    // adding the sound the the first room which is north
    if(game.mapLocation === 1)
    {
        // calling the function sound2
        sound2();
    }

}
//second sound function
function sound2 ()
{
    var sound = new Audio();
    // souce of the Audio
    sound.src="imagesCastle/second.mp3";
    var playPromise = sound.play();
// I was having error, so I researched and found a way to remove the error that was salling that the browser did not support my audio
    if (playPromise !== undefined)
    {
      playPromise.then(_ => {
        // Automatic playback started!
        // Show playing UI.
      })
      .catch(error => {
        // Auto-play was prevented
      });
    }
}
// description of the room
game.map[0] = "The State Dining Room";
game.map[1] = "the Waterloo Chamber designed to commemorate the victory at the Battle of Waterloo";
game.map[2] = "The Queen’s Drawing Room and Queen’s Ballroom.";
game.map[3] = "The Green Drawing Room.";
game.map[4] = "The Garter Throne Room.";
game.map[5] = "Thw Queen’s Audience Chamber.";
game.map[6] = "the battle commissioned by King George IV and painted by Sir Thomas Lawrence.";
game.map[7] = "The state apartments are open to the public every year and are managed by the Royal Collection.";
game.map[8] = "The Queen’s Guard Chamber hosts a collection of European arms and armour.";

// diffrent room Location
game.images[0] = "room2.jpg";
game.images[1] = "im8.jpg";
game.images[2] = "room2.jpg";
game.images[3] = "room3.jpg";
game.images[4] = "j.jpg";
game.images[5] = "room5.jpg";
game.images[6] = "st-georges-chapel-main.jpg";
game.images[7] = "im7.jpg";
game.images[8] = "room4.jpg";


// mesaage to worn the player if any danger
game.blockedPathMessages[0] = "It's too dangerous to move that way. be careful";
game.blockedPathMessages[1] = "Make good choices today.";
game.blockedPathMessages[2] = "A brave man acknowledges the strength of others.";
game.blockedPathMessages[3] = "The secret to your purpose is to find what you feel is important.";
game.blockedPathMessages[4] = "";
game.blockedPathMessages[5] = "The gate locks shut.";
game.blockedPathMessages[6] = "look at your map before going to that location.";
game.blockedPathMessages[7] = "I've got the key to my castle in the air, but whether I can unlock the door remains to be seen.";
game.blockedPathMessages[8] = "Keep your fears to yourself, but share your courage with others..";

// function for the first section
    function render()
    {
        console.log("Render");

    //Render the location
    game.output.innerHTML = game.map[game.mapLocation];
    game.image.src = "imagesCastle/" + game.images[game.mapLocation];

    //Display an item if there's one in this location
    //1. Loop through all the game items
    //1. Loop through all the game items
        for(let i = 0; i < game.items.length; i++)
        {
            console.log("MapLocation: " + game.mapLocation);
            console.log("Item Location: " + game.itemLocations[i]);
            //Find out if there's an item at this location
            if(game.mapLocation === game.itemLocations[i])
            {
            //Display what the player has
            game.output.innerHTML+= "<br>You see a <strong>"+ game.items[i]+ "</strong> here.";
            }
        }
    //Display the game message
        game.output.innerHTML += "<br><em>" + game.gameMessage + "</em>";

        //Display what is in the backpack
        if(game.backpack.length !== 0)
        {
        game.output.innerHTML += "<br>You are carrying: " + game.backpack.join(", ");
        }
        // calling the sound function
        soundFunction();
    }
    // using an arrow function
const startFunction= () =>
    {
     sound();
	// Hide the intro screen, show the game screen
	game.intro.style.display = "none";
	game.gameDisplay.style.display = "block";
    // callin the sound function on the starting button

    };

    const saveTheGame= () =>
    {
    // craeting two const for the json
    const saving = [game.mapLocation,game.backpack];
    const jsonString = JSON.stringify(saving);
    localStorage.setItem("saving", jsonString);

    // svaing the game message
    game.gameMessage += " You have saved your progress";
    //template literal looks, trying to use literal template
    console.log(`You have saved your progress`);
    render();
    //game.gameMessage += "You progress is saved";
    };
    // using an arrow function
const restoreTheGame= () =>
{
    // using a json method to save more than one items in the array
    // restoring the mapLocation
    var restoringTheGame = JSON.parse(localStorage.getItem("saving"));
    // restoring the mapLocation
    game.mapLocation=restoringTheGame[0];
    //restoring the backpack
    game.backpack=restoringTheGame[1];
    // calling the render function
    render();
    playGame();
};
// ending the game and display an image when the payer won the game// using arrow function
const endOfTheGame= () =>
{
 console.log("EndOfGame Called");
	// Hide the intro screen, show the game screen
	game.endOfTheGame.style.display = "block";
	game.gameDisplay.style.display = "none";
};
// if the player wants to start over, using an arrow function
const restartTheGame= () =>
{
    // testing if the restart function is working
    console.log("restart the game");
    //restarting everything
    game.intro.style.display = "block";
    game.gameDisplay.style.display = "none";
    // restarting the backpack,message and the mapLocation that starts at 4 position
    game.backpack = [];
    game.gameMessage = "";
    game.mapLocation=[4];
    // calling the render function
    render();
};
// game.startBtn = document.querySelector("#start");
//Set the player's start location
function clickHandler()
{
    playGame();
}
// helpGame function, arrow function
const helpFunction= () =>
{
// using a template literals
console.log("helpFunction");
     // Hide the intro screen, show the game screen
     //Use at least one example of template literals
const alert = document.getElementById("helpText");
// using template literals
alert.innerHTML = `Welcome to the Windsor Castle Challenge
Organizational Protection(OP) is specialized in protecting the Windsor Castle. You have been chosen to go on a secret mission to collect five essential items that have been missing in the royal castle. You will need  to collect only four items to complete the task and becoming part be part of  the Organizational Protection(OP)
 Here is the list of the three items:`;

game.help.style.display = "block";

};
// arrow function
const closeFunction=()=>
{
    game.help.style.display = "none";

};

//game.button.style.cursor = "pointer";
game.startBtn.addEventListener("click",startFunction,false);

game.enterBtn.style.cursor = "pointer";
// clickHandler addEventListener
game.enterBtn.addEventListener("click",clickHandler,false);

//addEventListener to save the progress of the game
game.save.style.cursor = "pointer";
game.save.addEventListener("click",saveTheGame,false);

//display an hint
game.helpButton.style.cursor = "pointer";
game.helpButton.addEventListener("click",helpFunction,false);

// addEventListener to restore the game
game.restore.style.cursor = "pointer";
game.restore.addEventListener("click",restoreTheGame,false);
// addEventListener to restart the game
game.restart.style.cursor = "pointer";
game.restart.addEventListener("click",restartTheGame,false);

game.closeButton.style.cursor = "pointer";
game.closeButton.addEventListener("click",closeFunction,false);

// addEventListener for the upKey
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("enter").click();
  }
});
//Display the player's location
render();
// option to save the game
// playing the game functions where to put all the action
function playGame()
    {
        console.log("playGame Called");
        console.log("game Map Location " + game.mapLocation);
    //Get the player inputs and convert in toLowerCase
    console.log('Input Value: '  + input.value);
    game.playersInput = input.value;
    game.playersInput = game.playersInput.toLowerCase();
    game.action = game.playersInput;
    console.log('game.action: '  + game.action);

    //Figure out the player's action
    for(i = 0; i < game.actionsIKnow.length; i++)
    {
        // checking if the action taken by the player if is the same as the array
        if(game.playersInput.indexOf(game.actionsIKnow[i]) !== -1)
        {
        game.action = game.actionsIKnow[i];
        console.log("player's action: " + game.action);
        break;
        }
    }
    //Figure out the item the player wants
    for(i = 0; i < game.itemsIKnow.length; i++)
    {
    if(game.playersInput.indexOf(game.itemsIKnow[i]) !== -1)
    {
    game.item = game.itemsIKnow[i];
    console.log("player's item: " + game.item);
    }
    }

    //choosing diffrent locations such as east,south,west and south
    switch(game.action)
    {
        case "north":
            if(game.mapLocation >= 3)
            {
                game.mapLocation -= 3;
                // cheking id the room is isLocked and display a message
            }
            else
            {
                game.gameMessage = game.blockedPathMessages[game.mapLocation];
            }
            break;

        case "east":
        if(game.mapLocation % 3 != 2)
        {
        game.mapLocation += 1;
        if (game.mapLocation==game.lockRoom && game.isLocked)
        {
            // cheking id the room is isLocked and display a message
            game.mapLocation -= 1;
            // using template literals to short a long message
            game.gameMessage = `the room is locked,you will need the key to unlock it`;
        }
        //checking if the player win or complete the mission
        //checkIfPlayerWon();
        }
        else
        {
        game.gameMessage = game.blockedPathMessages[game.mapLocation];
        }
        break;

        case "south":
        if(game.mapLocation < 6)
        {
        game.mapLocation += 3;
        // cheking id the room is isLocked and display a message
        if (game.mapLocation==game.lockRoom && game.isLocked)
        {
            game.mapLocation -= 3;
            game.gameMessage = "the room is locked.";
            console.log("the room is locked");
        }
        // checking if the player win by calling the checkIfPlayerWon function
        //checkIfPlayerWon();
        }
        else
        {
        game.gameMessage = game.blockedPathMessages[game.mapLocation];
        }
        break;

        case "west":
        if(game.mapLocation % 3 != 0)
        {
        game.mapLocation -= 1;
        // cheking id the room is isLocked and display a message
        }
        else
        {
        game.gameMessage = game.blockedPathMessages[game.mapLocation];
        }
        break;
        case "take":
        takeItem();
        // calling the checkIfPlayerWon after collect all the three items
        checkIfPlayerWon();
        break;

        case "drop":
        dropItem();
        break;
// use for a particular room which isLocked
        case "use":
        useItem();
        break;
        default:
        game.gameMessage = "I don't understand that.";
    }

    //Render the game
    render();
}

function takeItem ()
{
    //Find the index number of the item in the items array
    //var itemIndexNumber = game.items.indexOf(this.item);
    var itemIndexNumber = game.items.indexOf(game.item);

    //Does the item exist in the game world and is it at the player's current location?
    if(itemIndexNumber !== -1 && game.itemLocations[itemIndexNumber] === game.mapLocation)
    {
    game.gameMessage = "You take the " + game.item + ".";

    //Add the item to the player's backpack
    game.backpack.push(game.item);

    //Remove the item from the game world
    game.items.splice(game.itemIndexNumber, 1);
    game.itemLocations.splice(game.itemIndexNumber, 1);

    //Display in the console for testing
    console.log("World items: " + game.items);
    console.log("backpack items: " + game.backpack);
    }
    else
    {
    //Message if the player tries to take an item that isn't in the current location
    game.gameMessage = "You can't do that.";
    }
}
// drop item funcction
function dropItem ()
    {
    //Try to drop the item only if the backpack isn't empty
    if(game.backpack.length !== 0)
    {
    //Find the item's array index number in the backpack


    //The item is in the backpack if the backpackIndexNumber isn't -1
    if(game.backpackIndexNumber !== -1)
    {

    //Tell the player that the item has been dropped
    game.gameMessage = "You drop the " + game.item + ".";

    //Add the item from the backpack to the game world
    game.items.push(game.backpack[game.backpackIndexNumber]);
    game.itemLocations.push(game.mapLocation);

    //Remove the item from the player's backpack
    game.backpack.splice(game.backpackIndexNumber, 1);
    }
    else
    {
    //Message if the player tries to drop something that's not in the backpack
    game.gameMessage = "You can't do that.";
    }
    }
    else
    {
    //Message if the backpack is empty
    game.gameMessage = "You're not carrying anything.";
    }
}
// using the item function
function useItem ()
    {
    //1. Find out if the item is in the backpack
    var backpackIndexNumber=game.backpack.indexOf(game.item);
    //Find the item's array index number in the backpac
    //If the index number is -1, then it isn't in the backpack.
    //Tell the player that he or she isn't carrying it.
    if(backpackIndexNumber === -1)
    {
    //game.gameMessage = "You're not carrying it.";
    game.gameMessage = "You are not caring  item.";
    }
    //If there are no items in the backpack, then
    //tell the player the backpack is empty
    if(game.backpack.length === 0)
    {
    game.gameMessage += " Your backpack is empty";
    }
    //2. If the item is found in the backpack
    //figure out what to do with it
    if(backpackIndexNumber !== -1)
    {
    switch(game.item)
    {
    case "crown":
    game.gameMessage = "A sorrow's crown of sorrow is remembering happier times.";
    break;
    case "key":
    if(game.mapLocation === 5 || game.mapLocation === 7)
    {
    game.gameMessage= "Good Job..You unlocke the room!";
    game.isLocked=false;
    //animatiting the key image
    }
    else
    {
    game.gameMessage= "A very little key will open a very heavy door.";

    }
    break;

    case "sword":
    if(game.mapLocation === 1)
    {
    game.gameMessage = "Nonviolence is a powerful and just weapon, which cuts without wounding and ennobles the man who wields it. It is a sword that heals.";
    //Remove the item from the player's backpack
    game.backpack.splice(backpackIndexNumber, 1);
    }
    else
    {
    game.gameMessage= "You fumble with the sword in your pocket.";
    }
    break;
    case "money":
    game.gameMessage = "A wise person should have money in their head, but not in their heart";
    break;

    case "card":
    game.gameMessage = "Identify the sequence of stages that leads to turning your dreams into reality";
    break;
    }
    }
}
// checkIfPlayerWon function to check if the player has 4 items and he or she is in the room 8
// it is better to have a function and write down all the conditions and call it when it needed
    function checkIfPlayerWon()
    {
        // checking if the function is working
        console.log("Check Win");
        console.log("Backpack L = " + game.backpack.length);
        console.log("MapLocation = " + game.mapLocation);
        // if the user colect all three items and is in location 9 , the player win the game
        if(game.backpack.length==4 && game.mapLocation==8)
        {
            console.log("Check Win - Conditions TRUE");
            game.gameMessage = "You win";
            // calling the endOfTheGame function at end of the game
            endOfTheGame();
        }
    }
// first animation
var t2 = document.getElementById("t2");
TweenLite.to(t2, 2, {rotation:360,x:180,ease:Back.easeOut, delay:10});
//second animation
var t = document.getElementById("an");
TweenLite.to(t, 2, {rotation:360,x:180,ease:Back.easeOut,delay:5,opacity:0});
// third Animation
// craeting a function event to zoom the image
$( "#anim3" ).click(function(event)
{
// 1200 is the duration that the flower has to zoom
    $("#an").animate({height:"+=200",width:"+=200"},1200);
    $("#an").animate({height:"-=200",width:"-=200"},1200);
});
// animating the text on the end screen
var duration = 30;
var tl = new TimelineMax();
  //grow the line
tl.from(".line", 0.5, {width:0})
  //increase size of clipPath to reveal text
  .to("h1", duration, {clipPath:"inset(0px 0px 0% 1px)", ease:Linear.easeNone, repeat:3, yoyo:true}, "reveal");
