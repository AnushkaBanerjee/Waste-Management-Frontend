import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import { Avatar } from "@nextui-org/avatar";
import ani from "../../../../src/assets/ani.png";
import anu from "../../../../src/assets/anu.jpg";
import abi from "../../../../src/assets/abi1.jpg";
import pri from "../../../../src/assets/pri.png";
import sek from "../../../../src/assets/sek.png";
import ankit from "../../../../src/assets/ankit.jpg";

const links = [
  { name: 'Signup As Customer to Explore Customers Features ' },
  { name: 'Signup As Worker to Explore Features for Pickup Worker' },
];

const stats = [
  { name: 'Centralized platform for connecting users with local rag pickers', value: 'Centralized Connection' },
  { name: 'Accessible and user-friendly interface with an easy flow ', value: 'Accessibility and Usability' },
  { name: 'Trustworthy with clear credential verification for rag pickers', value: 'Verified Credentials' },
  { name: 'Transparent and clear pricing for services', value: 'Pricing Transparency' },
];

const teamMembers = [
  { image: ankit, name: 'Ankit Biswas', year: '4th Year', department: 'CSE', institution: 'Meghnad Saha Institute of Technology' },
  { image: anu, name: 'Anushka Banerjee', year: '4th Year', department: 'CSE', institution: 'Meghnad Saha Institute of Technology' },
  { image: pri, name: 'Priyosmita Das', year: '4th Year', department: 'CSE', institution: 'Meghnad Saha Institute of Technology' },
  { image: abi, name: 'Abhisek Basak', year: '4th Year', department: 'CSE', institution: 'Meghnad Saha Institute of Technology' },
  { image: sek, name: 'Shekhar Hans', year: '4th Year', department: 'CSE', institution: 'Meghnad Saha Institute of Technology' },
  { image: ani, name: 'Aniruddha Ghosh', year: '4th Year', department: 'CSE', institution: 'Meghnad Saha Institute of Technology' },
];

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(1); // Start at the first actual item
  const [items, setItems] = useState([]);
  const totalItems = teamMembers.length;

  useEffect(() => {
    // Add duplicated items for infinite loop effect
    setItems([...teamMembers, ...teamMembers, ...teamMembers]);

    // Set interval for automatic slide
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const newIndex = (prevIndex + 1) % totalItems;
        return newIndex === 0 ? totalItems : newIndex;
      });
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [totalItems]);

  return (
    <div className="relative isolate overflow-hidden bg-yellow-extraLight py-24 sm:py-32">
      <div
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-blue-default to-blue-teal opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-yellow-default to-yellow-dark opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-blue-dark sm:text-6xl">Platform Guideline</h2>
          <div className="mt-16 flex justify-center">
            <iframe className="w-full max-w-4xl h-80" src="https://www.youtube.com/embed/lednL9-7Yx4?si=Na536ap8m79xQIf9" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
        </div>
        <div className="mx-auto max-w-2xl lg:mx-0 mt-16">
          <h2 className="text-4xl font-bold tracking-tight text-blue-dark sm:text-6xl">Team Members</h2>
          <div className="relative overflow-hidden">
            <div
              className="carousel-wrapper flex transition-transform duration-300 ease-in-out mt-12"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }} // Adjust percentage based on visible items
            >
              {items.map((member) => (
                <div key={member.name} className="carousel-item flex-shrink-0 w-full lg:w-1/3 px-4 text-center">
                  <div className="bg-lime-100 p-6 rounded-lg shadow-lg transition-transform duration-300 h-[300px] ease-in-out transform hover:scale-105">
                    <div className="flex justify-center">
                      <Avatar src={member.image} className="w-36 h-36 text-large mb-2" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{member.name}</h3>
                    <p className="text-gray-700 mb-1">{member.year} - {member.department}</p>
                    <p className="text-gray-500">{member.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-2xl lg:mx-0 mt-16">
          <h2 className="text-4xl font-bold tracking-tight text-blue-dark sm:text-6xl">Services we provide</h2>
          <p className="mt-6 text-lg leading-8 text-slate-800">
            {/* Add any additional content or description here if needed */}
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            {links.map((link) => (
              <Link
                to="/signup"
                key={link.name}
                className="text-blue-default"
              >
                {link.name} <span aria-hidden="true">&rarr;</span>
              </Link>
            ))}
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="relative flex flex-col gap-y-6 rounded-xl p-6 text-center ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                <dt className="text-base font-semibold leading-6 text-blue-default">{stat.value}</dt>
                <dd className="text-3xl font-bold leading-8 text-gray-800">{stat.name}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <Footer />
    </div>
  );
}
