import { Link } from "react-router-dom";
import './Footer.css'
import { CiPhone } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { CgMail } from "react-icons/cg";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";


const Footer = () => {
  return (
    <section className="section-no-border mt-3">
      {/* Footer */}
      <footer
        className="page-footer mdb-color pt-4 footer_container"
        style={{ paddingLeft: "0px" }}
      >
        {/* Footer Links */}
        <div className="container text-center text-md-left">
          {/* Footer links */}
          <div className="row text-center text-md-left mt-3 pb-3">
            {/* Grid column */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h1 className="mb-4 text-black footer_heading">
                <span style={{
                  color: "black",
                  letterSpacing: '0.3rem',
                  fontFamily: "Kaushan Script"
                }}>Travel</span>
                <span style={{
                  color: "#0097A7",
                  letterSpacing: '0.3rem',
                  fontFamily: "Kaushan Script"
                }}>Trance</span>
              </h1>
              <p className="text-black footer_para">
                Escape the ordinary,
                <br />Explore the extraordinary
              </p>
              <ul className='footer_social_media'>
                <li className='footer_fb'><a href=''><FaFacebookSquare /></a></li>
                <li className='footer_insta'><a href=''><FaInstagramSquare /></a></li>
                <li className='footer_x'><a href=''><FaSquareXTwitter /></a></li>
                <li className='footer_yt'><a href=''><FaYoutube /></a></li>
                <li className='footer_linkedin'><a href=''><FaLinkedin /></a></li>
              </ul>
            </div>
            {/* Grid column */}

            <hr className="w-100 clearfix d-md-none" />

            {/* Grid column */}
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 text-black footer_h6">
                Support
              </h6>
              <p>
                <Link to="/about" className="text-black footer_para_text">
                  About Us
                </Link>
              </p>
              <p>
                <Link to="/tour" className="text-black footer_para_text">
                  Tours Packages
                </Link>
              </p>
              <p>
                <Link to="/gallery" className="text-black footer_para_text">
                  Gallery
                </Link>
              </p>
              <p>
                <Link to="/contact" className="text-black footer_para_text">
                  Contact
                </Link>
              </p>

            </div>
            {/* Grid column */}

            <hr className="w-100 clearfix d-md-none " />

            {/* Grid column */}
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold text-black footer_h6">
                Useful links
              </h6>
              <p>
                <Link to="/policy" className="text-black footer_para_text">
                  Privacy Policy
                </Link>
              </p>
              <p>
                <Link to="/terms" className="text-black footer_para_text">
                  Terms & Conditions
                </Link>
              </p>
            </div>

            {/* Grid column */}
            <hr className="w-100 clearfix d-md-none" />


            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold text-black footer_h6">
                Contact
              </h6>
              <p className="text-black footer_para_text">
                <span className='footer_icon'><CiLocationOn /></span>Travel Trance, Islamabad <br /> PAKISTAN
              </p>
              <p className="text-black footer_para_text">
                <span className='footer_icon'><CgMail /></span>
                <a className="footer_para_text" href='mailto: support@traveltrance.com'>support@traveltrance.com</a>
              </p>
              <p className="text-black">
                <span className="footer_icon"><CiPhone /></span>
                <a className="footer_para_text" href='tel: +92 333 217 8922'>+92 333 217 8922</a>
              </p>
            </div>
          </div>

          <hr />

          {/*Copyright*/}
          <div className="row d-flex align-items-center">
            <p className="text-center text-md-left footer_copyright">
              © 2024 Copyright, Designed & Developed By Travel Trance
            </p>
          </div>

        </div>
      </footer>
      {/* Footer */}
    </section>
  );
};

export default Footer;
