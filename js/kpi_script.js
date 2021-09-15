var xhr = new XMLHttpRequest();

xhr.open("GET", "https://horsorion-2c8f4-default-rtdb.firebaseio.com/kpi.json");
xhr.onload = function() {

    var jcontent = JSON.parse(xhr.responseText);
    //console.log(jcontent);
    document.getElementById('no_of_win').innerHTML = jcontent.win.no_of_hit;
    document.getElementById('no_of_place').innerHTML = jcontent.place.no_of_hit;
    document.getElementById('no_of_quin').innerHTML = jcontent.quin.no_of_hit;
    document.getElementById('no_of_quinp').innerHTML = jcontent.quin_place.no_of_hit;
    document.getElementById('start_date').innerHTML = jcontent.win.start_date;
    document.getElementById('end_date').innerHTML = jcontent.win.end_date;
    document.getElementById('win_percent').innerHTML = jcontent.win.percent;
    document.getElementById('place_percent').innerHTML = jcontent.place.percent;
    document.getElementById('quin_percent').innerHTML = jcontent.quin.percent;
    document.getElementById('quinp_percent').innerHTML = jcontent.quin_place.percent;
    document.getElementById('win_odds').innerHTML = jcontent.win.avg_odds;
    document.getElementById('place_odds').innerHTML = jcontent.place.avg_odds;
    document.getElementById('quin_odds').innerHTML = jcontent.quin.avg_odds;
    document.getElementById('quinp_odds').innerHTML = jcontent.quin_place.avg_odds;

}
xhr.send();