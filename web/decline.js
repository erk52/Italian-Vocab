function compareWords(guessed, correct){
  return guessed.toUpperCase() == correct.toUpperCase()
}

function displayWord(base, def){
  $("#define").html(base +": " + def)
}


$(document).ready(function(){

  $(".option").click(function(){
    $(this).toggleClass("active");
  })
  
  
});
