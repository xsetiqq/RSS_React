import './Error404.css';

const NotFoundPage = () => {
  return (
    <div className="error">
      <img src="./src/assets/alert.png" alt="Error Alert" width={100} />
      <h1>Oops! Something went wrong.</h1>
      <h1>Error 404</h1>
      <h1>
        Go <a href="/"> home</a>
      </h1>
    </div>
  );
};

export default NotFoundPage;
