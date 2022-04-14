import React from 'react';

const Home = () => {
  return (
    <div style={{ textAlign: 'left' }}>
      <h2 id="what-is-it">What is it?</h2>
      <p>
        An editor for creating and updating <a href="https://jsonresume.org/">JSON Resume</a> files
      </p>
      <h3 id="why">Why?</h3>
      <ol>
        <li>
          Provide an easy interface to creating and updating JSON Resume files. Working with raw JSON files is not
          difficult, but it&#39;s also not fun. This editor makes life easy.
        </li>
        <li>To act as application for ArcBlock HackWeek 2022.04 </li>
      </ol>
    </div>
  );
};

export default Home;
