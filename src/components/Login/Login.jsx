import "./Login.css";

export const Login = () => {
  return (
    <>
      <div className="login-container">
        <div className="login-header-container">Plant Mart</div>
        <div className="login-input-container">
          <input type="text" placeholder="Username" />
          <span>Please enter username</span>
          <input type="text" placeholder="Password" />
          <span>Please enter password</span>
        </div>
        <div className="login-persist-container">
          <label htmlFor="persistcheckbox">
            <input type="checkbox" id="persistcheckbox" />
            Trust this device
          </label>
        </div>
        <div className="login-button-container">
          <button>Log in</button>
        </div>
        <a href="/">Create new account</a>
      </div>
    </>
  );
};
