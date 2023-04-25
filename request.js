const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = 'd76a579650196731cc5b4bbd08aec5ff';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });
        function decodeText(){
            var text = document.getElementsByClassName('decode-text')[0];
            // debug with
            // console.log(text, text.children.length);
        
            // assign the placeholder array its places
            var state = [];
            for(var i = 0, j = text.children.length; i < j; i++ ){
                text.children[i].classList.remove('state-1','state-2','state-3');
                state[i] = i;
            }
        
            // shuffle the array to get new sequences each time
            var shuffled = shuffle(state);
         
            for(var i = 0, j = shuffled.length; i < j; i++ ){
                var child = text.children[shuffled[i]];
                classes = child.classList;
        
                // fire the first one at random times
                var state1Time = Math.round( Math.random() * (2000 - 300) ) + 50;
                if(classes.contains('text-animation')){ 
                    setTimeout(firstStages.bind(null, child), state1Time);
                }
            }
        }
        
        // send the node for later .state changes
        function firstStages(child){
            if( child.classList.contains('state-2') ){   
                child.classList.add('state-3');
            } else if( child.classList.contains('state-1') ){
                child.classList.add('state-2')
            } else if( !child.classList.contains('state-1') ){
                child.classList.add('state-1');
                setTimeout(secondStages.bind(null, child), 100);
            }    
        }
        function secondStages(child){
            if( child.classList.contains('state-1') ){
                child.classList.add('state-2')
                setTimeout(thirdStages.bind(null, child), 100);
            } 
            else if( !child.classList.contains('state-1') )
            {
                child.classList.add('state-1')
            }
        }
        function thirdStages(child){
            if( child.classList.contains('state-2') ){
                child.classList.add('state-3')
            }
        }
        
        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;
        
            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
        
                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }
        
        
        // Demo only stuff
        decodeText();
        
        // beware: refresh button can overlap this timer and cause state mixups
        setInterval(function(){ decodeText(); }, 10000);
        

});