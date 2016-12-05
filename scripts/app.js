$(document).ready(function () {
  console.log('ready')
  // document.getElementById("win").play();
  // document.getElementById('sound/Ta Da-SoundBible.com-1884170640.wav').play();
  var audio2 = document.getElementById("mario");
  var audio3 = document.getElementById("coin");
  var audio4 = document.getElementById("zerotime");

  // onClick pop sound
  function playSound(soundFile) {
    var audio = new Audio(soundFile);
    audio.play();
  }


  //sound should be connected to after Start button is clicked
  // function  soundIntro(soundFile) {
  //   var music = new Music(soundFile);
  //   music.play();
  // }


  var startNewGame = $(".new")
  var howToPlay = $(".howTo")


  // start.NewGame.click(newGame)
  howToPlay.click(newHowTo)


  //How To Play link for game instructions
  $(".howTo").click(function(){
      $(".overlay").fadeIn(1000);
  });

  //starts a new game
  $(".new").click(function () {
    startGame();
  });

  //function called after the "Start Game" button is clicked
  $("#start_button").click(startGame);
  $('.title').hide();
  $('.grid_container').hide();
  $('.score_container').hide();
  $('.container2').hide();


  var timerInterval = null;

  //this function not working
  function startGame() {
    $('body').css('background', "initial");
    console.log('start button clicked')
    $('.instructions').hide();
    $('.title').show();
    $('.grid_container').show();
    $('.score_container').show();
    $('#timer').show();
    $(".images_container").empty();
    $("#timesup, #winner-modal, #gameover-modal").hide();
    count = 25;
    winning = 0;
    losing = 0;
    gameWasEnded = false;
    info.resetScore();
    clearInterval(timerInterval);
    timer();
    var $bubbles = [];
    for (var i = 0; i <= 40; i++) {
      $bubbles.push($("<img>", {
        "class": "box",
        id: i,
        src: "img/bubble.png"
      }));
    }
    $('.grid_container').empty().append($bubbles);

    // soundIntro('sound/Loading_Loop.wav');
  }


  //for timer
  var timerElement = $('#clock');
  var count;

  var isTimerStarted = false;
  //var counter = setInterval(timer, 1000);

  function updateTimerUI () {
    $("#clock").text(count);
  }
    //countdown timer working
  function timer(){
    $('.score_container2').show();
    updateTimerUI();
    timerInterval = setInterval(function () {
      count--;
      updateTimerUI();
      if (count <= 0)	{
       gameEnded(null);
       return;
      }
    }, 1000)
  }


  //How To Play link-upper left corner
  $(".ready").click(function(){
      $(".overlay").fadeIn(1000);
  });

  //How to Play link back to main screen
  $("a.close").click(function(){
      $(".overlay").fadeOut(1000);
  });

  // How to Play button clicked
  function newHowTo() {
      console.log('how to is working');
  }

//NEW gameover MODAL
function gameOver(){
    $('#gameover-modal').fadeIn(1000);
    }


//NEW winner MODAL
function winner() {
  $('#winner-modal').fadeIn(1500);
}
$('span').hide();


function winner_alert() {
  $('#winner-alert').toggle(1000);
}

  //append images to the DOM onclick bubble function
  var appendImages = ['img/vic.png', 'img/broccoli.gif', 'img/butterfly.gif',
   'img/cat.gif', 'img/fairy.gif', 'img/girl.gif', 'img/hamster.gif', 'img/mario.gif',
   'img/parachute.gif', 'img/penguin.gif', 'img/robot.gif', 'img/skull.gif', 'img/Small_pegasus.gif',
  'img/smallRobot.gif','img/star.gif', 'img/unicorn.png', 'img/witch.gif', 'img/boom.png', 'img/crunch.png',
    'img/wham.png', 'img/splat.png', 'img/changer.gif', 'img/babyuni.gif', 'img/koala.gif', 'img/laugh.gif',
  'img/ow.png', 'img/musicnotes.gif', 'img/kaboom.png', 'img/ninjakid.gif', 'img/panda.gif',
  'img/ninjaTurtle.gif', 'img/catChasing.gif','img/windup.gif', 'img/camera.gif', 'img/banana.gif', 'img/skreech.png',
  'img/skull2.gif', 'img/crunch.png', 'img/pow.png', 'img/rotatingStar.gif']

  appendImages.sort(function() { return 0.5 - Math.random() });


  // for (var i = 0; i < appendImages.length; i++) {
  //   if (appendImages[i].length > count) {
  //     // console.log(appendImages)
  //   }
  // }


  //number of points for scoreboard global variable
  var howMany = 0;

  // $(‘.box’).length
  // var numberOfImages = $(‘.box’).length;



  //checkScore to add level
  var info = {
    scoreCounter: 0,
    addScore: function(num) {
      //this.info += num;
      this.scoreCounter += num;
      // $('#info').text(this.scoreCounter);
      collect10();
    },
    removeScore: function(num){
      this.scoreCounter -= num;
      collect10();
    },
    resetScore: function () {
      this.scoreCounter = 0;
      collect10();
    }
  };


  //if/else logic for level up
  function collect10() {
    $('#info').text(info.scoreCounter);
  }
  collect10();

  var winning = 0;
  var losing = 0;
  var gameWasEnded = false;

  // window.endGame = gameEnded;
  function gameEnded (won) {
    clearInterval(timerInterval);
    gameWasEnded = true;
    if (won) {
      new PNotify({
        type: "success",
        title: 'Congrats!!!',
        icon: false,
        text: 'Having a bad day?  Be happy! You won! :D',
        delay: 1000
      });
      // You won!
      // new PNotify('Its magical!  You collected 2 unicorns AND a pegasus!  Nothing can top that! You win!!!')
      $('#winner-alert').fadeIn(1500);
      $('#winner-alert').fadeOut(1500);
      $("#scoreCount").text("$" + info.scoreCounter).show();
      document.getElementById("win").play();
      // $('#winner').show();
      // return;
      $('#winner-modal').fadeIn(1000)
      $('#winner-modal').fadeOut(8000)
    } else if (won === false){
      new PNotify({
        type: "error",
        title: 'Sorry!',
        icon: false,
        text: 'Having a bad day?  You collected 3 different skulls...Nobody wins this way!',
        delay: 1000
      });
      audio2.play();
      // $('#gameover').show();
      $('#gameover-modal').fadeIn(3500)
      $('#gameover-modal').fadeOut(3000)
      // return;
    } else {
      $('#timesup').show();
      setTimeout(function(){
        $('#timesup').fadeOut();
      }, 5000);
    }
  }

  function appendImage(){

    var firstImage = appendImages.pop();
    if(firstImage){
      $('.images_container').append('<img class="box" src="'+firstImage+'" />');
      console.log('appendImages working');

      if(firstImage=='img/unicorn.png'){
         new PNotify('You found a special unicorn and earned 3 More Images! + 200 points!')
        audio3.play();
        $('#coin').show();
        appendImage();
        appendImage();
        appendImage();
        info.addScore(200);

      } else if (firstImage =='img/skull.gif') {
        new PNotify('Sorry! You clicked on the scary skull and lose -100 points and 5 of your images.')
        audio3.play();
        $('#skull').show();
        $('.images_container img').slice(0, 5).remove();
        info.removeScore(100);

      } else if (firstImage =='img/vic.png') {
        new PNotify('You found my baby picture!  Collect ++200 points and 2 More images!')
        audio3.play();
        $('#coin').show();
        appendImage();
        appendImage();
        info.addScore(200);
      } else {
        info.addScore(10);
        // audio3.play();
      }

            if( firstImage == 'img/unicorn.png' || firstImage == 'img/Small_pegasus.gif' || firstImage == 'img/babyuni.gif'){
          // if (true) {
              winning++;
              if(winning>2){
                gameEnded(true);
              }
            }
            if( firstImage == 'img/changer.gif' || firstImage == 'img/skull.gif' ||  firstImage == 'img/skull2.gif') {
            // if (true) {
              losing++;
              if(losing>2){
                gameEnded(false);
              }

            }


    }
      // else if (firstImage=='img/unicorn.png' && 'img/Small_pegasus.gif' && 'img/babyuni.gif') {
      //   new PNotify('It/s magical!  You collected 2 unicorns AND a pegasus!  Nothing can top that! You win!!!')
      //   $('#winner').show();
      // } else {
      //   info.addScore(10);
      // }
        // });
    //}
   }


  //higher level function for onClick image to sound pop, remove and add points
  $(".grid_container").on("click", ".box", function() {
    if (gameWasEnded) {
      return;
    }
      $('body').css('background', randomColor());

      playSound('sound/PopBanner-SoundBible.com-641783855.wav');
      // howMany += 10;
      // $("#info").text(howMany);
      // (this).append(appendImages);
      $(this).addClass((Math.random () > 0.5 ? "fadeOutUp": "zoomOutUp") + " animated").css({
        "pointer-events": "none"
      });
      console.log('i am removed')

      appendImage()
      //appendImages
  });


  // $(document.body).on('click', '.box', function(e){
  //   // howMany++;
  //   // $('#info').text(howMany);
  //   $('body').css('background', randomColor());
  // });
  //randomly changes the background on image click
  function randomColor() {
      return '#' + Math.random().toString(16).slice(2, 8);
  };


}); // on document ready





// for(var i=0;i<numberOfImages;i++) {
//   $('#'+i).click(function(){
//       howMany += 1;
//       $("#info").text(howMany);
//   });
//  }
