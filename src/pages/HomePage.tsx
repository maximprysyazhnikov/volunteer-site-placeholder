import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={{ padding: '40px' }}>
      <h1>Home Page</h1>

      <div style={{ marginTop: '20px' }}>
        <Link to="/signin">Sign In</Link>
        <br />
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default HomePage;
