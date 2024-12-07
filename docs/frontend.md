# Frontend Architecture

<ul>
  <li>public<ul>
    <li>vite.svg</li>
    </ul>
  </li>
  <li>src<ul>
    <li>assets<ul>
      <li>background.jpg</li>
      <li>filter.png</li>
      <li>filter1.png</li>
      <li>filter2.png</li>
      <li>gluten-free.png</li>
      <li>react.svg</li>
      <li>user-icon-img.png</li>
      <li>vegan.png</li>
      <li>vegan2.png</li>
      <li>vegetarian.png</li>
      </ul>
    </li>
    <li>user-pages<ul>
      <li>MyBookmarkedSandos.jsx</li>
      <li>MyFavoriteSando.jsx</li>
      <li>MyReviews.jsx</li>
      <li>MyTriedSandos.jsx</li>
      <li>UserPage.jsx</li>
      </ul>
    </li>
    <li>App.css</li>
    <li>App.jsx</li>
    <li>FilterPage.jsx</li>
    <li>Login.jsx</li>
    <li>Rating.jsx</li>
    <li>SandwichList.jsx</li>
    <li>SandwichPage.jsx</li>
    <li>Signup.jsx</li>
    <li>index.css</li>
    <li>main.jsx</li>
    <li>sandwiches.json</li>
    </ul>
  </li>
  <li>.gitignore</li>
  <li>eslint.config.js</li>
  <li>index.html</li>
  <li>package.json</li>
  <li>vite.config.js</li>
</ul>

<br>
<br>

<ul>
  <li><strong>MyBookmarkedSandos.jsx:</strong> Imports useEffect, useState, Link, Rating, veganImg, vegetarianImg, and glutenFreeImg, exports MyBookmarkedSandos.</li>
  <li><strong>MyFavoriteSando.jsx:</strong> Imports useEffect, useState, Link, Rating, veganImg, vegetarianImg, and glutenFreeImg, exports MyFavoriteSandos.</li>
  <li><strong>MyReviews.jsx:</strong> Imports useEffect, useState, and Link, exports MyReviews.</li>
  <li><strong>MyTriedSandos.jsx</strong><strong>:</strong> Imports useEffect, useState, Link, Rating, veganImg, vegetarianImg, and glutenFreeImg, exports MyTriedSandos.</li>
  <li><strong>UserPage.jsx:</strong> Imports Route, Routes, Link, useEffect, useState, MyBookmarkedSandos, MyFavoriteSandos, MyTriedSandos, and &quot;../App.css&quot;, exports UserPage.</li>
  <li><strong>App.css:</strong> Imports Pacifico from &quot;fonts.googleapis&quot;.</li>
  <li><strong>App.jsx:</strong> Imports useEffect, useState, BrowserRouter, Routes, Route, Link, sandwichData, FilterPage, SandwichList, Login, Signup, UserPage, MyBookmarkedSandos, MyFavoriteSandos, MyReviews, MyTriedSandos, &quot;./App.css&quot;, and filterIcon, exports App.</li>
  <li><strong>FilterPage.jsx:</strong> Imports React, Link, and PropTypes, exports FilterPage.</li>
  <li><strong>Login.jsx:</strong> Imports PropTypes, useState, Link, and useNavigate, exports Login.</li>
  <li><strong>Rating.jsx:</strong> Imports PropTypes, exports Rating.</li>
  <li><strong>SandwichList.jsx:</strong> Imports PropTypes, Rating, veganImg, vegetarianImg, and glutenFreeImg, exports SandwichList.</li>
  <li><strong>SandwichPage.jsx:</strong> Imports PropTypes and Rating.</li>
  <li><strong>Signup.jsx:</strong> Imports PropTypes, useState, Link, and &quot;./App.css&quot;, exports Signup.</li>
  <li><strong>main.jsx:</strong> Imports StrictMode, createRoot, &quot;./index.css&quot;, and &quot;./App.jsx&quot;.</li>
</ul>

## [Frontend deployment](https://delightful-mushroom-05d6e7b1e.5.azurestaticapps.net/)

### React + Vite

This template provides a minimal setup to get React working in
Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)
  uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)
  uses [SWC](https://swc.rs/) for Fast Refresh
