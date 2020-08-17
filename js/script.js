//TerGating With Id
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const showSongList = document.getElementById('show-song-list');
const showSingleResult = document.getElementById('show-single-result');
const songNameShow = document.getElementById('song-name-showing');
const showLyrics = document.getElementById('show-lyrics');


//show song list and result on click
searchBtn.addEventListener('click',function(){
    const searchInputValue = searchInput.value;
    //console.log(searchInputValue);

    //get song data form api with fetch
    fetch('https://api.lyrics.ovh/suggest/'+searchInputValue+'')
    .then(res => res.json())
    .then(data => setData(data));//console.log(data)

    //show song list and result 
    showSongList.innerHTML='';
    showSingleResult.innerHTML = '';

    const setData =  data =>{
        for (let i = 0; i < 10; i++) {
            const id = data.data[i].id;
            const title = data.data[i].title;
            const artist = data.data[i].artist.name;
            const picture = data.data[i].artist.picture;
            const randomIdNum = Math.random()*10000;
            //console.log(id, title, artist,picture, randomId);
            showSongList.innerHTML += 
            `
            <style>
            .song-list-p{
                text-shadow:1px 2px 2px #ff6700;
                border-bottom: 2px solid #F6B184;
                
            }
            </style>
            <div class="row">
                <div class="col-md-8 mb-3">
                    <p class="author lead song-list-p" style="font-weight:500"><strong>${title}</strong> Album by <span style="font-weight:700">${artist}</span></p>
                    
                </div>
                <div class="col-md-4">
                    <button class="btn btn-success get-lyrics" onclick="getLyricsList('${artist}', '${title}')">Get Lyrics</button>
                </div>
            </div>
            `

            showSingleResult.innerHTML += 
            `   <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9 d-flex">
                        <img class="h-100 mr-5" src="${picture}" alt="">
                        <div class="details">
                            <h3 class="lyrics-name">${title}</h3>
                            <p class="author lead">Album by <span>${artist}</span></p>
                        </div>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button class="btn btn-success" onclick="getLyric('${artist}', '${title}', '${id}' , '${randomIdNum}')">Get Lyrics</button>
                    </div>
                </div>
                <h3 id="${randomIdNum}" class="text-center"></h3>
                <div id="${id}" class="text-center"></div>
            `
        }
    }
});
//One click on show lyrics for #show-lyrics section
const getLyricsList = (artist, title, unknowId) =>{
    fetch('https://api.lyrics.ovh/v1/'+artist+'/'+title+'')
    .then(res => res.json())
    .then(data => showLyric(data));

    const showLyric = lyric => {
        songNameShow.innerText = title;
        showLyrics.innerText = lyric.lyrics;
    }
}
//single lyric list for #show-single-result section
const getLyric = (artist, title, id, unknowId) =>{
    fetch('https://api.lyrics.ovh/v1/'+artist+'/'+title+'')
    .then(res => res.json())
    .then(data => setLyric(data));
    const setLyric = data => {
        if(data.lyrics != undefined){
            const lyric = data.lyrics;
            //console.log(lyric);
            document.getElementById(unknowId).innerHTML += `
            <style>
                a{
                    text-shadow:1px 2px 2px #ff6700;
                    border-bottom: 2px solid #F6B184;
                }
            </style>
            <a>This Song Lyrics:-</a>
            `//title+' Song Albam By '+artist+' '+' This Song Lyric :';
            
            document.getElementById(id).innerText = lyric;
        }else{
            document.getElementById(unknowId).innerText = 'Lyric not found';
        }
    }
}
