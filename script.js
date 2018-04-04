document.getElementById('show-search').addEventListener('click',function(){
    document.getElementById("search-box").style.top = "30vh";
});

document.getElementById("exit-search").addEventListener('click',function(){
    document.getElementById("search-box").style.top = "-100vh";
});

document.getElementById("search").addEventListener('click', showUser);

// Shows user
function showUser(){
    console.log("TEST");
    var xhr = new XMLHttpRequest();
    var user = document.getElementById('user').value;
    xhr.open('GET', 'https://osu.ppy.sh/api/get_user?k=52ae0ab0149244476e7bcc8f297b665ea69a6020&u=' + user, true);
    

    xhr.onload = function () {
        console.log("READYSTATE: ", xhr.readyState);
        if (this.status == 200) {
            var user = JSON.parse(this.responseText);

            var rank = numberWithCommas(user[0].pp_rank);
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
                    <h1 id="username">${user[0].username}</h1>
                    <h2 id="rank">#${rank}
                        <span id="rank-comment">Pro</span>
                    </h1>
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

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function toDecimal(num){
    return Math.round(num * 100) / 100;
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