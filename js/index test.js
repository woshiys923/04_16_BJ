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
			name: "egg",
			img: "Images/MG/egglogo.png",
			id: 1,
		},
		{
			name: "sperm",
			img: "Images/MG/spermlogo.png",
			id: 2
		},
		{
			name: "mom_1",
			img: "Images/MG/mom_1.png",
			id: 3
		},
		{
			name: "mom_3",
			img: "Images/MG/mom_3.png",
			id: 4
		}, 
		{
			name: "mom_5",
			img: "Images/MG/mom_5.png",
			id: 5
		},
		{
			name: "mom_7",
			img: "Images/MG/mom_7.png",
			id: 6
		},
		{
			name: "mom_9",
			img: "Images/MG/mom_9.png",
			id: 7
		},
		{
			name: "mom_10",
			img: "Images/MG/mom_10.png",
			id: 8
		},
		{
			name: "family",
			img: "Images/MG/family.png",
			id: 9
		},
		{
			name: "male",
			img: "Images/MG/male_organ.png",
			id: 10
		},
		{
			name: "uterus",
			img: "Images/MG/uterus.png",
			id: 11
		},
		{
			name: "zygote",
			img: "Images/MG/zygote.png",
			id: 12
		},
	];
    
	Memory.init(cards);


})();