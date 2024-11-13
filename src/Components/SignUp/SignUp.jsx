import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase.init";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    console.log(email, password, terms);

    setErrorMessage("");
    setSuccess(false);

    if (!terms) {
      setErrorMessage("Please accept the terms and conditions");
    }

    if (password < 6) {
      setErrorMessage("Password should be 6 characters or longer");
      return;
    }

    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>?,./\\|-]).{6,}$/;

    if (!regex.test(password)) {
      setErrorMessage("Password is not valid.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);

        sendEmailVerification(auth.currentUser).then(() => {
          console.log("Verification code sent");
        });

        const profile = {
          displayName: name, 
          photoURL: photo
        } 
        updateProfile(auth.currentUser, profile)
        .then(() => {
          console.log('User profile updated');
        })
        .catch((error) => {
          console.log('User profile update error');
        })

      })
      .catch((error) => {
        console.log("ERROR", error.message);
        setErrorMessage(error.message);
        setSuccess(false);
      });
  };

  return (
    <div className="my-8 card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <h1 className="text-5xl font-bold ml-8">Sign Up now!</h1>
      <form onSubmit={handleSignUp} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            name="name"
            type="text"
            placeholder="name"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input
            name="photo"
            type="text"
            placeholder="Photo URL"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            name="email"
            type="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            className="input input-bordered  "
            required
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="right-4 top-12 absolute"
          >
            <FaEye />
          </button>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control">
          <label className="label justify-start cursor-pointer">
            <input type="checkbox" name="terms" className="checkbox mr-4" />
            <span className="label-text">Remember me</span>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </form>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {success && <p className="text-green-600">Sign up Successful</p>}
      <p>
        Already have an account? <Link to={"/login"}>Please LogIn</Link>
      </p>
    </div>
  );
};

export default SignUp;
