import './textDiv.css';
import { TbAirBalloon } from "react-icons/tb";
import { SiRoamresearch } from "react-icons/si";
import { FaFlag } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";

const TextDiv = () => {
    const textData = [
        {
            "id": 1,
            title: 'Amazing Travel',
            icon: <TbAirBalloon />,
            description: 'Embark on a journey where every step unfolds a new adventure.'
        },
        {
            "id": 2,
            title: 'Discover',
            icon: <SiRoamresearch />,
            description: "Discover the world's hidden gems with our exceptional travel experiences."
        },
        {
            "id": 3,
            title: 'Book Your Trip',
            icon: <FaFlag />,
            description: "Ready to escape? Book your trip and let the adventure begin!"
        },
        {
            "id": 4,
            title: 'Nice Support',
            icon: <AiOutlineComment />,
            description: "From start to finish, expect nothing but top-notch support from our team"
        }
    ]
    return (
        <>
            <div className='container'>
                <div className='container text_con'>
                    <h2 className='main_heading'>WHY WE ARE THE BEST</h2>
                    <p className='text_para'>Explore beyond the ordinary with our curated journeys, where every destination is a <br />discovery waiting to happen.</p>
                </div>

                <div className='container'>
                    <div className="row">
                        {textData.map((text) => {
                            return (<div className="col-lg-3 col-md-6 Icon" key={text.id}><span>{text.icon}</span>
                                <p className='Icon_text'>{text.title}</p>
                                <p className='text_para'>{text.description}</p>
                            </div>)
                        })}

                    </div>
                </div>
            </div>
        </>
    )
}

export default TextDiv;