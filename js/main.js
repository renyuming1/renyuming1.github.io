/**
 * some JavaScript code for this blog theme
 */
/* jshint asi:true */

/////////////////////////header////////////////////////////
/**
 * clickMenu
 */
(function() {
  if (window.innerWidth <= 770) {
    var menuBtn = document.querySelector('#headerMenu')
    var nav = document.querySelector('#headerNav')
    menuBtn.onclick = function(e) {
      e.stopPropagation()
      if (menuBtn.classList.contains('active')) {
        menuBtn.classList.remove('active')
        nav.classList.remove('nav-show')
      } else {
        nav.classList.add('nav-show')
        menuBtn.classList.add('active')
      }
    }
    document.querySelector('body').addEventListener('click', function() {
      nav.classList.remove('nav-show')
      menuBtn.classList.remove('active')
    })
  }
}());

//////////////////////////back to top////////////////////////////
(function() {
  var backToTop = document.querySelector('.back-to-top')
  var backToTopA = document.querySelector('.back-to-top a')
  // console.log(backToTop);
  window.addEventListener('scroll', function() {

    // 页面顶部滚进去的距离
    var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)

    if (scrollTop > 200) {
      backToTop.classList.add('back-to-top-show')
    } else {
      backToTop.classList.remove('back-to-top-show')
    }
  })

  // backToTopA.addEventListener('click',function (e) {
  //     e.preventDefault()
  //     window.scrollTo(0,0)
  // })
}());

//////////////////////////hover on demo//////////////////////////////
(function() {
  var demoItems = document.querySelectorAll('.grid-item')
}());


/// music control
// need to think a more generic and delegate way to realize it. 
var isFirstToggleMusic = true;
function loadMusic() {
    if (isFirstToggleMusic && $('#music-content')) {
        $('#music-content').html('<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=450 src="https://music.163.com/outchain/player?type=0&id=899968490&auto=1&height=430"></iframe>');
        $('#music-control').css('background-image', 'url(/assets/images/music_logo_ani.gif)');
    }
    else
    {
      console.log("remove music content");
      $('#music-content').html('');
      $('#music-control').css('background-image', 'url(/assets/images/music_logo.png)');
    }
    isFirstToggleMusic = !isFirstToggleMusic;
}

$('#music-control').click(function(){
  loadMusic();
});

