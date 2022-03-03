function validateLogin() {
    var username = document.getElementById("login_userName");
    var password = document.getElementById("login_password");
    var alert_null_un = document.getElementById("login_alert_un");
    var alert_null_pw = document.getElementById("login_alert_pw");
    var alert_fail = document.getElementById("login_alert_fail");
    var alert_success = document.getElementById("login_alert_success");

    alert_fail.hidden=true;
    alert_null_un.hidden=true;
    alert_null_pw.hidden=true;
    alert_success.hidden=true;

    if(username.value == "") {
        alert_null_un.hidden=false;
    } else if(password.value == "") {
        alert_null_pw.hidden=false;
    } else {
        clearFields_login();
        window.location.href = "../pages/index.html";
        //db con
        //link to frontend backend
    }
}

function validateRegister() {
    var firstname = document.getElementById("reg_firstName");
    var lastname = document.getElementById("reg_lastName");
    var username = document.getElementById("reg_userName");
    var password = document.getElementById("reg_password");
    var password2 = document.getElementById("reg_password2");

    var alert_vn = document.getElementById("reg_alert_fn_null");
    var alert_ln = document.getElementById("reg_alert_ln_null");
    var alert_un = document.getElementById("reg_alert_un_null");
    var alert_un2 = document.getElementById("reg_alert_un");
    var alert_pw = document.getElementById("reg_alert_pw_null");
    var alert_pw2 = document.getElementById("reg_alert_pw");
    var alert_success = document.getElementById("reg_success");

    alert_vn.hidden=true;
    alert_ln.hidden=true;
    alert_un.hidden=true;
    alert_pw.hidden=true;
    alert_pw2.hidden=true;

    if(username.value == "") {
        alert_un.hidden=false;
    } else if(!username.value) {
        alert_un2.hidden=false;
    } else if(firstname.value == "") {
        alert_vn.hidden=false;
    } else if(lastname.value == "") {
        alert_ln.hidden=false;
    } else if(password.value == "") {
        alert_pw.hidden=false;
    } else if(password.value != password2.value) {
        alert_pw2.hidden=false
    } else {
        alert_success.hidden=false;
        clearFields_register();
    }
}

function clearFields_register() {
    document.getElementById("reg_firstName").value="";
    document.getElementById("reg_lastName").value="";
    document.getElementById("reg_userName").value="";
    document.getElementById("reg_password").value="";
    document.getElementById("reg_password2").value="";
}

function clearFields_login() {
    document.getElementById("login_userName").value="";
    document.getElementById("login_password").value="";
}

function showPw() {
    var btn_show = document.getElementById("button_sp")
    var btn_hide = document.getElementById("button_sp_null")

    document.getElementById("reg_password").type="text"
    document.getElementById("reg_password2").type="text"
    btn_show.hidden=true;
    btn_hide.hidden=false;
}

function hidePw() {
    var btn_show = document.getElementById("button_sp")
    var btn_hide = document.getElementById("button_sp_null")

    document.getElementById("reg_password").type="password"
    document.getElementById("reg_password2").type="password"
    btn_show.hidden=false;
    btn_hide.hidden=true;
}