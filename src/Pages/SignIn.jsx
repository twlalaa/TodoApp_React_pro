// Images
import Hero from "../Images/Hero.png";
import SignInForm from "../Components/SignInForm";

const SignIn = (props) => {
  return (
    <div className="h-[500px] flex bg-cream p-2 rounded-lg">
      <div className="flex flex-grow items-center justify-center">
        <img src={Hero} alt="" className="h-full" />
      </div>
      <SignInForm getUser={props.getUser} />
    </div>
  );
};

export default SignIn;
