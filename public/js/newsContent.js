getNewsContent('推荐')

function getNewsContent(tag) {
    // var page = 0;
    $('.content-box').html('');
    $.ajax({
        url: '/getNewsContent/get_newsContent',
        type: 'get',
        data: {
            // page: page++,
            // sizes: 4,
            newsTag: tag
        },
        success: function (data) {
            // console.log('获取新闻内容成功！~');
            var arr = data.results;
            // console.log(arr.length)
            if (arr.length > 0) {
                $(arr).each(function (ind, val) {
                    var newtime = val.newsTime.substr(0, 10);
                    // console.log(newtime);
                    $(
                        `
                    <div class="content-item scrollload-content">
                    <div class="newsPic"><img class="lazy" data-original="${val.newsImg}" alt="你图裂了"></div>
                    <div class="newscont">${val.newsTitle}<p class="date">${newtime}</p></div>
                    </div>
                `
                    ).appendTo('.content-box');
                })
            } else {
                alert('没有更多数据加载了~');
            }
        },
        error: function (err) {
            console.log('获取新闻内容失败！~');
            console.log(err);
        }
    })
    setTimeout(function () {
        $("img.lazy").lazyload({
            effect: "fadeIn"
        });
    }, 300);
}

// 判断元素是否出现在可视区域
// $(window).scroll(function () {
//     var scrollH = document.documentElement.scrollHeight;
//     var clientH = document.documentElement.clientHeight;
//     if (scrollH == (document.documentElement.scrollTop | document.body.scrollTop) + clientH) {
//         //加载新数据
//         alert('加载数据ing~');
//         getNewsContent('推荐');
//     }
// });

//判断滚动条到达顶部或底部（可用于上拉下拉加载刷新）
// $(window).scroll(function () {
//     //$(document).scrollTop() 获取垂直滚动的距离
//     //$(document).scrollLeft() 这是获取水平滚动条的距离
//     if ($(document).scrollTop() <= 0) {
//         alert("滚动条已经到达顶部为0");
//     }
//     if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
//         alert("滚动条已经到达底部为" + $(document).scrollTop());
//     }
// });