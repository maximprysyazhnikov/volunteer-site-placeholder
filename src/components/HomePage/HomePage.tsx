import "./HomePage.scss"

export default function HomePage() {
  return (
    <div className="home__page">
      <div className="home">

        <div className="home__main">
          <div className="home__main__title">
            Find or provide humanitarian <br/> help — fast and safely
          </div>

          <div className="home__main__p">
            A volunteer coordination platform that connects people in need with verified 
            volunteers <br/> in one transparent system
          </div>
        </div>

        <div className="home__buttons">
          <div className="home__buttons__button button1">See Who Needs Help</div>
          <div className="home__buttons__button button2">See Available Help</div>
        </div>
      </div>

      <div className="home-instructions">

        <div className="home-instructions__main">
          <div className="home-instructions__main__title">How It Works</div>

          <div className="home-instructions__main__p">Humanitarian help coordination step by step</div>
        </div>

        <div className="home-instructions__blocks">

          <div className="home-instructions__blocks__block">
            <div className="home-instructions__blocks__block__title">Create a Request or Offer Help</div>

            <div className="home-instructions__blocks__block__p">
              Submit a request for humanitarian help or offer volunteer support in minutes
            </div>
          </div>

          <div className="home-instructions__blocks__block">
            <div className="home-instructions__blocks__block__title">Review & Match</div>

            <div className="home-instructions__blocks__block__p">
              Volunteers review requests and choose how they can help
            </div>
          </div>

          <div className="home-instructions__blocks__block">
            <div className="home-instructions__blocks__block__title">Coordinate Safely</div>

            <div className="home-instructions__blocks__block__p">
              Communicate details and track request status in one place
            </div>
          </div>

          <div className="home-instructions__blocks__block">
            <div className="home-instructions__blocks__block__title">Deliver Help</div>

            <div className="home-instructions__blocks__block__p">
              Help is delivered with clear updates for everyone involved
            </div>
          </div>
        </div>
      </div>

      <div className="home-description">
        <p className="home-description__title">Who is Wings of Help for</p>

        <div className="home-description__blocks">

          <div className="home-description__blocks__block">
            <div className="home-description__blocks__block__title">People who need help</div>

            <div className="home-description__blocks__block__p">
              Find trusted assistance <br/>
              Track request status <br/>
              Avoid unverified offers
            </div>
          </div>

          <div className="home-description__blocks__block">
            <div className="home-description__blocks__block__title">Volunteers & Organizations</div>

            <div className="home-description__blocks__block__p">
              Find real requests <br/>
              Coordinate help
            </div>
          </div>
        </div>
      </div>

      <div className="home-active-requests">

        <div className="home-active-requests__main">
          
          <div className="home-active-requests__main__title">Active Requests</div>

          <div className="home-active-requests__main__p">
            Browse verified requests from people and organizations who need support right now. <br/>
            Every response matters.
          </div>
        </div>

        <div className="home-active-requests__blocks">

          <div className="home-active-requests__blocks__block">
            <div className="home-active-requests__blocks__block__photo"></div>

            <div className="home-active-requests__blocks__block__title">
              Food & Hygiene Supplies Needed for IDP Family
            </div>

            <div className="home-active-requests__blocks__block__p">
              Two elderly people need transportation
              from Kharkiv to Poltava. Limited mobility,
              minimal luggage. Evacuation required
              within 24 hours.
            </div>

            <div className="home-active-requests__blocks__block__bottom">
              <p className="home-active-requests__blocks__block__bottom__city">Lviv</p>
              <p className="home-active-requests__blocks__block__bottom__category">Logistics</p>
            </div>
          </div>

          <div className="home-active-requests__blocks__block">
            <div className="home-active-requests__blocks__block__photo"></div>

            <div className="home-active-requests__blocks__block__title">
              Food & Hygiene Supplies Needed for IDP Family
            </div>

            <div className="home-active-requests__blocks__block__p">
              Two elderly people need transportation
              from Kharkiv to Poltava. Limited mobility,
              minimal luggage. Evacuation required
              within 24 hours.
            </div>

            <div className="home-active-requests__blocks__block__bottom">
              <p className="home-active-requests__blocks__block__bottom__city">Lviv</p>
              <p className="home-active-requests__blocks__block__bottom__category">Logistics</p>
            </div>
          </div>

          <div className="home-active-requests__blocks__block">
            <div className="home-active-requests__blocks__block__photo"></div>

            <div className="home-active-requests__blocks__block__title">
              Food & Hygiene Supplies Needed for IDP Family
            </div>

            <div className="home-active-requests__blocks__block__p">
              Two elderly people need transportation
              from Kharkiv to Poltava. Limited mobility,
              minimal luggage. Evacuation required
              within 24 hours.
            </div>

            <div className="home-active-requests__blocks__block__bottom">
              <p className="home-active-requests__blocks__block__bottom__city">Lviv</p>
              <p className="home-active-requests__blocks__block__bottom__category">Logistics</p>
            </div>
          </div>
          
        </div>

        <div className="home-active-requests__see-all">
          <p className="home-active-requests__see-all__p">See All Requests</p>
          <img 
            src="/images/ui/ph_arrow-right-light.png" 
            alt="arrow-right-button" 
            className="home-active-requests__see-all__button" 
          />
        </div>
      </div>
    </div>
  )
}