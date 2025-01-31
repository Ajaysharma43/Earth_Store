import "../About_Page_Mission_Page/Misson_Page.css";
import Forest from "../../../assets/About_Images/Our-Mission-min.jpg";

const Mission = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-10 lg:flex-row lg:gap-16 lg:px-16 lg:py-20 xl:px-24">
      {/* Image Section */}
      <section className="w-full max-w-[500px] lg:max-w-[550px]">
        <img
          src={Forest}
          alt="Mission Image"
          className="w-full h-auto max-h-[400px]" 
        />
      </section>

      {/* Content Section */}
      <section className="text-center lg:text-left max-w-[600px]">
        <h2 className="text-4xl font-bold font-serif pb-6">OUR MISSION</h2>
        <p className="text-slate-500 text-lg leading-relaxed mb-4">
          Hello, my name is Tyler Moore and with the help of many people I made
          this template. I made it so it is super easy to update and so that it
          flows perfectly with my tutorials. Lots of love and hundreds of hours
          went into making it. I hope you love it as much as I do.
        </p>
        <p className="text-slate-500 text-lg leading-relaxed">
          I wish you the best of luck with your business, enjoy the adventure.
        </p>
      </section>
    </div>
  );
};

export default Mission;
