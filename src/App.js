import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Routes, NavLink } from 'react-router-dom'
import { Home } from './pages/home';
import { BoardList } from './pages/board-list.jsx';
import { Board } from './pages/board-details';
import { Login } from './pages/login.jsx';
import { SignUp } from './pages/signup.jsx';
import { AppHeader } from './cmps/app-header.jsx';
import { TaskDetails } from './cmps/task-details.jsx';
import './styles/main.scss';
import { Avatar } from './pages/avatar.jsx'
import { socketService } from './services/socket.service';
import { DashBoard } from './pages/dashBoard';

function App() {
  useEffect(() => {
    console.log('setup');
    return () => {
      // socketService.terminate()
    }
  }, [])

  return (
    <Router>
      <header>
        <AppHeader />
      </header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/boards' element={<BoardList />} />
        <Route path='/b/:boardId' element={<Board />}  >
          <Route path='task/:taskId' element={<TaskDetails />} />
          <Route path='dashboard/:boardId' element={<DashBoard/>}/>
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/avatar' element={<Avatar />} />
        {/* <Route path='/testarea' element={<  />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
