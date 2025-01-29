const DescriptionContent = () => {
  return (
    <div className="w-full max-w-3xl lg:max-w-screen-lg xl:max-w-screen-xl mx-auto p-6 md:p-8 bg-white rounded-lg text-gray-800 border border-gray-300">
      <h1 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
        Framed Without Borders:
      </h1>
      <ul className="list-disc pl-6 mb-6 space-y-3">
        <li className="text-sm md:text-base">Printed on High-Quality vinyl.</li>
        <li className="text-sm md:text-base">
          1-inch thick wooden back frame.
        </li>
        <li className="text-sm md:text-base">
          No additional hanging hardware is required.
        </li>
        <li className="text-sm md:text-base">
          Care: Dust with a soft, dry cloth.
        </li>
      </ul>
      <h1 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
        Framed With Borders & Acrylic Glass:
      </h1>
      <ul className="list-disc pl-6 space-y-3">
        <li className="text-sm md:text-base">
          Printed on High-Quality matte photo paper.
        </li>
        <li className="text-sm md:text-base">Acrylic borders are used.</li>
        <li className="text-sm md:text-base">
          Highly durable acrylic glass is used on the top to protect it from
          damage.
        </li>
        <li className="text-sm md:text-base">
          Hooks are attached to the back of each frame for hanging.
        </li>
      </ul>
      <p className="italic text-xs md:text-sm text-gray-600 mt-6">
        Note: There may be a slight difference in actual color, due to the
        colors of the display.
      </p>
    </div>
  );
};

export default DescriptionContent;
