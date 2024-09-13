import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../../assets/Logo/LogoLogo.png";
import Services from "../Services/Services";
import { Link } from "react-router-dom";
import Wave from "../../../assets/Vector/Vector.png";
import Child from "../../../assets/Waste-Management/Waste management-rafiki.png";

export default function LandingPageMain() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isTurnstileVerified, setIsTurnstileVerified] = useState(false);

  useEffect(() => {
    window.onloadTurnstileCallback = () => {
      console.log("Turnstile script loaded");
      const container = document.getElementById("example-container");
      if (container && window.turnstile) {
        try {
          window.turnstile.render(container, {
            sitekey: import.meta.env.VITE_SITE_KEY, 
            callback: (token) => {
              console.log(`Challenge Success ${token}`);
              setIsTurnstileVerified(true); 
            },
          });
        } catch (error) {
          console.error("Turnstile render error:", error);
        }
      } else {
        console.error("Turnstile script or container not found");
      }
    };
  }, []);

  if (!isTurnstileVerified) {
    // Show only the Turnstile challenge while waiting for verification
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div id="example-container"></div>
      </div>
    );
  }

  // After Turnstile verification is successful, show the page content
  return (
    <div className="bg-white-default overflow-x-hidden relative">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className=" h-16 w-auto" src={logo} alt="Company Logo" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-blue-light"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen === false && <Bars3Icon className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end bg-blue-darkTeal max-w-fit py-2 px-4 rounded-md">
            <Link to="/login" className="text-base font-semibold leading-6 text-white-default">
              Sign In
            </Link>
          </div>
        </nav>
        <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6  sm:ring-1 sm:ring-gray-900/10  backdrop-blur-xl h-1/3">
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="py-6">
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 pt-6 lg:px-8">
        <div className="mx-auto max-w-7xl py-32 sm:py-48 lg:py-56 flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="lg:w-1/2 text-left">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center lg:justify-start">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-blue-dark ring-1 ring-gray-900/20 hover:ring-gray-900/30">
                Reduce,Reuse,Recycle with ease!{" "}
                <Link to='/signup' className="font-semibold text-blue-default">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Signup for free <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-blue-dark sm:text-6xl">
              Upgrade Responsibly, <br className="hidden sm:inline" />
                <span className="text-blue-light">
                Dispose Sustainably! <br className="hidden sm:inline" />
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-blue-default">
              Transform waste management in your community with our innovative platform. Connect seamlessly with local rag pickers, ensuring accessibility, trust, and transparent pricing. Enjoy a user-friendly experience with reliable services and verified credentials.
              </p>
              <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
                <Link
                  to="/login"
                  className="rounded-md bg-blue-dark text-white-default px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-default"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        </div>

        <img
          src={Wave}
          alt="Wave"
          className="absolute -z-20 bottom-0 blur-3xl sm:bg-blend-luminosity lg:blur-none lg:-top-30 h-auto left-80 w-full"
        />
        <img
          src={Child}
          alt="Child"
          className="absolute z-10  lg:top-40 right-5 h-auto max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl"
        />
        
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
      <Services />
      
    </div>
  );
}
