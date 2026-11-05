import HeroWrapper from "./components/hero-wrapper"
import AboutWrapper from "./components/about-wrapper"
import TitleSectionWrapper from "./components/title-section-wrapper"
import NewsWrapper from "./components/news-wrapper"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroWrapper />
      <AboutWrapper />
      <TitleSectionWrapper />
      <NewsWrapper />
    </main>
  )
}
