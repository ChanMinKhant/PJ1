import { useState, useEffect } from 'react';
import { Resizable } from 'react-resizable';
import Switch from '../../components/Switch.jsx';
import {
  createShortenUrl,
  getAllUrls,
  deleteUrl,
  updateUrl,
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
        isActive: isActive,
      };
      const response = await createShortenUrl(data);
      console.log(response.data);
      setShortenedUrl(response.data?.shortUrl);

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
        console.log('response.data..::' + response.data);
        setUrls(response.data);
        setIsPremium(response.isPremium);
        console.log('response::' + response);
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
  const handleUpdatedUrl = async (shortUrl, data) => {
    try {
      await updateUrl(shortUrl, data);
      const updatedUrls = urls.map((url) => {
        if (url.shortUrl === shortUrl) {
          return {
            ...url,
            ...data,
          };
        }
        return url;
      });
      setUrls(updatedUrls);
    } catch (error) {
      console.error('Error updating URL:', error.message);
    }
  };
  return (
    <div className='container1'>
      <div className='main'>
        <div className='leftt'>
          {/* <h1>Shorten URL App</h1> */}

          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

          <div className='form-container'>
            <form className='formtag' onSubmit={handleSubmit}>
              <div className='rownow'>
                <div className='each'>
                  <label className='form-label'>URL:</label>
                  <input
                    className='form-control bgu'
                    type='text'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>

                <div className='each'>
                  <label className='form-label'>Custom Link:</label>
                  <input
                    className='form-control bgu bg-secondary'
                    // className='form1'
                    type='text'
                    value={customLink}
                    onChange={(e) => setCustomLink(e.target.value)}
                  />
                </div>

                <div className='each'>
                  <label className='form-label'>Password:</label>
                  <input
                    className='form-control bgu'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className='each'>
                  <label className='form-label'>Limit:</label>
                  <input
                    className='form-control bgu'
                    type='number'
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                  />
                </div>
                <div className='each'>
                  <label className='form-check'>isActive:</label>
                  {/* <input
                    className='form-check-input'
                    type='checkbox'
                    checked={isActive}
                    onChange={handleIsActiveChange}
                  /> */}
                  <Switch
                    isToggled={isActive}
                    onToggle={handleIsActiveChange}
                  />
                </div>
                <div className='each'>
                  <button type='submit' className='btn btn-primary'>
                    Shorten URL
                  </button>
                </div>
              </div>
            </form>
          </div>
          {shortenedUrl && (
            <div>
              <p>Shortened URL:</p>
              <a
                href={`/url/${shortenedUrl}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                {`${window.location.origin}/url/${shortenedUrl}`}
              </a>
            </div>
          )}
        </div>

        <div className='right'>
          {/* <table className='table table-striped'> */}
          <table className='striped table'>
            <thead className='thea'>
              <tr className='headsec'>
                <th className='text-center'>
                  {/* <div>shortened url</div> */}shortened Url
                </th>
                <th className='text-center'>
                  {/* <div>clickCount</div> */}clickCount
                </th>
                {/* <th>isActive</th> */}
                <th className='text-center'>
                  {/* <div>limit</div> */}
                  limit
                </th>
                <th> </th>
                {/* <th></th> */}
              </tr>
            </thead>
            <tbody className='tbo'>
              {urls.map((url) => (
                <CopyButton
                  className={`${isPremium ? 'donotshow' : 'show'}`}
                  key={url._id}
                  {...url}
                  onDelete={handleDeleteUrl}
                  onEdit={handleUpdatedUrl}
                  shortUrl={url.shortUrl}
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
