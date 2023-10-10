import './styles/App.css';
import './variable.css';
import TopBar from './components/TopBar';
import MainContent from './components/MainContent';
function App() {
  return (
    <>
      <div className="top-bar">
        <TopBar/>
      </div>
      <div className="main-content">
        <MainContent/>
      </div>

    </>
  );
}

export default App;
