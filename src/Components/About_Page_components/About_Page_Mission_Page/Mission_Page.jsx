import "../About_Page_Mission_Page/Misson_Page.css";
import Forest from "../../../assets/About_Images/Our-Mission-min.jpg";

const Mission = () => {
  return (
    <>
      <div
        className="
          flex flex-wrap justify-center items-center pt-10 pb-10 gap-8 w-full
          xl:flex-row xl:justify-center xl:gap-24 xl:pt-32 xl:pb-32 xl:ml-[7%]
          lg:flex-row lg:justify-between lg:gap-12 lg:pt-32 lg:pb-32 lg:ml-[7%]
          md:flex-row md:justify-between md:gap-8 md:pt-20 md:pb-20
          sm:flex-col sm:justify-center sm:gap-6 sm:pt-16 sm:pb-16
        "
      >
        {/* Image Section */}
        <section>
          <img
            src={Forest}
            alt="Mission Image"
            className="
              lg:h-[clamp(50px, 31vw, 346px)] lg:w-[504px] 
              xl:h-[clamp(50px, 31vw, 346px)] xl:w-[564px] 
              md:w-[50%] md:h-[clamp(50px, 31vw, 346px)] p-4
              sm:h-[clamp(80px, 12vw, 200px)] sm:w-full
              w-full
            "
          />
        </section>

        {/* Content Section */}
        <section className="px-4 flex-1">
          <div className="mt-10">
            <p className="text-4xl font-bold font-serif pb-6 break-words whitespace-normal">
              OUR MISSION
            </p>
            <p
              className="
                text-slate-500 text-lg leading-relaxed break-words whitespace-normal
                md:w-[50%] lg:w-[434px] xl:w-[464px] 
              "
            >
              Hello, my name is Tyler Moore and with the help of many people I
              made this template. I made it so it is super easy to update and so
              that it flows perfectly with my tutorials. Lots of love and
              hundreds of hours went into making it. I hope you love it as much
              as I do.
            </p>
            <br />
            <p
              className="
                text-slate-500 text-lg leading-relaxed w-full
                sm:w-[90%] md:w-[70%] lg:w-[70%] xl:w-[50%] 
              "
            >
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
