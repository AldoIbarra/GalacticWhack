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
      console.log(session);
  });
  getScores();
});

function playMusic(){
  const savedVolume = localStorage.getItem('musicVolume');
  if (savedVolume !== null) {
      audio.volume = savedVolume / 100;
      audio.loop = true;
  }
  audio.play();
}

function getScores(){
    $.ajax({
        type: "GET",
        url: "../../api/usersController.php/?scores=1",
        success: function(response) {
            console.log(JSON.parse(response).data);
            setScores(JSON.parse(response).data);
        },
        error: function(xhr, status, error) {
            alert('Error al cargar los scores');
            console.log('error');
            console.log(error);
        },
    });
}

function setScores(scores){
    var table = $("#scoreTable");
    for (let i = 0; i < scores.length; i++) {
        var text = '<tr><td>' + (i + 1) + '</td><td>' + scores[i].UserName + '</td><td>..........</td><td>' + scores[i].MaxScore + '</td></tr>';
        table.append(text);
    }
}