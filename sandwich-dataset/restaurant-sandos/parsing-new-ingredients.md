# Steps
<ol>
    <li>Locate the desired restaurant's list of available ingredients</li>
    <li>Scrape the list of ingredients, their categories, and their costs</li>
    <li>
        Use a large language model to clean the data using a combination of one-shot learning and chain-of-thought techniques
        Example prompt: "Given the following list of sandwich ingredients and potential additions, organize them into a CSV format with three columns: Category, Ingredient Name, and Additional Cost. Each ingredient should be categorized as 'Bread,' 'Meat,' 'Veggie,' 'Cheese,' or 'Condiment,' and listed by name. If an ingredient has an extra cost, include it in the Additional Cost column as a plain number without symbols. Arrange optional additions under their respective categories, ensuring each entry has a category and aligns with the initial data intent. Provide the output as CSV text."
    </li>
    <li>Save the CSV output to a new file</li>
    <li>Open the Restructure Ingredient Data.ipynb notebook</li>
    <li>Run the first cell</li>
    <li>When prompted, upload the previously mentioned CSV file</li>
    <li>Run the remaining cells</li>
    <li>The restructured JSON entries file will automatically download</li>
    <li>Rename and move the file to the appropriate folder</li>
    <li>Once you've reviewed and are satisfied with what you've got, upload it to a new table in your backend database</li>
    </li>
</ol>