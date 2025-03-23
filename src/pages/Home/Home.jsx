import React from 'react';
import Navbar from "../../layouts/Navbar/Navbar";
import Hero from '../../Components/Hero/Hero';
import SearchBar from '../../Components/SearchBar/SearchBar';
import Card from '../../Components/Card/CardList';
import About from '../../Components/About/About';
import Statistiques from '../../Components/Statistiques/Statistiques';
import Slides from '../../Components/Avis/Slides';
import Contact from '../../Components/Contact/Contact';
import Footer from '../../layouts/Footer/Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <SearchBar />
      <About />
      <Card />
      <Statistiques />
      <Slides />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;