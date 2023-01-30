const element = document.getElementById('search')

element.addEventListener("input", function(event) {
    console.log(this.value)
    if (this.value.length > 2) {
        fetchData(this.value)
    } 
})

const showLoad = () => {
    document.getElementById('loader').style.display = "block"
}

const hideLoad = () => {
    document.getElementById('loader').style.display = "none"
}

const deleteChild = (id) => {
    const artist = document.querySelector("#" + id);
    
    //e.firstElementChild can be used.
    child = artist.lastElementChild; 
    while (child) {
        artist.removeChild(child);
        child = artist.lastElementChild;
    }
}

const fetchData = async(value) =>{
    showLoad()
    deleteChild("artist")
    deleteChild("song")
    try {
        const response = await fetch(`https://itunes.apple.com/search?term=${value}&entity=song`);
      
        if (response.ok) {
          const data = await response.json();
      
          console.log(data.results.length);
          if(data.results.length == 0) {
            /* Artist */
            const artist = document.getElementById('artist')
            const child = document.createElement('p')
            child.innerHTML = "No data"
            artist.appendChild(child)

            /* Song */
            const song = document.getElementById('song')
            const child_song = document.createElement('p')
            child_song.innerHTML = "No data"
            song.appendChild(child_song)
         }
          
          data.results.forEach(element => {
            /* Artist */
            const artist = document.getElementById('artist')
            const child = document.createElement('p')
            child.innerHTML = element.artistName
            artist.appendChild(child)

            /* Song */
            const song = document.getElementById('song')
            const child_song = document.createElement('p')
            child_song.innerHTML = element.trackCensoredName
            song.appendChild(child_song)

            
            
        })

        } else {
          throw new Error('Request failed!');
        }
        hideLoad()
      } catch (error) {
        console.log(error);
      }
}