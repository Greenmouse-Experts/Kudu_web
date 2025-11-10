import { useState } from "react";

export default function CountrySelect() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const countries = [
    { value: "UK", label: "UK" },
    { value: "USA", label: "USA" },
  ];

  return (
    <div className="max-w-xs" data-theme="kudu">
      {selectedCountry && (
        <label className="label mr-2">
          <span className="label-text">Location:</span>
        </label>
      )}
      <div className="dropdown">
        <label
          tabIndex={0}
          className="btn btn-bordered justify-start size-auto p-2"
        >
          {selectedCountry ? selectedCountry : "Pick your location"}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {countries.map((country) => (
            <li key={country.value}>
              <a onClick={() => setSelectedCountry(country.value)}>
                {country.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
