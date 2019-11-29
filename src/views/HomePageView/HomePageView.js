import React from 'react';

// Components
import Header from '../../components/complex/Header/Header';
import Footer from '../../components/complex/Footer/Footer';
import LatterCompositionsView from '../LatterCompositionsView/LatterCompositionsView';
import ContactView from '../ContactView/ContactView';

const HomePageView = () => {
  return (
    <>
      <Header isHomePage />
      <section>
        <LatterCompositionsView />
        <ContactView />
      </section>
      <Footer />
    </>
  );
};

export default HomePageView;
