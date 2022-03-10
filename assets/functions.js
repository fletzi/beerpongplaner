/*
//Start ComBackend
function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}



function httpPost(url, body) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            alert("Response: " + JSON.stringify(json));
        } else if(xhr.readyState === 4) {
            alert(xhr.status);
        }
    }
}

function addUser(username, firstname, lastname, password) {
    var xhrStatus;
    xhrStatus = httpPost("http://5a3151e9-34c0-4909-b32a-c693469214dd.ma.bw-cloud-instance.org/api/auth/register", { username: username, firstName: firstname, lastName: lastname, password: password });
    return xhrStatus;
}

//Ende ComBackend*/

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

    if(username.value === "") {
        alert_null_un.hidden=false;
    } else if(password.value === "") {
        alert_null_pw.hidden=false;
    } else {
        //Der Code innerhalb der document.ready Funktion wird erst ausgeführt sobald Das Document Object Model bereit ist JavaScript Code auszuführen
        $(document).ready(function() {
        //Übertrag der vom User eingetragenen Feldinhalte in das json Format
            var parsedJson = JSON.stringify({username: username.value, password: password.value});
            $.ajax('http://5a3151e9-34c0-4909-b32a-c693469214dd.ma.bw-cloud-instance.org/api/auth/login', {
                type: "POST",
                data: parsedJson,
                dataType: "json",
                contentType: "application/json",
                //Behandlung der unterschiedlichen Status Codes, welche vom Backend als Antwort auf das Senden des json Dokumentes kommen
                statusCode: {
                    // 200 = OK
                    200: function () {
                        alert("200");
                    },
                    // 400 = Bad Request
                    400: function () {
                        alert("400");
                    },
                    // 403 - Forbidden
                    403: function () {
                        alert("403");
                    }
                }
            });
        });
        clearFields_login();
        sessionStorage.setItem("login", "true");
        window.location.href = "../pages/backend.html";
    }
}

function checkLoggedIn() {
    var loggedIn = sessionStorage.getItem("login");
    var btnLogin = document.getElementById("btn_login");
    var btnRegister = document.getElementById("btn_register");
    var btnUser = document.getElementById("btn_user");

    if(loggedIn == "true") {
        btnLogin.hidden=true;
        btnRegister.hidden=true;
        btnUser.hidden=false;
    } else {
        btnLogin.hidden=false;
        btnRegister.hidden=false;
        btnUser.hidden=true;
    }
}

function validateRegister() {
    //Speichern der Felder der Registrierung in Variablen
    var firstname = document.getElementById("reg_firstName");
    var lastname = document.getElementById("reg_lastName");
    var username = document.getElementById("reg_userName");
    var password = document.getElementById("reg_password");
    var password2 = document.getElementById("reg_password2");

    //Speichern der Alerts der Registrierung in Variablen
    var alert_vn = document.getElementById("reg_alert_fn_null");
    var alert_ln = document.getElementById("reg_alert_ln_null");
    var alert_un = document.getElementById("reg_alert_un_null");
    var alert_pw = document.getElementById("reg_alert_pw_null");
    var alert_pw2 = document.getElementById("reg_alert_pw");
    var alert_reg_success = document.getElementById("reg_success");
    var alert_un_taken = document.getElementById("reg_alert_un_taken")

    //Ausblenden aller Alerts (für den Fall, dass diese aus einen vorherigen Funktionsaufruf eingeblendet waren)
    alert_vn.hidden = true;
    alert_ln.hidden = true;
    alert_un.hidden = true;
    alert_un_taken.hidden = true;
    alert_reg_success.hidden = true;
    alert_pw.hidden = true;
    alert_pw2.hidden = true;

    //Falls das Feld username leer ist
    if (username.value === "") {
        //einblenden des entsprechenden Alerts
        alert_un.hidden = false;
    //Falls das Feld firstname leer ist
    } else if (firstname.value === "") {
        //einblenden des entsprechenden Alerts
        alert_vn.hidden = false;
    //Falls das Feld lastname leer ist
    } else if (lastname.value === "") {
        //einblenden des entsprechenden Alerts
        alert_ln.hidden = false;
    //Falls das Feld password leer ist
    } else if (password.value === "") {
        //einblenden des entsprechenden Alerts
        alert_pw.hidden = false;
    //Falls das Feld password2 nicht mit dem Inhalt des Feldes password übereinstimmt
    } else if (password.value !== password2.value) {
        //einblenden des entsprechenden Alerts
        alert_pw2.hidden = false
    //Falls alle anderen Bedingungen nicht erfüllt sind (die Registrierung korrekt ausgefüllt wurde)
    } else {
        //Der Code innerhalb der document.ready Funktion wird erst ausgeführt sobald Das Document Object Model bereit ist JavaScript Code auszuführen
        $(document).ready(function() {
        //Übertrag der vom User eingetragenen Feldinhalte in das json Format
        var parsedJson = JSON.stringify({username: username.value, firstName: firstname.value, lastName: lastname.value, password: password.value});

        //Aufruf der ajaxPost Funktion sowie speichern der Return Value
        var statusCode = ajaxPost('http://5a3151e9-34c0-4909-b32a-c693469214dd.ma.bw-cloud-instance.org/api/auth/register', parsedJson);

        //Verhalten je nach rückgemeldetem Status Code des Backends
        switch (statusCode) {
            // 200 = OK
            case 200:
                //Einblenden des Alerts für eine erfolgreiche Registrierung
                alert_reg_success.hidden = false;
                //Leeren aller Felder
                clearFields_register();
                break;
            // 400 = Bad Request
            case 400:
                //Einblenden des entsprechenden Alerts
                alert_un_taken.hidden = false;
                //Löschen des Feldinhalts des Feldes username - für Korrektur der Eingabe
                document.getElementById("reg_userName").value = "";
                break;
            // Andere Status Codes werden von der Funktion nich erwartet
            default:
                alert("Unerwarteter Fehler");
        }
        });
    }
}

function ajaxPost(url, parsedJson) {
    var statusCode = 0;
        //Senden der vom User eingetragenen Feldinhalte im json Format an den entsprechenden Endpunkt des Backends
        $.ajax(url, {
            async: false,
            type: "POST",
            data: parsedJson,
            dataType: "json",
            contentType: "application/json",
            //Behandlung der unterschiedlichen Status Codes, welche vom Backend als Antwort auf das Senden des json Dokumentes kommen
            statusCode: {
                // 200 = OK
                200: function () {
                    statusCode = 200;
                },
                // 400 = Bad Request
                400: function () {
                    statusCode = 400;
                },
                // 403 - Forbidden
                403: function () {
                    statusCode =403;
                }
            }
        });
   return statusCode;
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


//<-- Start Team Generator
function gatherTeam() {
    //Variable der zu füllenden Liste
    var ul = document.getElementById("generator_playerList");
    //Variable für erstelltes Listenelement
    var li = document.createElement("li");
    //Variable für den vom User eingebenen Spielernamen
    var playerName = document.getElementById("generator_playerName").value;

    //Falls der User keinen Namen eingegeben hat soll nichts passieren.
    if(playerName !== "") {
        //Ansonsten:
        //Erweitern der zu füllenden Liste um neues Listenelement
        ul.appendChild(li);
        //Befüllen des Listenelements mit vom User eingegebenen Spielernamen
        li.innerHTML = playerName;
        //Löschen der Eingabe des Users - Feld Reset
        document.getElementById("generator_playerName").value="";
    } else {}
}

function generateTeams() {
    //Array der vom User eingegebenen Spielernamen
    let arr = (Array.from(document.querySelectorAll("#generator_playerList > li")).map(el => el.innerHTML));
    //MittelIndex des Arrays aus eingegebenen Spielernamen
    let middleIndex = Math.ceil(arr.length / 2);
    //Variable der zu füllenden Liste für TeamA
    let ulTeamA = document.getElementById("generator_teamA");
    //Variable der zu füllenden Liste für TeamB
    let ulTeamB = document.getElementById("generator_teamB");

    //Generieren von Teams macht erst ab 2 oder mehr Spielern Sinn
    if(arr.length >= 2) {
        //Moderne Version des Fisher–Yates shuffle
        //Mischt das Array aus Spielernamen
        function shuffle(a) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a; //Gibt das gemischte Array zurück
        }

        //Aufruf der Misch Funktion
        shuffle(arr);
        //Neues Array teamA wird mit dem Inhalt des gemischten Arrays (Inhalt von Stelle [0] bis zum Mittelpunkt) befüllt
        let teamA = arr.splice(0, middleIndex);
        //Neues Array teamB wird mit dem Inhalt des gemischten Arrays (ab dem Mittelpunkt) befüllt
        let teamB = arr.splice(-middleIndex);

        //Für jede Stelle des Arrays von teamA
        for (let i=0; i<teamA.length; i++) {
            //Wird ein neues Listenelement erstellt
            let liTeamA = document.createElement("li");
            //Und der zu befüllenden Liste für TeamA angefügt
            ulTeamA.appendChild(liTeamA);
            //Das innerHTML, also der Teil des Listenelements der für den Nutzer angezeigt wird bekommt den Wert, welcher an der entsprechenden Stelle im Array steht (bspw. Spieler1)
            liTeamA.innerHTML = teamA[i];
        }

        //Für jede Stelle des Arrays von teamB
        for (let j=0; j<teamB.length; j++) {
            //Wird ein neues Listenelement erstellt
            let liTeamB = document.createElement("li");
            //Und der zu befüllenden Liste für TeamB angefügt
            ulTeamB.appendChild(liTeamB);
            //Das innerHTML, also der Teil des Listenelements der für den Nutzer angezeigt wird bekommt den Wert, welcher an der entsprechenden Stelle im Array steht (bspw. Spieler1)
            liTeamB.innerHTML = teamB[j];
        }

        //Die Eingabe der Spielername in der Turniergenerator Card wird ausgeblendet
        document.getElementById("generator_1").hidden=true;
        //Die Anzeige der beiden generierten Teams wird eingeblendet
        document.getElementById("generator_2").hidden=false;
    } else {
        //Spieleranzahl < 2: Fehlermeldung wird angezeigt - "Du brauchst mindestens 2 Spieler!"
        document.getElementById("generator_alert_fail").hidden=false;
    }


}

function resetTeams() {
    //Die Eingabe der Spielername in der Turniergenerator Card wird eingeblendet
    document.getElementById("generator_1").hidden=false;
    //Die Anzeige der beiden generierten Teams wird ausgeblendet
    document.getElementById("generator_2").hidden=true;
    //Der Inhalt der Liste an vom Nutzer eingegebenen Spielernamen wird gelöscht
    document.getElementById("generator_playerList").innerHTML="";
    //Der Inhalt der Liste des generierten Teams A wird gelöscht
    document.getElementById("generator_teamA").innerHTML="";
    //Der Inhalt der Liste des generierten Teams B wird gelöscht
    document.getElementById("generator_teamB").innerHTML="";
}

function hideGeneratorAlert() {
    //Ggf. vorhandene Fehlermeldung wir mit Klick in Feld für Spielername (im Moment der Fehlerkorrektur) ausgeblendet
    document.getElementById("generator_alert_fail").hidden=true;
}
//--> Ende Team Generator

function validateTournament() {
    var dateVal = false;

    /* heutiges datum*/
    var now = new Date();

    /* datum in die einzelnen teile aufteilen */
    var y = now.getFullYear().valueOf();
    var m = now.getMonth().valueOf();
    var d = now.getDate().valueOf();
    m = m+1;

    /* eingegebenes datum holen */
    var create_tour_date = document.getElementById("create_tour_date").value.split("-");

    /* datum wieder aufteilen */
    var y2 = parseInt(create_tour_date[0]);
    var m2 = parseInt(create_tour_date[1]);
    var d2 = parseInt(create_tour_date[2]);

    var create_tour_name = document.getElementById("create_tour_name");

    var create_tour_alert_name = document.getElementById("create_tour_alert_name");
    var create_tour_alert_date = document.getElementById("create_tour_alert_date");
    var create_tour_alert_nodate = document.getElementById("create_tour_alert_nodate");
    var create_tour_alert_time = document.getElementById("create_tour_alert_time");
    var create_tour_alert_notime = document.getElementById("create_tour_alert_notime");

    if(create_tour_name.value === "") {
        create_tour_alert_name.hidden = false;
    } else if(create_tour_date[0] === ""){
        create_tour_alert_nodate.hidden = false;
    } else if(y2 < y) {
        create_tour_alert_date.hidden = false;
    } else if(y2 > y) {
        dateVal = true;
    } else if(y2 === y) {
        if (m2 === m) {
            if (d2 < d) {
                create_tour_alert_date.hidden = false;
            } else {
                dateVal = true;
            }
        } else if(m2 < m) {
            create_tour_alert_date.hidden = false;
        } else {
            dateVal = true;
        }
    } else {
        dateVal = true;
    }

    /* datum in die einzelnen teile aufteilen */
    var hh = now.getHours().valueOf();
    var mm = now.getMinutes().valueOf();

    /*Eingegebene Uhrzeit holen*/
    var create_tour_time = document.getElementById("create_tour_time").value.split(":");

    /* datum wieder aufteilen */
    var hh2 = parseInt(create_tour_time[0]);
    var mm2 = parseInt(create_tour_time[1]);

    if(dateVal === true) {
        if(create_tour_time[0] === "") {
            create_tour_alert_notime.hidden = false;
        } else if(y2 === y && m2 === m && d2 === d) {
            if(hh2 < hh ) {
                create_tour_alert_time.hidden = false;
            } else if(hh2 >= hh) {
                if(mm2 <= mm) {
                    create_tour_alert_time.hidden = false;
                } else {
                    alert("Success");
                }
            }
        } else {
            alert("Success");
        }
    }


}