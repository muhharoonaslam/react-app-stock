import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchSymbols } from "../../services/polygon";
import debounce from "lodash/debounce";

interface CompanySearchProps {
  onSelect: (symbol: string) => void;
}

const CompanySearch: React.FC<CompanySearchProps> = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const debounceSearch = debounce((term: string) => {
    setDebouncedSearchTerm(term);
  }, 500);

  useEffect(() => {
    if (searchTerm) {
      debounceSearch(searchTerm);
    }

    return () => {
      debounceSearch.cancel();
    };
  }, [searchTerm]);

  const { data, isLoading } = useQuery({
    queryKey: ["searchSymbols", debouncedSearchTerm],
    queryFn: () => searchSymbols(debouncedSearchTerm),
    enabled:
      debouncedSearchTerm.length > 1 && debouncedSearchTerm !== selectedSymbol,
  });

  const handleSelect = (symbol: string, name: string) => {
    setSelectedSymbol(symbol);
    setSearchTerm(name);
    setShowDropdown(false);
    onSelect(symbol);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowDropdown(true);
        }}
        className="border p-2 rounded-md w-full"
        placeholder="Search for a company"
      />
      {isLoading && <p>Loading...</p>}
      {showDropdown && data && data.results && (
        <ul className="absolute z-10 bg-white border w-full mt-2 max-h-48 overflow-auto rounded-md shadow-lg">
          {data.results.map((result: any, index: number) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(result.ticker, result.name)}
            >
              {result.name} ({result.ticker})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompanySearch;
