var CUR_WORD = "amicus, -i";
var CUR_ANSWER = "amicus";
var CUR_CASE = "Nominative Singular";
var CUR_DECLENS = 2;

var SUCCESS = 0;
var ATTEMPTS = 0;

var caseNames = {'nom_s':"Nominative Singular", 'gen_s': "Genitive Singular", 'acc_s':"Accusative Singular", 'dat_s':"Dative Singular",'abl_s':"Ablative Singular", 'nom_p':"Nominative Plural", 'gen_p':"Genitive Plural", 'acc_p': "Accusative Plural", 'dat_p':"Dative Plural",'abl_p':"Ablative Plural"}

function compareWords(guessed, correct){
  return guessed.toUpperCase() == correct.toUpperCase()
}




$(document).ready(function(){
	newWord();
	$("#submit").click(function(){
		evaluate();
		newWord();
		$("#guess").val("");
	
	})
	
	$("#guess").keyup(function(event){
		if(event.keyCode == 13){
			$("#submit").click();
			$(this).val('');
		}		
	});
	
	function getCases(){
		var possible = ['nom_s', 'gen_s', 'acc_s', 'dat_s','abl_s',
						'nom_p', 'gen_p', 'acc_p', 'dat_p','abl_p']
		var valid_cases = [];
		for (i=1;i<=10;i++){
			var box = "c" + i;
			if (document.getElementById(box).checked){
				valid_cases.push(possible[i-1]);
			}
		}
		if (valid_cases == []){
			valid_cases.push("nom_s");
		}
		return valid_cases;
	}
	
	function getDeclensions(){
		var decs = []
		for (i=1;i<=5;i++){
			var but = "#dec_" + i;
			if ($(but).hasClass('btn-success')){
				decs.push(i);
			}
			
		}
		if (decs == []){
			decs = [1];
		}
		return decs;
	}
	
	function newWord(){
		var cases = getCases();
		var decs = getDeclensions();

		var declension = decs[Math.floor(Math.random() * decs.length)]
		var myCase = cases[Math.floor(Math.random() * cases.length)]
		console.log("Case: " + myCase + " and decl: " + declension);
		
		var possible_words = Object.keys(NOUN_DB[declension]);
		console.log("got poss words");
		CUR_WORD = possible_words[Math.floor(Math.random() * possible_words.length)];
		CUR_ANSWER = NOUN_DB[declension][CUR_WORD][myCase];
		
		$("#word").html(CUR_WORD + ', ' + NOUN_DB[declension][CUR_WORD]['Gender'] + '.: <em>'+NOUN_DB[declension][CUR_WORD]['Definition'] + '</em>');
		$("#case").html(caseNames[myCase]);
		
		
	}
	function evaluate(){
		ATTEMPTS += 1;
		var cur_guess = $("#guess").val();
		if (compareWords(cur_guess, CUR_ANSWER)){
			$('#response').html("<span class='win'>Correct!  "  + CUR_ANSWER + "</span>");
			SUCCESS += 1;
		}
		else{
			$('#response').html("<span class='lose'>Incorrect: " +CUR_ANSWER + "</span>");
		}
		$('#score').html("Current Score: " + SUCCESS +'/' + ATTEMPTS);
	}
	
	$('.myb').on('click', function(){
		$(this).toggleClass("btn-success");
		$(this).toggleClass("btn-danger");
	})
});
