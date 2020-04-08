import React, { useState } from 'react';
import YouTube from 'react-youtube';
import './App.css';

function App() {

    const opts = {
      height: '503',
      width: '780',
    };

    const [comida, setComida] = useState();

async function buscar(){
    await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((response) => response.json())
    .then((meals) => {
        setComida({name: meals.meals[0].strMeal,
                instructions: meals.meals[0].strInstructions,
                video: meals.meals[0].strYoutube.slice(32),
                photo: meals.meals[0].strMealThumb
            })
    })
}
  return (
    <>
    <div className='div-button'>
        <button onClick={() => buscar()}> Gerar receita aleatória </button>
    </div>
    {
    comida ?
    <div className='geral'>
        <div className='dados'>
            <p>{comida.name}</p>
            <p>{comida.instructions}</p>
        </div>
        <div className='medias'>
            <img className='recipe-image'src={comida.photo} alt='Recipe image'></img>
            <YouTube className='video' videoId={comida.video}opts={opts}/>
        </div>
    </div>
    :
    null
    }
    </>
  );
}

export default App;
