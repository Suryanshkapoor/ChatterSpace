import home from '../assets/home.svg';
import wallpaper from '../assets/wallpaper.svg';
import people from '../assets/people.svg';
import bookmark from '../assets/bookmark.svg';
import galleryadd from '../assets/gallery-add.svg';


export const sidebarLinks = [
  {
    imgURL: home,
    route: "/",
    label: "Home",
  },
  {
    imgURL: wallpaper,
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: people,
    route: "/all-users",
    label: "People",
  },
  {
    imgURL: bookmark,
    route: "/saved",
    label: "Saved",
  },
  {
    imgURL: galleryadd,
    route: "/create-post",
    label: "Create Post",
  },
];

export const bottombarLinks = [
  {
    imgURL: home,
    route: "/",
    label: "Home",
  },
  {
    imgURL: wallpaper,
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: bookmark,
    route: "/saved",
    label: "Saved",
  },
  {
    imgURL: galleryadd,
    route: "/create-post",
    label: "Create",
  },
];
