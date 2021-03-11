$(function(){

$('html').addClass('wf-active');

//画面の横幅
const windowWidth = $(window).width();
//詳細ページの総数
const placeMax = $('.gnav__item').length; 
//URLのページID
const placeId = location.search.replace('?id=', '');
//PSTOPぺージの画面が明るくなる時間
const time = 1500

//スマホTOPのスライド位置
let slidePosition = 0;
//スマホTOPページのスライド番目
let slideNum = 1;

let prevBtn =$('[data-slide="prev"]');


//スマホTOPページのスライド関数
function spSlide(type) {

  if(type === 'prev'){
    slidePosition -= windowWidth;
    slideNum--;
    if(slideNum === 1){
      prevBtn.fadeOut();
    }
  }

  if(type === 'next'){
    slidePosition += windowWidth;
    slideNum++;
    if( slideNum <= placeMax ){
      prevBtn.fadeIn();
    } else {
      slidePosition = 0;
      slideNum = 1;
      prevBtn.fadeOut();
    }
  }

  $('.main').animate({
    scrollLeft:slidePosition
  });

  $('.gnav__item').removeClass('is-active');
  $('.gnav__item').eq(slideNum-1).addClass('is-active');
  
  return false;
}

//スマホ時のみ適応
if( windowWidth <= 768 ){

  $('[data-slide]').on('click',function(){
    let slideType = $(this).attr('data-slide');
    spSlide(slideType);
  });

} else {

  if($('body').attr('id') === 'page-index' ){
    // ランダムに明るく
    setInterval(function(){
      const random = Math.floor(Math.random()*placeMax);
      $('.thumbnail__item').removeClass('is-active');
      $('.thumbnail__item').eq(random).addClass('is-active');
    },time);

    // 回転
    let rand_arr = [1,2,3,4,5,6,7,8].sort(function(){
      Math.random() - 0.5
    });

    for(let i = 0 ; i < rand_arr.length ; i++ ){
      const n = rand_arr[i];
      $('.thumbnail__item').eq(i).addClass( 'pos'+ n )
    }
  
  }
}

//下層ページのみ適応
if( $('body').attr('id') === 'page-place' ){
  $('.place__img img').attr('src','./img/place/' + placeId + '.jpg');

  $('[data-place]').each(function(index,el){

    let placeKey = $(this).attr('data-place');

    if($(this)[0].tagName == 'A'){
      $(this).attr('href', place[placeId - 1][placeKey]);
    }
    else{
        $(this).text(place[placeId - 1][placeKey]);
    }	

  });

  setTimeout(function(){
    $('.loader-wrap').remove();
  },1000)

}

});