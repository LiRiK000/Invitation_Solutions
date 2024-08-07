import './App.css';

import { Header } from './components/Header/Header';
import { TableComponent } from './components/Table/Table';

function App() {
    return (
        <>
            <Header />
            <TableComponent />
            {/* <div
                style={{
                    marginTop: '60px',
                    fontSize: '24px',
                    fontWeight: 'normal',
                    textAlign: 'center',
                    letterSpacing: '0.1px',
                    padding: '20px',
                    color: '4f4f4f',
                }}
            >
                Добро пожаловать!
            </div> */}
        </>
    );
}

export default App;
