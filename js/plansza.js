var Odkrywcy = window.Odkrywcy || {};
Odkrywcy.Plansza = (function ($) {
'use strict';

    /*
    planszy z hexami
    */
    var plansza = {
        rysujMape: function (numerMapy = "m1") {
            var siatka; // zmienna do budowy siatki hexów dodawana do SVG #siatka
            var koordynaty_x;
            var koordynaty_y;
            var mapa = "img/mapy/" + numerMapy + ".jpg";
            /*
            załadowanie grafiki mapy
            */
            $('#mapa').css("background-image", "url(" + mapa + ")");

            //Pętle budujące siatkę
            for (let y = 0; y < 14; y += 1) { //kolumny

                for (let x = 0; x < 6; x += 1){ // wiersze co druga kolumna
                    var id = x + '_' + y; // id hexa
                    koordynaty_x = (78 * x);
                    if ((x % 2) === 0) {
                        koordynaty_y = 90 * y;
                    } else {
                        koordynaty_y = (90 * y) + 45;
                    }

                    // siatka z koordynatami transformacji do przesówania hexów
                    siatka += ('<g id="' + id + '" transform="translate(' + koordynaty_x + ',' + koordynaty_y + ')"><polygon points="26,0 78,0, 104,45 78, 90 26,90 0,45"></polygon></g>');
                }
            }
            $('#siatka').html(siatka); //wpisanie hexów do SVG siatki

        },
        pobierzTeren: function(numerMapy) {

            switch(numerMapy) {
                case "m4":
                return planszaM4;
            }
        }

    };
/*****************************************************************

                Opis terenu plansza

*****************************************************************/


    var planszaM4 = {
            "0_0": {
                rownina:            true,
                wzgorza:            false,
                gory:               false,
                urwisko:            false,
                roslinnoscRzadka:   false,
                roslinnoscBujna:    false,
                przepasc:           false,
                jaskinia:           false,
                rzeka:              false,
                jezioro:            false,
                ciecz:              false,
                bagna:              false,
                lodowiec:           false,
                plynnaLawa:         false,
                zastyglaLawa:       false,
                budowlaObcuch:      false,
                miastoObcych:       false

            },
            "2_0": {
                rownina:            false,
                wzgorza:            true,
                gory:               false,
                urwisko:            false,
                roslinnoscRzadka:   false,
                roslinnoscBujna:    false,
                przepasc:           false,
                jaskinia:           false,
                rzeka:              false,
                jezioro:            false,
                ciecz:              false,
                bagna:              false,
                lodowiec:           false,
                plynnaLawa:         false,
                zastyglaLawa:       false,
                budowlaObcuch:      false,
                miastoObcych:       false

            },
            "4_0": {
                rownina:            true,
                wzgorza:            false,
                gory:               false,
                urwisko:            false,
                roslinnoscRzadka:   false,
                roslinnoscBujna:    false,
                przepasc:           false,
                jaskinia:           false,
                rzeka:              false,
                jezioro:            false,
                ciecz:              false,
                bagna:              false,
                lodowiec:           false,
                plynnaLawa:         false,
                zastyglaLawa:       false,
                budowlaObcuch:      false,
                miastoObcych:       false

            },
            "1_0": {
                rownina:            true,
                wzgorza:            true,
                gory:               false,
                urwisko:            false,
                roslinnoscRzadka:   false,
                roslinnoscBujna:    false,
                przepasc:           false,
                jaskinia:           false,
                rzeka:              false,
                jezioro:            false,
                ciecz:              false,
                bagna:              false,
                lodowiec:           false,
                plynnaLawa:         false,
                zastyglaLawa:       false,
                budowlaObcuch:      false,
                miastoObcych:       false

            },
            "3_0": {
                rownina:            false,
                wzgorza:            true,
                gory:               false,
                urwisko:            false,
                roslinnoscRzadka:   false,
                roslinnoscBujna:    false,
                przepasc:           false,
                jaskinia:           false,
                rzeka:              false,
                jezioro:            false,
                ciecz:              false,
                bagna:              false,
                lodowiec:           false,
                plynnaLawa:         false,
                zastyglaLawa:       false,
                budowlaObcuch:      false,
                miastoObcych:       false

            },
            "5_0": {
                rownina:            true,
                wzgorza:            false,
                gory:               false,
                urwisko:            false,
                roslinnoscRzadka:   true,
                roslinnoscBujna:    false,
                przepasc:           false,
                jaskinia:           false,
                rzeka:              false,
                jezioro:            false,
                ciecz:              false,
                bagna:              false,
                lodowiec:           false,
                plynnaLawa:         false,
                zastyglaLawa:       false,
                budowlaObcuch:      false,
                miastoObcych:       false

            },
            "0_1": {
                rownina:            true,
                wzgorza:            true,
                gory:               false,
                urwisko:            false,
                roslinnoscRzadka:   false,
                roslinnoscBujna:    false,
                przepasc:           false,
                jaskinia:           false,
                rzeka:              false,
                jezioro:            false,
                ciecz:              false,
                bagna:              false,
                lodowiec:           false,
                plynnaLawa:         false,
                zastyglaLawa:       false,
                budowlaObcuch:      false,
                miastoObcych:       false

            },
            "2_1": {
                rownina:            false,
                wzgorza:            true,
                gory:               true,
                urwisko:            false,
                roslinnoscRzadka:   false,
                roslinnoscBujna:    false,
                przepasc:           false,
                jaskinia:           false,
                rzeka:              false,
                jezioro:            false,
                ciecz:              false,
                bagna:              false,
                lodowiec:           false,
                plynnaLawa:         false,
                zastyglaLawa:       false,
                budowlaObcuch:      false,
                miastoObcych:       false

            },
            "4_1": {
                rownina:            true,
                wzgorza:            true,
                gory:               false,
                urwisko:            false,
                roslinnoscRzadka:   true,
                roslinnoscBujna:    false,
                przepasc:           false,
                jaskinia:           false,
                rzeka:              false,
                jezioro:            false,
                ciecz:              false,
                bagna:              false,
                lodowiec:           false,
                plynnaLawa:         false,
                zastyglaLawa:       false,
                budowlaObcuch:      false,
                miastoObcych:       false

            },
            "1_1": {
                rownina:            false,
                wzgorza:            true,
                gory:               true,
                urwisko:            false,
                roslinnoscRzadka:   false,
                roslinnoscBujna:    false,
                przepasc:           false,
                jaskinia:           false,
                rzeka:              false,
                jezioro:            false,
                ciecz:              false,
                bagna:              false,
                lodowiec:           false,
                plynnaLawa:         false,
                zastyglaLawa:       false,
                budowlaObcuch:      false,
                miastoObcych:       false

            },
            "3_1": {
                rownina:            false,
                wzgorza:            true,
                gory:               true,
                urwisko:            false,
                roslinnoscRzadka:   false,
                roslinnoscBujna:    false,
                przepasc:           false,
                jaskinia:           false,
                rzeka:              false,
                jezioro:            false,
                ciecz:              false,
                bagna:              false,
                lodowiec:           false,
                plynnaLawa:         false,
                zastyglaLawa:       false,
                budowlaObcuch:      false,
                miastoObcych:       false

            },
            "5_1": {
                rownina:            true,
                wzgorza:            true,
                gory:               false,
                urwisko:            false,
                roslinnoscRzadka:   false,
                roslinnoscBujna:    false,
                przepasc:           false,
                jaskinia:           false,
                rzeka:              false,
                jezioro:            false,
                ciecz:              false,
                bagna:              false,
                lodowiec:           false,
                plynnaLawa:         false,
                zastyglaLawa:       false,
                budowlaObcuch:      false,
                miastoObcych:       false

            },

        };

    return plansza;

}(jQuery));
