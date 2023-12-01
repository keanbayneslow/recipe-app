import { useEffect, useState } from "react";
import styled from "styled-components";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

function Vege() {
  const [vege, setVege] = useState([]);

  useEffect(() => {
    getVege();
  }, []);

  const getVege = async () => {

const check = localStorage.getItem("vege"); 

if(check){
  setVege(JSON.parse(check));
} else {
  const api = await fetch(
    `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=8&tags=vegetarian`
  );
  const data = await api.json();
  localStorage.setItem("vege", JSON.stringify(data.recipes));
  setVege(data.recipes);
}
  };

  return (
    <div>
      <Wrapper>
        <h3>Vegetarian Dishes</h3>
        <Splide options={{
          perPage: 3,
          arrows: false,
          pagination: false, 
          drag:"free",
          gap:"5rem"
        }}>
        {vege.map((recipe) => (
          <SplideSlide>
          <Card key={recipe.id}>
            <p>{recipe.title}</p>
            <img src={recipe.image} alt={recipe.title} />
            <Gradient />
          </Card>
          </SplideSlide>
        ))}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute; 
    left: 0;
    width: 100%; 
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute; 
    z-index: 10; 
    left: 50%; 
    bottom: 0%; 
    transform: translate(-50%, 0%);
    color: white; 
    width: 100%; 
    text-align: center;
    font-weight: 600;
    font-size: 1rem; 
    height: 40%; 
    display: flex;
    justify-content: center;
    align-items: center; 
  }
`;

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%; 
    height: 100%; 
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9));`

export default Vege;
