import React from "react";
import { CiLocationOn } from "react-icons/ci";

export interface LocationHeaderProps {
  locationText: string;
}

const LocationHeader: React.FC<LocationHeaderProps> = ({ locationText }) => {
  return (
    <header className="my-12 text-3xl">
      <div className=" text-center flex justify-center items-center gap-2 text-gray-600">
        <CiLocationOn />
        <span>{locationText || "Cairo, Egypt"}</span>
      </div>
    </header>
  );
};

export default LocationHeader;
