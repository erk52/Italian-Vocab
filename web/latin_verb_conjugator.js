function compareWords(guessed, correct){
  return guessed.toUpperCase() == correct.toUpperCase()
}
var PRONOUNS = ['ego', 'tu', 'is', 'nos', 'vos', 'ei']
var CUR_WORD = "Esse";
var CUR_ANSWER = "eo";
var cur_tense = "Present Indicative Active";
var cur_pronoun = "ego";
var SUCCESS = 0;
var ATTEMPTS = 0;
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
	
	function getTenses(){
		var possible = ['Present Indicative Active','Imperfect Indicative Active','Future Indicative Active','Present Indicative Passive']
		var valid_tenses = [];
		for (i=1;i<=4;i++){
			var box = "c" + i;
			if (document.getElementById(box).checked){
				valid_tenses.push(possible[i-1]);
			}
		}
		if (valid_tenses == []){
			valid_tenses.push("Present Indicative Active");
		}
		return valid_tenses;
	}
	
	function newWord(){
		var tenses = getTenses();
		var possible_words = Object.keys(VERB_DB)
		var number = Math.floor(Math.random() *Object.keys(VERB_DB['Label']).length)
		CUR_WORD = VERB_DB["Label"][number]
		
		cur_tense = tenses[Math.floor(Math.random() * tenses.length)]
		cur_pronoun_number = Math.floor(Math.random() * PRONOUNS.length)
		cur_pronoun = PRONOUNS[cur_pronoun_number]
		CUR_ANSWER = VERB_DB[cur_tense][number][cur_pronoun_number];
		
		$("#infinitive").html(CUR_WORD);
		$("#def").html(VERB_DB["Definition"][number]);
		$("#tense").html(cur_tense + ', ' + PRONOUNS[cur_pronoun_number]);
		
		
		
	}
	
	function evaluate(){
		ATTEMPTS += 1;
		var cur_guess = $("#guess").val();
		if (compareWords(cur_guess, CUR_ANSWER)){
			$('#response').html("<span class='win'>Correct!  " +cur_pronoun+ " " + CUR_ANSWER + "</span>");
			SUCCESS += 1;
		}
		else{
			$('#response').html("<span class='lose'>Incorrect: " +cur_pronoun+ " " + CUR_ANSWER + "</span>");
		}
		$('#score').html("Current Score: " + SUCCESS +'/' + ATTEMPTS);
	}
})