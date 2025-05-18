import React, { useState } from "react";
import { getGeolocation } from "../hooks/useGeolocation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CiSearch } from "react-icons/ci";
export interface SearchFormProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, loading }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit}>
        <div className="flex mb-3">
          <Input
            type="text"
            className="form-control border py-2"
            placeholder="Search for location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className=" px-5 cursor-pointer"
            disabled={loading}
          >
            {loading ? (
              // todo
              <span className="loader"></span>
            ) : (
              <CiSearch className="text-2xl" />
            )}
          </button>
        </div>
      </form>

      {/* Location Button */}
      <div className="">
        <Button
          className={""}
          onClick={() => getGeolocation(onSearch)}
          disabled={loading}
        >
          {loading ? (
            // todo
            <span
              className="spinner-border spinner-border-sm me-1"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            <CiSearch />
          )}
          Use My Location
        </Button>
      </div>
    </div>
  );
};

export default SearchForm;
