let body = document.body
let header = document.querySelector('header')
let regions = document.querySelector('.regions')
let details = document.querySelector('.details')
let back = document.querySelector('#back').addEventListener('click', ()=>{
    details.style.display = 'none'
    countrys.style.display = 'grid'
    details.querySelector('.border-countries').innerHTML = '<h3>Border Countries:</h3>'
    
})
let countrys = document.querySelector('#countrys')
let countryDiv ,json , newCountry;


document.querySelector('#search-countrys').addEventListener('keydown', (e)=>{
    let value = document.querySelector('#search-countrys').value.toLowerCase()
    if(e.key == 'Enter'){
        console.log(value)
        json.forEach(item=>{
            let name = item.translations;
            for(let x in name){
                
                if(name[x].toLowerCase() == value){
                    countrys.innerHTML = ''
                    countryDiv.innerHTML = `<img src = ${item.flags.png}>
                    <div class = infos>
                    <h3 class = 'country-name'>${item.name}</h3>
                    <p class = 'population'>Population: <span>${item.population.toLocaleString({minimumFractionDigits: 0})}</span></p>
                    <p class = 'region'>Region: <span>${item.region}</span></p>
                    <p class = 'capital'>Capital: <span>${item.capital}</span></p>
                    </div>
                    `
                    countrys.appendChild(countryDiv)

                }
            }
           
        })
    }
})

//Functions

function darkMode(){
    if(body.classList.contains('white-main')){
        body.classList.remove('white-main')
        body.classList.add('dark-main')
    }else{
        body.classList.remove('dark-main')
        body.classList.add('white-main')
    }
    
    if(header.classList.contains('white-header')){
        header.classList.remove('white-header')
        header.classList.add('dark-header')
    }else{
        header.classList.remove('dark-header')
        header.classList.add('white-header')
    }
}

function showRegions(){
    if(regions.classList.contains('show')){
        regions.classList.remove('show')
        regions.querySelectorAll('p').forEach(item=>{
            item.style.display = 'none'
        })
        setTimeout(()=>{
            regions.style.display = 'none'
        },50)
    }else{
        regions.style.display = 'flex'
        setTimeout(()=>{
            regions.classList.add('show')
            regions.querySelectorAll('p').forEach(item=>{
                item.style.display = 'block'
            })
        },1)
    }
}

async function countryJson(){
    
    let url = `/assets/json/data.json`
    let response = await fetch(url)
    json = await response.json()
    json.forEach(item =>{
        countryDiv = document.createElement('div')
        countryDiv.classList.add('country')
        countryDiv.innerHTML = `
        <img src = ${item.flags.png}>
        <div class = infos>
        <h3 class = 'country-name'>${item.name}</h3>
        <p class = 'population'>Population: <span>${item.population.toLocaleString({minimumFractionDigits: 0})}</span></p>
        <p class = 'region'>Region: <span>${item.region}</span></p>
        <p class = 'capital'>Capital: <span>${item.capital}</span></p>
        </div>
        `
        countrys.appendChild(countryDiv)
        
        countryDiv.addEventListener('click', (e)=>{
            showDetails(e)
        })
    })
}

document.querySelectorAll('.regions p').forEach(region =>{
    region.addEventListener('click', (e)=>{
        countrys.innerHTML = ''
        json.forEach(item=>{
            if(e.target.id == item.region){
                newCountry = document.createElement('div')
                newCountry.classList.add('country')
                newCountry.innerHTML = `
                <img src = ${item.flags.png}>
                <div class = infos>
                <h3 class = 'country-name'>${item.name}</h3>
                <p class = 'population'>Population: <span>${item.population.toLocaleString({minimumFractionDigits: 0})}</span></p>
                <p class = 'region'>Region: <span>${item.region}</span></p>
                <p class = 'capital'>Capital: <span>${item.capital}</span></p>
                </div>
                `
                countrys.appendChild(newCountry)
                newCountry.addEventListener('click', (e)=>{
                    showDetails(e)
                })
            }
        })
    })
})

function showDetails(e){
   details.style.display = 'block'
   countrys.style.display = 'none'
   let countryName = e.currentTarget.querySelector('h3').innerHTML

   json.forEach(item=>{
       if(countryName == item.name){
            let i = item.lenght
            console.log(item)
            details.querySelector('img').src = item.flags.png
            details.querySelector('h2').innerHTML = item.name
            details.querySelector('.infos-l').innerHTML = `<p>Native Name: <span>${item.nativeName}</span></p><p>Population : <span>${item.population.toLocaleString({minimumFractionDigits: 0})}</span></p><p>Region: <span>${item.region}</span></p><p>Sub-Region: <span>${item.subregion}</span></p><p>Capital: <span>${item.capital}</span></p>`
            /////////////
            console.log(item)
            let topLevelDomain = []
            for(let i in item.topLevelDomain){
                topLevelDomain.push(item.topLevelDomain[i])
                let joinTopLevel = topLevelDomain.join(', ')
                details.querySelector('#top-level-domain').innerHTML = joinTopLevel 
            }
            let currencies = []
            for(let i in item.currencies){
                currencies.push(item.currencies[i].code)
                let joinCurrencies = currencies.join(', ')
                
                details.querySelector('#currencies').innerHTML = joinCurrencies
            }
            let names = []
            for(let i in item.languages){
                names.push(item.languages[i].name)
                let joinNames = names.join(', ')
                details.querySelector('#languages').innerHTML = joinNames
            }
            for(let i in item.borders){
                let p = document.createElement('p')
                p.classList.add('countries')
                p.innerHTML = item.borders[i]
                details.querySelector('.border-countries').appendChild(p)
            }
            
       }
   })
}

countryJson()


