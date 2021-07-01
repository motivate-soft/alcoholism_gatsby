import React from "react"
import NotepadIcon from "../../assets/Icons/notepad.svg"
import PhoneActionsIcon from "../../assets/Icons/phone-actions-menu.svg"
import DisplayIcon from "../../assets/Icons/display.svg"

export default function HomeFeatureNetwork() {
  return (
    <section className="home-feature home-feature--network">
      <div className="container">
        <span className="badge">OUR FEATURES</span>
        <h2>Our Network is Different</h2>
        <div className="row">
          <div className="col-lg-4 col-sm-6 home-feature__item">
            <div className="home-feature__icon">
              <NotepadIcon />
            </div>
            <h4>Dedicated.</h4>
            <p>Recovery Centers thath have dedicated Alcoholism programs</p>
          </div>
          <div className="col-lg-4 col-sm-6 home-feature__item">
            <div className="home-feature__icon">
              <PhoneActionsIcon />
            </div>
            <h4>Vetted network.</h4>
            <p>We call and verify information directly.</p>
          </div>
          <div className="col-lg-4 col-sm-6 home-feature__item">
            <div className="home-feature__icon">
              <DisplayIcon />
            </div>
            <h4>Rich information.</h4>
            <p>
              We include information on facilities, certifications, reviews, and
              more.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
