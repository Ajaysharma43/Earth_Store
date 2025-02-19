import React, { useState } from "react";
import { Step, Stepper } from "react-form-stepper";
import Step1 from "./Stepper_Components/Step1";
import Step2 from "./Stepper_Components/Step2";
import Step3 from "./Stepper_Components/Step3";
import SignupBG from "../../assets/Login_Images/Landscape2.jpg";

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      label: "Children Step 1",
      content: <Step1 nextStep={() => setCurrentStep(1)} />,
    },
    {
      label: "Children Step 2",
      content: <Step2 nextStep={() => setCurrentStep(2)} />,
    },
    { label: "Children Step 3", content: <Step3 /> },
  ];

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <>
      <div className="grid items-center justify-center min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${SignupBG})` }}>
        {/* Stepper */}
        <Stepper activeStep={currentStep}>
          {steps.map((step, index) => (
            <Step key={index} label={step.label} className="bg-blue-500"/>
          ))}
        </Stepper>

        {/* Step Content */}
        <div className="my-6">
          <div>{steps[currentStep].content}</div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4"></div>
      </div>
    </>
  );
};





export default Signup;
