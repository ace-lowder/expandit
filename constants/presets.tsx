import {
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPinterest,
  FaYoutube,
  FaSnapchat,
  FaTiktok,
  FaReddit,
  FaTumblr,
  FaTwitch,
} from "react-icons/fa";

export const presetList = [
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    categories: [
      {
        category: "Profile",
        presets: [
          { label: "Profile Picture", size: "400x400" },
          { label: "Banner Photo", size: "1584x396" },
        ],
      },
      {
        category: "Posts",
        presets: [{ label: "Post Image", size: "1200x1200" }],
      },
    ],
  },
  {
    name: "Facebook",
    icon: FaFacebook,
    categories: [
      {
        category: "Profile",
        presets: [
          { label: "Profile Picture", size: "180x180" },
          { label: "Cover Photo", size: "820x312" },
        ],
      },
      {
        category: "Posts",
        presets: [{ label: "Post Image", size: "1200x630" }],
      },
    ],
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    categories: [
      {
        category: "Posts",
        presets: [
          { label: "Square Post", size: "1080x1080" },
          { label: "Portrait Post", size: "1080x1350" },
          { label: "Landscape Post", size: "1080x566" },
        ],
      },
      {
        category: "Stories",
        presets: [{ label: "Story", size: "1080x1920" }],
      },
    ],
  },
  {
    name: "Twitter",
    icon: FaTwitter,
    categories: [
      {
        category: "Profile",
        presets: [
          { label: "Profile Picture", size: "400x400" },
          { label: "Header Photo", size: "1500x500" },
        ],
      },
      {
        category: "Posts",
        presets: [{ label: "Post Image", size: "1024x512" }],
      },
    ],
  },
  {
    name: "Pinterest",
    icon: FaPinterest,
    categories: [
      {
        category: "Pins",
        presets: [
          { label: "Square Pin", size: "1000x1000" },
          { label: "Standard Pin", size: "1000x1500" },
          { label: "Long Pin", size: "1000x2100" },
        ],
      },
    ],
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    categories: [
      {
        category: "Channel",
        presets: [
          { label: "Channel Icon", size: "800x800" },
          { label: "Channel Art", size: "2560x1440" },
        ],
      },
      {
        category: "Videos",
        presets: [{ label: "Video Thumbnail", size: "1280x720" }],
      },
    ],
  },
  {
    name: "Snapchat",
    icon: FaSnapchat,
    categories: [
      {
        category: "Stories",
        presets: [{ label: "Story", size: "1080x1920" }],
      },
    ],
  },
  {
    name: "TikTok",
    icon: FaTiktok,
    categories: [
      {
        category: "Videos",
        presets: [{ label: "Video", size: "1080x1920" }],
      },
    ],
  },
  {
    name: "Reddit",
    icon: FaReddit,
    categories: [
      {
        category: "Profile",
        presets: [{ label: "Profile Picture", size: "256x256" }],
      },
      {
        category: "Posts",
        presets: [{ label: "Post Image", size: "1200x630" }],
      },
    ],
  },
  {
    name: "Tumblr",
    icon: FaTumblr,
    categories: [
      {
        category: "Profile",
        presets: [{ label: "Profile Picture", size: "128x128" }],
      },
      {
        category: "Posts",
        presets: [{ label: "Post Image", size: "1280x1920" }],
      },
    ],
  },
  {
    name: "Twitch",
    icon: FaTwitch,
    categories: [
      {
        category: "Profile",
        presets: [
          { label: "Profile Picture", size: "256x256" },
          { label: "Profile Banner", size: "1200x480" },
        ],
      },
    ],
  },
];
