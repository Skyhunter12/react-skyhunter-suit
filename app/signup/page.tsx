'use client';
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import PhoneInput, { getCountryCallingCode } from 'react-phone-number-input';
import { CountryCode } from 'libphonenumber-js';
import en from 'react-phone-number-input/locale/en';
import es from 'react-phone-number-input/locale/es';
import ua from 'react-phone-number-input/locale/ua';
import ru from 'react-phone-number-input/locale/ru';
import de from 'react-phone-number-input/locale/de';
import pl from 'react-phone-number-input/locale/pl';
import pt from 'react-phone-number-input/locale/pt';
import libphonenumber from 'google-libphonenumber';
import PhoneInputCountrySelect from '../utils/PhoneInputCountrySelect';
import {roles} from '../utils/constants'
import gql from 'graphql-tag';
import { print } from 'graphql';

export default function SignUp({
  value,
  valid,
  onChangeHandler= () => {},
  label,
  touched,
  className,
  language
}:any) {
  type SupportedLanguages = 'ua' | 'ru' | 'de' | 'pt' | 'pl' | 'en' | 'es'; // Define supported languages

  const locale:any = {
    ua: ua,
    ru: ru,
    de: de,
    pt: pt,
    pl: pl,
    en: en,
    es: es
};
  const APP_URL = process.env.NEXT_PUBLIC_APP_LIVE_URL || process.env.NEXT_PUBLIC_APP_URL ||''
  const [first_name, setFirstName] = useState('');
  const [client, setClient] = useState(false);
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  
  const [country, setCountry] = useState<CountryCode | undefined>(undefined);
  const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
  const [defaultCountry, setDefaultCountry] = useState<string | undefined>(undefined);
   const htmlFor = useMemo(() => `phone-${Math.random()}`, []);
   useEffect(() => {
    const geoPlugin = { geoPlugin: 'US' }; // Replace with actual geoPlugin logic
    const validCountryCodes: CountryCode[] = ['US', 'GB', 'UA', 'DE', 'PL', 'PT']; // Add all valid codes
  
    if (validCountryCodes.includes(geoPlugin.geoPlugin as CountryCode)) {
      setDefaultCountry(geoPlugin.geoPlugin as CountryCode);
    } else {
      console.warn('Invalid country code:', geoPlugin.geoPlugin);
    }
    setClient(true)
  }, []);
  const [selectedRole, setSelectedRole] = React.useState("");

  const onChange = (val: string | undefined) => {
    if (!val) {
      setPhone(''); // Reset phone if the value is undefined
      return;
    }
  
    if (country) {
      try {
        const valueWithoutCountryCode = val.slice(1 + getCountryCallingCode(country).length);
        setPhone(valueWithoutCountryCode); // Set the parsed phone number
      } catch (error) {
        console.error('Error parsing phone number:', error);
        setPhone(''); // Reset phone on error
      }
    } else {
      setPhone(val); // If no country is selected, set the full phone number
    }
    onChangeHandler(value, valid)
  };
   const labelsLng = ():Record<SupportedLanguages,any> => {
  return locale[language] || en; // Default to English if the language is not found
}; 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (password !== confirm_password) {
      alert('Passwords do not match!');
      return;
    }
     let registerUser= {
      confirm_password,
      email,
      first_name,
      last_name,
      password,
      phone,
      role:selectedRole? selectedRole: "user"
    }
    
    const gqlQuery =gql`mutation RegisterUser($user: UserInput!) { 
    registerUser(user: $user) { 
      email
      first_name
      last_name 
      phone 
      } 
    }`
    try {
      const gqlModifiedQuery = print(gqlQuery)
      
      const payload = {
        query:  gqlModifiedQuery,
        variables: {
          user: registerUser
        }
      }
      let config = {
        method: 'post',
        url: APP_URL,
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'

        },
        data : payload
      };
      
      return await axios.request(config)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error)
      });
      
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Error signing up');
    }
  };
  function parseSelected(e: React.ChangeEvent<HTMLSelectElement>) {
    const valueToParse = e.target.value;
    const itemSelected = valueToParse;
    setSelectedRole(itemSelected);
    return;
  }
  return (client &&
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">First name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <div className="col-9 text-left">
                <label className="block text-gray-700">Assign a role</label>
                </div>
                <div className="col-2 text-left">
                    <select onChange={parseSelected}>
                        { roles.map((e,i)=>
                            <option itemID={String(i+1)}  key={e}>{e}</option>
                          )
                        }
                    </select>
                </div>
                <div className="col-1 text-left">
                    <label>&nbsp;</label>
                </div>
          </div>
          <div
            className={`PhoneInputComponent ${valid ? '' : 'PhoneInputComponent--invalid'} ${
                className ? className : ''
            }`}>
                <label htmlFor={htmlFor}>
                    <span className="PhoneInputComponent__title" style={{ color: valid ? '' : '#eb5757' }}>
                        {label ? label : 'phone'}
                    </span>
                </label>
            
            <label className="block text-gray-700">Phone </label>
            {defaultCountry &&(
             <PhoneInput
             countrySelectComponent={PhoneInputCountrySelect}
             countrySelectProps={{
               labels: labelsLng(),
             }}
             international
             withCountryCallingCode
             placeholder="+380111111111"
             value={phone}
             onChange={onChange}
             countryOptionsOrder={['UA', 'GB', 'PL', 'DE', 'PT', '|', '...']}
           />
            )
            }
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="flex justify-center items-center mt-6">
          <button className="bg-red-500 text-white px-4 py-2 rounded mr-2">Sign in with Google</button>
          <button className="bg-blue-700 text-white px-4 py-2 rounded">Sign in with Facebook</button>
        </div>
      </div>
    </div>
  );
};