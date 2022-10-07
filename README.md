<div align="center">
  <h3 align="center">Climbers Connect</h3>

  <p align="center">
    A social media app that connects climbers to other climbers!
    <br />
    <a href="https://github.com/brianschnee/climbers-connect#about-the-project"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://comingsoon.com/">Coming Soon</a>
    ·
    <a href="https://github.com/brianschnee/climbers-connect/issues">Report Bug</a>
    ·
    <a href="https://github.com/brianschnee/climbers-connect/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#lessons-learned">Lessons Learned</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<div align="center">
  <img src="https://user-images.githubusercontent.com/77141303/194457376-05430a1b-5ffa-41ed-a240-bcf67051eab2.gif" alt="Climbers Connect website" />
</div>

<br/>
Interact with other climbers, share the climbs you've completed, rate the climbs and create a better connection to the community we all know and love.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built with

- Mongoose
- Express.js
- Node
- EJS
- Passport
- JavaScript
- CSS
- Cloudinary

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Installation

_In order to clone a local copy of this repository, please follow the steps below._

1. Navigate to the folder you would like to store the project
2. Clone the repo
   ```sh
   git clone https://github.com/brianschnee/climbers-connect.git
   ```
3. Switch into the directory that was just created
    ```sh
    cd climbers-connect
    ```
4. Install NPM packages
   ```sh
   npm install
   ```
5. Navigate to the config folder
6. Create a .env file there called `.env`
7. Enter your MongoURI string in `.env` with the key `DB_STRING`
   ```sh
   DB_STRING="<Replace everything in quotes with MongoDB Connection String>"
   ```
8. Create a session secret for express sessions called `SESSION_SECRET`
    ```sh
    SESSION_SECRET="<any string value>"
    ```
9. Connect to your cloudinary db with the following 3 environment variables `CLOUD_NAME`, `API_KEY`, `API_SECRET`
    ```sh
    CLOUD_NAME="<cloud name here>"
    API_KEY="<api key here>"
    API_SECRET="<api secret here>"
    ```
10. To run the application, use `npm run start` to run the app in a development environment

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Coming soon...


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap

- [ ] Create Comment Schema 
- [ ] Add Comment Routes/Controllers
- [ ] Add Comments to posts
- [ ] Update FAQ
- [ ] Add Pagination to for rendered user posts
- [ ] Add area based chat rooms using socket.io

See the [open issues](https://github.com/brianschnee/climbers-connect/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Lessons Learned -->
## Lessons Learned

coming soon...

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Twitter - [@BrianSchneeDev](https://twitter.com/brianschneedev)

Email - [Contact Me](https://www.brianschnee.com/#contact)

Project Link: [https://github.com/brianschnee/climbers-connect](https://github.com/brianschnee/climbers-connect)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
