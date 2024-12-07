# Steps

<ol>
    <li>Use a large language model to clean the data using a combination of one-shot learning and chain-of-thought techniques
        <ol>
            <li>
            Reorganize the data:
            "Please reorganize the following sandwich descriptions into a more readable table, including the following columns as appropriate:
            - the sandwich name,
            - ingredients list,
            - upper price estimate (if provided),
            - calorie estimate (if provided),
            - cuisine type (if provided)"
            </li>
            <li>
            Include domain-specific knowledge or more nuanced modifications that might've been overlooked or not described in the original data:
            "Please make the following substitutions and changes:
            - Replace ambiguous phrasing, such as "with your choice of Wrap" with simple ingredients, such as "Wrap""
            </li>
            <li>
            Map the semi-structured data to the original dataset's JSON format, with the addition of a "name" field:
            "Please parse the table entries into a list containing JSON objects of the following format:
            {
                "id": 13816,
                "name": "Shrimp Po'boy",
                "ingredients": [
                "baguette",
                "salt",
                "medium shrimp",
                "tomatoes",
                "yellow bell pepper",
                "scallions",
                "bread",
                "dijon mustard",
                "creole seasoning",
                "romaine lettuce",
                "extra-virgin olive oil",
                "reduced fat mayonnaise"
                ],
                "cuisine": null,
                "cost": 9.50,
                "calories": 400
            }"
            </li>
        </ol>
    </li>
    <li>Save the JSON output to a new file</li>
	<li>Next, locate the desired restaurant's list of available ingredients</li>
    <li>Scrape the list of ingredients, their categories, and their costs</li>
    <li>
        Use a large language model to clean the data using a combination of one-shot learning and chain-of-thought techniques
        Example prompt: "Given the following list of sandwich ingredients and potential additions, organize them into a CSV format with three columns: Category, Ingredient Name, and Additional Cost. Each ingredient should be categorized as 'Bread,' 'Meat,' 'Veggie,' 'Cheese,' or 'Condiment,' and listed by name. If an ingredient has an extra cost, include it in the Additional Cost column as a plain number without symbols. Arrange optional additions under their respective categories, ensuring each entry has a category and aligns with the initial data intent. Provide the output as CSV text."
    </li>
    <li>Save the CSV output to a new file</li>
    <li>Open the Restructure Menus and Ingredients.ipynb notebook</li>
    <li>Modify the class variables to refer to the correct the previously mentioned JSON and CSV files</li>
    <li>Run the notebook</li>
    <li>The restructured JSON menu and ingredient lists file will automatically download</li>
    <li>Rename and move the file to the appropriate folder</li>
    <li>Once you've reviewed and are satisfied with what you've got, upload it to a new table in your backend database</li>
    </li>
</ol>
