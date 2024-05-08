import { useState, useEffect } from "react";
import Slider from "react-slick";
import { Film } from "../../interface";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Section } from "./components/section";
import { TrendingHero } from "./components/trending-hero";
import RootLayout from "../../libs/providers/RootLayout";

const HomeScreen = () => {
  const [trendings, setTrendings] = useState<Film[]>([]);

  const fetchingTrending = () => {
    const arrs: Film[] = [];

    for (let i = 0; i < 6; i++) {
      arrs.push({
        id: i,
        title:
          "eqweeqewwwwwwqwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        description: "ewqqewqweqweeqqweewq",
        coverpath: "",
        genreIds: [1, 2, 3, 4, 5, 6],
        posterpath: "",
        seasons: [],
      });
    }

    setTrendings(arrs);
  };

  useEffect(() => {
    fetchingTrending();
  }, []);

  return (
    <RootLayout>
      {/* trending */}
      <Section>
        <Slider autoplay={true} slidesToShow={1} slidesToScroll={1}>
          {trendings.map((film, i) => (
            <TrendingHero film={film} key={i}></TrendingHero>
          ))}
        </Slider>
      </Section>
      {/* in the theatre */}
      {/* popular */}
      {/* top rated tv*/}
      {/* top rated movie*/}
    </RootLayout>
  );
};

export default HomeScreen;
