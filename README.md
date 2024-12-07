<h1><a href="https://delightful-mushroom-05d6e7b1e.5.azurestaticapps.net/"> SandoMatch </a></h1>
<h3> Find your perfect sandwich </h3>
  <p>
    Sandwiches are tasty, but there are an infinite number of combinations and we have a finite amount of time to try them.
  </p>
  <p>
    With our app, users can:
  </p>
  <ul>
    <li>Find and try new, unique sandwiches</li>
    <li>Indicate their favorite sandwich, bookmark ones they'd like to eat again, and mark the sandwiches they've tried when logged in</li>
    <li>Search for sandwiches or select one at random</li>
  </ul>
<br>
<br>

## Diagrams

### <a href= "https://www.figma.com/proto/fRAbSVGwIAc95xU4o6zg3u/SandoMatch-Wireframe?node-id=4-16&node-type=canvas&t=kHfc9f0rpzotQUT9-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=4%3A16">UI Prototype</a>

<p>Last updated November 4, 2024</p>

### Signup Flow

![Sign Up Flow (1)](https://github.com/user-attachments/assets/6e817bb0-1504-4972-ba22-53ce04685c0b)

### Sign-In Flow

![Sign In Flow (1)](https://github.com/user-attachments/assets/185a49fc-6077-40f2-8bae-a51736075960)

<hr>

## Making changes

<ol>
	<li>
		To add new functionality, we recommend starting by copying an existing one, renaming and then altering the contents of its respective function.
	</li>
	<li>
		After creating a new function, and before you export it to be integrated with the rest of the build, make sure you're validating the function properties similar to the following:
		<br><br>
		<i>
		// Validate FilterPage props				<br>
		FilterPage.propTypes = {					<br>
		filters: PropTypes.shape({					<br>
			include: PropTypes.array.isRequired,	<br>
			exclude: PropTypes.array.isRequired		<br>
		}).isRequired,								<br>
		setFilters: PropTypes.func.isRequired,		<br>
		applyFilters: PropTypes.func.isRequired,	<br>
		};
		</i>
	</li>
</ol>

<hr>

## Local Testing/Deployment Setup

Make sure that you test any changes to your local build prior to
requesting your branch be merged into main.

#### In the root directory:

<ol>
	<li><b>npm ci</b></li>
</ol>
Note: if the above gives you an error, try removing the <b>package-lock.json</b> file and running <b>npm install</b>

#### In packages/expess-backend:

<ol>
	<li><b>npm lint</b></li>
	<li><b>npm run dev</b></li>
</ol>

#### In packages/react-frontend:

<ol>
	<li><b>npm lint</b></li>
	<li><b>npm run dev</b></li>
</ol>

<hr>

## Architecture

<ul>
  <li>.github/workflows<ul>
    <li>azure-static-web-apps-delightful-mushroom-05d6e7b1e.yml</li>
    <li>ci-testing.yml</li>
    <li>main_sandomatch</li>
    </ul>
  </li>
  <li>.idea<ul>
    <li>.gitignore</li>
    <li>.name</li>
    <li>SandoMatch.iml</li>
    <li>misc.xml</li>
    <li>modules.xml</li>
    <li>vcs.xml</li>
    <li>workspace.xml</li>
    </ul>
  </li>
  <li>docs<ul>
    <li>backend.md</li>
    <li>dataset.md</li>
    <li>frontend.md</li>
    <li>uml.md</li>
    </ul>
  </li>
  <li>packages<ul>
    <li><a href="./docs/backend.md">express-backend</a></li>
    <li><a href="./docs/frontend.md">react-frontend</a></li>
    </ul>
  </li>
  <li>.gitignore</li>
  <li>CONTRIBUTING.md</li>
  <li>README.md</li>
  <li>package-lock.json</li>
  <li>package.json</li>
</ul>

## Sources

<ul>
  <li><a href="https://www.kaggle.com/datasets/kaggle/recipe-ingredients-dataset"> Kaggle Recipe Ingredients Dataset </a></li>
  <li> Local restaurant sandwich menu details
    <ul>
    <li> Subway
		<ul>
		<li><a href="https://usf.campusdish.com/-/media/Local/Higher-Education/GroupC/SouthFlorida/Files/Menus/nutrition-and-allergen/Subway---Ingredient-info.ashx">
			Ingredient list
		</a></li>
		<li><a href="https://subway.com.tw/en/include/meals-nutrition.html">
			Nutritional information
		</a></li>
		<li><a href="https://subway-menus-with-prices.com/">
			Sandwich name and price list
		</a></li>
		</ul>
	</li>
    <li> Mr. Pickle's
		<ul>
		<li><a href="https://mrpickles.orderexperience.net/61a8e49a95b701075d8b456c/menu/">Online menu</a></li>
		</ul>
	</li>
    <li> Urbane Cafe
		<ul>
		<li><a href="https://order.thanx.com/urbanecafe">Online menu</a></li>
		</ul>
	</li>
	</ul>
  </li>
</ul>
  
</ol>
