# SandoMatch

## Find your perfect sandwich

![Sign Up Flow (1)](https://github.com/user-attachments/assets/6e817bb0-1504-4972-ba22-53ce04685c0b)

![Sign In Flow (1)](https://github.com/user-attachments/assets/185a49fc-6077-40f2-8bae-a51736075960)

<hr>

## Making changes

<ol>
	<li>To add new functionality, we recommend starting by copying an existing one, renaming and then altering the contents of its respective function.</li>
	<li> After creating a new function, and before you export it to be integrated with the rest of the build, make sure you're validating the function properties similar to the following:
		```
		// Validate FilterPage props
		FilterPage.propTypes = {
		filters: PropTypes.shape({
			include: PropTypes.array.isRequired,
			exclude: PropTypes.array.isRequired
		}).isRequired,
		setFilters: PropTypes.func.isRequired,
		applyFilters: PropTypes.func.isRequired,
		};
		```
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
