// About.js

import React from 'react';

const About = () => {
    return (
        <section id="about" className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-green-600 mb-8">
                    About GeeksforGeeks
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    <strong>Company Profile and Brand:</strong>
                    GeeksforGeeks is a leading platform that provides
                    computer science resources and coding challenges for
                    programmers and technology enthusiasts, along with 
                    interview and exam preparations for upcoming aspirants.
                    With a strong emphasis on enhancing coding skills and 
                    knowledge, it has become a trusted destination for over 
                    12 million plus registered users worldwide.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    The platform offers a vast collection of tutorials, 
                    practice problems, interview tutorials, articles, and 
                    courses, covering various domains of computer science. 
                    Our exceptional mentors hailing from top colleges & 
                    organizations have the ability to guide you on a journey 
                    from the humble beginnings of coding to the pinnacle of 
                    expertise. Under their guidance, watch your skills 
                    flourish as we lay the foundation and help you conquer 
                    the world of coding.
                </p>
            </div>
        </section>
    );
};

export default About;
