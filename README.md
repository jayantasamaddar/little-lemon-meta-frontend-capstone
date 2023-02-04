# Table of Contents

- [Table of Contents](#table-of-contents)
- [The Booking App](#the-booking-app)
- [Setup and Evaluation](#setup-and-evaluation)
- [Front-end Architecture](#front-end-architecture)
  - [Folder Structure](#folder-structure)
  - [Component Architecture](#component-architecture)
  - [Naming Conventions](#naming-conventions)
  - [Use of Dependencies](#use-of-dependencies)
  - [Data Fetching](#data-fetching)
  - [Unit Testing](#unit-testing)
- [Future Considerations](#future-considerations)
- [Honour Code](#honour-code)

---

# The Booking App

This Booking App was created as the final capstone project of the **Meta Front-End Developer Certification**.

**Preview**: Little Lemon is a family-owned Mediterranean restaurant that blends traditional recipes with a modern twist. Our goal is to provide our customers with a unique dining experience that will take them on a culinary journey through the Mediterranean.

**Instructions Received**: To create a modern responsive Front-end for the Little Lemon app with a Bookings feature which they lack at present.

---

# Setup and Evaluation

```s
# Run in the Terminal
git clone https://github.com/jayantasamaddar/little-lemon-meta-frontend-capstone.git folder

# Install Dependencies
npm install

# Launch app in Browser
npm start

# Run Tests
npm test

# Run Tests with Coverage
npm test:cv
```

---

# Front-end Architecture

There were several considerations for the frontend architecture.

1. **Folder Structure** - How would the files be organized in the `src` folder.
2. **Component Architecture** - How best to write reusable components.
3. **Naming Conventions** - How and why CSS classes, CSS Variables are named so.
4. **Use of Dependencies** - Choice on what dependencies to use.
5. **Data Fetching** - How we will manage the data used by the app.
6. **Unit Testing** - How to have good coverage in our unit tests.

---

## Folder Structure

Separate folders for:

- **components**: For individual components. Complex components have nested `components` folder. The component folder has 4 files usually (some components are auto-tested without having to create a separate test file. Thus a single folder inside the `components` folder is all inclusive as a single Unit having the Renderer, the stylesheet and the unit test.

  - `Component.jsx` (The Component)
  - `Component.css` (The stylesheet)
  - `index.js` (For exporting the component)
  - `Component.test.jsx` (Test file for the component)

- **pages**: Single Pages in the application that have a collection of these components laid out in different ways. The individual pages in the `pages` folder, may further optionally have a `components` (which represent sections, e.g. `Testimonials`) and optionally, a `pages` (for nested pages) folder in them.

- **context**: Contains Context Providers and basic hooks to access the Context data.
- **hooks**: Hooks unrelated to context. E.g. `useWindowResize` to track resizing the window.
- **actions**: Reducer function and initial states (and any hooks related to them)
- **utilities**: Utility functions. E.g. `validateNumber`.
- **settings**: Contains global settings. Has a `cms` folder that mocks a content management system from which we can source content for our pages. Can be internationalized later.

> **Note**: The following has been generated with: `tree -d -I 'node_modules|coverage'`

**The directory tree** (only directories and excluding `node_modules` and `coverage`):

```s
├── public
└── src
    ├── actions
    ├── assets
    ├── components
    │   ├── Backdrop
    │   ├── Button
    │   ├── Card
    │   ├── Error
    │   ├── Footer
    │   ├── Header
    │   │   └── components
    │   │       └── BurgerMenu
    │   ├── Heading
    │   ├── Icon
    │   ├── Label
    │   ├── Logo
    │   ├── Main
    │   ├── ProgressBar
    │   ├── ReviewStar
    │   ├── Select
    │   │   └── components
    │   │       └── Option
    │   ├── SocialMediaWidget
    │   ├── Stack
    │   ├── Table
    │   │   └── components
    │   │       ├── TableBody
    │   │       ├── TableCell
    │   │       ├── TableHeader
    │   │       └── TableRow
    │   └── Textfield
    ├── context
    │   ├── AppProvider
    │   ├── FormProvider
    │   └── ThemeProvider
    ├── hooks
    ├── pages
    │   ├── Booking
    │   │   ├── components
    │   │   │   └── BookingForm
    │   │   └── pages
    │   │       └── ConfirmedBooking
    │   └── Home
    │       └── components
    │           ├── About
    │           ├── Hero
    │           ├── Specials
    │           └── Testimonials
    ├── settings
    │   └── cms
    └── utilities
        └── tests
```

---

## Component Architecture

There following Design Patterns have been followed:

- Most components are single units of functional code.
- In case of complex components that are comprised of components that can be used standalone, they were broken into separate components. The folder structure above explains where they reside.

- Where responsibility needed to be isolated, it was done: E.g. Table ([read more]('./src/components/../../../src/components/Table/README.md')).

- The **`Stack`** and **`Table`** elements, **OPTIONALLY** also have the **[Composite Components pattern](https://betterprogramming.pub/compound-component-design-pattern-in-react-34b50e32dea0)**. It allows some more flexibility as explained in the Table documentation above.

  **Example**:

  ```jsx
  import { Table } from './components';

  const CustomTable = () => {
    return (
      <Table>
        <Table.Body>
          <Table.Header>
            <Table.Cell>ID</Table.Cell>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell>Price</Table.Cell>
          </Table.Header>

          <Table.Header>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>Apple</Table.Cell>
            <Table.Cell>3.00</Table.Cell>
          </Table.Header>

          <Table.Header>
            <Table.Cell>ID</Table.Cell>
            <Table.Cell>Mango</Table.Cell>
            <Table.Cell>5.00</Table.Cell>
          </Table.Header>
        </Table.Body>
      </Table>
    );
  };
  ```

- A **FormContextProvider** supplies the current `state` and `dispatch` function to update the state to the Booking Form. This pattern ensures, we can continue to have multiple forms in the app, as we grow the app while having a different Context limited to that individual multi-level form.

---

## Naming Conventions

The naming convention followed are:

- **CSS Component and Page specific Classes**: `LL-Component` for the top level class for the root element for almost every component. The child elements in that tree follow an appended PascalCase name, for e.g.`LL-ComponentSubComponent`.

- **CSS utility classes**: Utility classes like `text-sm`, `text-m`, `text-xl` are preset in `App.css` to offer global styles to quickly switch between font-sizes by any component that allows it. (E.g. the **`Heading`** Component)

- **CSS Variables**: CSS Variables serve as globally used presets for maintaining a standardized look and feel. The idea is to have a write-once-use-throughout approach - no need to keep writing a complex `box-shadow` property for all elements that use `box-shadow`. Instead presets in the form of `box-shadow-1`, `box-shadow-2`, `box-shadow-3` are available to use depending on the position of the element.

---

## Use of Dependencies

This project was developed with the personal intention to minimize dependencies as much as possible to test my core skills.

- No CSS Library has been used. All the CSS has been written from scratch.

- No Form Library like Formik or form validation library like Yup has been used. They have already been used in an earlier project in the certification and the decision was simply to have this implemented without using them. Utility functions like `validateNumber` have been created and used. Find them in the `src/utilities` folder.
- Font Awesome has been used for the icons.

---

## Data Fetching

A lot of data is replicated (e.g. links at header and footer) and/or is available as an array or an object that can grow or shrink in size. Thus, we need to consider the possibility of retrieving this from a database or a Content Management System. For now, we will mock this by using the data at `settings/cms` folder to simulate fetching from a centralized CMS.

---

## Unit Testing

Unit Testing has been done with the help of React Testing Library, Jest, Jestdom that can already shipped with `create-react-app`.

- The `setupTests.js` have been modified, so that we can interact with the window global object.
- Mocks for React hooks have been done throughout within the components itself. Mocks for `useContext`, `useLocation`, `useForm`, `dispatch` function of the `useReducer` have all been covered.
- The unit tests can be found in each of the component and page folders.

---

# Future Considerations

- The use of **Context API** and **`useReducer`** has been done in the Form to make sure the Form can have multiple levels and flexibility for any future modifications. While this is not needed in the Meta Capstone project, however to have an advanced service in a production level application, for e.g. A Mobile Phone OTP Validation service (to confirm that this is a valid person booking, considering restaurant tables are limited and we would like to prevent bots), a middleware form with an input phone field, a button and fields to enter a 4-digit OTP can be present. This field can then dispatch an action - `dispatch({ type: "OTPValidation" })`, which can then be processed by the reducer function and the `stage` updated, so the form can proceed to the next stage.

- A `ThemeProvider` that wraps all Pages of the app that will provide the styling when themes are switched from dark to light.

---

# Honour Code

This demo project is solely done by me, Jayanta Samaddar. You can contact me on **[GitHub](https://www.github.com/jayantasamaddar)** for interesting projects to work on.
