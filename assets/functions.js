//<-- Start Login
/**
 * <h3>Validiert die Nutzereingaben der Login-Maske > login.html
 **/
function validateLogin() {
    //Speichern der Login Felder in Variablen
    var username = document.getElementById("login_userName");
    var password = document.getElementById("login_password");

    //Speichern der Alerts des Logins in Variablen
    var alert_null_un = document.getElementById("login_alert_un");
    var alert_null_pw = document.getElementById("login_alert_pw");
    var alert_fail = document.getElementById("login_alert_fail");
    var alert_success = document.getElementById("login_alert_success");

    //Ausblenden aller Login Alerts (für den Fall, dass diese aus einen vorherigen Funktionsaufruf eingeblendet waren)
    alert_fail.hidden=true;
    alert_null_un.hidden=true;
    alert_null_pw.hidden=true;
    alert_success.hidden=true;

    //Falls das Feld username leer ist
    if(username.value === "") {
        //einblenden des entsprechenden Alerts
        alert_null_un.hidden=false;
    //Falls das Feld password leer ist
    } else if(password.value === "") {
        //einblenden des entsprechenden Alerts
        alert_null_pw.hidden=false;
    //Falls alle anderen Bedingungen nicht erfüllt sind (die Login Maske korrekt ausgefüllt wurde)
    } else {
        //Der Code innerhalb der document.ready Funktion wird erst ausgeführt sobald Das Document Object Model bereit ist JavaScript Code auszuführen
        $(document).ready(function() {
            //Übertrag der vom User eingetragenen Feldinhalte in das json Format
            var parsedJson = JSON.stringify({username: username.value, password: password.value});

            //Senden der vom User eingetragenen Feldinhalte im json Format an den entsprechenden Endpunkt des Backends
            $.ajax('http://5a3151e9-34c0-4909-b32a-c693469214dd.ma.bw-cloud-instance.org/api/auth/login', {
                async: false,
                type: "POST",
                data: parsedJson,
                dataType: "json",
                contentType: "application/json",
                //Behandlung der unterschiedlichen Status Codes, welche vom Backend als Antwort auf das Senden des json Dokumentes kommen
                statusCode: {
                    // 400 = Bad Request
                    400: function () {
                        alert("400 - Bad Request");
                    },
                    // 403 = Forbidden (Gesendeter Username und Passwort sind in dieser Kombination nicht in der Datenbank vorhanden)
                    403: function () {
                        //Löschen der Login Feldinhalte für Korrektur der Eingabe durch den User
                        clearFields_login()
                        //Einblenden des Entsprechende Alerts
                        alert_fail.hidden=false;
                    }
                },
                // statusCode: 200 - OK (Gesendeter Username und Passwort stimmen mit Datenbankeintrag überein)
                success: function(data) {
                    //Speichern des übergebenen Login Tokens
                    var token = data.token;
                    //Speichern des im responseText übermittelten Authentifizierungstokens im sessionStorage
                    sessionStorage.setItem("token", token);
                    //alert(sessionStorage.getItem("token"));
                    //Im sessionStorage Speichern, dass der Nutzer eingeloggt ist
                    sessionStorage.setItem("login", "true");
                    //Speichern des Usernames des eingeloggten Users
                    sessionStorage.setItem("username", username.value);
                    //Weiterleitung des Nutzers auf das Dashboard
                    window.location.href = "../pages/backend.html";
                }
            });
        });
    }
}

/**
 * <h3> Löscht die Feldinhalte des Logins
 **/
function clearFields_login() {
    document.getElementById("login_userName").value="";
    document.getElementById("login_password").value="";
}

//--> Ende Login

/**
 * <h3>Überprüft bei Seitenaufruf/-wechsel ob sich ein User bereits eingeloggt hat
 **/
function checkLoggedIn() {
    //Speichern der zum key login gehörenden value aus dem sessionStorage in einer Variable
    var loggedIn = sessionStorage.getItem("login");
    //Speichern des Login-Buttons & des Registrieren-Buttons sowie des Buttons für eingeloggte Nutzer
    var btnLogin = document.getElementById("btn_login");
    var btnRegister = document.getElementById("btn_register");
    var btnUser = document.getElementById("btn_user");

    //Falls die value des keys "login" true ist
    if(loggedIn === "true") {
        //Ausblenden des Login- & Registrierungs-Buttons
        btnLogin.hidden=true;
        btnRegister.hidden=true;
        //Einblenden des Buttons für eingeloggte Nutzer
        btnUser.hidden=false;
    //Falls die value des keys "login" nicht "true" ist
    } else {
        //Einblenden des Login- & Registrierungs-Buttons
        btnLogin.hidden=false;
        btnRegister.hidden=false;
        //Ausblenden des Buttons für eingeloggte Nutzer
        btnUser.hidden=true;
    }
}

//<-- Start Registrierung
/**
 * <h3>Validiert die Nutzereingaben der Registrierungs-Maske > register.html
 **/
function validateRegister() {
    //Speichern Felder der Registrierung in Variablen
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

    //Ausblenden aller Registrierung Alerts (für den Fall, dass diese aus einen vorherigen Funktionsaufruf eingeblendet waren)
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

        //Verhalten je nach rückgemeldetem statusCode des Backends
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
            // Andere Status Codes werden von der Funktion nicht erwartet
            default:
                alert("Unerwarteter Fehler");
        }
        });
    }
}

/**
 * <h3> Löscht die Feldinhalte der Registrierung
 **/
function clearFields_register() {
    document.getElementById("reg_firstName").value="";
    document.getElementById("reg_lastName").value="";
    document.getElementById("reg_userName").value="";
    document.getElementById("reg_password").value="";
    document.getElementById("reg_password2").value="";
}

/**
 * <h3> Stellt die eingegebenen Passwörter in der Registrierungsmaske in Klartext dar
 **/
function showPw() {
    //Speichern der Buttons zum Ein- & Ausblenden der Passwörter als Klartext in Variablen
    var btn_show = document.getElementById("button_sp")
    var btn_hide = document.getElementById("button_sp_null")

    //Ändern des Feldtyps der Felder "Passwort" und "Passwort Wiederholen" zum Typ text - Feldinhalt wird in Klartext dargestellt
    document.getElementById("reg_password").type="text"
    document.getElementById("reg_password2").type="text"
    //Ausblenden des Buttons zum Einblenden der Passwörter
    btn_show.hidden=true;
    //Einblenden des Buttons zum Ausblenden der Passwörter
    btn_hide.hidden=false;
}

/**
 * <h3> Stellt die eingegebenen Passwörter in der Registrierungsmaske als Punkte dar
 **/
function hidePw() {
    //Speichern der Buttons zum Ein- & Ausblenden der Passwörter als Klartext in Variablen
    var btn_show = document.getElementById("button_sp")
    var btn_hide = document.getElementById("button_sp_null")

    //Ändern des Feldtyps der Felder "Passwort" und "Passwort Wiederholen" zum Typ password - Feldinhalt wird durch Punkte dargestellt
    document.getElementById("reg_password").type="password"
    document.getElementById("reg_password2").type="password"
    //Einblenden des Buttons zum Einblenden der Passwörter
    btn_show.hidden=false;
    //Ausblenden des Buttons zum Ausblenden der Passwörter
    btn_hide.hidden=true;
}

//--> Ende Registrierung

/**
 * <h3> Sendet das übergebene json Dokument per "post-request" and die übergebene URL
 *
 * @param {url} url Endpunkt welcher von der jquery Funktion .ajax angesprochen werden soll
 * @param {json} parsedJson json Dokument welches gesendet werden soll
 **/
function ajaxPost(url, parsedJson) {
    var token = sessionStorage.getItem("token");
    var statusCode = 0;
        //Senden der vom User eingetragenen Feldinhalte im json Format an den entsprechenden Endpunkt des Backends
        $.ajax(url, {
            async: false,
            type: "POST",
            data: parsedJson,
            dataType: "json",
            //Sendet im Request Head den jeweiligen Authentifizierungstoken des eingeloggten Benutzers
            headers: {Authorization: 'Bearer '+token},
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
    //Rückgabe des statusCodes
    return statusCode;
}

//<-- Start Teamgenerator
/**
 * <h3> Funktion des Teamgenerators:
 * <p> Befüllt eine Liste mit dem vom User eingegebenen Spielernamen
 **/
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

/**
 * <h3> Funktion des Teamgenerators:
 * <p> Generiert zwei zufällig zusammengesetze Teams aus den eingegebene Spielernamen
 * <p> und stellt diese in zwei Listen dar
 **/
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

/**
 * <h3> Funktion des Teamgenerators:
 * <p> Versetzt den Teamgenerator in den Ausgangsstatus
 **/
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

/**
 * <h3> Funktion des Teamgenerators:
 * <p> Versteckt Alert im Moment der Fehlerkorrektur durch den User
 **/
function hideGeneratorAlert() {
    //Ggf. vorhandene Fehlermeldung wir mit Klick in Feld für Spielername (im Moment der Fehlerkorrektur) ausgeblendet
    document.getElementById("generator_alert_fail").hidden=true;
}
//--> Ende Teamgenerator


//<-- Start Turnieranlage
/**
 * <h3> Validiert die Eingaben bei der Turnieranlage im Dashboard
 **/
function validateTournament() {
    //Speichern der Date Validation Flag mit dem Wert false - "Das eingegeben Datum ist noch nicht validiert"
    var dateVal = false;

    //Speichern des heutigen Datums
    var now = new Date();

    //Aufteilen des Datums in Jahr, Monat & Tag
    var y = now.getFullYear().valueOf();
    var m = now.getMonth().valueOf();
    var d = now.getDate().valueOf();
    m = m+1;

    //Speichern des vom User eingegebenen Datums
    var create_tour_date = document.getElementById("create_tour_date").value.split("-");

    //Aufteilen des Datums in Jahr, Monat & Tag
    var y2 = parseInt(create_tour_date[0]);
    var m2 = parseInt(create_tour_date[1]);
    var d2 = parseInt(create_tour_date[2]);

    //Speichern des vom User eingegebenen Turniertitels
    var create_tour_name = document.getElementById("create_tour_name");

    //Speichern der Alerts der Turnieranlage in Variablen
    var create_tour_alert_name = document.getElementById("create_tour_alert_name");
    var create_tour_alert_date = document.getElementById("create_tour_alert_date");
    var create_tour_alert_nodate = document.getElementById("create_tour_alert_nodate");
    var create_tour_alert_time = document.getElementById("create_tour_alert_time");
    var create_tour_alert_notime = document.getElementById("create_tour_alert_notime");

    //Wenn das Feld Turniername leer ist
    if(create_tour_name.value === "") {
        //Einblenden des entsprechenden Alerts
        create_tour_alert_name.hidden = false;
    //Wenn das Feld Datum leer ist
    } else if(create_tour_date[0] === ""){
        //Einblenden des entsprechenden Alerts
        create_tour_alert_nodate.hidden = false;
    //Wenn das eingegeben Jahr in der Vergangenheit liegt
    } else if(y2 < y) {
        //Einblenden des entsprechenden Alerts
        create_tour_alert_date.hidden = false;
    //Wenn das eingegebene Jahr größer ist als das jetzige
    } else if(y2 > y) {
        //Setzen der Date Validation Flag auf true, da das eingegebene Datum nicht mehr in der Vergangenheit liegen kann (egal welcher Monat oder Tag)
        dateVal = true;
    //Wenn das eingegebene Jahr dem jetzigen entspricht
    } else if(y2 === y) {
        //Wenn der eingegebene Monat dem jetzigen entspricht
        if (m2 === m) {
            //Und der eingegebenen Tag kleiner ist als der jetzige
            if (d2 < d) {
                //Einblenden des entsprechenden Alerts (Datum liegt in der Vergangenheit)
                create_tour_alert_date.hidden = false;
            } else {
                //Ansonsten: Setzen der Date Validation Flag auf true, da das eingegebene Datum nicht in der Vergangenheit liegt
                dateVal = true;
            }
        //Wenn der eingegebene Monat kleiner ist als der jetzige
        } else if(m2 < m) {
            //Einblenden des entsprechenden Alerts (Datum liegt in der Vergangenheit)
            create_tour_alert_date.hidden = false;
        } else {
            //Ansonsten: Setzen der Date Validation Flag auf true, da das eingegebene Datum nicht mehr in der Vergangenheit liegen kann (egal welcher Tag)
            dateVal = true;
        }
    }

    //Aktuelle Uhrzeit in Stunden ud Minuten aufteilen
    var hh = now.getHours().valueOf();
    var mm = now.getMinutes().valueOf();

    //Vom User eingegebene Uhrzeit speichern
    var create_tour_time = document.getElementById("create_tour_time").value.split(":");

    //Eingegebene Uhrzeit in Stunden ud Minuten aufteilen
    var hh2 = parseInt(create_tour_time[0]);
    var mm2 = parseInt(create_tour_time[1]);

    //Wenn das eingegebene Datum nicht in der Vergangenheit liegt: überprüfen der eingebenden Uhrzeit
    if(dateVal === true) {
        //Wenn die eingegebene Uhrzeit leer ist
        if(create_tour_time[0] === "") {
            //Einblenden des entsprechenden Alerts
            create_tour_alert_notime.hidden = false;
        //Wenn das eingegebene Datum dem heutigen Entspricht
        } else if(y2 === y && m2 === m && d2 === d) {
            //Überprüfen ob Uhrzeit in der Vergangenheit liegt
            //Wenn die eingegebene Stunde kleiner ist als die Aktuelle
            if(hh2 < hh ) {
                //Einblenden des entsprechenden Alerts (Uhrzeit liegt in der Vergangenheit)
                create_tour_alert_time.hidden = false;
            //Wenn die eingegebene Stunde größer als die Aktuelle ist
            } else if(hh2 === hh) {
                //Und wenn die eingegebene Minute kleiner ist als die Aktuelle
                if(mm2 <= mm) {
                    //Einblenden des entsprechenden Alerts (Uhrzeit liegt in der Vergangenheit)
                    create_tour_alert_time.hidden = false;
                //Ansonsten sind die eingegebenen Daten korrekt
                } else {
                    //Einblenden der Auswahl der Turnierteilnehmer
                    selectPlayerTournament();
                }
            } else if (hh2 > hh) {
                //Einblenden der Auswahl der Turnierteilnehmer
                selectPlayerTournament();
            }
        //Uhrzeit kann nicht in der Vergangenheit liegen und ist nicht leer - die eingegebenen Daten sind korrekt
        } else {
            //Einblenden der Auswahl der Turnierteilnehmer
            selectPlayerTournament();
        }
    }
}

/**
 * <h3>Blendet die Karten der Turnierteilnehmerauswahl ein und befüllt die Tabelle mit den verfügbaren (existierenden) Usern aus der Datenbank
 **/
function selectPlayerTournament() {
    //Ausblenden der Dashboard Karten
    document.getElementById("dashboard_div").hidden=true;
    //Einblenden der Karten für die Auswahl der Turnierteilnehmer
    document.getElementById("tournament_player_div").hidden=false;
    //Einfügen aller als Teilnehmer möglichen User aus der Datenbank in die Tabelle der Teilnehmerauswahl
    getAllUsers();
    //Initialisiert die Anzeige der Anzahl an ausgewählten Spielern
    countSelectedPlayers();
}

/**
 * <h3>Fügt alle User aus der Datenbank der Tabelle aller, als Turnierteilnehmer zur wahlstehenden, User hinzu
 **/
function getAllUsers() {
    //Der Code innerhalb der document.ready Funktion wird erst ausgeführt sobald Das Document Object Model bereit ist JavaScript Code auszuführen
    $(document).ready(function() {

        //Speichern des im sessionStorage gespeichertem tokens in der Variable token
        var token = sessionStorage.getItem("token");

        //Abfragen aller User welche in der Datenbank vorhanden sind
        $.ajax({
            type: "GET",
            async: false,
            url: 'http://5a3151e9-34c0-4909-b32a-c693469214dd.ma.bw-cloud-instance.org/api/user',
            dataType: 'json',
            //Sendet im Request Head den jeweiligen Authentifizierungstoken des eingeloggten Benutzers
            headers: {Authorization: 'Bearer '+token},
            // statusCode: 200 - OK (Gesendeter Username und Passwort stimmen mit Datenbankeintrag überein)
            success: function(response) {
                $(function() {
                    //Funktion Looped durch jedes JSON object literal
                    $.each(response, function(i, item) {
                        //Für jedes JSON object literal wird eine neue table-row angelegt
                        var $tr = $('<tr>').append(
                            //Die table-row besteht aus dem table-head - Username
                            $('<th>').text(item.username),
                            //Und den table-data-cells - Firstname & Lastname
                            $('<td>').text(item.firstName),
                            $('<td>').text(item.lastName)
                        //Dies soll in der Tabelle mit der ID: searchablePlayerTable passieren
                        ).appendTo('#searchablePlayerTable');
                    });
                });
            },
            //Ausgabe der unterschiedlichen Error Codes, welche vom Backend als Antwort auf die GET Request kommen
            error: function (xhr) {
                alert(xhr.status+" - "+xhr.responseText);
            }
        });
    });
}

/**
 * <h3> Blendet alle Tabellenzeilen aus, welche nicht mit dem, in das Spieler-Suchfeld der Turnieranlage, eingegebenem Inhalt übereinstimmen
 **/
function searchPlayer() {
    //Der Code innerhalb der document.ready Funktion wird erst ausgeführt sobald Das Document Object Model bereit ist JavaScript Code auszuführen
    $(document).ready(function(){
        //Sobald der User eine Taste auf der Tastatur loslässt
        $("#tournament_playerSearch").on("keyup", function() {
            //Speichern des Suchfeldinhaltes
            var value = $(this).val().toLowerCase();
            //Filtern nach Tabellenzeilen mit Inhalt der mit dem Inhalt des Suchfeldes übereinstimmt
            $("#searchablePlayerTable tr").filter(function() {
                //Ausblenden aller Tabellenzeilen ohne übereinstimmenden Inhalt
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });
}

/**
 * <h3> Wechselt angeklickte Tabellenzeilen zwischen der "Tabelle aus verfügbaren Nutzern" und der "Tabelle aus bereits ausgewählten Nutzern"
 **/
$(document).ready(function () {
    //Bei einem Klick auf eine TableRow innerhalb eines TableBodys
    $('tbody').on('click','tr',function(){
        //Setzen der myParent Variable auf die ID der nächstgelegenen Tabelle
        myParent=$(this).closest('table').attr('id');
        //Wenn die myParent ID der ID der Tabelle aus auswählbaren Spielern entspricht -> Hinzufügen der TableRow zur Tabelle aus ausgewählten Spielern
        if(myParent === "tournament_selectablePlayers") $('#tournament_selectedPlayers tbody').append('<tr>'+$(this).html()+'</tr>');
        //Wenn die myParent ID der ID der Tabelle an ausgewählten Spielern entspricht -> Hinzufügen der TableRow zur Tabelle aus auswählbaren Spielern
        else $('#tournament_selectablePlayers tbody').append('<tr>'+$(this).html()+'</tr>');
        //Löschen der zur anderen Tabelle hinzugefügten TableRow aus ursprünglicher Tabelle
        $(this).remove();
        //Speichern der Alerts für zu wenige und zu viele Spieler
        var tooManyPlayersAlert = document.getElementById("create_tour_alert_tooManyPlayers");
        var tooLessPlayersAlert = document.getElementById("create_tour_alert_tooLessPlayers");
        //Ausblenden der beiden Alerts (werden durch countSelectedPlayers ggf. wieder eingeblendet)
        tooManyPlayersAlert.hidden=true;
        tooLessPlayersAlert.hidden=true;
        //Aktualisierung der Anzahl der ausgewählten Spielern
        countSelectedPlayers();
    })
});

/**
 * <h3> Zählt die Anzahl der ausgewählten User und stellt das Ergebnis dar
 **/
function countSelectedPlayers() {
    //Speichern der für die Turniergröße benötigte Spieleranzahl ((Turniergröße * 2) - da jedes Team aus zwei Spielern bestehen muss)
    var requiredPlayers = document.getElementById("create_tour_size").value * 2;
    //Speichern der Anzeige für die Spieleranzahl
    var playerCounter = document.getElementById("tournament_playerCounter");
    //(Anzahl der ausgewählten Spieler) Speichern der Anzahl an Tabellenzeilen im TableBody der Tabelle an ausgewählten Turnierteilnehmern
    var rowCount = $('#tournament_selectedPlayers >tbody >tr').length;

    //Wenn die Anzahl an ausgewählten Teilnehmern größer ist als die benötigte Spieleranzahl
    if (rowCount > requiredPlayers) {
        //Farbe der Anzeige auf Rot setzen
        playerCounter.style.backgroundColor="#f73f52";
    //Wenn die Anzahl an ausgewählten Teilnehmern der benötigten Spieleranzahl entspricht
    } else if (rowCount === requiredPlayers) {
        //Farbe der Anzeige auf Grün setzen
        playerCounter.style.backgroundColor="#37c46b";
    //Wenn die Anzahl an ausgewählten Teilnehmern kleiner ist als die benötigte Spieleranzahl
    } else if (rowCount < requiredPlayers) {
        //Farbe der Anzeige auf Grau setzen
        playerCounter.style.backgroundColor="#545454";
    }

    //Setzen des Textes der Anzeige (Anzahl der ausgewählten Spieler / benötigte Spielerzahl)
    playerCounter.innerHTML = rowCount+'/'+requiredPlayers;
}

/**
 * <h3>Registriert einen Gastspieler, basierend auf dem vom User eingegebenen Gastspielernamen
 **/
function addGuestPlayer() {
    //Speichern des Textfeldes für Gastspieler in einer Variable
    var guestName = document.getElementById("tournament_guestName");
    //Der Code innerhalb der document.ready Funktion wird erst ausgeführt sobald Das Document Object Model bereit ist JavaScript Code auszuführen
    $(document).ready(function() {
        //Übertrag der vom User eingetragenen Feldinhalte in das json Format + Ergänzung des Spielernamens mit "(Gast)" + Ergänzung des guestUser Attributes
        var parsedJson = JSON.stringify({username: guestName.value+' (Gast)', firstName: "Gastspieler", lastName: "Gastspieler", password: "gast", guestUser: true});

        //Aufruf der ajaxPost Funktion sowie speichern der Return Value
        var statusCode = ajaxPost('http://5a3151e9-34c0-4909-b32a-c693469214dd.ma.bw-cloud-instance.org/api/auth/register', parsedJson);

        //Verhalten je nach rückgemeldetem statusCode des Backends
        switch (statusCode) {
            // 200 = OK
            case 200:
                //Gast User darf in Tabelle angelegt werden da dessen Registrierung erfolgreich
                addGuestPlayerTooTable();
                break;
            // 400 = Bad Request
            case 400:
                //Einblenden des entsprechenden Alerts
                document.getElementById("create_tour_guest_alert").hidden=false;
                //Leeren des Gastnamenfeldes
                guestName.value="";
                break;
            // Andere Status Codes werden von der Funktion nicht erwartet
            default:
                alert("Unerwarteter Fehler");
        }
    });
}


/**
 * <h3>Fügt der Liste an ausgewählten Spielern den registrierten Gastuser hinzu.
 **/
function addGuestPlayerTooTable() {
    //Der Code innerhalb der document.ready Funktion wird erst ausgeführt sobald Das Document Object Model bereit ist JavaScript Code auszuführen
    $(document).ready(function() {
        //Speichern des Textfeldes zur Eingabe eines Gastnamens in einer Variable
        var guestName = document.getElementById("tournament_guestName");
        $(function() {
            //Für den eingegeben Gastnamen wird eine neue table-row angelegt
            var $tr = $('<tr>').append(
                //Die table-row besteht aus dem table-head - Username
                $('<th>').text(guestName.value+' (Gast)'),
                //Und den table-data-cells - Firstname & Lastname
                $('<td>').text("Gastspieler"),
                $('<td>').text("Gastspieler")
                //Dies soll in der Tabelle mit der ID: selectedPlayerTable passieren
            ).appendTo('#selectedPlayerTable');
            //Leeren des Textfeldes zur Eingabe eines weiteren Gastnamens
            guestName.value="";
            //Aktualisierung der Anzahl an ausgewählten Spielern
            countSelectedPlayers();
        });
    });
}

/**
 * <h3> Überprüft ob, die ausgewählte Spieleranzahl mit der Anzahl benötigter Spieler mit der Anzahl benötigter Spieler der entsprechenden Turniergröße übereinstimmt
 **/
function confirmPlayers() {
    //Speichern der für die Turniergröße benötigte Spieleranzahl ((Turniergröße * 2) - da jedes Team aus zwei Spielern bestehen muss)
    var requiredPlayers = document.getElementById("create_tour_size").value * 2;
    //(Anzahl der ausgewählten Spieler) Speichern der Anzahl an Tabellenzeilen im TableBody der Tabelle an ausgewählten Turnierteilnehmern
    var rowCount = $('#tournament_selectedPlayers >tbody >tr').length;
    //Speichern der jeweiligen Alerts in einer Variable
    var tooManyPlayersAlert = document.getElementById("create_tour_alert_tooManyPlayers");
    var tooLessPlayersAlert = document.getElementById("create_tour_alert_tooLessPlayers");

    //Ausblenden der Alerts (falls von vorherigem Funktionsaufruf noch eingeblendet)
    tooManyPlayersAlert.hidden=true;
    tooLessPlayersAlert.hidden=true;

    //Wenn die Anzahl benötigter Spieler mit der Anzahl ausgewählter Spieler übereinstimmt
    if (requiredPlayers === rowCount) {
        //Ausblenden der Teilnehmerauswahl
        document.getElementById("tournament_player_div").hidden=true;
        //Einblenden der Teamzusammentstellung
        document.getElementById("tournament_team_div").hidden=false;
        //Generieren und darstellen der Teams aus den vom User ausgewählten Teilnehmern
        loadTeams();
    //Wenn die Anzahl benötigter Spieler größer ist als die Anzahl ausgewählter Spieler
    } else if (requiredPlayers > rowCount) {
        //Einblenden des entsprechenden Alerts
        tooLessPlayersAlert.hidden=false;
    //Wenn die Anzahl benötigter Spieler kleiner ist als die Anzahl ausgewählter Spieler
    } else if (requiredPlayers < rowCount) {
        //Einblenden des entsprechenden Alerts
        tooManyPlayersAlert.hidden=false;
    }
}

/**
 * <h3> Generiert Teams aus den vom User ausgewählten Teilnehmern und stellt diese dar
 **/
function loadTeams() {
    //Speichern der Turniergröße
    var tournamentSize = document.getElementById("create_tour_size").value;
    //Speichern der Listen an Spielern entsprechend der Turniergröße
    var teams4 = document.getElementById("teams4");
    var teams8 = document.getElementById("teams8");
    var teams16 = document.getElementById("teams16");
    //Initialisierung eines leeren Arrays für Nutzernamen
    var username = [];


    if (tournamentSize === "4") {
        //Einblenden der Liste für Turniergröße
        teams4.hidden=false;

        //Speichern der vom Spieler ausgewählten Teilnehmer in dem Array "username"
        $('#selectedPlayerTable > tr  > th').each(function(index, th) {
            username.push(th.innerHTML);
            });

        //Mischen des Arrays an Usernamen
        shuffle(username);

        //Laden des gemischten Arrays in die entsprechenden Tabellen
        $('#teams4 > div > div > ul  > li').each(function(index, li) {
            li.innerHTML=username[index];
        });

    }

    if (tournamentSize === "8") {
        //Einblenden der Liste für Turniergröße
        teams4.hidden=false;
        teams8.hidden=false;

        //Speichern der vom Spieler ausgewählten Teilnehmer in dem Array "username"
        $('#selectedPlayerTable > tr  > th').each(function(index, th) {
            username.push(th.innerHTML);
        });

        //Mischen des Arrays an Usernamen
        shuffle(username);

        //Laden des gemischten Arrays in die entsprechenden Tabellen
        $('#teams4 > div > div > ul  > li').each(function(index, li) {
            li.innerHTML=username[index];
        });

        //Laden des gemischten Arrays in die entsprechenden Tabellen
        $('#teams8 > div > div > ul  > li').each(function(index, li) {
            li.innerHTML=username[index+8];
        });

    }

    if (tournamentSize === "16") {
        //Einblenden der Liste für Turniergröße
        teams4.hidden=false;
        teams8.hidden=false;
        teams16.hidden=false;

        //Speichern der vom Spieler ausgewählten Teilnehmer in dem Array "username"
        $('#selectedPlayerTable > tr  > th').each(function(index, th) {
            username.push(th.innerHTML);
        });

        //Mischen des Arrays an Usernamen
        shuffle(username);

        //Laden des gemischten Arrays in die entsprechenden Tabellen
        $('#teams4 > div > div > ul  > li').each(function(index, li) {
            li.innerHTML=username[index];
        });

        //Laden des gemischten Arrays in die entsprechenden Tabellen
        $('#teams8 > div > div > ul  > li').each(function(index, li) {
            li.innerHTML=username[index+8];
        });

        //Laden des gemischten Arrays in die entsprechenden Tabellen
        $('#teams16 > div > div > ul  > li').each(function(index, li) {
            li.innerHTML=username[index+16];
        });

    }
}

/**
 * <h3>Moderne Version des Fisher–Yates shuffle<p>Mischt das Array aus Spielernamen
 **/
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a; //Gibt das gemischte Array zurück
}

/**
 * <h3>Legt ein Turnier in der Datenbank an, basierend auf den Nutzereingaben
 **/
function createTournament() {
    //Speichern des eingegeben Turniernamens
    var tournamentName = document.getElementById("create_tour_name").value;
    //Speichern des ausgewählten Regelwerkes
    var ruleSet = document.getElementById("create_tour_ruleset").value;
    //Speichern des ausgewählten Turniergröße
    var tournamentSize = parseInt(document.getElementById("create_tour_size").value);
    //Speichern des Startdatums in einem Array ([0]JJJJ,[1]MM,[2]TT)
    var dateReformat = document.getElementById("create_tour_date").value.split("-");
    //Speichern des Startdatums im Format: TT.MM.JJJJ
    var startDate = dateReformat[2]+"."+dateReformat[1]+"."+dateReformat[0];
    //Speichern der Startuhrzeit
    var startTime = document.getElementById("create_tour_time").value;
    //Speichern des Turniererstellers (angemeldeter User)
    var tournamentOwner = sessionStorage.getItem("username");
    //Initialisierung eines leeren Arrays für Spieler
    var teamList = [];
    //Speichern von vordefinierten Teamnamen (Nato Alphabet)
    var teamNames = ["ALPHA", "BRAVO", "CHARLIE", "DELTA", "ECHO", "FOXTROT", "GOLF", "HOTEL", "INDIA", "JULIETT", "KILO", "LIMA", "MIKE", "NOVEMBER", "OSCAR", "PAPA"];
    //Initialisierung einer Variable für das zu übergebende JSON Dokument des Turniers
    var parsedJson;


    if (tournamentSize === 4) {
        //Für jedes Element (Username) der Liste für Turniergröße
        $('#teams4 > div > div > ul  > li').each(function(index, li) {
            //Speichern des Usernamens im Array "teamList"
            teamList.push(li.innerHTML);
        });

        //Eintragen der User Eingaben in JSON Dokument, entsprechend dem vom Backend erwartetem Format
        parsedJson = JSON.stringify({
            tournamentName: tournamentName,
            teamList: [
                {
                    teamName: teamNames[0],
                    player1: teamList[0],
                    player2: teamList[1],
                },
                {
                    teamName: teamNames[1],
                    player1: teamList[2],
                    player2: teamList[3],
                },
                {
                    teamName: teamNames[2],
                    player1: teamList[4],
                    player2: teamList[5],
                },
                {
                    teamName: teamNames[3],
                    player1: teamList[6],
                    player2: teamList[7],
                }
            ],
            ruleSet: ruleSet,
            tournamentSize: tournamentSize,
            randomMatchmaking: true,
            startDate: startDate,
            startTime: startTime,
            tournamentOwner: tournamentOwner
        });

    }

    if (tournamentSize === 8) {
        //Für jedes Element (Username) der Liste für Turniergröße
        $('#teams4 > div > div > ul  > li').each(function(index, li) {
            //Speichern des Usernamens im Array "teamList"
            teamList.push(li.innerHTML);
        });
        //Für jedes Element (Username) der Liste für Turniergröße
        $('#teams8 > div > div > ul  > li').each(function(index, li) {
            //Speichern des Usernamens im Array "teamList"
            teamList.push(li.innerHTML);
        });

        //Eintragen der User Eingaben in JSON Dokument, entsprechend dem vom Backend erwartetem Format
        parsedJson = JSON.stringify({
            tournamentName: tournamentName,
            teamList: [
                {
                    teamName: teamNames[0],
                    player1: teamList[0],
                    player2: teamList[1],
                },
                {
                    teamName: teamNames[1],
                    player1: teamList[2],
                    player2: teamList[3],
                },
                {
                    teamName: teamNames[2],
                    player1: teamList[4],
                    player2: teamList[5],
                },
                {
                    teamName: teamNames[3],
                    player1: teamList[6],
                    player2: teamList[7],
                },
                {
                    teamName: teamNames[4],
                    player1: teamList[8],
                    player2: teamList[9],
                },
                {
                    teamName: teamNames[5],
                    player1: teamList[10],
                    player2: teamList[11],
                },
                {
                    teamName: teamNames[6],
                    player1: teamList[12],
                    player2: teamList[13],
                },
                {
                    teamName: teamNames[7],
                    player1: teamList[14],
                    player2: teamList[15],
                }
            ],
            ruleSet: ruleSet,
            tournamentSize: tournamentSize,
            randomMatchmaking: true,
            startDate: startDate,
            startTime: startTime,
            tournamentOwner: tournamentOwner
        });

    }

    if (tournamentSize === 16) {
        //Für jedes Element (Username) der Liste für Turniergröße
        $('#teams4 > div > div > ul  > li').each(function(index, li) {
            //Speichern des Usernamens im Array "teamList"
            teamList.push(li.innerHTML);
        });
        //Für jedes Element (Username) der Liste für Turniergröße
        $('#teams8 > div > div > ul  > li').each(function(index, li) {
            //Speichern des Usernamens im Array "teamList"
            teamList.push(li.innerHTML);
        });
        //Für jedes Element (Username) der Liste für Turniergröße
        $('#teams16 > div > div > ul  > li').each(function(index, li) {
            //Speichern des Usernamens im Array "teamList"
            teamList.push(li.innerHTML);
        });

        //Eintragen der User Eingaben in JSON Dokument, entsprechend dem vom Backend erwartetem Format
        parsedJson = JSON.stringify({
            tournamentName: tournamentName,
            teamList: [
                {
                    teamName: teamNames[0],
                    player1: teamList[0],
                    player2: teamList[1],
                },
                {
                    teamName: teamNames[1],
                    player1: teamList[2],
                    player2: teamList[3],
                },
                {
                    teamName: teamNames[2],
                    player1: teamList[4],
                    player2: teamList[5],
                },
                {
                    teamName: teamNames[3],
                    player1: teamList[6],
                    player2: teamList[7],
                },
                {
                    teamName: teamNames[4],
                    player1: teamList[8],
                    player2: teamList[9],
                },
                {
                    teamName: teamNames[5],
                    player1: teamList[10],
                    player2: teamList[11],
                },
                {
                    teamName: teamNames[6],
                    player1: teamList[12],
                    player2: teamList[13],
                },
                {
                    teamName: teamNames[7],
                    player1: teamList[14],
                    player2: teamList[15],
                },
                {
                    teamName: teamNames[8],
                    player1: teamList[16],
                    player2: teamList[17],
                },
                {
                    teamName: teamNames[9],
                    player1: teamList[18],
                    player2: teamList[19],
                },
                {
                    teamName: teamNames[10],
                    player1: teamList[20],
                    player2: teamList[21],
                },
                {
                    teamName: teamNames[11],
                    player1: teamList[22],
                    player2: teamList[23],
                },
                {
                    teamName: teamNames[12],
                    player1: teamList[24],
                    player2: teamList[25],
                },
                {
                    teamName: teamNames[13],
                    player1: teamList[26],
                    player2: teamList[27],
                },
                {
                    teamName: teamNames[14],
                    player1: teamList[28],
                    player2: teamList[29],
                },
                {
                    teamName: teamNames[15],
                    player1: teamList[30],
                    player2: teamList[31],
                }
            ],
            ruleSet: ruleSet,
            tournamentSize: tournamentSize,
            randomMatchmaking: true,
            startDate: startDate,
            startTime: startTime,
            tournamentOwner: tournamentOwner
        });

    }

    //Der Code innerhalb der document.ready Funktion wird erst ausgeführt sobald Das Document Object Model bereit ist JavaScript Code auszuführen
    $(document).ready(function() {

        //Aufruf der ajaxPost Funktion sowie speichern der Return Value
        var statusCode = ajaxPost('http://5a3151e9-34c0-4909-b32a-c693469214dd.ma.bw-cloud-instance.org/api/tournament', parsedJson);

        //Verhalten je nach rückgemeldetem statusCode des Backends
        switch (statusCode) {
            // 200 = OK
            case 200:
                //Turnieranlage war erfolgreich
                //Laden des Turniers anhand des vom User festgelegten Turniernamens
                loadTournament(tournamentName);
                break;
            // 400 = Bad Request
            case 403:
                //Authentifizierung fehlgeschlagen - vermutl. Token abgelaufen
                alert("Authentifizierung fehlgeschlagen. Melden Sie sich neu an!")
                break;
            // Andere Status Codes werden von der Funktion nicht erwartet
            default:
                alert("Unerwarteter Fehler");
        }
    });
}

/**
 * <h3>Ermöglicht die Drag & Drop Funktion der Teamzusammenstellung
 *     Basiert auf dem jQuery Sortable Widget -> https://api.jqueryui.com/sortable/
 **/
$(document).ready(function () {
    //Speichern aller Listen, welche die Drag & Drop Funktion nutzen sollen
    var tableIDs = "#sortable1 li, #sortable2 li, #sortable3 li, #sortable4 li, #sortable5 li, #sortable6 li, #sortable7 li, #sortable8 li, #sortable9 li, #sortable10 li, #sortable11 li, #sortable12 li, #sortable13 li, #sortable14 li, #sortable15 li, #sortable16 li";
    $(function() {
        $(tableIDs).draggable({
            zIndex: 2,
            appendTo: "body",
        });

        initDroppable($(tableIDs));

        initSwap();
        function initSwap() {
            initDroppable($(tableIDs));
            initDraggable($(tableIDs));
        }
        function initDraggable($elements) {
            $elements.draggable({
                zIndex: 2,
                appendTo: "body",
                helper: "clone",
                start: function(e, ui) {
                    $(ui.helper).addClass("clone text-white display-4");
                },
                cursorAt: { left:25, top:0 }
            });
        }
        function initDroppable($elements) {
            $elements.droppable({
                activeClass: "active-tile",
                hoverClass: "hover-tile",
                over: function(event, ui) {
                    var $this = $(this);
                },
                drop: function(event, ui) {
                    var $this = $(this);
                    var linew1 = $(this).after(ui.draggable.clone());
                    var linew2 = $(ui.draggable).after($(this).clone());
                    $(ui.draggable).remove();
                    $(this).remove();
                    initSwap();
                }
            });
        }
    });
});

//--> Ende Turnieranlage

//<-- Start Turnierdarstellung
/**
 * <h3>Lädt ein Turnier aus der Datenbank anhand des Turniernamens
 **/
function loadTournament(tournamentName) {
    //Der Code innerhalb der document.ready Funktion wird erst ausgeführt sobald Das Document Object Model bereit ist JavaScript Code auszuführen
    $(document).ready(function() {

        //Speichern des im sessionStorage gespeichertem Tokens in Variable
        var token = sessionStorage.getItem("token");

        //Abfragen der für das Turnier gespeicherten Daten
        $.ajax({
            type: "GET",
            url: 'http://5a3151e9-34c0-4909-b32a-c693469214dd.ma.bw-cloud-instance.org/api/tournament/'+tournamentName,
            dataType: 'json',
            //Sendet im Request Head den jeweiligen Authentifizierungstoken des eingeloggten Benutzers
            headers: {Authorization: 'Bearer '+token},
            // statusCode: 200 - OK
            success: function(response) {
                $(function() {
                    //Darstellung des geladenen Turniers anhand der übermittelten Turniergröße
                    drawTournament(response["tournamentSize"]);

                    //Darstellung der allgemeinen Turnier Informationen anhand der übermittelten Daten
                    $("#tour_name").text(response["tournamentName"]); //Turniername
                    $("#tour_rule").text("Regelwerk: "+response["ruleSet"]); //Regelwerk
                    $("#tour_size").text("Teams: "+response["tournamentSize"]); //Turniergröße
                    $("#tour_date").text(response["startDate"]); //Startdatum
                    $("#tour_time").text("Start: "+response["startTime"]+" Uhr"); //Startzeit
                    $("#tour_owner").text("Erstellt von: "+response["tournamentOwner"]); //Turnierersteller

                    //Darstellung des 1.Spiels (unabhängig von Turniergröße immer vorhanden)
                    $("#m1_t1").text(response["tournamentMatches"][0]["opponents"][0]["teamName"]); //Teamname A
                    $("#m1_t1_p1").text(response["tournamentMatches"][0]["opponents"][0]["player1"]); //Spielername 1
                    $("#m1_t1_p2").text(response["tournamentMatches"][0]["opponents"][0]["player2"]); //Spielername 2

                    $("#m1_t2").text(response["tournamentMatches"][0]["opponents"][1]["teamName"]); //Teamname B
                    $("#m1_t2_p1").text(response["tournamentMatches"][0]["opponents"][1]["player1"]); //Spielername 1
                    $("#m1_t2_p2").text(response["tournamentMatches"][0]["opponents"][1]["player2"]); //Spielername 2

                    //Darstellung des 2.Spiels (unabhängig von Turniergröße immer vorhanden)
                    $("#m2_t1").text(response["tournamentMatches"][1]["opponents"][0]["teamName"]); //Teamname A
                    $("#m2_t1_p1").text(response["tournamentMatches"][1]["opponents"][0]["player1"]); //Spielername 1
                    $("#m2_t1_p2").text(response["tournamentMatches"][1]["opponents"][0]["player2"]); //Spielername 2

                    $("#m2_t2").text(response["tournamentMatches"][1]["opponents"][1]["teamName"]); //Teamname B
                    $("#m2_t2_p1").text(response["tournamentMatches"][1]["opponents"][1]["player1"]); //Spielername 1
                    $("#m2_t2_p2").text(response["tournamentMatches"][1]["opponents"][1]["player2"]); //Spielername 2

                    if (response["tournamentSize"] === 4) {

                        //Falls Vorrunde abgeschlossen
                        if($('#stage1_close > div').html() === "Abgeschlossen") {
                            //Darstellung des 3.Spiels
                            $("#m9_t1").text(response["tournamentMatches"][2]["opponents"][0]["teamName"]); //Teamname A
                            $("#m9_t1_p1").text(response["tournamentMatches"][2]["opponents"][0]["player1"]); //Spielername 1
                            $("#m9_t1_p2").text(response["tournamentMatches"][2]["opponents"][0]["player2"]); //Spielername 2

                            $("#m9_t2").text(response["tournamentMatches"][2]["opponents"][1]["teamName"]); //Teamname B
                            $("#m9_t2_p1").text(response["tournamentMatches"][2]["opponents"][1]["player1"]); //Spielername 1
                            $("#m9_t2_p2").text(response["tournamentMatches"][2]["opponents"][1]["player2"]); //Spielername 2
                        }

                        //Falls Finale abgeschlossen
                        if($('#stage2_close > div').html() === "Abgeschlossen") {
                            //Ergänzen des Turniernamens durch "Abgeschlossen: "
                            $('#tour_name').text("Abgeschlossen: "+response["tournamentName"]);
                            //Einblenden des Gewinnerteams
                            document.getElementById("tour_winner_team").hidden=false;
                            //Setzen des Gewinnerteams
                            $('#tour_winner_team > span').text("Turniergewinner - "+response["winnerTeam"]["teamName"]+": "+response["winnerTeam"]["player1"]+" & "+response["winnerTeam"]["player2"]);
                        }
                        //Ändern der Bezeichnung der zweiten Runden auf "Finale"
                        $("#stage2_name > div").text("Finale");
                        //Einblenden des Buttons für den Rundenabschluss für Runde 1 und 2
                        $("#stage1_close").removeAttr('hidden');
                        $("#stage2_close").removeAttr('hidden');
                    }




                    if(response["tournamentSize"] === 8) {

                        //Falls Vorrunde abgeschlossen
                        if($('#stage1_close > div').html() === "Abgeschlossen") {
                            //Darstellung des 5.Spiels
                            $("#m9_t1").text(response["tournamentMatches"][4]["opponents"][0]["teamName"]); //Teamname A
                            $("#m9_t1_p1").text(response["tournamentMatches"][4]["opponents"][0]["player1"]); //Spielername 1
                            $("#m9_t1_p2").text(response["tournamentMatches"][4]["opponents"][0]["player2"]); //Spielername 2

                            $("#m9_t2").text(response["tournamentMatches"][4]["opponents"][1]["teamName"]); //Teamname B
                            $("#m9_t2_p1").text(response["tournamentMatches"][4]["opponents"][1]["player1"]); //Spielername 1
                            $("#m9_t2_p2").text(response["tournamentMatches"][4]["opponents"][1]["player2"]); //Spielername 2

                            //Darstellung des 6.Spiels
                            $("#m10_t1").text(response["tournamentMatches"][5]["opponents"][0]["teamName"]); //Teamname A
                            $("#m10_t1_p1").text(response["tournamentMatches"][5]["opponents"][0]["player1"]); //Spielername 1
                            $("#m10_t1_p2").text(response["tournamentMatches"][5]["opponents"][0]["player2"]); //Spielername 2

                            $("#m10_t2").text(response["tournamentMatches"][5]["opponents"][1]["teamName"]); //Teamname B
                            $("#m10_t2_p1").text(response["tournamentMatches"][5]["opponents"][1]["player1"]); //Spielername 1
                            $("#m10_t2_p2").text(response["tournamentMatches"][5]["opponents"][1]["player2"]); //Spielername 2
                        }

                        //Falls Halbfinale abgeschlossen
                        if($('#stage2_close > div').html() === "Abgeschlossen") {
                            //Darstellung des 7.Spiels
                            $("#m13_t1").text(response["tournamentMatches"][6]["opponents"][0]["teamName"]); //Teamname A
                            $("#m13_t1_p1").text(response["tournamentMatches"][6]["opponents"][0]["player1"]); //Spielername 1
                            $("#m13_t1_p2").text(response["tournamentMatches"][6]["opponents"][0]["player2"]); //Spielername 2

                            $("#m13_t2").text(response["tournamentMatches"][6]["opponents"][1]["teamName"]); //Teamname B
                            $("#m13_t2_p1").text(response["tournamentMatches"][6]["opponents"][1]["player1"]); //Spielername 1
                            $("#m13_t2_p2").text(response["tournamentMatches"][6]["opponents"][1]["player2"]); //Spielername 2
                        }

                        //Falls Finale abgeschlossen
                        if($('#stage3_close > div').html() === "Abgeschlossen") {
                            //Ergänzen des Turniernamens durch "Abgeschlossen: "
                            $('#tour_name').text("Abgeschlossen: "+response["tournamentName"]);
                            //Einblenden des Gewinnerteams
                            document.getElementById("tour_winner_team").hidden=false;
                            //Setzen des Gewinnerteams
                            $('#tour_winner_team > span').text("Turniergewinner - "+response["winnerTeam"]["teamName"]+": "+response["winnerTeam"]["player1"]+" & "+response["winnerTeam"]["player2"]);
                        }

                        //Darstellung des 3.Spiels
                        $("#m3_t1").text(response["tournamentMatches"][2]["opponents"][0]["teamName"]); //Teamname A
                        $("#m3_t1_p1").text(response["tournamentMatches"][2]["opponents"][0]["player1"]); //Spielername 1
                        $("#m3_t1_p2").text(response["tournamentMatches"][2]["opponents"][0]["player2"]); //Spielername 2

                        $("#m3_t2").text(response["tournamentMatches"][2]["opponents"][1]["teamName"]); //Teamname B
                        $("#m3_t2_p1").text(response["tournamentMatches"][2]["opponents"][1]["player1"]); //Spielername 1
                        $("#m3_t2_p2").text(response["tournamentMatches"][2]["opponents"][1]["player2"]); //Spielername 2

                        //Darstellung des 4.Spiels
                        $("#m4_t1").text(response["tournamentMatches"][3]["opponents"][0]["teamName"]); //Teamname A
                        $("#m4_t1_p1").text(response["tournamentMatches"][3]["opponents"][0]["player1"]); //Spielername 1
                        $("#m4_t1_p2").text(response["tournamentMatches"][3]["opponents"][0]["player2"]); //Spielername 2

                        $("#m4_t2").text(response["tournamentMatches"][3]["opponents"][1]["teamName"]); //Teamname B
                        $("#m4_t2_p1").text(response["tournamentMatches"][3]["opponents"][1]["player1"]); //Spielername 1
                        $("#m4_t2_p2").text(response["tournamentMatches"][3]["opponents"][1]["player2"]); //Spielername 2

                        //Ändern der Bezeichnung der zweiten Runden auf "Halbfinale"
                        $("#stage2_name > div").text("Halbfinale");
                        //Ändern der Bezeichnung des 9. und 10. Spiels (Nummerierung geht von Turniergröße 16 aus)
                        $("#tree_row2 .card-header").text("Match #5");
                        $("#tree_row6 .card-header").text("Match #6");
                        $("#stage3_name").removeAttr('hidden');
                        //Ändern der Bezeichnung der dritten Runden auf "Finale"
                        $("#stage3_name > div").text("Finale");
                        //Einblenden des Buttons für den Rundenabschluss für Runde 1, 2 und 3
                        $("#stage1_close").removeAttr('hidden');
                        $("#stage2_close").removeAttr('hidden');
                        $("#stage3_close").removeAttr('hidden');

                    }

                    if(response["tournamentSize"] === 16) {

                        //Ändern der Bezeichnung der Teams des 13. Spiels
                        $("#m13_t1").text("Sieger Viertelfinale");
                        $("#m13_t2").text("Sieger Viertelfinale");

                        //Falls Vorrunde abgeschlossen
                        if($('#stage1_close > div').html() === "Abgeschlossen") {
                            //Darstellung des 9.Spiels
                            $("#m9_t1").text(response["tournamentMatches"][8]["opponents"][0]["teamName"]); //Teamname A
                            $("#m9_t1_p1").text(response["tournamentMatches"][8]["opponents"][0]["player1"]); //Spielername 1
                            $("#m9_t1_p2").text(response["tournamentMatches"][8]["opponents"][0]["player2"]); //Spielername 2

                            $("#m9_t2").text(response["tournamentMatches"][8]["opponents"][1]["teamName"]); //Teamname B
                            $("#m9_t2_p1").text(response["tournamentMatches"][8]["opponents"][1]["player1"]); //Spielername 1
                            $("#m9_t2_p2").text(response["tournamentMatches"][8]["opponents"][1]["player2"]); //Spielername 2

                            //Darstellung des 10.Spiels
                            $("#m10_t1").text(response["tournamentMatches"][9]["opponents"][0]["teamName"]); //Teamname A
                            $("#m10_t1_p1").text(response["tournamentMatches"][9]["opponents"][0]["player1"]); //Spielername 1
                            $("#m10_t1_p2").text(response["tournamentMatches"][9]["opponents"][0]["player2"]); //Spielername 2

                            $("#m10_t2").text(response["tournamentMatches"][9]["opponents"][1]["teamName"]); //Teamname B
                            $("#m10_t2_p1").text(response["tournamentMatches"][9]["opponents"][1]["player1"]); //Spielername 1
                            $("#m10_t2_p2").text(response["tournamentMatches"][9]["opponents"][1]["player2"]); //Spielername 2

                            //Darstellung des 11.Spiels
                            $("#m11_t1").text(response["tournamentMatches"][10]["opponents"][0]["teamName"]); //Teamname A
                            $("#m11_t1_p1").text(response["tournamentMatches"][10]["opponents"][0]["player1"]); //Spielername 1
                            $("#m11_t1_p2").text(response["tournamentMatches"][10]["opponents"][0]["player2"]); //Spielername 2

                            $("#m11_t2").text(response["tournamentMatches"][10]["opponents"][1]["teamName"]); //Teamname B
                            $("#m11_t2_p1").text(response["tournamentMatches"][10]["opponents"][1]["player1"]); //Spielername 1
                            $("#m11_t2_p2").text(response["tournamentMatches"][10]["opponents"][1]["player2"]); //Spielername 2

                            //Darstellung des 12.Spiels
                            $("#m12_t1").text(response["tournamentMatches"][11]["opponents"][0]["teamName"]); //Teamname A
                            $("#m12_t1_p1").text(response["tournamentMatches"][11]["opponents"][0]["player1"]); //Spielername 1
                            $("#m12_t1_p2").text(response["tournamentMatches"][11]["opponents"][0]["player2"]); //Spielername 2

                            $("#m12_t2").text(response["tournamentMatches"][11]["opponents"][1]["teamName"]); //Teamname B
                            $("#m12_t2_p1").text(response["tournamentMatches"][11]["opponents"][1]["player1"]); //Spielername 1
                            $("#m12_t2_p2").text(response["tournamentMatches"][11]["opponents"][1]["player2"]); //Spielername 2
                        }

                        //Falls Viertelfinale abgeschlossen
                        if($('#stage2_close > div').html() === "Abgeschlossen") {
                            //Darstellung des 13.Spiels
                            $("#m13_t1").text(response["tournamentMatches"][12]["opponents"][0]["teamName"]); //Teamname A
                            $("#m13_t1_p1").text(response["tournamentMatches"][12]["opponents"][0]["player1"]); //Spielername 1
                            $("#m13_t1_p2").text(response["tournamentMatches"][12]["opponents"][0]["player2"]); //Spielername 2

                            $("#m13_t2").text(response["tournamentMatches"][12]["opponents"][1]["teamName"]); //Teamname B
                            $("#m13_t2_p1").text(response["tournamentMatches"][12]["opponents"][1]["player1"]); //Spielername 1
                            $("#m13_t2_p2").text(response["tournamentMatches"][12]["opponents"][1]["player2"]); //Spielername 2

                            //Darstellung des 14.Spiels
                            $("#m14_t1").text(response["tournamentMatches"][13]["opponents"][0]["teamName"]); //Teamname A
                            $("#m14_t1_p1").text(response["tournamentMatches"][13]["opponents"][0]["player1"]); //Spielername 1
                            $("#m14_t1_p2").text(response["tournamentMatches"][13]["opponents"][0]["player2"]); //Spielername 2

                            $("#m14_t2").text(response["tournamentMatches"][13]["opponents"][1]["teamName"]); //Teamname B
                            $("#m14_t2_p1").text(response["tournamentMatches"][13]["opponents"][1]["player1"]); //Spielername 1
                            $("#m14_t2_p2").text(response["tournamentMatches"][13]["opponents"][1]["player2"]); //Spielername 2
                        }

                        //Falls Halbfinale abgeschlossen
                        if($('#stage3_close > div').html() === "Abgeschlossen") {
                            //Darstellung des 15.Spiels
                            $("#m15_t1").text(response["tournamentMatches"][14]["opponents"][0]["teamName"]); //Teamname A
                            $("#m15_t1_p1").text(response["tournamentMatches"][14]["opponents"][0]["player1"]); //Spielername 1
                            $("#m15_t1_p2").text(response["tournamentMatches"][14]["opponents"][0]["player2"]); //Spielername 2

                            $("#m15_t2").text(response["tournamentMatches"][14]["opponents"][1]["teamName"]); //Teamname B
                            $("#m15_t2_p1").text(response["tournamentMatches"][14]["opponents"][1]["player1"]); //Spielername 1
                            $("#m15_t2_p2").text(response["tournamentMatches"][14]["opponents"][1]["player2"]); //Spielername 2
                        }

                        //Falls Finale abgeschlossen
                        if($('#stage4_close > div').html() === "Abgeschlossen") {
                            //Ergänzen des Turniernamens durch "Abgeschlossen: "
                            $('#tour_name').text("Abgeschlossen: "+response["tournamentName"]);
                            //Einblenden des Gewinnerteams
                            document.getElementById("tour_winner_team").hidden=false;
                            //Setzen des Gewinnerteams
                            $('#tour_winner_team > span').text("Turniergewinner - "+response["winnerTeam"]["teamName"]+": "+response["winnerTeam"]["player1"]+" & "+response["winnerTeam"]["player2"]);
                        }

                        //Darstellung des 3.Spiels
                        $("#m3_t1").text(response["tournamentMatches"][2]["opponents"][0]["teamName"]); //Teamname A
                        $("#m3_t1_p1").text(response["tournamentMatches"][2]["opponents"][0]["player1"]); //Spielername 1
                        $("#m3_t1_p2").text(response["tournamentMatches"][2]["opponents"][0]["player2"]); //Spielername 2

                        $("#m3_t2").text(response["tournamentMatches"][2]["opponents"][1]["teamName"]); //Teamname B
                        $("#m3_t2_p1").text(response["tournamentMatches"][2]["opponents"][1]["player1"]); //Spielername 1
                        $("#m3_t2_p2").text(response["tournamentMatches"][2]["opponents"][1]["player2"]); //Spielername 2

                        //Darstellung des 4.Spiels
                        $("#m4_t1").text(response["tournamentMatches"][3]["opponents"][0]["teamName"]); //Teamname A
                        $("#m4_t1_p1").text(response["tournamentMatches"][3]["opponents"][0]["player1"]); //Spielername 1
                        $("#m4_t1_p2").text(response["tournamentMatches"][3]["opponents"][0]["player2"]); //Spielername 2

                        $("#m4_t2").text(response["tournamentMatches"][3]["opponents"][1]["teamName"]); //Teamname B
                        $("#m4_t2_p1").text(response["tournamentMatches"][3]["opponents"][1]["player1"]); //Spielername 1
                        $("#m4_t2_p2").text(response["tournamentMatches"][3]["opponents"][1]["player2"]); //Spielername 2

                        //Darstellung des 5.Spiels
                        $("#m5_t1").text(response["tournamentMatches"][4]["opponents"][0]["teamName"]); //Teamname A
                        $("#m5_t1_p1").text(response["tournamentMatches"][4]["opponents"][0]["player1"]); //Spielername 1
                        $("#m5_t1_p2").text(response["tournamentMatches"][4]["opponents"][0]["player2"]); //Spielername 2

                        $("#m5_t2").text(response["tournamentMatches"][4]["opponents"][1]["teamName"]); //Teamname B
                        $("#m5_t2_p1").text(response["tournamentMatches"][4]["opponents"][1]["player1"]); //Spielername 1
                        $("#m5_t2_p2").text(response["tournamentMatches"][4]["opponents"][1]["player2"]); //Spielername 2

                        //Darstellung des 6.Spiels
                        $("#m6_t1").text(response["tournamentMatches"][5]["opponents"][0]["teamName"]); //Teamname A
                        $("#m6_t1_p1").text(response["tournamentMatches"][5]["opponents"][0]["player1"]); //Spielername 1
                        $("#m6_t1_p2").text(response["tournamentMatches"][5]["opponents"][0]["player2"]); //Spielername 2

                        $("#m6_t2").text(response["tournamentMatches"][5]["opponents"][1]["teamName"]); //Teamname B
                        $("#m6_t2_p1").text(response["tournamentMatches"][5]["opponents"][1]["player1"]); //Spielername 1
                        $("#m6_t2_p2").text(response["tournamentMatches"][5]["opponents"][1]["player2"]); //Spielername 2

                        //Darstellung des 7.Spiels
                        $("#m7_t1").text(response["tournamentMatches"][6]["opponents"][0]["teamName"]); //Teamname A
                        $("#m7_t1_p1").text(response["tournamentMatches"][6]["opponents"][0]["player1"]); //Spielername 1
                        $("#m7_t1_p2").text(response["tournamentMatches"][6]["opponents"][0]["player2"]); //Spielername 2

                        $("#m7_t2").text(response["tournamentMatches"][6]["opponents"][1]["teamName"]); //Teamname B
                        $("#m7_t2_p1").text(response["tournamentMatches"][6]["opponents"][1]["player1"]); //Spielername 1
                        $("#m7_t2_p2").text(response["tournamentMatches"][6]["opponents"][1]["player2"]); //Spielername 2

                        //Darstellung des 8.Spiels
                        $("#m8_t1").text(response["tournamentMatches"][7]["opponents"][0]["teamName"]); //Teamname A
                        $("#m8_t1_p1").text(response["tournamentMatches"][7]["opponents"][0]["player1"]); //Spielername 1
                        $("#m8_t1_p2").text(response["tournamentMatches"][7]["opponents"][0]["player2"]); //Spielername 2

                        $("#m8_t2").text(response["tournamentMatches"][7]["opponents"][1]["teamName"]); //Teamname B
                        $("#m8_t2_p1").text(response["tournamentMatches"][7]["opponents"][1]["player1"]); //Spielername 1
                        $("#m8_t2_p2").text(response["tournamentMatches"][7]["opponents"][1]["player2"]); //Spielername 2

                        //Ändern der Bezeichnung der zweiten Runden auf "Viertelfinale"
                        $("#stage2_name > div").text("Viertelfinale");
                        //Ändern der Bezeichnung der dritten Runden auf "Halbfinale"
                        $("#stage3_name > div").text("Halbfinale");
                        //Ändern der Bezeichnung der vierten Runden auf "Finale"
                        $("#stage4_name > div").text("Finale");
                        //Ändern der Bezeichnung des 9/10/11/12/13/14/15.Spiels
                        $("#tree_row2 .card-header").text("Match #9");
                        $("#tree_row6 .card-header").text("Match #10");
                        $("#tree_row10 .card-header").text("Match #11");
                        $("#tree_row14 .card-header").text("Match #12");
                        $("#tree_row4 .card-header").text("Match #13");
                        $("#tree_row12 .card-header").text("Match #14");
                        $("#tree_row8 .card-header").text("Match #15");
                        //Einblenden der Rundentitel für Runde 3 & 4
                        $("#stage3_name").removeAttr('hidden');
                        $("#stage4_name").removeAttr('hidden');
                        //Einblenden des Buttons für den Rundenabschluss für Runde 1, 2, 3 & 4
                        $("#stage1_close").removeAttr('hidden');
                        $("#stage2_close").removeAttr('hidden');
                        $("#stage3_close").removeAttr('hidden');
                        $("#stage4_close").removeAttr('hidden');
                    }

                });
            },
            //Ausgabe der unterschiedlichen Error Codes, welche vom Backend als Antwort auf die GET Request kommen könnten
            error: function (xhr) {
                alert(xhr.status+" "+xhr.responseText);
            }
        });
    });
}

/**
 * <h3>Blendet die Zeilen des Turnierbaums entsprechend der Turniergröße ein.
 **/
function drawTournament(tournamentSize) {
    //Ausblenden von Alerts aus vorherigen Funktionsaufrufen (der closeTournamentStage(N) Funktionen)
    document.getElementById("stage1_close_alert").hidden=true;
    document.getElementById("stage2_close_alert").hidden=true;
    document.getElementById("stage3_close_alert").hidden=true;
    document.getElementById("stage4_close_alert").hidden=true;
    //Ausblenden der Teamzusammenstellung
    document.getElementById("tournament_team_div").hidden=true;
    //Einblenden des Turnierbaums
    document.getElementById("tournament_tree_div").hidden=false;
    //Ausblenden von Zeilen des Turnierbaums aus vorherigen Funktionsaufrufen
    document.getElementById("tree_row4").hidden=true;
    document.getElementById("tree_row5").hidden=true;
    document.getElementById("tree_row6").hidden=true;
    document.getElementById("tree_row7").hidden=true;
    document.getElementById("tree_row8").hidden=true;
    document.getElementById("tree_row9").hidden=true;
    document.getElementById("tree_row10").hidden=true;
    document.getElementById("tree_row11").hidden=true;
    document.getElementById("tree_row12").hidden=true;
    document.getElementById("tree_row13").hidden=true;
    document.getElementById("tree_row14").hidden=true;
    document.getElementById("tree_row15").hidden=true;


    if(tournamentSize === 8) {
        //Einblenden der entsprechenden Turnierbaum Zeilen
        document.getElementById("tree_row4").hidden=false;
        document.getElementById("tree_row5").hidden=false;
        document.getElementById("tree_row6").hidden=false;
        document.getElementById("tree_row7").hidden=false;
    }

    if(tournamentSize === 16) {
        //Einblenden der entsprechenden Turnierbaum Zeilen
        document.getElementById("tree_row4").hidden=false;
        document.getElementById("tree_row5").hidden=false;
        document.getElementById("tree_row6").hidden=false;
        document.getElementById("tree_row7").hidden=false;
        document.getElementById("tree_row8").hidden=false;
        document.getElementById("tree_row9").hidden=false;
        document.getElementById("tree_row10").hidden=false;
        document.getElementById("tree_row11").hidden=false;
        document.getElementById("tree_row12").hidden=false;
        document.getElementById("tree_row13").hidden=false;
        document.getElementById("tree_row14").hidden=false;
        document.getElementById("tree_row15").hidden=false;
    }

}

//<-- Ende Turnierdarstellung

//--> Start Turnierrundenverwaltung
/**
 * <h3>Schließt die erste Runde des Turniers ab und übermittelt die Gewinnerteams an das Backend
 **/
function closeTournamentStage1() {
    //Speichern der Turniergröße
    var tournament_size = document.getElementById("tour_size").innerHTML;
    //Speichern des Turniernamens
    var tournament_name = $('#tour_name').text();
    //Speichern des entsprechenden Alerts
    var stage1_alert = document.getElementById("stage1_close_alert");
    //Ausblenden des Alerts, falls von vorherigen Funktionsaufruf vorhanden
    stage1_alert.hidden = true;

    if (tournament_size === "Teams: 4") {
        //Überprüft ob für ein Spiel kein Gewinner festgelegt wurde
        if (($('#win1_Match1_TeamA').is(':hidden') && $('#win1_Match1_TeamB').is(':hidden')) || ($('#win1_Match2_TeamA').is(':hidden') & $('#win1_Match2_TeamB').is(':hidden'))) {
            //Wenn ja: einblenden des entsprechenden Alerts
            stage1_alert.hidden = false;
        } else {
            //Wenn nein: ausblenden des entsprechenden Alerts
            stage1_alert.hidden = true;
            $('#win0_Match1_TeamA, #win0_Match1_TeamB, #win0_Match2_TeamA, #win0_Match2_TeamB, #win1_Match1_TeamA, #win1_Match1_TeamB, #win1_Match2_TeamA, #win1_Match2_TeamB').each(function (){
                //Entfernen der onclick Funktion der Pokale (Gewinnersetzen ist dann nicht mehr möglich)
                $(this).removeAttr('onclick');
            });

            //Initialisierung eines leeren Arrays für die Gewinner der Spiele
            var matchWinners = [];

            //Falls Spiel 1 von Team B gewonnen wurde
            if($('#win1_Match1_TeamA').is(':hidden')) {
                //Hinzufügen des Teams B zum Array "matchWinners"
                matchWinners.push($("#m1_t2").text())
            //Falls Spiel 1 von Team A gewonnen wurde
            } else {
                //Hinzufügen des Teams A zum Array "matchWinners"
                matchWinners.push($("#m1_t1").text())
            }

            //Falls Spiel 2 von Team B gewonnen wurde
            if($('#win1_Match2_TeamA').is(':hidden')) {
                //Hinzufügen des Teams B zum Array "matchWinners"
                matchWinners.push($("#m2_t2").text())
            //Falls Spiel 1 von Team A gewonnen wurde
            } else {
                //Hinzufügen des Teams A zum Array "matchWinners"
                matchWinners.push($("#m2_t1").text())
            }

            //Der Code innerhalb der document.ready Funktion wird erst ausgeführt sobald Das Document Object Model bereit ist JavaScript Code auszuführen
            $(document).ready(function() {
                //Übertrag der "matchWinners" in das json Format
                var parsedJson = JSON.stringify({matchWinners: matchWinners});
                console.log(parsedJson);

                //Aufruf der ajaxPost Funktion sowie speichern der Return Value
                var statusCode = ajaxPost('http://5a3151e9-34c0-4909-b32a-c693469214dd.ma.bw-cloud-instance.org/api/tournament/nextStage/'+tournament_name, parsedJson);

                //Verhalten je nach rückgemeldetem statusCode des Backends
                switch (statusCode) {
                    // 200 = OK
                    case 200:
                        //Ersetzen des Abschließen Buttons von Runde 1 durch den Text "Abgeschlossen"
                        $('#stage1_close > div').html("Abgeschlossen")
                        //Erneutes laden des Turniers (Darstellung des Turniers inkl. der nächsten Runde)
                        loadTournament(tournament_name);
                        break;
                    // Andere Status Codes werden von der Funktion nicht erwartet
                    default:
                        alert("Unerwarteter Fehler");
                }
            });

        }
    }

    /*
    Nachfolgender Code (abhängig von Turniergröße) und der Code der Funktionen closeTournamentStage2/3/4
    funktioniert Analog zum Code der Funktion closeTournamentStage1, daher wird auf eine Kommentierung dessen verzichtet
    */

    if (tournament_size === "Teams: 8") {
        if (($('#win1_Match1_TeamA').is(':hidden') && $('#win1_Match1_TeamB').is(':hidden')) || ($('#win1_Match2_TeamA').is(':hidden') && $('#win1_Match2_TeamB').is(':hidden')) || ($('#win1_Match3_TeamA').is(':hidden') && $('#win1_Match3_TeamB').is(':hidden')) || ($('#win1_Match4_TeamA').is(':hidden') && $('#win1_Match4_TeamB').is(':hidden'))) {
            stage1_alert.hidden = false;
        } else {
            stage1_alert.hidden = true;
            $('#win0_Match1_TeamA, #win0_Match1_TeamB, #win0_Match2_TeamA, #win0_Match2_TeamB, #win1_Match1_TeamA, #win1_Match1_TeamB, #win1_Match2_TeamA, #win1_Match2_TeamB, #win0_Match3_TeamA, #win0_Match3_TeamB, #win0_Match4_TeamA, #win0_Match4_TeamB, #win1_Match3_TeamA, #win1_Match3_TeamB, #win1_Match4_TeamA, #win1_Match4_TeamB').each(function (){
                $(this).removeAttr('onclick');
            });

            var matchWinners = [];

            if($('#win1_Match1_TeamA').is(':hidden')) {
                matchWinners.push($("#m1_t2").text())
            } else {
                matchWinners.push($("#m1_t1").text())
            }

            if($('#win1_Match2_TeamA').is(':hidden')) {
                matchWinners.push($("#m2_t2").text())
            } else {
                matchWinners.push($("#m2_t1").text())
            }

            if($('#win1_Match3_TeamA').is(':hidden')) {
                matchWinners.push($("#m3_t2").text())
            } else {
                matchWinners.push($("#m3_t1").text())
            }

            if($('#win1_Match4_TeamA').is(':hidden')) {
                matchWinners.push($("#m4_t2").text())
            } else {
                matchWinners.push($("#m4_t1").text())
            }

            $(document).ready(function() {
                //Übertrag der "matchWinners" in das json Format
                var parsedJson = JSON.stringify({matchWinners: matchWinners});
                console.log(parsedJson);

                //Aufruf der ajaxPost Funktion sowie speichern der Return Value
                var statusCode = ajaxPost('http://5a3151e9-34c0-4909-b32a-c693469214dd.ma.bw-cloud-instance.org/api/tournament/nextStage/'+tournament_name, parsedJson);

                //Verhalten je nach rückgemeldetem statusCode des Backends
                switch (statusCode) {
                    // 200 = OK
                    case 200:
                        $('#stage1_close > div').html("Abgeschlossen")
                        loadTournament(tournament_name);
                        break;
                    // Andere Status Codes werden von der Funktion nicht erwartet
                    default:
                        alert("Unerwarteter Fehler");
                }
            });

        }
    }

    if (tournament_size === "Teams: 16") {
        if (($('#win1_Match1_TeamA').is(':hidden') && $('#win1_Match1_TeamB').is(':hidden')) || ($('#win1_Match2_TeamA').is(':hidden') && $('#win1_Match2_TeamB').is(':hidden')) || ($('#win1_Match3_TeamA').is(':hidden') && $('#win1_Match3_TeamB').is(':hidden')) || ($('#win1_Match4_TeamA').is(':hidden') && $('#win1_Match4_TeamB').is(':hidden')) || ($('#win1_Match5_TeamA').is(':hidden') && $('#win1_Match5_TeamB').is(':hidden')) || ($('#win1_Match6_TeamA').is(':hidden') && $('#win1_Match6_TeamB').is(':hidden')) || ($('#win1_Match7_TeamA').is(':hidden') && $('#win1_Match7_TeamB').is(':hidden')) || ($('#win1_Match8_TeamA').is(':hidden') && $('#win1_Match8_TeamB').is(':hidden'))) {
            stage1_alert.hidden = false;
        } else {
            stage1_alert.hidden = true;
            $('#win0_Match1_TeamA, #win0_Match1_TeamB, #win0_Match2_TeamA, #win0_Match2_TeamB, #win1_Match1_TeamA, #win1_Match1_TeamB, #win1_Match2_TeamA, #win1_Match2_TeamB, #win0_Match3_TeamA, #win0_Match3_TeamB, #win0_Match4_TeamA, #win0_Match4_TeamB, #win1_Match3_TeamA, #win1_Match3_TeamB, #win1_Match4_TeamA, #win1_Match4_TeamB, #win0_Match5_TeamA, #win0_Match5_TeamB, #win0_Match6_TeamA, #win0_Match6_TeamB, #win1_Match5_TeamA, #win1_Match5_TeamB, #win1_Match6_TeamA, #win1_Match6_TeamB, #win0_Match7_TeamA, #win0_Match7_TeamB, #win0_Match8_TeamA, #win0_Match8_TeamB, #win1_Match7_TeamA, #win1_Match8_TeamB, #win1_Match8_TeamA, #win1_Match8_TeamB').each(function (){
                $(this).removeAttr('onclick');
            });

            var matchWinners = [];

            if($('#win1_Match1_TeamA').is(':hidden')) {
                matchWinners.push($("#m1_t2").text())
            } else {
                matchWinners.push($("#m1_t1").text())
            }

            if($('#win1_Match2_TeamA').is(':hidden')) {
                matchWinners.push($("#m2_t2").text())
            } else {
                matchWinners.push($("#m2_t1").text())
            }

            if($('#win1_Match3_TeamA').is(':hidden')) {
                matchWinners.push($("#m3_t2").text())
            } else {
                matchWinners.push($("#m3_t1").text())
            }

            if($('#win1_Match4_TeamA').is(':hidden')) {
                matchWinners.push($("#m4_t2").text())
            } else {
                matchWinners.push($("#m4_t1").text())
            }

            if($('#win1_Match5_TeamA').is(':hidden')) {
                matchWinners.push($("#m5_t2").text())
            } else {
                matchWinners.push($("#m5_t1").text())
            }

            if($('#win1_Match6_TeamA').is(':hidden')) {
                matchWinners.push($("#m6_t2").text())
            } else {
                matchWinners.push($("#m6_t1").text())
            }

            if($('#win1_Match7_TeamA').is(':hidden')) {
                matchWinners.push($("#m7_t2").text())
            } else {
                matchWinners.push($("#m7_t1").text())
            }

            if($('#win1_Match8_TeamA').is(':hidden')) {
                matchWinners.push($("#m8_t2").text())
            } else {
                matchWinners.push($("#m8_t1").text())
            }

            $(document).ready(function() {
                //Übertrag der "matchWinners" in das json Format
                var parsedJson = JSON.stringify({matchWinners: matchWinners});
                console.log(parsedJson);

                //Aufruf der ajaxPost Funktion sowie speichern der Return Value
                var statusCode = ajaxPost('http://5a3151e9-34c0-4909-b32a-c693469214dd.ma.bw-cloud-instance.org/api/tournament/nextStage/'+tournament_name, parsedJson);

                //Verhalten je nach rückgemeldetem statusCode des Backends
                switch (statusCode) {
                    // 200 = OK
                    case 200:
                        $('#stage1_close > div').html("Abgeschlossen")
                        loadTournament(tournament_name);
                        break;
                    // Andere Status Codes werden von der Funktion nicht erwartet
                    default:
                        alert("Unerwarteter Fehler");
                }
            });

        }
    }

}

/**
 * <h3>Schließt die zweite Runde des Turniers ab und übermittelt die Gewinnerteams an das Backend
 **/
function closeTournamentStage2() {
    //Speichern der Turniergröße
    var tournament_size = document.getElementById("tour_size").innerHTML;
    //Speichern des Turniernamens
    var tournament_name = $('#tour_name').text();
    //Speichern des entsprechenden Alerts
    var stage2_alert = document.getElementById("stage2_close_alert");
    //Ausblenden des Alerts, falls von vorherigen Funktionsaufruf vorhanden
    stage2_alert.hidden = true;

    if (tournament_size === "Teams: 4") {
        if ($('#win1_Match9_TeamA').is(':hidden') && $('#win1_Match9_TeamB').is(':hidden')) {
            stage2_alert.hidden = false;
        } else {
            stage2_alert.hidden = true;
            $('#win0_Match9_TeamA, #win0_Match9_TeamB, #win0_Match9_TeamA, #win0_Match9_TeamB, #win1_Match9_TeamA, #win1_Match9_TeamB, #win1_Match9_TeamA, #win1_Match9_TeamB').each(function (){
                $(this).removeAttr('onclick');
            });

            var matchWinners = [];

            if($('#win1_Match9_TeamA').is(':hidden')) {
                matchWinners.push($("#m9_t2").text())
            } else {
                matchWinners.push($("#m9_t1").text())
            }

            $(document).ready(function() {
                //Übertrag der "matchWinners" in das json Format
                var parsedJson = JSON.stringify({matchWinners: matchWinners});
                console.log(parsedJson);

                //Aufruf der ajaxPost Funktion sowie speichern der Return Value
                var statusCode = ajaxPost('http://5a3151e9-34c0-4909-b32a-c693469214dd.ma.bw-cloud-instance.org/api/tournament/nextStage/'+tournament_name, parsedJson);

                //Verhalten je nach rückgemeldetem statusCode des Backends
                switch (statusCode) {
                    // 200 = OK
                    case 200:
                        $('#stage2_close > div').html("Abgeschlossen")
                        break;
                    // Andere Status Codes werden von der Funktion nicht erwartet
                    default:
                        alert("Unerwarteter Fehler");
                }
                loadTournament(tournament_name);
            });

        }
    }

    if (tournament_size === "Teams: 8") {
        if (($('#win1_Match9_TeamA').is(':hidden') && $('#win1_Match9_TeamB').is(':hidden')) || ($('#win1_Match10_TeamA').is(':hidden') && $('#win1_Match10_TeamB').is(':hidden')) ) {
            stage2_alert.hidden = false;
        } else {
            stage2_alert.hidden = true;
            $('#win0_Match9_TeamA, #win0_Match9_TeamB, #win0_Match9_TeamA, #win0_Match9_TeamB, #win1_Match9_TeamA, #win1_Match9_TeamB, #win1_Match9_TeamA, #win1_Match9_TeamB, #win0_Match10_TeamA, #win0_Match10_TeamB, #win0_Match10_TeamA, #win0_Match10_TeamB, #win1_Match10_TeamA, #win1_Match10_TeamB, #win1_Match10_TeamA, #win1_Match10_TeamB').each(function (){
                $(this).removeAttr('onclick');
            });

            var matchWinners = [];

            if($('#win1_Match9_TeamA').is(':hidden')) {
                matchWinners.push($("#m9_t2").text())
            } else {
                matchWinners.push($("#m9_t1").text())
            }

            if($('#win1_Match10_TeamA').is(':hidden')) {
                matchWinners.push($("#m10_t2").text())
            } else {
                matchWinners.push($("#m10_t1").text())
            }

            $(document).ready(function() {
                //Übertrag der "matchWinners" in das json Format
                var parsedJson = JSON.stringify({matchWinners: matchWinners});
                console.log(parsedJson);

                //Aufruf der ajaxPost Funktion sowie speichern der Return Value
                var statusCode = ajaxPost('http://5a3151e9-34c0-4909-b32a-c693469214dd.ma.bw-cloud-instance.org/api/tournament/nextStage/'+tournament_name, parsedJson);

                //Verhalten je nach rückgemeldetem statusCode des Backends
                switch (statusCode) {
                    // 200 = OK
                    case 200:
                        $('#stage2_close > div').html("Abgeschlossen")
                        break;
                    // Andere Status Codes werden von der Funktion nicht erwartet
                    default:
                        alert("Unerwarteter Fehler");
                }
                loadTournament(tournament_name);
            });

        }
    }

    if (tournament_size === "Teams: 16") {
        if (($('#win1_Match9_TeamA').is(':hidden') && $('#win1_Match9_TeamB').is(':hidden')) || ($('#win1_Match10_TeamA').is(':hidden') && $('#win1_Match10_TeamB').is(':hidden')) || ($('#win1_Match11_TeamA').is(':hidden') && $('#win1_Match11_TeamB').is(':hidden')) || ($('#win1_Match12_TeamA').is(':hidden') && $('#win1_Match12_TeamB').is(':hidden')) ) {
            stage2_alert.hidden = false;
        } else {
            stage2_alert.hidden = true;
            $('#win0_Match9_TeamA, #win0_Match9_TeamB, #win0_Match9_TeamA, #win0_Match9_TeamB, #win1_Match9_TeamA, #win1_Match9_TeamB, #win1_Match9_TeamA, #win1_Match9_TeamB, #win0_Match10_TeamA, #win0_Match10_TeamB, #win0_Match10_TeamA, #win0_Match10_TeamB, #win1_Match10_TeamA, #win1_Match10_TeamB, #win1_Match10_TeamA, #win1_Match10_TeamB, #win0_Match11_TeamA, #win0_Match11_TeamB, #win0_Match11_TeamA, #win0_Match11_TeamB, #win1_Match11_TeamA, #win1_Match11_TeamB, #win1_Match11_TeamA, #win1_Match11_TeamB, #win0_Match12_TeamA, #win0_Match12_TeamB, #win0_Match12_TeamA, #win0_Match12_TeamB, #win1_Match12_TeamA, #win1_Match12_TeamB, #win1_Match12_TeamA, #win1_Match12_TeamB').each(function (){
                $(this).removeAttr('onclick');
            });

            var matchWinners = [];

            if($('#win1_Match9_TeamA').is(':hidden')) {
                matchWinners.push($("#m9_t2").text())
            } else {
                matchWinners.push($("#m9_t1").text())
            }

            if($('#win1_Match10_TeamA').is(':hidden')) {
                matchWinners.push($("#m10_t2").text())
            } else {
                matchWinners.push($("#m10_t1").text())
            }

            if($('#win1_Match11_TeamA').is(':hidden')) {
                matchWinners.push($("#m11_t2").text())
            } else {
                matchWinners.push($("#m11_t1").text())
            }

            if($('#win1_Match12_TeamA').is(':hidden')) {
                matchWinners.push($("#m12_t2").text())
            } else {
                matchWinners.push($("#m12_t1").text())
            }

            $(document).ready(function() {
                //Übertrag der "matchWinners" in das json Format
                var parsedJson = JSON.stringify({matchWinners: matchWinners});
                console.log(parsedJson);

                //Aufruf der ajaxPost Funktion sowie speichern der Return Value
                var statusCode = ajaxPost('http://5a3151e9-34c0-4909-b32a-c693469214dd.ma.bw-cloud-instance.org/api/tournament/nextStage/'+tournament_name, parsedJson);

                //Verhalten je nach rückgemeldetem statusCode des Backends
                switch (statusCode) {
                    // 200 = OK
                    case 200:
                        $('#stage2_close > div').html("Abgeschlossen")
                        break;
                    // Andere Status Codes werden von der Funktion nicht erwartet
                    default:
                        alert("Unerwarteter Fehler");
                }
                loadTournament(tournament_name);
            });

        }
    }

}

/**
 * <h3>Schließt die dritte Runde des Turniers ab und übermittelt die Gewinnerteams an das Backend
 **/
function closeTournamentStage3() {
    //Speichern der Turniergröße
    var tournament_size = document.getElementById("tour_size").innerHTML;
    //Speichern des Turniernamens
    var tournament_name = $('#tour_name').text();
    //Speichern des entsprechenden Alerts
    var stage3_alert = document.getElementById("stage3_close_alert");
    //Ausblenden des Alerts, falls von vorherigen Funktionsaufruf vorhanden
    stage3_alert.hidden = true;

    if (tournament_size === "Teams: 8") {
        if ($('#win1_Match13_TeamA').is(':hidden') && $('#win1_Match13_TeamB').is(':hidden')) {
            stage3_alert.hidden = false;
        } else {
            stage3_alert.hidden = true;
            $('#win0_Match13_TeamA, #win0_Match13_TeamB, #win0_Match13_TeamA, #win0_Match13_TeamB, #win1_Match13_TeamA, #win1_Match13_TeamB, #win1_Match13_TeamA, #win1_Match13_TeamB').each(function (){
                $(this).removeAttr('onclick');
            });

            var matchWinners = [];

            if($('#win1_Match13_TeamA').is(':hidden')) {
                matchWinners.push($("#m13_t2").text())
            } else {
                matchWinners.push($("#m13_t1").text())
            }

            $(document).ready(function() {
                //Übertrag der "matchWinners" in das json Format
                var parsedJson = JSON.stringify({matchWinners: matchWinners});
                console.log(parsedJson);

                //Aufruf der ajaxPost Funktion sowie speichern der Return Value
                var statusCode = ajaxPost('http://5a3151e9-34c0-4909-b32a-c693469214dd.ma.bw-cloud-instance.org/api/tournament/nextStage/'+tournament_name, parsedJson);

                //Verhalten je nach rückgemeldetem statusCode des Backends
                switch (statusCode) {
                    // 200 = OK
                    case 200:
                        $('#stage3_close > div').html("Abgeschlossen")
                        break;
                    // Andere Status Codes werden von der Funktion nicht erwartet
                    default:
                        alert("Unerwarteter Fehler");
                }
                loadTournament(tournament_name);
            });

        }
    }

    if (tournament_size === "Teams: 16") {
        if (($('#win1_Match13_TeamA').is(':hidden') && $('#win1_Match13_TeamB').is(':hidden')) || ($('#win1_Match14_TeamA').is(':hidden') && $('#win1_Match14_TeamB').is(':hidden')) ) {
            stage3_alert.hidden = false;
        } else {
            stage3_alert.hidden = true;
            $('#win0_Match13_TeamA, #win0_Match13_TeamB, #win1_Match13_TeamA, #win1_Match13_TeamB, #win0_Match14_TeamA, #win0_Match14_TeamB, #win1_Match14_TeamA, #win1_Match14_TeamB').each(function (){
                $(this).removeAttr('onclick');
            });

            var matchWinners = [];

            if($('#win1_Match13_TeamA').is(':hidden')) {
                matchWinners.push($("#m13_t2").text())
            } else {
                matchWinners.push($("#m13_t1").text())
            }

            if($('#win1_Match14_TeamA').is(':hidden')) {
                matchWinners.push($("#m14_t2").text())
            } else {
                matchWinners.push($("#m14_t1").text())
            }

            $(document).ready(function() {
                //Übertrag der "matchWinners" in das json Format
                var parsedJson = JSON.stringify({matchWinners: matchWinners});
                console.log(parsedJson);

                //Aufruf der ajaxPost Funktion sowie speichern der Return Value
                var statusCode = ajaxPost('http://5a3151e9-34c0-4909-b32a-c693469214dd.ma.bw-cloud-instance.org/api/tournament/nextStage/'+tournament_name, parsedJson);

                //Verhalten je nach rückgemeldetem statusCode des Backends
                switch (statusCode) {
                    // 200 = OK
                    case 200:
                        $('#stage3_close > div').html("Abgeschlossen")
                        break;
                    // Andere Status Codes werden von der Funktion nicht erwartet
                    default:
                        alert("Unerwarteter Fehler");
                }
                loadTournament(tournament_name);
            });

        }
    }

}

/**
 * <h3>Schließt die vierte Runde des Turniers ab und übermittelt die Gewinnerteams an das Backend
 **/
function closeTournamentStage4() {
    //Speichern der Turniergröße
    var tournament_size = document.getElementById("tour_size").innerHTML;
    //Speichern des Turniernamens
    var tournament_name = $('#tour_name').text();
    //Speichern des entsprechenden Alerts
    var stage4_alert = document.getElementById("stage4_close_alert");
    //Ausblenden des Alerts, falls von vorherigen Funktionsaufruf vorhanden
    stage4_alert.hidden = true;

    if (tournament_size === "Teams: 16") {
        if ($('#win1_Match15_TeamA').is(':hidden') && $('#win1_Match15_TeamB').is(':hidden')) {
            stage4_alert.hidden = false;
        } else {
            stage4_alert.hidden = true;
            $('#win0_Match15_TeamA, #win0_Match15_TeamB, #win1_Match15_TeamA, #win1_Match15_TeamB').each(function (){
                $(this).removeAttr('onclick');
            });

            var matchWinners = [];

            if($('#win1_Match15_TeamA').is(':hidden')) {
                matchWinners.push($("#m15_t2").text())
            } else {
                matchWinners.push($("#m15_t1").text())
            }

            $(document).ready(function() {
                //Übertrag der "matchWinners" in das json Format
                var parsedJson = JSON.stringify({matchWinners: matchWinners});
                console.log(parsedJson);

                //Aufruf der ajaxPost Funktion sowie speichern der Return Value
                var statusCode = ajaxPost('http://5a3151e9-34c0-4909-b32a-c693469214dd.ma.bw-cloud-instance.org/api/tournament/nextStage/'+tournament_name, parsedJson);

                //Verhalten je nach rückgemeldetem statusCode des Backends
                switch (statusCode) {
                    // 200 = OK
                    case 200:
                        $('#stage4_close > div').html("Abgeschlossen")
                        break;
                    // Andere Status Codes werden von der Funktion nicht erwartet
                    default:
                        alert("Unerwarteter Fehler");
                }
                loadTournament(tournament_name);
            });

        }
    }

}

//<-- Ende Turnierrundenverwaltung

//--> Start Sidenavigation (Ein- und Ausblenden von Inhalten)
/**
 * <h3>
 **/
function show_tournaments() {
    alert("Funkionalität noch nicht umgesetzt")
    /*document.getElementById("stage1_close").hidden=true;
    document.getElementById("stage2_close").hidden=true;
    document.getElementById("stage3_close").hidden=true;
    document.getElementById("stage4_close").hidden=true;
    document.getElementById("dashboard_div").hidden=true;
    document.getElementById("tournament_player_div").hidden=true;
    document.getElementById("tournament_team_div").hidden=true;
    document.getElementById("tournament_tree_div").hidden=false;
    document.getElementById("statistik_div").style.display="none";
    document.getElementById("btn_tournaments").classList.add("active", "bg-primary");
    document.getElementById("btn_tournaments").classList.remove("text-white");
    document.getElementById("btn_dashboard").classList.remove("active", "bg-primary");
    document.getElementById("btn_dashboard").classList.add("nav-link", "text-white");
    document.getElementById("btn_statistik").classList.remove("active", "bg-primary");
    document.getElementById("btn_statistik").classList.add("nav-link", "text-white");*/
}

/**
 * <h3> Blendet die Inhalte des Dashboard ein und blendet evtl. vorhandene andere Inhalte aus
 **/
function show_dashboard() {
    document.getElementById("stage1_close").hidden=true;
    document.getElementById("stage2_close").hidden=true;
    document.getElementById("stage3_close").hidden=true;
    document.getElementById("stage4_close").hidden=true;
    document.getElementById("dashboard_div").hidden=false;
    document.getElementById("tournament_player_div").hidden=true;
    document.getElementById("tournament_team_div").hidden=true;
    document.getElementById("tournament_tree_div").hidden=true;
    document.getElementById("statistik_div").style.display="none";
    document.getElementById("btn_dashboard").classList.add("active", "bg-primary");
    document.getElementById("btn_dashboard").classList.remove("text-white");
    document.getElementById("btn_tournaments").classList.remove("active", "bg-primary");
    document.getElementById("btn_tournaments").classList.add("nav-link", "text-white");
    document.getElementById("btn_statistik").classList.remove("active", "bg-primary");
    document.getElementById("btn_statistik").classList.add("nav-link", "text-white");
}

/**
 * <h3> Blendet die Inhalte der Statistik ein und blendet evtl. vorhandene andere Inhalte aus
 **/
function show_statistik() {
    document.getElementById("stage1_close").hidden=true;
    document.getElementById("stage2_close").hidden=true;
    document.getElementById("stage3_close").hidden=true;
    document.getElementById("stage4_close").hidden=true;
    document.getElementById("dashboard_div").hidden=true;
    document.getElementById("tournament_player_div").hidden=true;
    document.getElementById("tournament_team_div").hidden=true;
    document.getElementById("tournament_tree_div").hidden=true;
    document.getElementById("statistik_div").style.display="block";
    document.getElementById("btn_statistik").classList.add("active", "bg-primary");
    document.getElementById("btn_statistik").classList.remove("text-white");
    document.getElementById("btn_tournaments").classList.remove("active", "bg-primary");
    document.getElementById("btn_tournaments").classList.add("nav-link", "text-white");
    document.getElementById("btn_dashboard").classList.remove("active", "bg-primary");
    document.getElementById("btn_dashboard").classList.add("nav-link", "text-white");
    //Laden der Nutzerstatistik
    getUserStats();
}

//<-- Ende Sidenavigation (Ein- und Ausblenden von Inhalten)
/**
 * <h3>Lädt die Daten des eingeloggten Users und fügt diese der Statistik Karte hinzu
 **/
function getUserStats() {
    //Der Code innerhalb der document.ready Funktion wird erst ausgeführt sobald Das Document Object Model bereit ist JavaScript Code auszuführen
    $(document).ready(function() {

        //Speichern des im sessionStorage gespeichertem Tokens und des Usernamens in Variablen
        var token = sessionStorage.getItem("token");
        var username = sessionStorage.getItem("username");
        //Initalisierung von 2 leeren Arrays um übermitteltes Datum in das Format TT.MM.JJJJ umzuwandeln
        var reformatDate = [];
        var reformatDate2 = [];

        //Abfragen der für den User gespeicherten Daten
        $.ajax({
            type: "GET",
            async: false,
            url: 'http://5a3151e9-34c0-4909-b32a-c693469214dd.ma.bw-cloud-instance.org/api/user/'+username,
            dataType: 'json',
            //Sendet im Request Head den jeweiligen Authentifizierungstoken des eingeloggten Benutzers
            headers: {Authorization: 'Bearer '+token},
            // statusCode: 200 - OK (Gesendeter Username und Passwort stimmen mit Datenbankeintrag überein)
            success: function(response) {
                $(function() {
                    //Aufteilen des übermittelten Formats in Array1
                    reformatDate = response.created.split("-");
                    //Aufteilen des übermittelten Formats in Array2
                    reformatDate2 = reformatDate[2].split("T");
                    //Anzeigen des übermittelten Nutzernamens
                    $("#stat_username").text(response.username);
                    //Anzeigen des übermittelten Vornamens
                    $("#stat_firstName").text(response.firstName);
                    //Anzeigen des übermittelten Nachnamens
                    $("#stat_lastName").text(response.lastName);
                    //Anzeigen des übermittelten Siege
                    $("#stat_matchWins > span").text(response.matchWins);
                    //Anzeigen des übermittelten Niederlagen
                    $("#stat_matchLooses > span").text(response.matchLooses);
                    //Anzeigen des übermittelten Turnierteilnahmen
                    $("#stat_tournamentAttends > span").text(Object.keys(response["tournamentAttends"]).length);
                    //Anzeigen des übermittelten Turniersiege
                    $("#stat_tournamentWins > span").text(response.tournamentWins);
                    //Anzeigen des übermittelten Startdatums
                    $("#stat_user_created > small").text("Nutzer wurde erstellt am: "+reformatDate2[0]+"."+reformatDate[1]+"."+reformatDate[0]);
                });
            },
            //Ausgabe der unterschiedlichen Error Codes, welche vom Backend als Antwort auf die GET Request kommen
            error: function (xhr) {
                alert(xhr.status+" "+xhr.responseText);
            }
        });
    });
}

