var session;
var audio = new Audio('../resources/MainMusic.mp3');

$(document).ready(function() {
    $.ajaxSetup({cache: false})
    $.get('../../api/getsession.php', function (data) {
      session = JSON.parse(data);
      if(session.UserName){
        playMusic();
      }else{
        playMusic();
      }
  });

});

function playMusic(){
    audio.loop = true;
    audio.play();
    setVolume();
}

function setVolume(){
    const $slider = $('#slider');

    const savedVolume = localStorage.getItem('musicVolume');
    if (savedVolume !== null) {
        $slider.val(savedVolume);
        audio.volume = savedVolume / 100;
    }

    $slider.on('input', function () {
        const volume = $(this).val();
        localStorage.setItem('musicVolume', volume);
        audio.volume = volume / 100;
    });
}