$('#goBack').click(function () {
    window.location.href = 'http://localhost:3000/userManager/userLogin'
})

$('#reg-formWrapper').on('input', '#reg-mobilenum,#mobilepwd,#mobilerepwd', function () {
    $('#reg-verifyCodeSend').removeClass('pass-button-full-disabled').prop('disabled', '');
})

//注册按钮
$('#reg-verifyCodeSend').click(function () {
    var mobilenum = $('#reg-mobilenum').val();
    var pwd = $('#mobilepwd').val();
    var repwd = $('#mobilerepwd').val();
    if (mobilenum != '' && pwd != '' && repwd != '') {
        // alert(123)
        var regnum = /^1[34578]\d{9}$/;
        if (regnum.test(mobilenum)) {
            // 必须由数字和字母组成的至少6位密码
            var regpwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
            if (pwd == repwd && regpwd.test(pwd)) {
                $.ajax({
                    url: '/userManager/addUsers',
                    type: 'post',
                    data: {
                        mobilenum: mobilenum,
                        pwd: pwd
                    },
                    success: function (data) {
                        console.log('okokok');
                        if (data.state == 'ok') {
                            alert(data.message);
                            window.location.href = 'http://localhost:3000/userManager/userLogin'
                        }
                    },
                    error: function (err) {
                        console.log(err)
                    }
                })
            } else {
                alert('密码格式有误或两次输入密码不一样')
            }
        } else {
            alert('手机号码格式有误，请重新输入')
        }
    } else {
        alert('还有空缺项！')
    }
})