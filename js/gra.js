var Odkrywcy = window.Odkrywcy || {};
Odkrywcy.Gra = (function ($) {
'use strict';

    var gra = function () {
        var wybranyHex = {};
        var teren;
        var plansza = Odkrywcy.Plansza;

        /*
        mechaniki gry
        */
        this.startGry = function() {
            plansza.rysujMape();
            teren = plansza.pobierzTeren("M4");
            $("#siatka g").click(zaznaczHexa);
            $("#siatka g").mouseenter(wybierzHexa);
        };

        var zaznaczHexa = function(e) {
            pobierzIdHexa(e);
            $("#" + wybranyHex.id).attr("class", "wybranyHex");
            $('#idHexa').text(wybranyHex.id); //pole do sprawdzania
            var terenTekst = "";
            for (let prop in teren[wybranyHex.id]) {
                if(teren[wybranyHex.id][prop] === true){
                    console.log(prop);
                    terenTekst += prop + "<br />";
                }
            }
            $('#koordynatyWybrane span').html("x: " + wybranyHex.x + " y: " + wybranyHex.y + " z: " + wybranyHex.z); //Dp usunięcia, test wybranych koordynatów siatkio
            $('#teren').html(terenTekst);
            console.log(wybranyHex);
        };

        var wybierzHexa = function(e) {
            var wskazanyHex = {};
            wskazanyHex.id = e.currentTarget.id;
            var koordynaty = wskazanyHex.id.split("_");
            koordynaty[0] = parseInt(koordynaty[0]);
            koordynaty[1] = parseInt(koordynaty[1]);
            wskazanyHex.x = koordynaty[0];
            wskazanyHex.z = koordynaty[1] - Math.floor(koordynaty[0] / 2);
            wskazanyHex.y = -wskazanyHex.x - wskazanyHex.z;
            $('#koordynatyWskazane span').html("x: " + wskazanyHex.x + " y: " + wskazanyHex.y + " z: " + wskazanyHex.z); // do usunięcia test wskazywanych koordynatwó siatki
            $('#odlegloscMiedzyHexami span').html((Math.abs(wskazanyHex.x - wybranyHex.x) + Math.abs(wskazanyHex.y - wybranyHex.y) + Math.abs(wskazanyHex.z - wybranyHex.z)) / 2);
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


    };

    return gra;

}(jQuery));
