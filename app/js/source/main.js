(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $('#play').click(clickPlay);
    $('#shellHolder').on('click', '.shell', clickCheckAnswer);
    resetCounter();
  }

  var winner = 0;

  function resetCounter(){
    $('#won').text('0');
    $('#slash').text('/');
    $('#played').text('0');
    $('#percent').text('-');
  }

  function clickPlay(){
    var plays = parseInt($('#played').text()) + 1;
    $('#played').text(plays);
    winner = (Math.floor(Math.random()*3))+1;
    for(var i = 1; i<4; i++){
      var $newDiv = $('<div>');
      $newDiv.text(i);
      $newDiv.addClass('shell');
      $('#shellHolder').append($newDiv);
    }
  }

  function clickCheckAnswer(){
    if(parseInt(this.textContent)===winner){
      alert('You win!');
      var score = parseInt($('#won').text()) + 1;
      $('#won').text(score);
    }
    else{
      alert('Sorry, try again! The bean was in shell ' + winner + '!');
    }
    $('#shellHolder').empty();
    $('#percent').text(calculatePercent() + '%');
  }

  function calculatePercent(){
    var percent = parseInt($('#won').text())/parseInt($('#played').text());
    percent *= 100;
    percent = Math.round(percent);
    return percent;
  }

})();
