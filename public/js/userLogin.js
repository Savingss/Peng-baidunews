$('#goBack').click(function () {
    window.location.href = 'http://localhost:3000/userManager'
})

// $('#login-formWrapper').on('blur', '#login-username,#login-submit', function () {
//     if ($('#login-username').val() && $('#login-password').val()) {
//         $('#login-submit').prop('disabled', true);
//         $('#login-submit').addClass('pass-button-full-disabled');
//     } else {
//         $('#login-submit').prop('disabled', false);
//         $('#login-submit').removeClass('pass-button-full-disabled');
//     }

// })


//登录按钮
$('#login-submit').click(function () {
    var username = $('#login-username').val();
    var pwd = $('#login-password').val();
    if (username != '' && pwd != '') {
        var json = {
            username: username,
            pwd: pwd
        }
        $.ajax({
            url: '/userManager/userLogin',
            type: 'post',
            data: json,
            success: function (data) {
                if (data.state == 'ok') {
                    alert('登陆成功~');
                    window.location.href = 'http://localhost:3000/home';
                } else {
                    alert(data.message);
                    $('#login-password').val('');
                    $('#login-username').val('').focus();
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    } else {
        alert('用户名或密码不能为空')
    }
})

// 显示输入密码按钮
var flag = 1;
$('#login-pwdToggle').click(function () {
    if (flag) {
        flag = 0;
        $('#login-password').prop('type', 'text');
    } else {
        flag = 1;
        $('#login-password').prop('type', 'password');

    }
})