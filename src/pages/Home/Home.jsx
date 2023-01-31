import { About, Hero, Specials, Testimonials } from './components';
import { Main } from '../../components';

const itemsData = [
  {
    id: 1,
    title: 'Greek Salad',
    image:
      'https://ik.imagekit.io/zenius/Coursera/html-css/greek-salad_Sxm-SArg8g.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1674804400855',
    price: 12.99,
    description:
      'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
  },
  {
    id: 2,
    title: 'Bruschetta',
    image:
      'https://ik.imagekit.io/zenius/Coursera/html-css/little-lemon-bruschetta_JuPj3P4zo.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1675005442604',
    price: 5.99,
    description:
      'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
  },
  {
    id: 3,
    title: 'Lemon Dessert',
    image:
      'https://ik.imagekit.io/zenius/Coursera/html-css/little-lemon-lemon-dessert_wVeHkjGSW.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1675005489800',
    price: 4.99,
    description:
      'This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.',
  },
];

const testimonialsData = [
  {
    id: 1,
    rating: 5,
    name: 'James Gordon',
    review: 'Lorem ipsum lorem upsung',
    image:
      'https://ik.imagekit.io/zenius/Coursera/html-css/little-lemon-testimonial-1_hP5ojsceu.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1675153905015',
  },
  {
    id: 2,
    rating: 5,
    name: 'Sheila Stone',
    review: 'Lorem ipsum lorem upsung',
    image:
      'https://ik.imagekit.io/zenius/Coursera/html-css/little-lemon-testimonial-2_2HL7LRpbth.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1675153905011',
  },
  {
    id: 3,
    rating: 5,
    name: 'Abigail Sharp',
    review: 'Lorem ipsum lorem upsung',
    image:
      'https://ik.imagekit.io/zenius/Coursera/html-css/little-lemon-testimonial-3_vBcNR58S4.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1675153904991',
  },
  {
    id: 4,
    rating: 5,
    name: 'Thomas Chang',
    review: 'Lorem ipsum lorem upsung',
    image:
      'https://ik.imagekit.io/zenius/Coursera/html-css/little-lemon-testimonial-4_AB23rmZoI.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1675153905002',
  },
];

export const Home = () => {
  return (
    <Main>
      <Hero />
      <Specials data={itemsData} itemWidth="300px" />
      <Testimonials data={testimonialsData} />
      <About />
    </Main>
  );
};
