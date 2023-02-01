# Booking App

## Scenario

Currently, a visitor to the Little Lemon web app cannot reserve a table. Your task is to improve the app by allowing the user to enter data into the form so that they can complete their registration. Thus, you need to build a Booking Form component that has the following entries (form items):

- **Date**
- **Time**
- **Number of guests**
- **Occasion (Birthday, Anniversary)**
- **Submit reservation button** (to submit the form)

To do this, you need to implement a form in a controlled component named **BookingForm**.

---

# Instructions

**Step 1**: Check the component and routes
If you haven’t done so already, create the **BookingForm** and **BookingPage** components. The **BookingPage** will contain the **BookingForm** component, in addition to any additional content before and after the form.

> **Note**: Before proceeding to the next step, check that your routes and navigation bar are set up to allow navigation to the booking page.

**Step 2**: Code the form structure
Next, you’ll need to build the form structure in the **BookingForm** component. You can use the following plain HTML5 implementation as a starting point, however, you should convert it to JSX so that you can later connect the input to the React state.

```js
<form style="display: grid; max-width: 200px; gap: 20px">
   <label for="res-date">Choose date</label>
   <input type="date" id="res-date">
   <label for="res-time">Choose time</label>
   <select id="res-time ">
      <option>17:00</option>
      <option>18:00</option>
      <option>19:00</option>
      <option>20:00</option>
      <option>21:00</option>
      <option>22:00</option>
   </select>
   <label for="guests">Number of guests</label>
   <input type="number" placeholder="1" min="1" max="10" id="guests">
   <label for="occasion">Occasion</label>
   <select id="occasion">
      <option>Birthday</option>
      <option>Anniversary</option>
   </select>
   <input type="submit" value="Make Your reservation">
</form>
```

> **Note**: Keep in mind the difference between the **for** attribute in HTML and **htmlFor** in JSX. Also, remember to self-close all tags in JSX.

**Step 3**: Code the form behavior
Using what you already know about **events**, **effects** and **state** in React, update your form's code to keep track of its own state.

- Define a state variable for field in the form.

- Connect each **state** variable to the form fields using the value and **onChange** form element attributes.

- The options in the booking time field should be displayed from a list of available times. For now, create a stateful array in the component named **`availableTimes`** and use this state variable to populate the time select field options.

Tip: Use the **useState** function to declare the variable.

Now that the state is connected to the input elements, the form is ready to communicate with an API, a task you may complete in future.

---

# Instructions: Testing

Step 2: Test the **updateTimes** and **initializeTimes** functions

The next step is to validate the behavior of the updateTimes and **initializeTimes** reducer functions.

- Write a unit test for the **initializeTimes** function to validate that it returns the correct expected value.

- Write a unit test for the **updateTimes** function to validate that it returns the same value that is provided in the state. This unit test is important as it will be updated later when the logic of changing the available times based on the selected date is implemented.

---

# Instructions - Data Fetching

1. **Step 1**: Set up the API library

   To prepare for the completion of this exercise, you need to include the API JavaScript file in your code.

   Add the following code to your index.html.

   - <script src="https://raw.githubusercontent.com/Meta-Front-End-Developer-PC/capstone/master/api.js"></script>

   The API has two functions that you can use in your code:

   - **`fetchAPI (date)`** - This function accepts a date as a parameter and returns an array of available reservation times for the provided date

   - **`submitAPI (formData)`** - This function accepts the booking form data as a parameter and will return true if the data was successfully submitted.

- **Step 2**: Update the booking form to display the available times from the API

  - Update the **`initializeTimes`** function that you previously created to use the **`fetchData`** API function to return the available times for today’s date.

  > **Tip**: You can create a Date object to represent today’s date.

  - Update the updateTimes function that you previously created to use the **`fetchData`** API function. Remember, you dispatched the selected date to the **`updateTimes`** function. This should be passed to the **`fetchData`** function as a parameter.

- **Step 3**: Test the behavior

  Run your web app and check that the available times on the booking form change when you select a different date.

---

# Instructions - Booking Confirmation Page

**Step 1**: Set up a booking confirmation page

Create a component named ConfirmedBooking that will represent the booking confirmation page.

Add JSX to display a message that the booking has been confirmed.

Add a route that will allow navigation to the booking confirmation page.

**Step 2**: Set up the function for submitting the form
In the Main component, set up a function named submitForm that accepts the form data as a parameter and will submit it to the submitAPI (formData) API set up in the previous exercise.

If the submitAPI(formData) API call returns true, navigate to the booking confirmed page.

Tip: You can use the useNavigate() hook to navigate via code.

**Step 3**: Update the submit event handler
Pass the submitForm function to the BookingForm component via props.

Update the button submit event handler to call the submitForm function, passing the form data as a parameter.

Step 3: Test the app
Run the app and verify that the booking confirmation page is displayed when you submit the form.

---

# About Me

About Us: Little Lemon is a family-owned Mediterranean restaurant that blends traditional recipes with a modern twist. Our goal is to provide our customers with a unique dining experience that will take them on a culinary journey through the Mediterranean.

We use only the freshest ingredients to bring you authentic flavors that will tantalize your taste buds. Our menu is inspired by our family’s traditional recipes and has been passed down through generations. Our chefs use these recipes as a foundation, but add a contemporary touch to bring our dishes to life.

In addition to dining in, we also offer an online ordering facility for those who prefer to enjoy our food in the comfort of their own home. Our online ordering system is easy to use and provides a quick and convenient way to order your favorite Little Lemon dishes.

We also have tables available for booking, so whether it's for a special occasion or just a night out with friends, Little Lemon is the perfect venue for your next dining experience.

At Little Lemon, we strive to provide an exceptional dining experience that is both memorable and delicious. Come visit us and taste the difference that tradition and innovation can bring to your plate.

```json
[
  {
    "id": 1,
    "recipe_name": "Moussaka",
    "description": "A layered dish with eggplant, ground beef, and a creamy béchamel sauce.",
    "price": "$15"
  },
  {
    "id": 2,
    "recipe_name": "Falafel",
    "description": "Crunchy balls made from ground chickpeas and spices, served with tahini sauce.",
    "price": "$10"
  },
  {
    "id": 3,
    "recipe_name": "Tabbouleh",
    "description": "A salad with parsley, mint, tomatoes, and bulgur wheat, dressed with lemon and olive oil.",
    "price": "$12"
  },
  {
    "id": 4,
    "recipe_name": "Baklava",
    "description": "A sweet pastry with layers of phyllo dough and honey syrup, filled with ground nuts.",
    "price": "$7"
  },
  {
    "id": 5,
    "recipe_name": "Lamb Kofta",
    "description": "Minced lamb skewers with spices, served with a tomato sauce.",
    "price": "$18"
  },
  {
    "id": 6,
    "recipe_name": "Hummus",
    "description": "A creamy dip made from chickpeas, tahini, lemon, and garlic.",
    "price": "$8"
  },
  {
    "id": 7,
    "recipe_name": "Bouillabaisse",
    "description": "A fish stew with a tomato base, served with crusty bread.",
    "price": "$20"
  },
  {
    "id": 8,
    "recipe_name": "Ratatouille",
    "description": "A stewed vegetable dish with eggplant, bell peppers, zucchini, and tomatoes.",
    "price": "$12"
  },
  {
    "id": 9,
    "recipe_name": "Gazpacho",
    "description": "A cold soup with a blend of raw vegetables, breadcrumbs, and olive oil.",
    "price": "$10"
  },
  {
    "id": 10,
    "recipe_name": "Fattoush",
    "description": "A salad with mixed greens, tomatoes, cucumber, and pita chips, dressed with lemon and sumac.",
    "price": "$12"
  },
  {
    "id": 11,
    "recipe_name": "Shawarma",
    "description": "Marinated meat cooked on a spit and served in a pita with tahini sauce.",
    "price": "$15"
  },
  {
    "id": 12,
    "recipe_name": "Stuffed Bell Peppers",
    "description": "Bell peppers stuffed with a mixture of rice, ground meat, and spices.",
    "price": "$16"
  }
]
```
