import { useState, useEffect } from "react";
import Slider from "react-slick";
import { Film } from "../../interface";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Section } from "./components/section";
import { TrendingHero } from "./components/trending-hero";
import RootLayout from "../../libs/providers/RootLayout";
import { Card } from "./components/card";
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "../../libs/api/api";


const HomeScreen = () => {
  const navigate = useNavigate();
  const [trendings, setTrendings] = useState<Film[]>([]);
  const [inTheaters, setInTheaters] = useState<Film[]>([]);

  const fetch = () => {
    const arrs: Film[] = [];

    for (let i = 0; i < 10; i++) {
      arrs.push({
        id: i,
        mediaType:'tv',
        title: "Pulp Fiction (1994) R | 154 min | Crime, Drama.",
        description: "A film synopsis is typically a one-page document that summarizes your film...",
        coverpath: "path_to_default_cover_image",
        genreIds: [1, 2, 3, 4, 5, 6],
        posterpath: "path_to_default_poster_image",
        seasons: [],
      });
    }

    setTrendings(arrs);
    setInTheaters(arrs);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <RootLayout>
      <>
           {/* Trending */}
      <Section >
        <Slider autoplay={true} slidesToShow={1} slidesToScroll={1} className="slick-hero">
          {trendings.map((film) => (
            <TrendingHero 
              onPlayTrailer={() => {}}
                onClick={() =>
                   navigate(`/${film  .mediaType}/${film.id}`)
                }
            film={film} key={film.id}></TrendingHero>
          ))}
        </Slider>
      </Section>
        {/* In Theater */}
      <Section title="In Theatre" >
        <Slider autoplay={true} slidesToShow={8} slidesToScroll={1} className="w-[100%]">
          {inTheaters.map((film) => (
            <Card title={film.title} key={film.id} imageSrc=""></Card>
          ))
          
          }
        </Slider>
      </Section>
      </>
    </RootLayout>


  );
};

export default HomeScreen;
