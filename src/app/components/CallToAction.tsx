// import CallIcon from "@/assets/images/cta/call.svg";
import ShapeRound from "@/assets/cta/round.svg";
import ShapeLine from "@/assets/cta/line.svg";

import { PhoneCall } from "lucide-react";

export default function CallToAction() {
  return (
   
    <div className="bg-white -mt-28">
			<div className="w-full md:max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
        <div className="relative z-[2] flex items-center justify-between bg-primary p-24 rounded-xl -bottom-28">
          <h2 className="w-full sm:w-9/12 text-white text-2xl md:text-5xl font-semibold">
            If you have any questions <br />
            Please Call.
          </h2>
          <div className="w-full sm:w-3/12 flex items-center space-x-3 text-white text-lg font-medium">
            <a href="tel:+16544521505" className="flex items-center space-x-2 text-xl font-semibold">
                <span  className="size-18 rounded-full p-4 bg-white text-primary">

                    <PhoneCall className="size-10 text-primary" />
                </span>
              {/* <img src="/assets/images/cta/call.svg" alt="Call Icon" className="w-6 h-6" /> */}
              <span>+1-234-567-8910</span>
            </a>
          </div>

          {/* Decorative shapes */}
          <img
            src={ShapeRound.src}
            alt="shape"
            className="absolute top-[20%] right-[37%] w-8 h-8 object-contain"
          />
          <img
            src={ShapeLine.src}
            alt="shape"
            className="absolute right-[35%] bottom-[20%] w-auto h-20 object-contain"
          />
        </div>
      </div>
    </div>

  );
}
