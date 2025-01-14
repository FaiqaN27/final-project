import Heading from '../../Shared/Heading/Heading'
import './About.css'

const About = () => {
    const teamData = [
        {
            id: 1,
            name: 'Sarah Jones',
            role: 'Founder & CEO',
            image: './Team/testy-2.jpg',
            description: "Sarah is a travel enthusiast with a passion for cultural immersion. With over 10 years of experience in the travel industry, she's explored every corner of the globe and loves sharing her expertise with others."
        },
        {
            id: 2,
            name: 'Emily Patel',
            role: 'Travel Designer',
            image: './Team/testy-5.jpg',
            description: "Emily is a skilled travel designer with a keen eye for detail. She crafts personalized itineraries that bring your travel dreams to life."
        },
        {
            id: 3,
            name: 'John Lee',
            role: 'Destination Expert - Asia',
            image: './Team/testy-1.jpg',
            description: "John has spent years living and traveling in Asia, discovering hidden gems and forging connections with local communities. He's your go-to expert for all things Asia."
        },
        {
            id: 4,
            name: 'Michael Kim',
            role: 'Local Expert - Europe',
            image: './Team/testy-3.jpg',
            description: "Michael is a native European with extensive knowledge of the continent's history, culture, and hidden treasures. He'll guide you through the best of Europe."
        },
        {
            id: 5,
            name: 'Albert Taylor',
            role: 'Customer Experience Manager',
            image: './Team/testy-4.jpg',
            description: "Albert is dedicated to ensuring your travel experience is seamless and unforgettable. He's always available to answer questions and provide support."
        },
    ]
    return (
        <>
            <Heading title="About Us" />

            {/* OurStory */}
            <section className="section py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 text-md-left">
                            <div className="about_content">
                                <h2 className="font-weight-bold mb-4 display-4">
                                    Our Story
                                </h2>
                                <p className='about_para'>
                                    <strong>TravelTrance</strong> was born out of a passion for exploration and a desire to share the beauty of the world with others. Our founders, avid travelers themselves, were frustrated with the lack of personalized travel experiences and set out to create a platform that would connect travelers with local experts and unique experiences. They scoured the globe, seeking out hidden gems and immersing themselves in different cultures. Through their journeys, they discovered the power of travel to transform lives and communities. And so, <strong>TravelTrance</strong> was born – a company dedicated to crafting unforgettable journeys that inspire and enable travelers to explore the world in a way that's authentic, immersive, and responsible.

                                </p>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12 text-center mt-5 mb-3 mb-lg-0">
                            <img className="img-fluid" src="./About/adv2.jpg" alt="our story" />
                        </div>
                    </div>
                </div>
            </section>

            {/* OurMission */}
            <section className="section py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 text-center mt-5 mb-3 mb-lg-0">
                            <img className="img-fluid" src="./About/abt2.jpg" alt="our mission" />
                        </div>
                        <div className="col-lg-6 col-md-12 text-md-left">
                            <div className="about_content">
                                <h2 className="font-weight-bold mb-4 display-4">
                                    Our Mission
                                </h2>
                                <p className='about_para'>
                                    At <strong>TravelTrance</strong>, our mission is to provide personalized travel experiences that exceed your expectations. We believe that travel should be a journey, not just a destination. That's why we're committed to helping you every step of the way, from planning to execution. Our values are rooted in personalization, authenticity, sustainability, and excellence. We believe every traveler is unique, and so are their needs. We strive to provide genuine, local experiences that showcase the true essence of each destination, while promoting responsible travel practices that benefit local communities and the environment.
                                    <br /><br />
                                    By joining us on this mission, you'll become part of a community that's passionate about exploring the world and making a positive impact. Let's travel with purpose and create a better world, one journey at a time.
                                </p>
                            </div>
                        </div>


                    </div>
                </div>
            </section>

            {/* WhoWeAre */}
            <section className="section py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 text-md-left">
                            <div className="about_content">
                                <h2 className="font-weight-bold mb-4 display-4">
                                    Who Are We
                                </h2>
                                <p className='about_para'>
                                    We're a team of passionate travelers, storytellers, and explorers who are dedicated to crafting unforgettable journeys. With years of combined experience in the travel industry, we're experts in creating personalized travel experiences that exceed our clients' expectations. Our team members have traveled to every corner of the globe, from the snow-capped mountains of New Zealand to the vibrant streets of India. We're a diverse group of individuals, united by our love of travel, our curiosity about the world, and our commitment to excellence. We're not just travel experts – we're fellow travelers who understand the thrill of discovery and the joy of connecting with new cultures.
                                </p>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12 text-center mt-5 mb-3 mb-lg-0">
                            <img className="img-fluid" src="./About/abt1.jpg" alt="who we are" />
                        </div>
                    </div>
                </div>
            </section>

            {/* MeetOurTeam */}
            <div className='container'>
                <div className="row">
                    <div className="col-lg-12 text-center mt-3">
                        <h2 className="font-weight-bold mb-4 display-4">
                            Meet Our Team
                        </h2>
                    </div>
                </div>
            </div>


            <div className='container mt-3 mb-5' >
                <div className="row d-flex justify-content-evenly align-items-center">
                    {teamData.map((team) => {
                        return (
                            <div className="col-lg-4 col-md-6 mb-2">
                                <img src={team.image} className="bd-placeholder-img rounded-circle" width="140" height="140" alt={team.name} />
                                <h2 className="fw-normal mt-2">{team.name}</h2>
                                <h5 className='fw-bold'>{team.role}</h5>
                                <p className='lead text-justify me-5'>{team.description}</p>
                            </div>
                        )
                    })}

                </div>
            </div>

        </>
    )
}

export default About;