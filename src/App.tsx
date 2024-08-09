import './App.css';

import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { TableComponent } from './components/Table/Table';
import { useState } from 'react';

function App() {
  const [searchText, setSearchText] = useState('');

  return (
    <>
      <Header onSearch={setSearchText} />
      <main>
        {searchText ? <TableComponent searchText={searchText} /> : <Hero />}
      </main>
    </>
  );
}

export default App;
