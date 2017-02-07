_Final Project Prospectus_
# [Droso] Fruit Recognizer Playground
<img align="right" src="img/fruitfly/droso-static.png" alt="Fruit Fly" style="width:300px;height:300px;">
Hi, I'm Droso :honeybee:, my full name is _drosophila melanogaster_, a common fruit fly. Actually tho, I'm just a simple robot that knows and learns about fruits. I'll recognize the fruit you give me, and if I'm wrong, you're welcome to teach me the correct name.

### Proposed Features
* Droso learns the names of #manyfruits :apple::green_apple::tangerine::lemon::cherries::grapes::watermelon::strawberry::peach::melon::banana::pear::pineapple: from a training set
* Users input an image of a fruit
* Droso processes it with a progress meter and returns a most-likely name and ask for correctness
  * if incorrect, Droso displays the top-three possibilities in descending order for user to choose from
  * if none apply, user can click `"Nah, silly robot. Let me teach you."` to reveal an input box, and user input the correct name
* correct or user-corrected outcomes are stored and await admin to validate and append data
* droso periodically re-train on the appended dataset

---
### Phase I {Current MVP (GA FEWD 29)}
- [x] fruitfly blink, scroll animation
- [x] scrolling nav
- [x] firebase hosted
- [x] Handwritten digit recognition. (MNIST)
- [x] Algorithmia API, random forest classifier
- [ ] **ajax call json file, return val**

### Phase II
- [ ] Rebuild front-end using React, SASS
- [ ] AWS EC2
- [ ] Redo wings scrolling animation
- [ ] Replace digit data with leaves data (kaggle)
- [ ] CNN with keras

### Phase III
- [ ] Collect fruit images, apply labels
- [ ] CNN with keras
