import { Link } from "react-router";

//Logo component that redirects to the home page
function Logo({ classname, err = false }) {
  return (
    <div className="flex w-auto justify-start md:justify-center">
      {!err ? (
        <Link to="/home">
          <img
            src="logo.png"
            alt="Logo"
            className={`max-w-[90px] sm:max-w-[110px] md:max-w-[150px] ${classname}`}
          />
        </Link>
      ) : (
        <img
          src="logo.png"
          alt="Logo"
          className={`max-w-[150px] md:max-w-[200px] ${classname}`}
        />
      )}
    </div>
  );
}

export default Logo;
