import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Nav from './nav';
import ShortenUrlApp from './pages/url/Url';
import Dash from './dashboard/dashboard';
import {
  Register,
  Home,
  EmailVerification,
  Login,
  Logout,
  ForgotPassword,
  ResetPassword,
  ChangePassword,
} from './pages/auth/index';
import { FileUploadPage, FileDownloadPage } from './pages/file/index';
import { Url, RedirectPage } from './pages/url/index';
import { Dhost } from './pages/host/index';
import { AboutUs } from './pages/aboutUs/index';
import ViewHost from './pages/host/ViewHost';
import NotFound from './pages/error/NotFound';
import AdminUploading from './pages/Admin/AdminUploading';
import SendExamResult from './pages/Admin/SendExamResult';
import LogoutAllDevice from './pages/auth/LogoutAllDevice';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<ViewHost />} />
          <Route path='/home' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/verify-email/:token' element={<EmailVerification />} />
          <Route path='/change-password' element={<ChangePassword />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/logout-all-device' element={<LogoutAllDevice />} />
          <Route path='/AdminUpload' element={<AdminUploading />} />
          <Route path='/sendEmail' element={<SendExamResult />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
          <Route path='/url' element={<Url />} />
          <Route path='/url/:shortUrl' element={<RedirectPage />} />
          <Route path='/file/:shortId' element={<FileDownloadPage />} />
          <Route path='/dashboard/*' element={<Dash />}>
            <Route path='url' element={<ShortenUrlApp />} />
            <Route path='host' element={<Dhost />} />
            <Route path='files' element={<FileUploadPage />} />
            <Route path='sendInfo' element={<AdminUploading />} />
            <Route path='*' element={<FileUploadPage />} />{' '}
            {/* Default to files */}
          </Route>
          <Route path='*' element={<NotFound />} />{' '}
          {/* Catch-all route at the end */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
