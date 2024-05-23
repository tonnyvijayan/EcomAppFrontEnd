import "./SignUp.css";
//
export const SignUp = () => {
  return (
    <>
      <div className="signup-container">
        <div className="signup-header-container">Plant Mart</div>
        <div className="signup-input-container">
          <input type="text" placeholder="Username" />
          <span>Please enter username</span>
          <input type="email" placeholder="Email" />
          <span>Please enter an email</span>

          <input type="text" placeholder="Password" />
          <span>Please enter password</span>
        </div>

        <div className="signup-button-container">
          <button>Sign Up</button>
          {/* <button>Sign Up</button> */}
        </div>
        <a href="/">Go to log in</a>
      </div>
    </>
  );
};
