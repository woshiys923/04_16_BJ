// Memory Game


(function(){
	
	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.binding();
			this.paused = false;
     	this.guess = null;
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 2000);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- http://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src=""\
				 /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cards = [
		{
			name: "abuse",
			img: "Images/MG/V3/abuse.png",
			id: 1,
		},
		{
			name: "dontgo",
			img: "Images/MG/V3/dontgo.png",
			id: 2
		},
		{
			name: "notouch_1",
			img: "Images/MG/V3/notouch_1.png",
			id: 3
		},
		{
			name: "notouch_2",
			img: "Images/MG/V3/notouch_2.png",
			id: 4
		}, 
		{
			name: "private",
			img: "Images/MG/V3/private.png",
			id: 5
		},
		{
			name: "safet_1",
			img: "Images/MG/V3/safet_1.png",
			id: 6
		},
		{
			name: "safet_2",
			img: "Images/MG/V3/safet_2.png",
			id: 7
		},
		{
			name: "talktodad",
			img: "Images/MG/V3/talktodad.png",
			id: 8
		},
		{
			name: "talktomom",
			img: "Images/MG/V3/talktomom.png",
			id: 9
		},
		{
			name: "talktoteacher",
			img: "Images/MG/V3/talktoteacher.png",
			id: 10
		},
		{
			name: "tell-a-grow-up",
			img: "Images/MG/V3/tell-a-grow-up.png",
			id: 11
		},
		{
			name: "unsafetouch",
			img: "Images/MG/V3/unsafetouch.png",
			id: 12
		},
	];
    
	Memory.init(cards);


})();