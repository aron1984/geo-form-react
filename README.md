<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div>
  <a href="#">
    <img src="src/assets/img/g-logo_myv.svg" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">GEOFORM REACT v3.0.0</h3>

  <p>Some variants of the logo.</p>

   <img src="src/assets/img/myvlogo-logos_variantes.svg" height="60" alt="">
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

This project started as an alternative to address the problem we encountered. It allowed me to merge my skills and expertise in cartography, geography, and design.

Here's why:

During fieldwork, we often encountered the need to update information about the beneficiaries. The provided form serves as an example of the available options, but you can also add other entries based on specific needs.

If fieldwork requires automatic geolocation, this project has it covered. However, it also allows for manual geolocation handling when needed.

You can submit geolocations, names, and descriptions by default. It connects to a database and saves the submitted information.

Finally, it streamlines the process of handling field information, eliminating the need for manual place searching on the map.

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgments section. Here are a few examples:

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [Leaflet](https://leafletjs.com/)
- [Firebase](https://firebase.google.com/?hl=es)
- [Vercel](https://vercel.com/)

<!-- GETTING STARTED -->

## Getting Started

Below, I share a series of steps and features for you to install the project. Feel free to modify and enhance this code. Assuming you already have a Firebase project, these steps should be sufficient.

### Installation

1. Into of you firebase account, search "config proyect" (SDK) and copy data.
   ```sh
    const firebaseConfig = {
    apiKey: "xxxxxxxxxxxxxxxx",
    authDomain: "xxxxxxxxxxxxxxxx",
    projectId: "xxxxxxxxxxxxxxxx",
    storageBucket: "xxxxxxxxxxxxxxxx",
    messagingSenderId: "xxxxxxxxxxxxxxxx",
    appId: "xxxxxxxxxxxxxxxx"
    };
   ```
2. Clone the repo
   ```sh
   git clone git@github.com:aron1984/geo-form-react.git
   ```
3. Set the firebase.js into, with the info than copy at the top
   ```sh
   const firebaseConfig = {
      apiKey: import.meta.env.VITE_API_KEY,
      authDomain: import.meta.env.VITE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_APP_ID,
   };
   ```
4. In Vercel setings => Environment variables set the top variables.

5. In file .env, configure the variables
   ```sh
   VITE_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   VITE_PROJECT_ID=XXXXXXXXXXXXXXXXXXXXXXX
   VITE_AUTH_DOMAIN=XXXXXXXXXXXXXXX.firebaseapp.com
   VITE_STORAGE_BUCKET=XXXXXXXXXXXXXXXXXXXXXXX
   VITE_MESSAGING_SENDER_ID=XXXXXXXXXXXX
   VITE_APP_ID=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

<!-- USAGE EXAMPLES -->

## Usage

<img alt="" src="https://res.cloudinary.com/dzvvin1g2/image/upload/v1697684344/app-location/geoform_1_punpax.jpg" height='300' />
<img alt="" src="https://res.cloudinary.com/dzvvin1g2/image/upload/v1697684344/app-location/geoform_2_mkunhy.jpg" height='300' />
<img alt="" src="https://res.cloudinary.com/dzvvin1g2/image/upload/v1697684344/app-location/geoform_3_gva5lv.jpg" height='300' />
<img alt="" src="https://res.cloudinary.com/dzvvin1g2/image/upload/v1697684344/app-location/geoform_4_ldpsc6.jpg" height='300' />
<img alt="" src="https://res.cloudinary.com/dzvvin1g2/image/upload/v1697684344/app-location/geoform_5_te2kag.jpg" height='300' />
<img alt="" src="https://res.cloudinary.com/dzvvin1g2/image/upload/v1700928270/app-location/noztpubuisozs75aozsi.png" height='300' />
<img alt="" src="https://res.cloudinary.com/dzvvin1g2/image/upload/v1700928270/app-location/wqykpgnvvrcqn0ljztcz.png" height='300' />
<img alt="" src="https://res.cloudinary.com/dzvvin1g2/image/upload/v1700928270/app-location/ffvmxde0cgr6n6dyluo4.png" height='300' />
<img alt="" src="https://res.cloudinary.com/dzvvin1g2/image/upload/v1700928528/app-location/geofrom9_wg6mwb.png" height='300' />

<!-- ROADMAP -->

## Roadmap

- [x] Add map
- [x] Add geolocate
- [x] Add form & alerts
- [x] Add Page List
- [x] Add Login in Navbar
- [x] Add user category for use the form (admin, client, visitor)
    - [x] Rol admin: add, edit and delete geolocation
    - [x] Rol visitor: navigate, read only geolocations
    - [x] Rol client: navigate, read only geolocations
        - [ ] View and admin only your geolocations
- [x] Save in sessionStorage locations when profile si 'client or visitor'
- [x] Add layers map
- [x] Add LayerControl
    - [x] Add base map: Satelite, Dark
    - [x] Add show control pints layers
- [x] Add Button acttion download print map
- [x] Add visitor mode, save data in the sessionStorage

---
Next:

- [ ] Add light & dark mode app
- [ ] Add browser
- [ ] Add form state off line
- [ ] Multi-language Support
    - [ ] English
    - [x] Spanish

<!-- CONTRIBUTING -->

<!-- LICENSE -->

## Demo

Page demo - [https://geo-form-react.vercel.app/](https://geo-form-react.vercel.app/)

<!-- CONTACT -->

## Contact

Your Name - [linkedin](https://www.linkedin.com/in/alejandro-ronconi/) - ronconialejandro@gmail.com

<img alt="" src="src/assets/img/g-myvsolutions.svg" height="40">

<p><a href="#top">TO TOP</a></p>
