import { Helmet } from 'react-helmet-async'
import BannerSlider from '../../../components/HomeComponents/BannerSlider'
import IconSection from '../../../components/HomeComponents/IconSection'
import EventSlider from '../../../components/HomeComponents/EventSlider'
import BookSection from '../../../components/HomeComponents/BookSection'
import FaqSection from '../../../components/HomeComponents/FaqSection'
import EmailSection from '../../../components/HomeComponents/EmailSection'
import Heading from '../../../components/Shared/Heading'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>TalentGrow Academy | Empowering careers, one step at a time.</title>
      </Helmet>

      {/* Banner Section */}
      <BannerSlider />

      {/* Icon Section */}
      <IconSection />

      {/* Upcoming Events Section */}
      <EventSlider />

      {/* Book Section */}
      <Heading title='E-Book Library' />
      <BookSection />

      {/* FAQ section */}
      <FaqSection />

      {/* ContactMail */}
      <EmailSection />

    </div>
  )
}

export default Home
