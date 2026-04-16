import { Link } from 'react-router-dom';
import githubIcon from '../assets/github.svg';
import twitterIcon from '../assets/twitter.svg';

const Page404 = () => {
  return (
    <div className='page-404'>
      <p className='error-code'>404 error</p>
      <h1>Page not found.</h1>
      <p>Sorry, we couldn't find the page you're looking for.</p>
      <Link to='/'>
        Go back home<span aria-hidden='true'> &rarr;</span>
      </Link>
      <div className='page-404-footer'>
        <Link to='https://twitter.com/its_ikD'>
          <img src={twitterIcon} alt='twitter' />
        </Link>
        <Link to='https://github.com/its-id/TODO-MERN-APP'>
          <img src={githubIcon} alt='github' />
        </Link>
      </div>
    </div>
  );
};

export default Page404;
