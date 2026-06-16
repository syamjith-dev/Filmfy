import Banner from '../Components/Banner/Banner';
import NavBar from '../Components/NavBar/NavBar';
import RowCards from '../Components/RowCards/RowCards';
import VideoPlayer from '../Components/VideoPlayer/VideoPlayer';
import Footer from '../Components/footer/footer';
import { TopRated, ActionMovies, ThrillerMovies, HorrorMovies } from '../MovieUrl/MovieUrl';
import './Home.css';


function Home() {
  return (
    <>
      <NavBar />

      <Banner
        url={TopRated}
        bannerUrl={TopRated}
        tittle="🔥Trending Now"
      />

      <RowCards
        url={ActionMovies}
        tittle="⭐ Top Rated Malayalam"
      />

      <RowCards
        url={ThrillerMovies}
        tittle="🔪 Thriller Collection"
      />

      <RowCards
        url={HorrorMovies}
        tittle="👻 Horror Nights"
      />

      <Footer />


      <VideoPlayer />
    </>
  );
}

export default Home;