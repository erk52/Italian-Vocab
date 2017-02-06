var CUR_WORD = "amicus, -i";
var CUR_ANSWER = "amicus";
var CUR_CASE = "Nominative Singular";
var CUR_DECLENS = 2;

var SUCCESS = 0;
var ATTEMPTS = 0;


function compareWords(guessed, correct){
  return guessed.toUpperCase() == correct.toUpperCase()
}




$(document).ready(function(){
	//newWord();
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
			if $(but).hasClass('btn-success'){
				decs.push(i);
			}
			
		}
		if (decs == []){
			decs = [1];
		}
		return decs;
	}

	
	$('.btn').on('click', function(){
		$(this).toggleClass("btn-success");
		$(this).toggleClass("btn-danger");
	})
});
