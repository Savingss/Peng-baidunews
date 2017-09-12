$('.nav_recommend').click(function () {
    getSlider('recommend');
    getNewsContent('recommend');
    swiperInit();
})

//百家
$('.nav_baijia').click(function () {
    // getSlider('baijia');
    $('.newsbanner').css({
        display: 'none'
    });
    getNewsContent('baijia');

})

//本地
$('.nav_local').click(function () {
    getSlider('local');
    getNewsContent('local');
    swiperInit();
})

// 娱乐
$('.nav_ENT').click(function () {
    getSlider('ENT');
    getNewsContent('ENT');
    swiperInit();
})

// 社会
$('.nav_community').click(function () {
    getSlider('community');
    getNewsContent('community');
    swiperInit();
})

// 军事
$('.nav_military').click(function () {
    getSlider('military');
    getNewsContent('military');
    swiperInit();
})

// 女人
$('.nav_woman').click(function () {
    getSlider('woman');
    getNewsContent('woman');
    swiperInit();
})

//搞笑
$('.nav_fun').click(function () {
    // getSlider('baijia');
    $('.newsbanner').css({
        display: 'none'
    });
    getNewsContent('fun');
})

// 互联网
$('.nav_Internet').click(function () {
    getSlider('Internet');
    getNewsContent('Internet');
    swiperInit();
})