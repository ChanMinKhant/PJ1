import { useState, useEffect } from 'react';
import { Resizable } from 'react-resizable';
import {
  createShortenUrl,
  getAllUrls,
  deleteUrl,
} from '../../services/urlService'; // Import your apiService functions
import CopyButton from '../../components/CopyButton';
import './url.css';
import { Link } from 'react-router-dom';
// import Nav from '../../components/Nav';
// import { Resizable } from 'react-resizable';

const ShortenUrlApp = () => {
  const [url, setUrl] = useState('');
  const [customLink, setCustomLink] = useState('');
  const [password, setPassword] = useState('');
  const [limit, setLimit] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [urls, setUrls] = useState([]);
  const [isActive, setisActive] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [height, setHeight] = useState(300);
  const onResize = (event, { size }) => {
    // console.log('Resized Height:', size.height);
    setHeight(size.height);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        url,
        customLink: customLink || undefined,
        password: password || undefined,
        limit: limit || undefined,
      };
      const response = await createShortenUrl(data);
      console.log(response.data);
      setShortenedUrl(response.data.shortUrl);

      setSuccessMessage('URL successfully shortened!');
      setErrorMessage('');
    } catch (error) {
      console.error(
        'Error creating shortened URL:',
        error?.response?.data?.message,
      );
      setErrorMessage(
        error?.response?.data?.message ||
          'Failed to shorten URL. Please try again.',
      );
      setSuccessMessage('');
    }
  };
  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await getAllUrls();
        console.log(response.data);
        setUrls(response.data);
        setIsPremium(response.isPremium);
        console.log(response);
      } catch (error) {
        console.error('Error fetching shortened URLs:', error.message);
        setErrorMessage('Failed to fetch shortened URLs. Please try again.');
      }
    };
    fetchUrls();
  }, [shortenedUrl]);

  const handleIsActiveChange = () => {
    setisActive(!isActive);
  };
  const handleDeleteUrl = async (shortUrl) => {
    try {
      await deleteUrl(shortUrl);
      const updatedUrls = urls.filter((url) => url.shortUrl !== shortUrl);
      setUrls(updatedUrls);
    } catch (error) {
      console.error('Error deleting URL:', error.message);
    }
  };

  return (
    <div className='container1'>
      <div className='main'>
        <div className='left'>
          {/* <h1>Shorten URL App</h1> */}

          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

          {/* <div className='uindiv'>
            <label>
              URL:
              <br />
              <input
                className='uurl'
                type='text'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />{' '}
            </label>

            <label>
              isActive:
              <input
                type='checkbox'
                checked={isActive}
                onChange={handleIsActiveChange}
              />
            </label>
          </div>

          <br />

          <div className='paslimdiv'>
            <label>
              Password:
              <br />
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <label>
              Limit:
              <br />
              <input
                type='number'
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
              />
            </label>
          </div> */}
          {/* <br /> */}

          <form className='inputform' onSubmit={handleSubmit}>
            <div className='gbox'>
              <div className={`grid-item ${isPremium ? 'isnot' : 'span-two'}`}>
                <label>
                  URL:
                  <br />
                  <input
                    style={{ width: '90%' }}
                    className='uurl'
                    type='text'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />{' '}
                </label>
              </div>

              <div
                className={`ull grid-item ${
                  isPremium ? 'showbox' : 'donotshow'
                }`}
              >
                <div>
                  <label>
                    Custom Link:
                    <br />
                    <input
                      type='text'
                      value={customLink}
                      onChange={(e) => setCustomLink(e.target.value)}
                    />
                  </label>
                </div>
              </div>

              <div className='grid-item'>
                <label>
                  Password:
                  <br />
                  <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </div>

              <div className='grid-item'>
                <label>
                  Limit:
                  <br />
                  <input
                    type='number'
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                  />
                </label>
              </div>

              {/* <div className={`ull ${isPremium ? 'showbox' : 'donotshow'}`}>
              <div>
                <label>
                  Custom Link:
                  <input
                    type='text'
                    value={customLink}
                    onChange={(e) => setCustomLink(e.target.value)}
                  />
                </label>
              </div>
            </div> 
            <br /> */}
            </div>
            <div className='gcontainer'>
              <div className='grid-item1'>
                <button type='submit' className='shortbtn'>
                  Shorten URL
                </button>
              </div>
              <div className='grid-item1'>
                <label className='isac'>
                  isActive:
                  <input
                    className='ccbox'
                    type='checkbox'
                    checked={isActive}
                    onChange={handleIsActiveChange}
                  />
                </label>
              </div>
            </div>
          </form>

          {shortenedUrl && (
            <div>
              <p>Shortened URL:</p>
              <a href={shortenedUrl} target='_blank' rel='noopener noreferrer'>
                {`${window.location.origin}/url/${shortenedUrl}`}
              </a>
            </div>
          )}
        </div>

        <div className='right'>
          <table>
            <thead>
              <tr>
                <th>shortened url</th>
                <th>clickCount</th>
                <th>isActive</th>
                <th>limit</th>
                <th>original url</th>
                <th></th>
              </tr>
            </thead>
            <tbody className='tbody'>
              {urls.map((url) => (
                <CopyButton
                  className={`${isPremium ? 'donotshow' : 'show'}`}
                  key={url._id}
                  {...url}
                  onDelete={handleDeleteUrl}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShortenUrlApp;
