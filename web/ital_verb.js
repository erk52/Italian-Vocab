function compareWords(guessed, correct){
  return guessed.toUpperCase() == correct.toUpperCase()
}

var CUR_WORD = "mangiare";
var CUR_ANSWER = "mangio";
var cur_tense = "Present Indicative";
var cur_pronoun = "io";
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
		var possible = ['Present Indicative', 'Passato Prossimo', 'Imperfetto', 'Passato Remoto',
					'Present Subjunctive', 'Futuro', 'Imperfect Subjunctive', 'Conditional']
		var valid_tenses = [];
		for (i=1;i<=8;i++){
			var box = "c" + i;
			if (document.getElementById(box).checked){
				valid_tenses.push(possible[i-1]);
			}
		}
		if (valid_tenses == []){
			valid_tenses.push("Present Indicative");
		}
		return valid_tenses;
	}
	
	function newWord(){
		var tenses = getTenses();
		var possible_words = Object.keys(VERB_DB)
		CUR_WORD = possible_words[Math.floor(Math.random() *possible_words.length)]
		cur_tense = tenses[Math.floor(Math.random() * tenses.length)]
		cur_pronoun = PRONOUNS[Math.floor(Math.random() * PRONOUNS.length)]
		CUR_ANSWER = VERB_DB[CUR_WORD][cur_tense][cur_pronoun];
		
		$("#infinitive").html(CUR_WORD);
		$("#tense").html(cur_tense + ', ' + cur_pronoun);
		
		
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
