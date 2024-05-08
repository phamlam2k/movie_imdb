import { useState, useEffect } from "react";
import Slider from "react-slick";
import { Film } from "../../interface";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Section } from "./components/section";
import { TrendingHero } from "./components/trending-hero";
import RootLayout from "../../libs/providers/RootLayout";
import { Card } from "./components/card";

const HomeScreen = () => {
  const [trendings, setTrendings] = useState<Film[]>([]);
  const [inTheaters, setInTheaters] = useState<Film[]>([]);

  const fetch = () => {
    const arrs: Film[] = [];

    for (let i = 0; i < 10; i++) {
      arrs.push({
        id: i,
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
      <Section>
        <Slider autoplay={true} slidesToShow={1} slidesToScroll={1}>
          {trendings.map((film) => (
            <TrendingHero film={film} key={film.id}></TrendingHero>
          ))}
        </Slider>
      </Section>

      <Section title="In Theater">
        <Slider autoplay={true} slidesToShow={8} slidesToScroll={1}>
          {inTheaters.map((film) => (
            <Card film={film} key={film.id}></Card>
          ))}
        </Slider>
      </Section>
      </>
    </RootLayout>
  );
};

export default HomeScreen;
