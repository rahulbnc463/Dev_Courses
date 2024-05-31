import React from "react";

const TrustedCompanies = () => {
  const companies = [
    {
      name: "Volkswagen",
      logo: "https://cms-images.udemycdn.com/content/tqevknj7om/svg/volkswagen_logo.svg?position=c&quality=80&x.app=portals",
    },
    {
      name: "Samsung",
      logo: "https://cms-images.udemycdn.com/content/2gevcc0kxt/svg/samsung_logo.svg?position=c&quality=80&x.app=portals",
    },
    {
      name: "Cisco",
      logo: "https://cms-images.udemycdn.com/content/mueb2ve09x/svg/cisco_logo.svg?position=c&quality=80&x.app=portals",
    },
    {
      name: "Vimeo",
      logo: "https://cms-images.udemycdn.com/content/ocud9ia7cf/svg/vimeo_logo.svg?position=c&quality=80&x.app=portals",
    },
    {
      name: "P&G",
      logo: "https://cms-images.udemycdn.com/content/bthyo156te/svg/procter_gamble_logo.svg?position=c&quality=80&x.app=portals",
    },
    {
      name: "Hewlett Packard Enterprise",
      logo: "https://cms-images.udemycdn.com/content/luqe0d6mx2/svg/hewlett_packard_enterprise_logo.svg?position=c&quality=80&x.app=portals",
    },
    {
      name: "Citi",
      logo: "https://cms-images.udemycdn.com/content/siaewwmkch/svg/citi_logo.svg?position=c&quality=80&x.app=portals",
    },
    {
      name: "Ericsson",
      logo: "https://cms-images.udemycdn.com/content/swmv0okrlh/svg/ericsson_logo.svg?position=c&quality=80&x.app=portals",
    },
  ];

  return (
    <div className="bg-white py-8 mt-3 mb-4">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-gray-500 text-center mb-4">
          Trusted by over 15,000 companies and millions of learners around the
          world
        </p>
        <div className="flex justify-center items-center space-x-4 sm:space-x-6 lg:space-x-8">
          {companies.map((company, index) => (
            <img
              key={index}
              src={company.logo}
              alt={company.name}
              className="h-5 sm:h-12 lg:h-18 grayscale" // Adjust height for different screen sizes
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustedCompanies;
