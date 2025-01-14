import BgImage from "./01_BgImage/BgImage"
import SearchBar from "./03_SearchBar/SearchBar"
import DestinationCards from "./04_Destinations/DestinationCards"
import TextDiv from "./05_TextDiv/TextDiv"
import TourList from "./06_TourDetails/TourList"
import FixedImage from "./07_FixedImg/FixedImage"
import SwiperCarousel from "./08_Gallery/SwiperCarousel"
import About from "./08_About/About"
import Newsletter from "./09_Newsletter/Newsletter"
import HeroSection from "./02_HeroSection/HeroSection"

const Home = () => {
    return (
        <>

            <BgImage />
            <HeroSection />
            <SearchBar />
            <DestinationCards />
            <TextDiv />
            <TourList />
            <FixedImage />
            <SwiperCarousel />
            <Newsletter />
            <About />


        </>
    )
}

export default Home
