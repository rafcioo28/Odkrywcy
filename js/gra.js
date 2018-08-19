var Odkrywcy = window.Odkrywcy || {};
Odkrywcy.Gra = (function ($) {
'use strict';

    var gra = function () {
        var wybranyHex = {};
        var teren;
        var plansza = Odkrywcy.Plansza;
        var trasa; // hexy pokazujące trasę miedzy wybranym a wskazywanym hexem

        /*
        mechaniki gry
        */
        this.startGry = function() {
            wczytajMape("m1");
            $("#siatka g").click(zaznaczHexa);  // klikniecie hexa
            $("#siatka g").mouseenter(wybierzHexa);
            $("#siatka").mouseleave(function (){
                $('#terenTooltip').css({
                    'display': 'none'
                });
            });
            $("#wyborMapy select").change(function () {
                wczytajMape($(this).val());
                $("#siatka g").click(zaznaczHexa);  // klikniecie hexa
                $("#siatka g").mouseenter(wybierzHexa);
                $("#siatka").mouseleave(function (){
                    $('#terenTooltip').css({
                        'display': 'none'
                    });
                });
            });
        };

        var wczytajMape = function(numerMapy){
            plansza.rysujMape(numerMapy);
            teren = plansza.pobierzTeren(numerMapy);
        };

        var zaznaczHexa = function(e) {
            pobierzIdHexa(e);
            $("#" + wybranyHex.id).attr("class", "wybranyHex");
            $('#idHexa').text(wybranyHex.id); //pole do sprawdzania
            var terenTekst = "";
            for (let prop in teren[wybranyHex.id]) {
                if(teren[wybranyHex.id][prop] === true){
                    terenTekst += prop + "<br />";
                }
            }
            $('#koordynatyWybrane span').html("x: " + wybranyHex.x + " y: " + wybranyHex.y + " z: " + wybranyHex.z); //Dp usunięcia, test wybranych koordynatów siatkio
            $('#teren').html(terenTekst);
        };

        // ***************************** funkcja obsługujące najazd na hexa by określić wspórzędne
        var wybierzHexa = function(e) {
            var wskazanyHex = {};
            var mysz_X;
            var mysz_Y;
            wskazanyHex.id = e.currentTarget.id;
            var koordynaty = wskazanyHex.id.split("_");
            koordynaty[0] = parseInt(koordynaty[0]);
            koordynaty[1] = parseInt(koordynaty[1]);
            wskazanyHex.x = koordynaty[0];
            wskazanyHex.z = koordynaty[1] - Math.floor(koordynaty[0] / 2);
            wskazanyHex.y = -wskazanyHex.x - wskazanyHex.z;
            $('#koordynatyWskazane span').html("x: " + wskazanyHex.x + " y: " + wskazanyHex.y + " z: " + wskazanyHex.z); // do usunięcia test wskazywanych koordynatwó siatki
            $('#odlegloscMiedzyHexami span').html(odlegloscMiedzyHexami(wybranyHex, wskazanyHex));
            $('#terenTooltip').html(pobierzTerenHexa(wskazanyHex));
            $('#' + wskazanyHex.id).mousemove( function(m){
                    mysz_X = m.pageX;
                    mysz_Y = m.pageY;
                    $(this).mousemove( function () {
                        $('#terenTooltip').css({
                            'top': mysz_Y + 20,
                            'left': mysz_X + 20,
                            'display': 'block'
                        });
                    });
            });
            oznaczTrase(wybranyHex, wskazanyHex);
        };

        var pobierzTerenHexa = function(Hex) {  //Funkcja pobierająca dane o terenie wybranego hexa
            var terenTekst = '';
            for (let prop in teren[Hex.id]) {
                if(teren[Hex.id][prop] === true){
                    terenTekst += prop + "<br />";
                }
            }
            return terenTekst;
        };

        var pobierzIdHexa = function(e) {
            $("#" + wybranyHex.id).attr("class", "");
            wybranyHex.id = e.currentTarget.id;
            var koordynaty = wybranyHex.id.split("_");
            koordynaty[0] = parseInt(koordynaty[0]);
            koordynaty[1] = parseInt(koordynaty[1]);
            wybranyHex.x = koordynaty[0];
            wybranyHex.z = koordynaty[1] - Math.floor(koordynaty[0] / 2);
            wybranyHex.y = -wybranyHex.x - wybranyHex.z;

        };

        var trasaMiedzyHexami = function(wybranyHex, wskazanyHex) {
            var d = odlegloscMiedzyHexami(wybranyHex, wskazanyHex); //d - dystans między hexami
            var liniaHexow = [];
            for (let i = 0; i <= d; i += 1) {
                liniaHexow.push(hexRound(hexLerp(wybranyHex, wskazanyHex, 1.0/d * i)));
            }
            return liniaHexow;
        };

        var odlegloscMiedzyHexami = function(wybranyHex, wskazanyHex) {
            return (Math.abs(wskazanyHex.x - wybranyHex.x) + Math.abs(wskazanyHex.y - wybranyHex.y) + Math.abs(wskazanyHex.z - wybranyHex.z)) / 2;
        };

        //************************ wytyczanie trasy między hexami *********************************************
        var oznaczTrase = function(wybranyHex, wskazanyHex) {
            var liniaHexow = trasaMiedzyHexami(wybranyHex, wskazanyHex);
            $(".trasa").removeAttr("class");
            for (let i = 1; i < liniaHexow.length - 1; i += 1){
                var kolumna = liniaHexow[i].x;
                var wiersz = liniaHexow[i].z + Math.floor(liniaHexow[i].x / 2);
                var idHexa = kolumna + "_" + wiersz;
                $('#' + idHexa).attr("class", "trasa");
            }
        };

        // ************************ funkcle lerp, hexRound i hexLerp - pomocnicze do wyznaczania trasy miedzy hexami *************************************
        var lerp = function(a, b, t) {
            return a + (b - a) * t;
        };

        var hexLerp = function(a, b, t) {
            return {
                x: lerp(a.x, b.x, t),
                y: lerp(a.y, b.y, t),
                z: lerp(a.z, b.z, t)
            };

        };

        var hexRound = function(hex) {
            var rx = Math.round(hex.x);
            var ry = Math.round(hex.y);
            var rz = Math.round(hex.z);

            var x_diff = Math.abs(rx - hex.x);
            var y_diff = Math.abs(ry - hex.y);
            var z_diff = Math.abs(rz - hex.z);

            if (x_diff > y_diff && y_diff > z_diff) {
                rx = -ry - rz;
            }
            else if (y_diff > z_diff) {
                ry = -rx - rz;
            }
            else {
                rz = -rx - ry;
            }

            return {
                x: rx,
                y: ry,
                z: rz
            };

        };
        //***************************************************************************************************************************************


    };

    return gra;

}(jQuery));
