//restaurant-ingredients.js

import mongoose from "mongoose";

const IngredientsSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true
    },
    breads: {
      baguette: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      ciabatta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      pita: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      naan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      tortilla: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      roll: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      sourdough: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      rye: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      multigrain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      whole wheat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      white bread: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      brioche: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      focaccia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      panini: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      english muffin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      bagel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      croissant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      milk bread: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      flatbread: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      pumpernickel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      pretzel roll: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      potato bread: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      bolillo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      torta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      lavash: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      cornbread: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      chapati: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      paratha: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      wrap: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      bun: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      steamed bun: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      }
    },
    meats: {
      beef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      chicken: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      turkey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      pork: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      ham: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      bacon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      sausage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      bratwurst: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      salami: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      prosciutto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      pepperoni: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      pastrami: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      mortadella: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      lamb: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      duck: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      roast beef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      veal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      venison: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      chorizo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      capicola: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      bresaola: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      pancetta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      smoked fish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      tuna: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      shrimp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      crab: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      lobster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      meatballs: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      pulled pork: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      carnitas: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      corned beef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      brisket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      gyro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      char siu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      shawarma: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      jerky: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      }
    },
    cheeses: {
      cheddar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      mozzarella: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      swiss: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      provolone: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      brie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      gorgonzola: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      feta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      parmesan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      gouda: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      ricotta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      blue cheese: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      goat cheese: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      monterey jack: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      cream cheese: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      american cheese: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      colby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      pepper jack: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      gruyere: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      camembert: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      asiago: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      romano: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      havarti: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      burrata: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      stracciatella: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      queso fresco: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      cotija: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      paneer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      halloumi: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      }
    },
    vegetables: {
      lettuce: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      tomato: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      onion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      pepper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      }, 
      spinach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      cucumber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      basil: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      sprouts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      avocado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      kale: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      zucchini: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      carrot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      radish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      celery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      mushrooms: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      pickle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      scallion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      watercress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      eggplant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      beet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      fennel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      artichoke: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      garlic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      olive: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      sun-dried tomato: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      kimchi: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      cabbage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      greens: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      herbs: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      }
    },
    condiments: {
      mayonnaise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      mustard: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      oil: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      }, 
      butter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      ketchup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      relish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      vinegar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      dressing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      salsa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      sauce: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      pesto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      chimichurri: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      aioli: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      tahini: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      honey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      horseradish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      hummus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      guacamole: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      tartar sauce: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      yogurt sauce: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      dijon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      marinara: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      glaze: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      chutney: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      }
    },
    spices: {
      salt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      black pepper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      cumin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      paprika: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      coriander: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      oregano: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      basil: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      thyme: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      rosemary: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      cayenne pepper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      turmeric: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      parsley: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      dill: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      cinnamon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      nutmeg: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      allspice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      cloves: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      cardamom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      bay leaf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      saffron: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      sage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      mustard seed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      fenugreek: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      anise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      five-spice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      powder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      seasoning: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      zaatar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      },
      sumac: {
        type: mongoose.Schema.Types.ObjectId,
        ref: IngredientInfo
      }
    }
  },
  { collection: "restaurant_ingredients" }
);

const IngredientModel = mongoose.model("Ingredients", IngredientSchema);
          
export default IngredientModel;

