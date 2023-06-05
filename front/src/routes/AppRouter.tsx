import { Navigate, Route, Routes } from 'react-router-dom';
import Connection from '../pages/Connection';
import Register from '../pages/Register';



const AppRouter = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Connection />} />
      <Route path="/register" element={<Register />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </>
  )
}

export default AppRouter;
