// src/About.js

import Header from "../components/header";

const About = () => {
  return (
    <>
      <Header />
      <div className="bg-light-brown p-8 font-sans text-brown-900">
        <div
          className="relative bg-cover bg-center h-64 flex items-center justify-center"
          style={{
            backgroundImage: `url('/123.avif')`,
          }}
        >
          <h1 className="text-3xl text-center font-bold text-white">
            About LSKIN
          </h1>
        </div>

        <p className="text-lg leading-relaxed mb-6">
          LSKIN, an organic skincare and wellness company, is thrilled to
          present an exciting opportunity to invest in our organic skincare
          journey. With a shared commitment to sustainability and natural
          wellness, we are poised to revolutionize the skincare industry.
        </p>

        <img
          src="path-to-your-image.jpg"
          alt="Organic skincare products"
          className="block mx-auto mb-8 w-full max-w-md"
        />

        <p className="text-lg leading-relaxed mb-6">
          Our mission is to deliver high-quality, organic skincare products that
          prioritize the health of both our customers and the planet. LSKIN is
          focused on providing premium skincare, hence our community`s key
          values are based on:
        </p>

        <ul className="list-disc pl-8 text-lg mb-6">
          <li>
            Ethical sourcing: We prioritize responsibly sourced ingredients,
            such as organic and fair-trade materials, to minimize the impact on
            local communities and ecosystems.
          </li>
          <li>
            Clean formulations: Avoiding harmful chemicals like parabens,
            sulfates, and phthalates in skincare products.
          </li>
        </ul>

        <h2 className="text-2xl italic text-center mb-8">
          RADIANCE FROM WITHIN
        </h2>

        <p className="text-lg leading-relaxed mb-6">
          We believe in promoting beauty that goes beyond the surface, focusing
          on health and sustainability. Join us in embracing a more natural,
          eco-friendly skincare journey!
        </p>

        <img
          src="path-to-another-image.jpg"
          alt="Sustainable ingredients in skincare"
          className="block mx-auto w-full max-w-md"
        />
      </div>
    </>
  );
};

export default About;
