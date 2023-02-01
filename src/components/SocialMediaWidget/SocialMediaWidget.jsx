import { isValidElement } from 'react';
import FacebookSVG from '../../assets/icon-facebook.svg';
import InstagramSVG from '../../assets/icon-instagram.svg';
import PinterestSVG from '../../assets/icon-pinterest.svg';
import SnapchatSVG from '../../assets/icon-snapchat.svg';
import YelpSVG from '../../assets/icon-yelp.svg';
import './SocialMediaWidget.css';

const SOCIAL_MEDIA_LINKS = [
  {
    id: 1,
    name: 'Facebook',
    href: 'https://www.facebook.com',
    title: 'Follow Little Lemon on Facebook',
    icon: FacebookSVG,
  },
  {
    id: 2,
    name: 'Instagram',
    href: 'https://www.instagram.com',
    title: 'Follow Little Lemon on Instagram',
    icon: InstagramSVG,
  },
  {
    id: 3,
    name: 'Pinterest',
    href: 'https://www.pinterest.com',
    title: 'Follow Little Lemon on Pinterest',
    icon: PinterestSVG,
  },
  {
    id: 4,
    name: 'Snapchat',
    href: 'https://www.snapchat.com',
    title: 'Follow Little Lemon on Snapchat',
    icon: SnapchatSVG,
  },
  {
    id: 5,
    name: 'Yelp',
    href: 'https://www.yelp.com',
    title: 'Check out Little Lemon on Yelp',
    icon: YelpSVG,
  },
];

export const SocialMediaWidget = () => {
  console.log({ isSVG: isValidElement(FacebookSVG) });
  return (
    <section id="LL-SocialMediaWidget">
      <ul role="navigation">
        {SOCIAL_MEDIA_LINKS.map(({ id, name, href, title, icon }) => {
          return (
            <a
              key={id}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              title={title}
            >
              <li role="button">
                <img className="LL-SocialIcon" src={icon} alt={name} />
              </li>
            </a>
          );
        })}
      </ul>
    </section>
  );
};
