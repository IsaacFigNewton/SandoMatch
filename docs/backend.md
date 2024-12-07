# Backend Architecture
<ul>
  <li>models<ul>
    <li>reviews.js</li>
    <li>sandwiches.js</li>
    <li>users.js</li>
    </ul>
  </li>
  <li>modules<ul>
    <li>filters.js</li>
    <li>generation.js</li>
    </ul>
  </li>
  <li><a href="./docs/dataset.md">sandwich-dataset</a></li>
  <li>services<ul>
    <li>auth.js</span></li>
    <li>sandwich-services.js</li>
    </ul>
  </li>
    <li>backend.js</li>
    <li>eslint.config.js</li>
    <li>package.json</li>
</ul>

<br>
<br>
<br>

<ul>
  <li><strong>reviews.js</strong><strong>:</strong> Imports mongoose, exports ReviewModel.</li>
  <li><strong>sandwich-services.js:</strong> Imports mongoose, exports SandwichModel.</li>
  <li><strong>users.js:</strong> Imports mongoose, exports UserModel.</li>
  <li><strong>filters.js:</strong> Exports findSandwichById and filterSandwiches.</li>
  <li><strong>generation.js</strong><strong>:</strong> Exports generateSandwich.</li>
  <li><strong>auth.js:</strong> Imports bcrypt, jwt, and UserModel, exports registerUser, authenticateUser, and loginUser.</li>
  <li><strong>sandwich-services.js</strong>Imports mongoose and SandwichModel, exports findSandwichById, addSandwich, addReview, getSandwichObject, getSandwiches.</li>
  <li><strong>backend.js:</strong> Imports dotenv, express, cors, mongoose, sandoFilters, sandoGeneration, fs, path, fileURLToPath, UserModel, registerUser, authenticateUser, and loginUser.</li>
</ul>

## [Backend deployment](https://sandomatch.azurewebsites.net/)

### Express

<p>The backend is deployed using Express, a Node.js web application framework.</p>
