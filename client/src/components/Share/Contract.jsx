import { useRef, useEffect } from "react";

function Contract() {
  const spanEle = useRef(null);

  useEffect(() => {
    spanEle.current.classList.add("flash");
    const flash = setTimeout(() => {
      spanEle.current.classList.remove("flash");
    }, 300);
    return () => {
      clearTimeout(flash);
    };
  }, []);

  return (
    <code>
      {`contract QualitySC  `}

      <span className="secondary-color" ref={spanEle}>
        <strong>User Management</strong>
      </span>

      {`;

  function addUser(address _user) public {
    return user;
  }

  function removeUser(address _user) public{
    return true/false;
  }

  function isUserRegistered(address _user) public{
    return true/false;
  }
    
}`}
    </code>
  );
}

export default Contract;
