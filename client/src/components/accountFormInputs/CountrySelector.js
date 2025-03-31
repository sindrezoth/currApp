import { useState, useRef, useEffect, useMemo } from 'react';
import countries from 'i18n-iso-countries';
import ruLocale from 'i18n-iso-countries/langs/ru.json';

countries.registerLocale(ruLocale);

const lang = 'ru';
const getCountryName = (lang) => {
  return Object.entries(countries.getNames(lang)).map((country) => ({
    value: country[0],
    label: country[1]
  }));
}

const COUNTRY_REGEX = /^[\w]{4,12}$/;

function CountrySelector({ state }) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const options = useMemo(() => getCountryName(lang), [lang]);
  const [country, setCountry] = useState(state.value || { value: null, label: null });

  const [validCountry, setValidCountry] = useState(false);
  
  useEffect(() => {
    state.setCountry(country);
    console.log(country)
    if(country?.label) {
      state.setOk(prev => ({...prev, country: true}))
    }
    else{
      state.setOk(prev => ({...prev, country: false}))
    }
  }, [country])

  useEffect(() => {
    setCountry(state.value);
  }, [state.value?.value, state.value?.label])


  const filterSuggestions = (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }
    setSuggestions(options.map(o => o.label).filter((country) =>
      country.toLowerCase().includes(input.toLowerCase())
    ));
    setSelectedIndex(-1); // Reset index when input changes
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setValue(input);
    setCountry(options.find(option => option.label === input));
    filterSuggestions(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    }
    if (e.key === 'ArrowUp') {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }
    if (e.key === 'Enter') {
      if(suggestions.length === 1){
        setValue(suggestions[0]);
        setCountry(options.find(option => option.label === suggestions[0]));
        setSuggestions([]);
      }
      else if(selectedIndex >= 0){
        setValue(suggestions[selectedIndex]);
        setCountry(options.find(option => option.label === suggestions[selectedIndex]));
        setSuggestions([]);
      }
    }
    if (e.key === 'Escape') {
      setSuggestions([]);
    }
  };

  const handleSelect = (country) => {
    setValue(country);
    setSuggestions([]);
    setCountry(options.find(option => option.label === country));
    inputRef.current.focus();
  };

  useEffect(() => {
    if (selectedIndex >= 0 && suggestions.length) {
      inputRef.current.setSelectionRange(value.length, value.length);
    }
  }, [selectedIndex]);
  const inputIsValid = country && (options.findIndex(({value}) => value === country.value) ? 'is-valid' : 'is-invalid');

  return (
    <div className="form-group form-floating mb-5">
      <input
        ref={inputRef}
        type="text"
        value={country?.label}
        id="country-input"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        className={`form-control ${inputIsValid}`}
        placeholder="Select country"
      />
      <label htmlFor="country-input">Страна проживания</label>
      {suggestions.length > 0 && (
        <ul style={{
          position: 'absolute', top: '100%', left: 0, width: '100%',
          background: 'white', border: '1px solid #ccc', listStyle: 'none', padding: 0, margin: 0
        }}>
          {suggestions.map((country, index) => (
            <li
              key={country}
              style={{
                padding: '5px',
                background: index === selectedIndex ? '#eee' : 'white',
                cursor: 'pointer'
              }}
              onMouseDown={() => handleSelect(country)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

//export default CountryInput;
export default CountrySelector;
