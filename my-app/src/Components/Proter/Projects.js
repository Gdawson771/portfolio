import React from "react"
import "../../css/Tasks.css"

export default function Projects() {

    return (<div className="tasks--mainDiv mt-16">
        <body class="bg-darkSlateBlue md:p-10 p-4   ">

            <div class="bg-sunset1 md:p-5 mb-5 p-2 rounded-lg">
                <h2 class="text-sunset5 text-lg mb-4">Full-stack, Typesafe, Next.js Twitter Clone - Sep 2023</h2>
                <p class="text-slate-200">This project encompassed the development of a sophisticated Twitter clone where users' tweets are satirically ranked based on the amount of Ethereum they have in their wallets. The platform, built to support over 50k users, is entirely serverless and leverages a relational database. To interact with the platform, users require a Metamask account. The entire platform is hosted on Vercel. This project enhanced my technical skills in full-stack development, especially with Next.js, and serverless architectures. Simultaneously, I developed a robust ability for independent problem-solving, navigating challenges autonomously.</p>
                <a href="https://plutocrater.garethdawson.dev">
                <button class="bg-sunset5 text-darkSlateBlue px-6 py-2 rounded font-semibold hover:bg-sunset4 transition duration-200">
                    Visit Plutocrater
                </button>
            </a>
            </div>

            <div class="bg-sunset1 p-5 mb-5 rounded-lg">
                <h2 class="text-sunset5  text-lg mb-4">Proter – Discrete event simulator for modelling workflows - May 2022 – Apr 2023</h2>
                <p class="text-slate-200">In collaboration with a team, I designed, developed, and rigorously tested the front-end GUI for Proter. This GUI grants users access to the comprehensive API functionalities of Proter, which were previously accessible only programmatically. My contribution to this open-source project involved in-depth technical proficiency in front-end design and integration with backend API systems. This experience also reinforced my collaborative skills, understanding the synergy of working in a team environment.</p>
            </div>

            <div class="bg-sunset1 p-5 mb-5 rounded-lg">
                <h2 class="text-sunset5 text-lg mb-4">Implemented the game GO in Solidity - Oct 2022</h2>
                <p  class="text-slate-200">GO, a complex board game, was intricately redesigned for the Ethereum platform. The challenge was to design a low gas-consuming solution to play GO on Ethereum, ensuring robust security, especially when at least one honest party is involved. Working alongside a partner, we conceptualized a system that uses off-chain bots to monitor the game's progression, resulting in a minimal gas solution without compromising security. This project broadened my skills in blockchain development, particularly in Solidity, and designing efficient solutions for Ethereum.</p>
            </div>

            <div class="bg-sunset1 p-5 mb-5 rounded-lg">
                <h2 class="text-sunset5 text-lg mb-4">Scrimba frontend developer career path - May 2022 – Aug 2022</h2>
                <p  class="text-slate-200">Over a span of a few months, I committed over 70 hours to tutorials that extensively covered Javascript, React, API integration, and CSS. Among the courses was Scrimba's 26-hour advanced React course conducted by Bob Ziroll. The culmination of this learning trajectory was the creation of intricate React applications, including a trivia app which leverages the Trivia-API. This journey solidified my technical knowledge in frontend development, especially with React, and the application of theoretical knowledge to practical applications.</p>
            </div>

            <div class="bg-sunset1 p-5 mb-5 rounded-lg">
                <h2 class="text-sunset5 text-lg mb-4">Voice-activated spice dispenser using AWS Lex and Flask - Jan 2022 – Apr 2022</h2>
                <p  class="text-slate-200">In a team project comprising eight other developers, we crafted a voice-activated spice dispenser. My role centered around developing a Flask server that operated on a Raspberry Pi, coordinating the spice dispensation. Additionally, an AWS Lex chatbot was integrated to facilitate user communication with the Flask server. This project was a testament to my skills in IoT integration, Flask, and chatbot development. Furthermore, working in a team emphasized the significance of regular meetings and seamless communication, ensuring the project's successful execution.</p>
                <img src="src\Components\Proter\imgs\SpiceDevice.jpg" alt="Drone Flight Path" />;
           
            </div>

            <div class="bg-sunset1 p-5 mb-5 rounded-lg">
                <h2 class="text-sunset5 text-lg mb-4">Superkarma ETH Global hackathon - Jul 2021</h2>
                <p  class="text-slate-200">This project hinged on the utilization of the Superfluid protocol layer to enable uninterrupted streaming of money on Ethereum. We crafted a mechanism for effortless streaming to a collective pool. Contributors, in return, received governance tokens. A unique design feature ensured that the accumulated governance tokens determined the charitable institutions for donations. Through this hackathon, I acquired hands-on experience in Ethereum-based application development and innovatively merged financial streaming with decentralized governance.</p>
            </div>

            <div class="bg-sunset1 p-5 mb-5 rounded-lg">
                <h2 class="text-sunset5 text-lg mb-4">Drone driver</h2>
                <p  class="text-slate-200">The Drone driver project was a deep dive into optimization algorithms. Designed for a model similar to UberEats, the objective was to determine the most profitable route between a many of customers and many restaurants, integrating the A* algorithm. A significant challenge was the integration of no-fly zones. This project bolstered my understanding of optimization algorithms, particularly the A* algorithm, and applying them to real-world logistical challenges. The project was a large scale object oriented project written entirely in Java.</p>
                <img src="src\Components\Proter\imgs\ILPFlightPath.jpg" alt="Drone Flight Path" />;
            </div>

        </body>
    </div>)
}