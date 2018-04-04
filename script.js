document.getElementById('show-search').addEventListener('click',function(){
    document.getElementById("search-box").style.top = "30vh";
});

document.getElementById("exit-search").addEventListener('click',function(){
    document.getElementById("search-box").style.top = "-100vh";
});

document.getElementById("search").addEventListener('click', showUser);

var box = ``;

var xhr = new XMLHttpRequest();

// Shows user
function showUser(){
    console.log("TEST");
    
    box = ``;

    var userName = document.getElementById('user').value;

    xhr.open('GET', 'https://osu.ppy.sh/api/get_user?k=52ae0ab0149244476e7bcc8f297b665ea69a6020&u=' + userName, true);
      
    // LOADING TOP SCORES

    // LOADING PROFILE
    xhr.onload = function () {
        console.log("READYSTATE: ", xhr.readyState);
        if (this.status == 200) {
            var user = JSON.parse(this.responseText);

            var rank = numberWithCommas(user[0].pp_rank);
            var rankComment = commentRank(user[0].pp_rank);
            var accuracy = toDecimal(user[0].accuracy);
            var accComment = commentAcc(user[0].accuracy);
            var performancePoint = numberWithCommas(user[0].pp_raw);
            var ppComment = commentPP(user[0].pp_raw);

            var playCount = numberWithCommas(user[0].playcount);
            var playComment = commentPlay(user[0].playcount);

            var ss = numberWithCommas(+user[0].count_rank_ss + +user[0].count_rank_ssh);
            var s = numberWithCommas(+user[0].count_rank_s + +user[0].count_rank_sh);
            var a = numberWithCommas(user[0].count_rank_a);
            var avatar = "http://a.ppy.sh/" + user[0].user_id;

            var output =
                `
                 <section id="top">
                    <img src="${avatar}" alt="avatar">
                    <h1 id="username">--${user[0].username}--</h1>
                    <h2 id="rank">--- #${rank} ---<br><br>
                        <span id="rank-comment">${rankComment}</span>
                    </h2>
                </section>

                <section id="performance">
                <div class="pp">
                    <h1>Performance Point</h1>
                    <hr>
                    <p>${performancePoint}pp <span id="pp-comment">${ppComment}</span></p>
                </div>
                <div class="pp">
                    <h1>Accuracy</h1>
                    <hr>
                    <p>${accuracy}%
                        <span id="pp-comment">${accComment}</span>
                    </p>
                </div>
                <div class="pp">
                    <h1>Playcount</h1>
                    <hr>
                    <p>${playCount}
                        <span id="pp-comment">${playComment}</span>
                    </p>
                </div>
            </section>

            <section id="ranks">
                <div class="box">
                    <img src="images/ss.png" alt="SS">
                    <p>${ss}</p>
                </div>
                <div class="box">
                    <img src="images/s.png" alt="S">
                    <p>${s}</p>
                </div>
                <div class="box">
                    <img src="images/a.png" alt="A">
                    <p>${a}</p>
                </div>
            </section>   
                `;
            document.getElementById("result").innerHTML = output;
            document.getElementById("search-box").style.top = "-100vh";
            document.getElementById("user").value = "";

            // Top Scores
            printTopScore(user[0].username);

        }
        else if (this.status == 404) {
            document.getElementById('text').innerText = "404 NOT FOUND";
            alert("WTF");
        }
        else if (this.status == 403) {
            alert("WTF");
        }
    }
    xhr.send();
}



function printTopScore(userid){

    var xhr2 = new XMLHttpRequest();

    xhr2.open('GET', 'https://osu.ppy.sh/api/get_user_best?k=52ae0ab0149244476e7bcc8f297b665ea69a6020&u=' + userid, true);

    xhr2.onload = function () {
        if (this.status == 200) {
            var topScores = JSON.parse(this.responseText);
            for(var i = 0; i < topScores.length; i++){
               var beatmapid = topScores[i].beatmap_id;
               getBeatmapName(beatmapid, topScores[i].pp, topScores[i].enabled_mods);
                console.log(topScores[i].enabled_mods);
            }
        }
    }
    xhr2.send();
}



function getBeatmapName(beatid, pp, modd){   
    
    var xhr3 = new XMLHttpRequest();
    xhr3.open('GET','https://osu.ppy.sh/api/get_beatmaps?k=52ae0ab0149244476e7bcc8f297b665ea69a6020&b=' + beatid, true);

    xhr3.onload = function(){
        if(this.status == 200){
            var beatmapInfo = JSON.parse(this.responseText);
            var text = beatmapInfo[0].title;
            var ver = beatmapInfo[0].version;
            var text2 = text.toString();
            var ver2 = ver.toString();
            console.log(text2);
            var currmod = seeMod(+modd);

            box += `
                <div class="box">
                    <h1>${text2} <span id="mods">${currmod}</span></h1>
                    <h2>${ver2}</h2>
                    <p>${toDecimal(pp)}PP</p>
                </div>
            `;

            var input = `
               <section id="top-plays">
                    <h1>Top Plays</h1>
                    <div class="boxes">
                        ${box}
                    </div>  
            </section>
            `;

            document.getElementById("bottom-result").innerHTML = input;
        }
    }
    xhr3.send();
}












// OTHER FUNCTIONS

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function toDecimal(num){
    return Math.round(num * 100) / 100;
}

function seeMod(mod){
    switch(mod){
        case 0:
            return "";
        break;
        case 1:
            return "+NF";
        break;
        case 2:
            return "+EZ";
        break;
        case 8:
            return "+HD";
        break;
        case 16:
            return "+HR";
        case 32:
            return "+SD";
        break;
        case 64:
            return "+DT";
        break;
        case 256:
            return "+HT";
        break;
        case 512:
            return "+NC";
        break;
        case 1024:
            return "+FL";
        break;
        
        case 24:
            return "+HDHR";
        break;
        case 72:
            return "+HDDT";
        break;
        case 80:
            return "+HRDT";
        break;
        case 88:
            return "+HDHRDT";
        break;
        case 520:
            return "+HDNC";
        break;
        case 528:
            return "+HRNC";
        break;
    }
    
}

function commentPP(pp) {
    if (pp < 1000) {
        return "NOOB";
    }
    else if (pp < 2000) {
        return "Beginner";
    }
    else if (pp < 3000) {
        return "Intermediate";
    }
    else if (pp < 4000) {
        return "Farmer";
    }
    else if (pp < 5000) {
        return "DT Farmer";
    }
    else if (pp < 6000) {
        return "Advance";
    }
    else if (pp < 7000) {
        return "No life";
    }
    else if (pp < 8000) {
        return "HDHR!";
    }
    else if (pp < 9000) {
        return "Susej Tsirhc!";
    }
    else if (pp < 10000) {
        return "WOW! FARM MORE!";
    }
    else if (pp < 11000) {
        return "Stop Farming!";
    }
    else if (pp < 12000) {
        return "Eating PP?";
    }
    else if (pp < 13000) {
        return "Pro Level";
    }
    else if (pp < 14000) {
        return "HOLY";
    }
    else if (pp < 15000) {
        return "GOD";
    }
}

function commentAcc(acc){
    if(acc < 50){
        return "Can you hit?";
    }
    else if(acc < 60){
        return "Baka!";
    }
    else if(acc < 70){
        return "Nani!?";
    }
    else if(acc < 80){
        return "Taimingu!";
    }
    else if(acc < 90){
        return "Average";
    }
    else if(acc < 95){
        return "Noob Acc";
    }
    else if(acc < 97){
        return "Good";
    }
    else if(acc < 99){
        return "Nice";
    }
    else if(acc < 100){
        return "GOD";
    }
}

function commentPlay(num){
    if(num < 500){
        return "Play More";
    }
    else if(num < 1000){
        return "Casual";
    }
    else if(num < 5000){
        return "Noob";
    }
    else if(num < 10000){
        return "Meh";
    }
    else if(num < 15000){
        return "Kill Your Self";
    }
    else if(num < 20000){
        return "No Life";
    }
    else if(num < 25000){
        return "Addicted";
    }
    else if(num < 50000){
        return "Can't Stop Clicking!";
    }
    else if(num < 100000){
        return "Farmer";
    }
    else if(num < 1000000){
        return "Beyond Farmer";
    }
}

function commentRank(r) {
    if (r > 1000000) {
        return "Inactive";
    }
    else if (r > 500000) {
        return "Noob";
    }
    else if (r > 100000) {
        return "Young";
    }
    else if (r > 90000){
        return "6 Digit No More";
    }
    else if(r > 10000){
        return "5 Digit No More";
    }
    else if(r > 1000){
        return "Pro!";
    }
    else if(r > 100){
        return "Monster!";
    }
    else if(r > 50){
        return "Insane!";
    }
    else if(r > 10){
        return "Demon!";
    }
    else if(r > 5){
        return "Killer!";
    }
    else if(r == 5){
        return "Noob player";
    }
    else if(r == 4){
        return "Ordinary Farmer";
    }
    else if(r == 3){
        return "DT Farmer";
    }
    else if(r == 2){
        return "It's Okay";
    }
    else if(r == 1){
        return "Highest PP Count";
    }
}