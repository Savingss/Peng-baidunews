// 导航菜单 start
$('.menus:eq(0)').on('click', 'li', function () {
    $(this).addClass('selected').siblings().removeClass('selected');
    // var ind = $(this).index();
    $('.menus:eq(1) li').eq($(this).index()).addClass('selected').siblings().removeClass(
        'selected');
})

$('.menus:eq(1)').on('click', 'li', function () {
    $(this).addClass('selected').siblings().removeClass('selected');
    // var ind = $(this).index();
    $('.menus:eq(0) li').eq($(this).index()).addClass('selected').siblings().removeClass(
        'selected');
})

$('.menus').on('click', 'li', function () {
    console.log($(this).position().left);
    console.log($(this).offset().left);
    var strTag = $(this).text();
    getSlider(strTag);
    getNewsContent(strTag);
    swiperInit();
})

$('.more').click(function () {
    $('.allMenu').removeClass('novis');
    $('.allMenu').addClass('vis');
    $('.allMenu .menus').find('li').width('55px')
})

$('.less').click(function () {
    $('.allMenu').removeClass('vis');
    $('.allMenu').addClass('novis');
})

$('.mark').click(function () {
    $('.allMenu').removeClass('vis');
    $('.allMenu').addClass('novis');
})
// 导航菜单 end

//返回顶部 start 
$('.gotop').click(function () {
    $('html,body').animate({
        'scrollTop': 0
    }, 500)
    // $(this).css({
    //     bottom: '500px'
    // })
    return false;
})
$(window).scroll(function () {
    var winT = $(this).scrollTop();
    // console.log(winT);
    if (winT > $('.newsbanner').offset().top) {
        $('.gotop').css({
            bottom: '100px',
            opacity: 1
        })
    } else {
        $('.gotop').css({
            bottom: '-55px',
            opacity: 0
        })
    }
})
//返回顶部 end
