// $(function () {

//获取数据库的每条新闻信息
alert('欢迎来到百度新闻管理后台');
// $('.modUpdateBtn').text('还有空缺项，我暂时失效');
// $('.modUpdateBtn').attr('data-dismiss', 'modal');
getAllNews();
// 获取全部
function getAllNews() {
    $.ajax({
        url: '/handleNews/getAllNews',
        type: 'post',
        success: function (data) {
            // console.log('响应成功！~');
            $('.newsTr').remove();
            // $('<tr class="newsHead"><td>新闻编号</td><td>新闻标题</td><td>新闻时间</td><td>管理员操作</td></tr>').prependTo($('.newsMessage'));
            data.allNews.forEach(function (val, ind) {
                $(
                    `<tr class="newsTr">
                <td>${val.newsId}</td>
                <td>${val.newsTitle}</td>
                <td>${val.newsTime}</td>
                <td>
                  <button type="button" class="btn btn-default updBtn" data-toggle="modal" data-target="#updateNews">修改</button>
                  <button type="button" class="btn btn-warning delBtn" data-toggle="modal" data-target="#oddDel">删除</button>
                </td>
              </tr>`
                ).prependTo($('tbody'));
            });
        },
        error: function (err) {
            console.log('响应失败，不能获取数据~');
        }
    });
}

//点击检验是否有空缺项
var isEmpty = $('.newsTable').find('input,textarea');
$('#addBtn').click(function () {
    isEmpty.each(function (ind, val) {
        if ($(val).val() == '') {
            $('.tipsContent').html('还有空缺项哟~');
            $('#confirmAddBtn').prop('disabled', true);
            return false;
        }
        $('.tipsContent').html('想清楚再按~');
        $('#confirmAddBtn').prop('disabled', false);
    });
});
// 提交按钮模态框的取消按钮
$('#modify').click(function () {
    isEmpty.each(function (ind, val) {
        if ($(val).val() == "") {
            setTimeout(function () {
                $(val).focus();
                $(val).parent().addClass('has-error');
            }, 350);
            return false;
        }
        $(val).parent().removeClass('has-error');
    })
});
// 失去焦点移除类名 has-error
isEmpty.blur(function () {
    $(this).parent().removeClass('has-error');
})
//提交按钮模态框的确认添加按钮
$('#confirmAddBtn').click(function () {
    addNews();
    $('#newsTitle').val('');
    $('#newsContent').val('');
    $('#newsImg').val('');
    $('#newsTime').val('');
    $('#newsTag').val('推荐');
})

//添加新闻
function addNews() {
    var contents = {
        newsTitle: $('#newsTitle').val(),
        newsContent: $('#newsContent').val(),
        newsImg: $('#newsImg').val(),
        newsTime: $('#newsTime').val(),
        newsTag: $('#newsTag').val()
    }
    $.ajax({
        url: '/handleNews/addNews',
        type: 'post',
        data: contents,
        success: function (data) {
            if (data.state == 'ok') {
                alert('添加成功');
                getAllNews();
            }
        },
        error: function (err) {
            console.log('添加失败');
        }
    });
}

// 点击清空全部按钮给全部tr添加类名colorGray
$('.delAllBtn').click(function () {
    $('tbody').find('.newsTr').addClass('colorGray');
})
// 取消删除全部新闻按钮（此按钮在模态框里面）
$('#cancelDelAllBtn').click(function () {
    $('tbody').find('.newsTr').removeClass('colorGray');
})
// 确认删除全部新闻按钮（此按钮在模态框里面）
$('#delAllBtn').click(function () {
    $.ajax({
        url: '/handleNews/deleteAllNews',
        type: 'get',
        success: function (data) {
            if (data.state = 'ok') {
                getAllNews();
            }
        },
        error: function (err) {
            console.log(err)
        }
    });
})

//删除||修改，选中项
$('tbody').on('click', '.newsTr', function () {
    //这里的this指向每一个类名为newsTr的元素
    if (!$(this).hasClass('colorGray')) {
        $(this).addClass('colorGray');
        $('.delCurBtn').prop('disabled', false);
        $('.cancelCurBtn').prop('disabled', false);
        $('.CurReverseBtn').prop('disabled', false);
    } else {
        $(this).removeClass('colorGray');
        var res = $('tbody').find('.newsTr').hasClass('colorGray');
        if (!res) {
            $('.delCurBtn').prop('disabled', true);
            $('.cancelCurBtn').prop('disabled', true);
            $('.CurReverseBtn').prop('disabled', true);
        }
    }
})

//点击删除单条新闻按钮获取newsid
var newsid;
$('tbody').on('click', '.delBtn', function (e) {
    // e.stopPropagation(); //question??
    newsid = $(this).parents('tr').find('td:first-child').text();
})
//确认点击删除单条新闻
$('.confirmDelBtn').click(function () {
    $.ajax({
        url: '/handleNews/deleteNews',
        type: 'get',
        data: {
            newsid: newsid
        },
        success: function (data) {
            if (data.state == 'ok') {
                console.log('删除成功');
                getAllNews();
                $('.newsTr').removeClass('colorGray');
                $('.delCurBtn').prop('disabled', true);
                $('.cancelCurBtn').prop('disabled', true);
            }
        }
    })
})

//点击修改按钮获后发送该项新闻编号（id）然后取该项的新闻信息
$('tbody').on('click', '.updBtn', function () {
    newsid = $(this).parents('tr').find('td:first-child').text();
    $.ajax({
        url: '/handleNews/getUpdateId',
        type: 'get',
        data: {
            newsid: newsid
        },
        success: function (data) {
            if (data.state == 'ok') {
                console.log('获取新闻编号为：' + newsid + '号的新闻的信息成功');
                $('#mod-newsTitle').val(data.results[0].newsTitle);
                $('#mod-newsContent').val(data.results[0].newsContent);
                $('#mod-newsImg').val(data.results[0].newsImg);
                $('#mod-newsTag').val(data.results[0].newsTag);
                var newTime = data.results[0].newsTime.substr(0, 10);
                $('#mod-newsTime').val(newTime);
            }
        },
        error: function (err) {
            console.log(err)
        }
    })
})

// 确认修改新闻信息按钮和方法 start
$('.modUpdateBtn').click(function () {
    setTimeout(function () {
        $('.modUpdateBtn').attr('data-dismiss', '');
        $('.modUpdateBtn').text('修改');
    }, 10);
    if ($(this).text() == '确认修改') {
        confirmUpdate();
    }
})

function confirmUpdate() {
    $.ajax({
        url: '/handleNews/updateNews',
        type: 'get',
        data: {
            newsId: newsid,
            newsTitle: $('#mod-newsTitle').val(),
            newsContent: $('#mod-newsContent').val(),
            newsImg: $('#mod-newsImg').val(),
            newsTag: $('#mod-newsTag').val(),
            newsTime: $('#mod-newsTime').val()
        },
        success: function (data) {
            if (data.state = 'ok') {
                alert('修改成功！~');
                getAllNews();
            }
        },
        error: function (err) {
            alert('修改失败！~');
        }
    })
}
// 确认修改新闻信息按钮和方法 end

//修改新闻信息模态框验证空缺项
var modIsEmpty = $('.mod-newsTable').find('input,textarea');
// console.log(modIsEmpty)
$('.mod-newsTable').on('input propertychange', 'input,textarea,select', function () {
    $(modIsEmpty).each(function (ind, val) {
        if ($(val).val() == '') {
            $('.modUpdateBtn').text('还有空缺项，我暂时失效');
            $('.modUpdateBtn').attr('data-dismiss', '');
            // return false;
        } else {
            $('.modUpdateBtn').text('确认修改');
            $('.modUpdateBtn').attr('data-dismiss', 'modal');
        }
    })
})
//取消删除单条新闻按钮（此按钮在模态框里面）
$('.cancelDelBtn').click(function () {
    $('.newsTr').removeClass('colorGray');
    $('.delCurBtn').prop('disabled', true);
    $('.cancelCurBtn').prop('disabled', true);
    $('.CurReverseBtn').prop('disabled', true);
    $('.modUpdateBtn').text('修改');
    $('.modUpdateBtn').attr('data-dismiss', '');
})

//取消选择
$('.cancelCurBtn').click(function () {
    $('.newsTr').removeClass('colorGray');
    $('.delCurBtn').prop('disabled', true);
    $('.cancelCurBtn').prop('disabled', true);
    $('.CurReverseBtn').prop('disabled', true);
})
//全部选择
var CurAllFlag = 1;
$('.CurAllBtn').click(function () {
    if (CurAllFlag) {
        CurAllFlag = 0;
        $('tbody').find('.newsTr').addClass('colorGray');
        $('.delCurBtn').prop('disabled', false);
        $('.cancelCurBtn').prop('disabled', false);
        $('.CurReverseBtn').prop('disabled', false);
    } else {
        CurAllFlag = 1;
        $('tbody').find('.newsTr').removeClass('colorGray');
        $('.delCurBtn').prop('disabled', true);
        $('.cancelCurBtn').prop('disabled', true);
        $('.CurReverseBtn').prop('disabled', true);
    }
})
// 反向选择
$('.CurReverseBtn').click(function () {
    $('.newsTr').each(function (ind, val) {
        if ($(val).hasClass('colorGray')) {
            $(val).removeClass('colorGray');
        } else {
            $(val).addClass('colorGray');
        }
    })
})


//点击删除选中项按钮获取新闻被选中的id
var newsIdArr = [];
$('.delCurBtn').click(function () {
    newsIdArr = [];
    $('.newsTr').each(function (ind, val) {
        if ($(val).hasClass('colorGray')) {
            var newsid = $(val).find('td:first-child').html();
            newsIdArr.push(newsid);
        }
    })
})
//确认删除选中项按钮（此按钮在在模态框里面）
$('#confirmDelCurBtn').click(function () {
    console.log(newsIdArr);
    $.ajax({
        url: '/handleNews/delCurNews',
        type: 'get',
        data: {
            newsIdArr: newsIdArr
        },
        success: function (data) {
            alert('删除成功');
            getAllNews();
            $('.delCurBtn').prop('disabled', true);
            $('.cancelCurBtn').prop('disabled', true);
        }
    })
})

//模糊搜索
$('.detailBox').on('input', '#searchBtn', function () {
    var cont = $(this).val();
    console.log(cont);
    $.ajax({
        url: '/handleNews/searchNews',
        type: 'get',
        data: {
            searchCont: cont
        },
        success: function (data) {
            // console.log(data);
            if (data.results.length > 0) {
                $('.newsTr').remove();
                data.results.forEach(function (val, ind) {
                    $(`<tr class="newsTr">
                        <td>${val.newsId}</td>
                        <td>${val.newsTitle}</td>
                        <td>${val.newsTime}</td>
                        <td>
                            <button type="button" class="btn btn-default updBtn" data-toggle="modal" data-target="#updateNews">修改</button>
                            <button type="button" class="btn btn-warning delBtn" data-toggle="modal" data-target="#oddDel">删除</button>
                        </td>
                    </tr>`).prependTo($('tbody'));
                });
            } else {
                getAllNews();
            }
        }
    })
})

// }) // 最外层