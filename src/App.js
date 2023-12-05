import './App.css';
import Sidebar from './Components/Sidebar';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Reports from './pages/Reports';
import Product from './pages/Product';



function App() {
  return (
   <>
     <Router>
       <Sidebar/>
        <Routes>
          <Route path='/' exact component={Home} />
          <Route path='/reports' component={Reports} />
          <Route path='/product' component={Product} />
        </Routes>
      </Router>
   </>
  );
}

export default App;
