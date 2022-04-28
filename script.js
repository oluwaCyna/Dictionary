let words = document.getElementById('words');
let phonetic = document.getElementById('phonetic');
let phonetics = document.getElementById('phonetics');
let text = document.getElementById('text');
let audio = document.getElementById('audio');
let partOfSpeech = document.getElementById('partofspeech');
let definitions = document.getElementById('definitions');
let definition = document.getElementById('definition');
let example = document.getElementById('example');
let synonyms = document.getElementById('synonyms');
let antonyms = document.getElementById('antonyms');

let form = document.forms['form'];
let search = document.getElementById('search');

let audioUrl = [];
let word;
let data;
let url;

function displayOff () {
    document.getElementById("hide").style= "display: none";
}
function displayOn () {
    document.getElementById("hide").style= "display: block";
}
function submitForm (e) {
    e.preventDefault();

    searchFunc();
    dictionary();
    displayOn();  
}; 

 function searchFunc () {
     word = search.value;
     url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
 }

async function dictionary () {

    let response = await fetch(url)
    data = await response.json();
        
    if (data.title) {
        displayOff();
        alert(data.message) 
         
    }else{

    for (let i = 0; i < data.length; i++) {
        let arr1 = data[i]['meanings'];
        
        words.innerHTML = data[0]['word'] + " " + "-------" + " " + data[0]['phonetic'];
        phonetic.innerHTML = "       " + '<audio id="audiosize" controls> <source id="audio" src=' + `${audioUrl}` +' type="audio/mpeg"></audio>';
        audioUrl = data[0]['phonetics'][0]['audio'];
        
        for (let j in arr1){
            let arr2 = data[i]['meanings'][j]['definitions'];

            let syn = data[i]['meanings'][j]['synonyms'].toString().replaceAll(',', ', ');
            let ant = data[i]['meanings'][j]['antonyms'].toString().replaceAll(',', ', ');

            if (syn == " ") {
                // synonyms.innerHTML += ""
                // continue;
            }else {
                synonyms.innerHTML += "<br>" + `${syn}`;
            }

            if (ant == " ") {
                // antonyms.innerHTML += ;
                // continue;
            }else {
                antonyms.innerHTML += "<br>" +  `${ant}`;
            }
            
            for (let k in arr2) {

                partOfSpeech = data[i]['meanings'][j]['partOfSpeech'];
                example = data[i]['meanings'][j]['definitions'][k]['example'];

                if (partOfSpeech == undefined) {
                    partOfSpeech = " ";
                }else {
                    partOfSpeech = data[i]['meanings'][j]['partOfSpeech'];
                }

                if (example == undefined) {
                    example = " ";
                }else {
                    example = data[i]['meanings'][j]['definitions'][k]['example'];
                }
                
                definition.innerHTML += "<span id= 'pos'>" + "<sup>" +`${partOfSpeech}` + "</span>" +
                                        "</sup>" + " " + data[i]['meanings'][j]['definitions'][k]['definition'] +
                                        "<br>" + "'" + "<span id= 'example'>" + `${example}` + "</span>" + "'" + "<br>"+"<hr>";
            }
        }
    }
}
}    

form.addEventListener('submit', submitForm);