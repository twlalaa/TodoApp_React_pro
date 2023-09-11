// Images
import Hero from "../Images/Hero.png";
import SignUpForm from "../Components/SignUpForm";

const SignUp = (props) => {
  return (
    <div className="h-[600px] flex bg-cream p-2 rounded-lg">
      <div className="flex flex-grow items-center justify-center">
        <img src={Hero} alt="" className="h-full" />
      </div>
      <SignUpForm getUser={props.getUser} />
    </div>
  );
};

export default SignUp;
