_Final Project Prospectus_
# [Droso] Fruit Recognizer Playground
<img align="right" src="img/fruitfly/droso-static.png">
Hi, I'm Droso :honeybee:, my full name is _drosophila melanogaster_, a common fruit fly. Actually tho, I'm just a simple robot that knows and learns about fruits. I'll recognize the fruit you give me, and if I'm wrong, you're welcome to teach me the correct name.

### Functionality
* Droso learns the names of #manyfruits :apple::green_apple::tangerine::lemon::cherries::grapes::watermelon::strawberry::peach::melon::banana::pear::pineapple: from a training set
* user input an image of a fruit (preferably solid color background)
* Droso processes it with a `fun meter` and returns a most-likely name and ask for correctness
  * if incorrect, Droso displays the top-five possibilities in descending order for user to choose from
  * if none apply, user can click "Nah, silly robot. Let me teach you." to reveal an input box, and user input the correct name
* correct or user-corrected outcomes are stored and await admin to validate and append data
* Droso uses the appended data in training set and re-train

---
### AI Fallbacks
* Handwritten digit recognition. (kaggle)
* Leaf recognition. (kaggle)

### MVP Fallbacks for FEWD 29
* Complete design guideline for the project (palette, pattern, font etc)
* scrolling/slide nav sections
  * Intro
  * Playground
  * Bio
* sections
* github.io hosted
* ajax call json file, return val

### Stacks
* Web Dev (html/css/js)
  * MongoDB
  * Express
  * Angular.js
  * Node.js / Django?
* AI (py)
  * Proprocessing/manipulation: num.py sci.py pandas.py
  * Simple ML: scikit-learn
  * Deep Learning/NN: keras.py on theano.py
* AWS EC2
