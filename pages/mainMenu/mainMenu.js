var session;
var audio = new Audio('../resources/MainMusic.mp3');

$(document).ready(function() {
  $.ajaxSetup({cache: false})
  $.get('../../api/getsession.php', function (data) {
      session = JSON.parse(data);
      if(session.UserName){
        console.log('Hay sesión');
        $('.noSession').css('display', 'none');
        $('.withSession').css('display', 'block');
        playMusic();
      }else{
        console.log('No hay sesión');
        $('.noSession').css('display', 'block');
        $('.withSession').css('display', 'none');
        playMusic();
      }
      console.log(session);
  });
});

function playMusic(){
  const savedVolume = localStorage.getItem('musicVolume');
  if (savedVolume !== null) {
      audio.volume = savedVolume / 100;
      audio.loop = true;
  }
  audio.play();
}


window.fbAsyncInit = function() {
  FB.init({
    appId      : '1100693894882438',
    cookie     : true,
    xfbml      : true,
    version    : 'v20.0'
  });
    
  FB.AppEvents.logPageView();   
    
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

function onLogin(){
    if($('#user').val() != null && $('#user').val() != ''){
      login();
      //fbLogIn();
    }else{
      alert("Ingresa tu usuario");
    }
}

function fbLogIn(){
  FB.login((response) => {
      if(response.authResponse){
          console.log(response);
          login();
      }else{
        alert("Error de sesión en Facebook");
      }
  })
}

function login() {
    $.ajax({
        type: "POST",
        url: "../../api/usersController.php",
        data: {
            userName: $('#user').val(),
            option: 'logIn'
        },
        success: function(data) {
          console.log(data);
          location.reload();
        },
        error: function(xhr, status, error) {
          console.log(error);
            alert('Error.');
            console.log('error');
        },
    });
}