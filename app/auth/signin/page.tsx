'use client';
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { print } from 'graphql';
import gql from 'graphql-tag';
import { useAuth } from '../../utils/AuthContext';

export default function SignIn() {
  const router = useRouter()
  const APP_URL = process.env.NEXT_PUBLIC_APP_LIVE_URL || process.env.NEXT_PUBLIC_APP_URL ||''
  
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoggedIn } = useAuth(); // Access the context
    
    const handleSubmit = async (event: FormEvent<HTMLFormElement>)=> {
    event.preventDefault();
    console.log("hi signin")
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
 
    let loginUser ={
      email,
      password
    }
    let query = gql`mutation Login( $user: loginInput!) { 
        login(user: $user) { 
          tokens {
            token
            tokenExpiresIn
          }
          email
          role
          first_name
          last_name
          } 
          }`
    const gqlModifiedQuery = print(query)
          
          const payload = {
            query:  gqlModifiedQuery,
            variables: {
              user: loginUser
            }
          }
          console.log(gqlModifiedQuery)
          let config = {
            method: 'post',
            url: APP_URL,
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            data : payload
          };
 
          let response = await axios.request(config)
          .then(async(response) => {
            let data = await response.data;
            
            localStorage.setItem("userData", JSON.stringify(data));
             const token = data?.data?.login?.tokens[0].token;
             localStorage.setItem("token", token);
            
             await login(token)
            router.push('/profile')
            return response
          })
          .catch((error) => {
            console.log(error);
            throw new Error(error)
          });
          
  }
 
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
    <form onSubmit={handleSubmit}>
    <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
      </div>
    <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name='password'
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >Sign In
      </button>
    </form>
    </div>
    </div>
  )
}