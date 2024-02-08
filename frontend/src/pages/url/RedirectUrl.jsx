import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUrl } from './../../services/urlService'; // Import your apiService function
import './redirectUrl.css';
// import Nav from '../../components/Nav';

const RedirectPage = () => {
  const { shortUrl } = useParams();
  console.log('shortUrl:', shortUrl);
  const [password, setPassword] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUrl(shortUrl);
        setRedirectUrl(response.redirectUrl);
      } catch (error) {
        console.error('Error fetching URL:', error.message);
        setErrorMessage('Error fetching URL. Please try again.');
      }
    };

    fetchData();
  }, [shortUrl]);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await getUrl(shortUrl, password);
      setRedirectUrl(response.redirectUrl);
    } catch (error) {
      console.error('Error with password:', error.message);
      setErrorMessage('Incorrect password. Please try again.');
    }
  };

  useEffect(() => {
    // Redirect when redirectUrl is available
    //i dont know should redirect to the url or should i show with iframe?
    //if i show with i frame. i can't make the shortern url(image) show in the html or css but i can add some ads and something
    //i dont know what should i do and i need some information i will choose it when i writing this further.
    //i need to read the docs of react-router-dom when the more i know how can i do it, the more i get the useful ideas.
    // sate ku lay par pl dr ain mhat lay par pal ma kyar khin tway pyat tot ml ain mat lay yal. mhaw lint chat tway nat .sat pee a that shin khat. nga yl achit tot a console.log(HowMuchILove()) wow infinity?
    // it will be better if shew love me
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }, [redirectUrl]);

  return (
    <div className='redirectUrl-box'>
      {/* <Nav /> */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {!redirectUrl ? (
        <form onSubmit={handlePasswordSubmit} className='redirectUrl'>
          <ul>
            <li>
              <label>
                Password:
                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </li>
            <li>
              <button type='submit'>Submit Password</button>
            </li>
          </ul>
        </form>
      ) : (
        ''
      )}
    </div>
  );
};

export default RedirectPage;
