import Hero from './components/Hero'
import About from './components/About'
import BookingForm from './components/BookingForm'
import Services from './components/Services'
import WhyChooseUs from './components/WhyChooseUs'
import Contact from './components/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <BookingForm />
      <Services />
      <WhyChooseUs />
      <Contact />
    </main>
  )
}
