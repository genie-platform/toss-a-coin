"use strict";

var state = {
    winnerId: undefined,
    jwt: undefined
}

var winnerId

function fetchPrize() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "/api/v1/play/prize", false);
    xmlHttp.send(null);
    var prize = JSON.parse(xmlHttp.responseText).data
    console.log(xmlHttp.responseText)
    document.getElementById("prize").innerHTML = prize;
}


function toss() {
    window.fetch('/api/v1/play/toss', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.jwt}`
        }
      }).then(response => response.json()).then(({ data }) => {
        debugger
        if (data.won) {
            winnerId = data.winnerId
            document.getElementById("win").classList.remove("hidden");
            document.getElementById("loose").classList.add("hidden");
        } else {
            document.getElementById("loose").classList.remove("hidden");
            document.getElementById("win").classList.add("hidden");
        }
      })
}

function claim() {
    var accountAddress = document.getElementById("accountAddress").value
    // console.log(accountAddress)
    // var xmlHttp = new XMLHttpRequest();
    // xmlHttp.open("POST", "/api/v1/play/claim", false);
    // xmlHttp.setRequestHeader("Content-type", "application/json");

    // xmlHttp.send(JSON.stringify({ winnerAccountAddress: accountAddress, winnerId: winnerId }))
    // document.getElementById("win").classList.add('hidden')
    // document.getElementById("claimed").classList.remove('hidden')

    window.fetch('/api/v1/play/claim', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.jwt}`
        },
        body: JSON.stringify({ winnerAccountAddress: accountAddress, winnerId: winnerId })
      }).then(() => {
        document.getElementById("win").classList.add('hidden')
        document.getElementById("claimed").classList.remove('hidden')
      })
}

function load() {
    fetchPrize()
}
