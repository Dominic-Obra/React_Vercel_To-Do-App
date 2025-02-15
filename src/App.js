import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from './components/Body';
import TodoList from './components/TodoList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/custom-scrollbar.css';
import './styles/modal.css';
import './styles/background.css';


function App() {
  return (
    <div className="d-flex flex-column min-vh-100 app-background">
      <div className="content-wrapper">
        <Header />
        <main className="flex-grow-1 d-flex justify-content-center align-items-center">
          <div className="w-75">
            <Body />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
