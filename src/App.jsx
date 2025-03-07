import React  from 'react';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import SearchBar from './Components/SearchBar/SearchBar';
import Card from './Components/Card/CardList';
import About from './Components/About/About';
import Statistiques from './Components/Statistiques/Statistiques';
import Avis from './Components/Avis/Avis';
import Slides from './Components/Avis/Slides';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';


const App = () => {
  return (
    <div>
    <Navbar/>
    <Hero/>
    <SearchBar/>
    <About/>
    <Card/>
    <Statistiques/>
    <Slides/>
    <Contact/>
    <Footer/>
    
    </div>
  )
}
export default App;
