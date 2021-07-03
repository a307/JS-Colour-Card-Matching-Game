var cards = document.querySelectorAll('.card');
var count = 0;
var card1;
var card2;
var storedCard;
var selectedCard;
var firstGame = 0;

//tracks games won for score
var supremeCounter = 0;
var score = 0;
var clickCount = 0;
		
function setColors(){
		
	if(firstGame == 0){
		firstGame++;
	}
			
	//reset game
	for(var i = 0;i<16;i++){
				
		cards[i].className = 'card';
				
	}
			
	var colors = ['red', 'yellow', 'green', 'blue', 'pink', 'orange', 'cyan',
				 'teal'];
			
	var card_index = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
	var exit = 0;
	var colorTemp = ['','','','','','','',''];
	var randomColor = 0;
	var randomCard1 = 0;
	var randomCard2 = 0;
			
	//now get random colors with 2 loops
	for(var i = 0;i<8;i++){
		
		exit = 0;
				
		//find random element in array of colors
		while(exit == 0){
				
			randomColor = Math.floor(Math.random() * 8);
					
			if(colors[randomColor]!="null"){
				
				exit = 1;
						
			}
				
		}
				
		//store on color temp array which is basically a shuffled colors array
		colorTemp[i] = colors[randomColor];
				
		colors[randomColor] = "null";
				
	}
			
	console.log(colorTemp);
				
	//now pick two random cards
	for(var i = 0;i<8;i++){
		
		exit = 0;
		
		while(exit == 0){
				
			//pick to unqiue and random cards
			randomCard1 = Math.floor(Math.random() * 16);
			randomCard2 = Math.floor(Math.random() * 16);
					
			if(card_index[randomCard1]!=null && card_index[randomCard2]!=null){
						
				if(randomCard1!=randomCard2){
			
					exit = 1;
						
				}
					
			}
				
		}
				
		console.log(randomCard1);
		console.log(randomCard2);
				
		//now set change to html cards
		cards[randomCard1].setAttribute('data-color',colorTemp[i]); 
		cards[randomCard1].className += " "+colorTemp[i];
				
		cards[randomCard2].setAttribute('data-color',colorTemp[i]); 
		cards[randomCard2].className += " "+colorTemp[i];
				
		card_index[randomCard1] = null;
		card_index[randomCard2] = null;
				
	}
	
	//disable all cards
	for(var i = 0;i<16;i++){
			
		document.getElementById(i).style.pointerEvents = 'none';
			
	}
			
	//flips cards after 3 seconds
	setTimeout(flipCards,3000);
			
}
		
//this function flips all the cards face down
function flipCards(){
			
	for(var i = 0;i<16;i++){
				
		cards[i].className += ' down';
				
	}
	
	//enable all cards
	for(var i = 0;i<16;i++){
			
		document.getElementById(i).style.pointerEvents = 'auto';
			
	}
			
}
		
//compare the colour of the two cards
function compareColors(e){
					
	//flip card first
	selectedCard = e.currentTarget;
			
	//checks if card was used already
	if(selectedCard.className.includes('used') || firstGame == 0){
			
		return;
				
	}
			
			
	console.log(selectedCard.className);
			
	selectedCard.className = selectedCard.className.replace('down','').trim();
			
	count++;
			
	//if 2 cards are selected it will compare them
	if(count == 1){
		card1 = selectedCard.getAttribute('data-color');
				
		//storing first card to flip later 
		storedCard = e.currentTarget;
				
		//disable card 
		document.getElementById(selectedCard.id).style.pointerEvents = 'none';
				
	}
	else if(count == 2){
	
		//disable all other cards 
		for(var i = 0;i<16;i++){
			
			document.getElementById(i).style.pointerEvents = 'none';
			
		}
				
		card2 = selectedCard.getAttribute('data-color');
				
		//now comparing the 2 selected cards
		if(card1 === card2){
			console.log('same');
					
			//disables cards
			selectedCard.className += ' used';
					
			storedCard.className += ' used';
			
			//enable all cards again 
			for(var i = 0;i<16;i++){
				
				document.getElementById(i).style.pointerEvents = 'auto';
				
			}
			
			clickCount+=2;
			
			//score counter
			//group of conditions for score board 
			supremeCounter++;
			if(supremeCounter==8){
				supremeCounter = 0;
				if(clickCount==16){
					document.getElementById('clickBoard').innerHTML = "Clicks: 16 Perfect Game!";
					score+=10;
				}else{
					document.getElementById('clickBoard').innerHTML = "Clicks: "+clickCount;
					score++;
				}
				document.getElementById('scoreBoard').innerHTML = "Score: "+score;
				clickCount = 0;
			}
			
					
		}else{
				
			console.log('different');
					
			//flip both cards back with .5 second delay
			setTimeout(notMatching,500);
				
		}
				
		//resets count
		count = 0;
				
	}
	
}
			
//delay then card flip non-matching cards
function notMatching(){
							
	selectedCard.className += ' down';
					
	storedCard.className += ' down';
	
	//enable all cards again 
	for(var i = 0;i<16;i++){
				
		document.getElementById(i).style.pointerEvents = 'auto';
				
	}
	
	clickCount+=2;
	
	
}
		


