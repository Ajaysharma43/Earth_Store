import "../About_Page_Mission_Page/Misson_Page.css";
import Forest from "../../../assets/About_Images/Our-Mission-min.jpg";

const Mission = () => {
  return (
    <>
      <div
        className="
          flex flex-wrap justify-center pt-32 pb-32 gap-6
          xl:flex xl:justify-center xl:gap-24 xl:pt-32 xl:pb-32
          lg:flex lg:justify-center lg:gap-6 lg:pt-32 lg:pb-32
          md:flex md:justify-center md:gap-6 md:pt-32 md:pb-32
          sm:flex sm:justify-center sm:gap-6 sm:pt-32 sm:pb-32
        "
      >
        <section>
          <img 
            src={Forest} 
            alt="Mission Image" 
            className="
              h-96
              lg:h-[clamp(50px, 31vw, 346px)]
              md:h-[clamp(50px, 20vw, 250px)]
              w-full object-cover
            "  
          />
        </section>

        <section>
          <div className="mt-10 w-full max-w-xl lg:w-[clamp(50px, 31vw, 96px)]">
            <h1 className="text-4xl font-bold font-serif pb-9">OUR MISSION</h1>
            <p
              className="
                md:w-[clamp(50px, 31vw, 434px)]
                xl:text-slate-500 xl:text-lg xl:w-[464px]
                lg:text-slate-500 lg:text-lg lg:w-[434px]
                text-slate-500 text-lg
              "
            >
              Hello, my name is Tyler Moore and with the help of many people I
              made this template. I made it so it is super easy to update and so
              that it flows perfectly with my tutorials. Lots of love and
              hundreds of hours went into making it. I hope you love it as much
              as I do.
            </p>
            <br />
            <p className="text-slate-500 text-lg w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[50%]">
              I wish you the best of luck with your business, enjoy the
              adventure.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Mission;
