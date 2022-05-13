import { useEffect } from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { ThemeProvider, Nav } from 'react-bootstrap';
import { store } from './store';
import { Todos } from './components/Todos';
import { Counter } from './components/Counter';
import { ModalProvider } from './components/Modal';

import 'bootstrap/dist/css/bootstrap.min.css';

const Base = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/counter');
  }, [navigate]);

  return null;
};

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="p-3 flex items-center justify-between">
      <p className="text-3xl font-600">Redux-Saga</p>
      <Nav
        variant="pills"
        activeKey={location.pathname}
        onSelect={(key: string | null) => {
          if (key) {
            navigate(key);
          }
        }}
      >
        <Nav.Item key="/todos">
          <Nav.Link eventKey="/todos">Todos</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/counter">Counter</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <Header />
          <div className="pt-4 px-5">
            <Routes location={window.location}>
              <Route path="/todos" element={<Todos />} />
              <Route path="/counter" element={<Counter />} />
              <Route path="*" element={<Base />} />
            </Routes>
          </div>
          <ModalProvider />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
