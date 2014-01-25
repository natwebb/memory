(function(){

  'use strict';

  var board = [[],[],[],[]];
  var turn;
  var pickA;
  var pickB;
  var positionA;
  var positionB;

  $(document).ready(initialize);

  function initialize(){
    $('#newGame').click(clickPlay);
    $('#gameBoard td').click(showCard);
  }

  function clickPlay(){
    $('.cardFront').each(function(){
      $(this).text('');
      $(this).css('opacity','0');
    });
    $('.cardBack').each(function(){
      $(this).css('opacity','1');
    });
    turn = 0;
    positionA = [];
    positionB = [];
    var startingLetters = generateStartingLetters();
    assignLettersToBoard(startingLetters);
    $('#gameBoard').show();
  }

  function generateStartingLetters(){
    var letters = 'abcdefghijklmnopqrstuvwxyz';
    var chosenLetters = '';
    for(var i = 0; i<10; i++){
      var place = (Math.floor(Math.random()*(26-i)));
      var pick = letters[place];
      chosenLetters = chosenLetters + pick;
      chosenLetters = chosenLetters + pick;
      letters = letters.replace(pick, '');
    }
    return chosenLetters;
  }

  function assignLettersToBoard(letters){
    var countdown = 0;

    for(var i = 0; i<4; i++){
      for(var j = 0; j<5; j++){
        var place = (Math.floor(Math.random()*(20-countdown)));
        var pick = letters[place];
        board[i][j] = pick;
        letters = letters.replace(pick, '');
        countdown++;
      }
    }
  }

  function showCard(){
    var thisRow = $(this).parent().index();
    var thisCol = $(this).index();

    if(turn===0){
      positionA[0] = thisRow;
      positionA[1] = thisCol;
      pickA = board[thisRow][thisCol];
      $(this).children('.cardFront').text(pickA.toUpperCase());
      $(this).children('.cardFront').css('opacity', '1');
      $(this).children('.cardBack').css('opacity', '0');
      turn = 1;
    }
    else if(turn===1){
      if(positionA[0]===thisRow&&positionA[1]===thisCol){
        return;
      }
      positionB[0] = thisRow;
      positionB[1] = thisCol;
      pickB = board[thisRow][thisCol];
      $(this).children('.cardFront').text(pickB.toUpperCase());
      $(this).children('.cardFront').css('opacity', '1');
      $(this).children('.cardBack').css('opacity', '0');
      checkCards();
    }
    else if(turn===2){
      resetTurn();
    }
  }

  function checkCards(){
    if(pickA===pickB){
      turn = 0;
      positionA = [];
      positionB = [];
      if($('.cardFront[style="opacity: 1;"').size()===20){
        alert('You win!');
      }
    }
    else{
      turn = 2;
    }
  }

  function resetTurn(){
    var row = positionA[0] + 1;
    var column = positionA[1] + 1;
    $('#gameBoard > tbody > tr:nth-child('+row+') > td:nth-child('+column+') .cardFront').css('opacity','0');
    $('#gameBoard > tbody > tr:nth-child('+row+') > td:nth-child('+column+') .cardFront').text('');
    $('#gameBoard > tbody > tr:nth-child('+row+') > td:nth-child('+column+') .cardBack').css('opacity','1');

    row = positionB[0] + 1;
    column = positionB[1] + 1;
    $('#gameBoard > tbody > tr:nth-child('+row+') > td:nth-child('+column+') .cardFront').css('opacity','0');
    $('#gameBoard > tbody > tr:nth-child('+row+') > td:nth-child('+column+') .cardFront').text('');
    $('#gameBoard > tbody > tr:nth-child('+row+') > td:nth-child('+column+') .cardBack').css('opacity','1');

    positionA = [];
    positionB = [];

    turn = 0;
  }

})();
