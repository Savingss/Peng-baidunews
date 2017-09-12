//获取轮播图
getSlider('推荐');
swiperInit();

function getSlider(tag) {
    $.ajax({
        url: '/getSlider/get_slider',
        type: 'get',
        data: {
            sliderTag: tag
        },
        success: function (data) {
            // console.log('获取slider信息成功');
            // console.log(data.results)
            if (data.state == 'ok' && data.results.length > 0) {
                $('.newsbanner').css({
                    display: 'block'
                });
                $('.swiper-wrapper').html('');
                var arr = data.results;
                $(arr).each(function (ind, val) {
                    $(
                        `<div class="swiper-slide"><img src="${val.sliderImg}"><span>${val.sliderTitle}</span></div>`
                    ).appendTo('.swiper-wrapper');
                })
            } else {
                $('.newsbanner').css({
                    display: 'none'
                });
            }
        },
        error: function (error) {
            // console.log(error);
            console.log('获取slider信息失败');
        }
    })
}

// 轮播图 start
function swiperInit() {
    setTimeout(function () {
        var swiper = new Swiper('.newsbanner', {
            loop: true,
            pagination: '.swiper-pagination',
            paginationClickable: true,
            speed: 1500,
            effect: 'fade',
            autoplay: 1000,
            autoplayDisableOnInteraction: false
        });
    }, 30)
}
// 轮播图 end
