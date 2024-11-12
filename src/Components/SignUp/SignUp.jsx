import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useState } from "react";

const SignUp = () => {

    const [errorMessage, setErrorMessage] = useState('')

    const handleSignUp = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        setErrorMessage('');

        createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
            console.log(result.user);
        })
        .catch ((error) => {
            console.log('ERROR', error.message);
            setErrorMessage(error.message)
        })
    }


  return (
    <div className="my-8 card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <h1 className="text-5xl font-bold ml-8">Sign Up now!</h1>
      <form onSubmit={handleSignUp} className="card-body">
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
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
          name="password"
            type="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </form>
      {
        errorMessage && <p className="text-red-500">{errorMessage}</p>
      }
    </div>
  );
};

export default SignUp;
