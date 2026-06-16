import React from "react";
import "./footer.css";


function Footer() {
    return (
        <footer className="footer">

            <div className="footer-top">

                <div className="footer-brand">
                    <h2 className="footer-logo">
                        F<span>ilmFy</span>
                    </h2>
                    <p>Movies • Shows • Endless Entertainment</p>
                </div>

                <div className="footer-links">
                    <h4>Explore</h4>

                    <a href="/">Home</a>
                    <a href="/">Movies</a>
                    <a href="/">TV Shows</a>
                    <a href="/watchlist">My List</a>
                </div>

                <div className="footer-links">
                    <h4>Company</h4>

                    <a href="/">About Us</a>
                    <a href="/">Contact</a>
                    <a href="/">Privacy Policy</a>
                    <a href="/">Terms</a>
                </div>

                <div className="footer-social">

                    <h4>Follow Us</h4>

                    <div className="social-icons">
                    </div>

                </div>

            </div>

            <div className="footer-bottom">
                © 2026 CineVerse. All Rights Reserved.
            </div>

        </footer>
    );
}

export default Footer;
