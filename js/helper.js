/**
 * Created by upix_ on 11/9/2016.
 */

function getLetterDate(condition) {
    var df = new Date();
    var dd = df.getDate();
    if (condition == 'today') {
        dd = dd;
    } else if (condition == 'yesterday') {
        dd = dd - 1
    } else if (condition == 'last2day') {
        dd = dd - 2
    }

    var mm = df.getMonth() + 1;
    var yyyy = df.getFullYear();
    return mm + '/' + dd + '/' + yyyy;
}

function getAgendaDate(condition) {
    var df = new Date();
    var dd = df.getDate();
    if (condition == 'today') {
        dd = dd;
    } else if (condition == 'tomorrow') {
        dd = dd + 1
    } else if (condition == 'next2day') {
        dd = dd + 2
    }
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    var mm = df.getMonth() + 1;
    var yyyy = df.getFullYear();
    return mm + '/' + dd + '/' + yyyy;
}

function getParamValue(name) {
    var regexS = "[\\?&]" + name + "=([^&#]*)",
        regex = new RegExp(regexS),
        results = regex.exec(window.location.search);
    if (results == null) {
        return "";
    } else {
        return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}

function cekLetterDisposition(letter_id) {
    var cek_letter_disposition = {
        "async": true,
        "crossDomain": true,
        "url": "http://io.nowdb.net/v2/select_where/token/" + token +
        "/project/" + project +
        "/collection/letter_division" +
        "/appid/" + appid +
        "/where_field/letter_id" +
        "/where_value/" + letter_id,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache"
        }
    }

    $.ajax(cek_letter_disposition).done(function (response) {
        var countLetter = response.length;
        if (countLetter > 0) {
            $('#listLetter' + letter_id).css("border-left", "3px solid orange");
        }
    });
}

function cekDocumentDisposition(document_id) {
    var cek_document_disposition = {
        "async": true,
        "crossDomain": true,
        "url": "http://io.nowdb.net/v2/select_where/token/" + token +
        "/project/" + project +
        "/collection/document_division" +
        "/appid/" + appid +
        "/where_field/document_id" +
        "/where_value/" + document_id,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache"
        }
    }

    $.ajax(cek_document_disposition).done(function (response) {
        var countLetter = response.length;
        if (countLetter > 0) {
            $('#listDocument' + document_id).css("border-left", "3px solid orange");
        }
    });
}

function contentFilter(selector) {
    $(".search").change(function () {
        var filter = $(this).val();
        if (filter) {
            $(selector).find("a:not(:Contains(" + filter + "))").parent().slideUp();
            $(selector).find("a:Contains(" + filter + ")").parent().slideDown();
        } else {
            $(selector).find("li").slideDown();
        }
        return false;
    }).keyup(function () {
        $(this).change();
    });
}

function browserId() {
    var navigator_info = window.navigator;
    var screen_info = window.screen;
    var uid = navigator_info.mimeTypes.length;
    uid += navigator_info.userAgent.replace(/\D+/g, '');
    uid += navigator_info.plugins.length;
    uid += screen_info.height || '';
    uid += screen_info.width || '';
    uid += screen_info.pixelDepth || '';
    return uid;
}

function loginCheck() {
    $.ajax({
        url: 'https://api.ipify.org?format=json',
        dataType: 'json',
        success: function (data) {
            var user_login = {
                "async": true,
                "crossDomain": true,
                "url": "http://io.nowdb.net/v2/select_where" +
                "/token/" + token +
                "/project/" + project +
                "/collection/user_login" +
                "/appid/" + appid +
                "/where_field/device_idANDip" +
                "/where_value/" + browserId() + "AND" + data.ip,
                "method": "GET",
                "headers": {
                    "cache-control": "no-cache"
                }
            }

            $.ajax(user_login).done(function (response) {
                if (response.length == 0) {
                    $(location).attr('href', 'user_form_login.html');
                }
            });
        }
    });
}

function getShortURL(long_url, func) {
    $.getJSON("http://api.bitly.com/v3/shorten?callback=?", {
            "format": "json",
            "apiKey": "R_b5c5941cda274e5c8478014d5f5b3ed3",
            "login": "taufiksu",
            "longUrl": long_url
        },
        function (response) {
            func(response.data.url);
        }
    );
}

function bottomMenu(menu) {
    $.get("bottom_menu.html", function (data) {
        $('#bottom-menu').html(data);
    }).done(function (response) {
        if (menu == 'letter') {
            $('#menu-letter').addClass("active");
        } else if (menu == 'agenda') {
            $('#menu-agenda').addClass("active");
        } else if (menu == 'document') {
            $('#menu-document').addClass("active");
        } else if (menu == 'hdivision') {
            $('#menu-hdivision').addClass("active");
        } else if (menu == 'config') {
            $('#menu-config').addClass("active");
        }
    });
}