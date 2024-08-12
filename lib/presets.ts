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

export const presets = [
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    color: "bg-blue-700",
    categories: [
      {
        category: "Profile",
        presets: [
          { label: "Profile Picture", size: "400 x 400" },
          { label: "Banner", size: "1584 x 396" },
        ],
      },
      {
        category: "Posts",
        presets: [
          { label: "Basic Post", size: "1080 x 1080" },
          { label: "Featured Post", size: "1200 x 644" },
          { label: "Article", size: "600 x 322" },
          { label: "Carousel", size: "1080 x 1080" },
          { label: "Stories", size: "1080 x 1920" },
        ],
      },
      {
        category: "Company",
        presets: [
          { label: "Logo", size: "300 x 300" },
          { label: "Banner", size: "1128 x 191" },
        ],
      },
      {
        category: "Events",
        presets: [
          { label: "Logo", size: "300 x 300" },
          { label: "Banner", size: "1600 x 900" },
        ],
      },
      {
        category: "Groups",
        presets: [
          { label: "Logo", size: "300 x 300" },
          { label: "Banner", size: "1536 x 768" },
        ],
      },
    ],
  },
  {
    name: "Facebook",
    icon: FaFacebook,
    color: "bg-blue-600",
    categories: [
      {
        category: "Profile",
        presets: [
          { label: "Profile Picture", size: "170 x 170" },
          { label: "Cover Photo", size: "820 x 312" },
        ],
      },
      {
        category: "Page",
        presets: [
          { label: "Profile Picture", size: "170 x 170" },
          { label: "Cover Photo", size: "820 x 312" },
        ],
      },
      {
        category: "Posts",
        presets: [
          { label: "Shared Image", size: "1200 x 630" },
          { label: "Highlighted Image", size: "1200 x 717" },
          { label: "Stories", size: "1080 x 1920" },
        ],
      },
    ],
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    color: "bg-pink-500",
    categories: [
      {
        category: "Profile",
        presets: [{ label: "Profile Picture", size: "320 x 320" }],
      },
      {
        category: "Posts",
        presets: [
          { label: "Square Post", size: "1080 x 1080" },
          { label: "Portrait Post", size: "1080 x 1350" },
          { label: "Landscape Post", size: "1080 x 566" },
          { label: "Story", size: "1080 x 1920" },
          { label: "Reel", size: "1080 x 1920" },
        ],
      },
      {
        category: "IGTV",
        presets: [
          { label: "Square Video", size: "1080 x 1080" },
          { label: "Portrait Video", size: "1080 x 1350" },
          { label: "Landscape Video", size: "1080 x 608" },
          { label: "IGTV Cover", size: "420 x 654" },
        ],
      },
    ],
  },
  {
    name: "Twitter",
    icon: FaTwitter,
    color: "bg-blue-400",
    categories: [
      {
        category: "Profile",
        presets: [
          { label: "Profile Picture", size: "400 x 400" },
          { label: "Header Photo", size: "1500 x 500" },
        ],
      },
      {
        category: "Posts",
        presets: [
          { label: "Single Image", size: "1200 x 675" },
          { label: "Multi-Image", size: "600 x 335" },
          { label: "Post Image", size: "1024 x 512" },
        ],
      },
      {
        category: "Ads",
        presets: [
          { label: "Website Card Image", size: "1200 x 628" },
          { label: "App Card Image", size: "1200 x 628" },
          { label: "DM Card Image", size: "800 x 418" },
        ],
      },
      {
        category: "Videos",
        presets: [
          { label: "Single Video", size: "320 x 320" },
          { label: "Max Single Video", size: "1920 x 1200" },
          { label: "Video Thumbnail", size: "1280 x 720" },
        ],
      },
    ],
  },
  {
    name: "Pinterest",
    icon: FaPinterest,
    color: "bg-red-600",
    categories: [
      {
        category: "Profile",
        presets: [{ label: "Profile Picture", size: "165 x 165" }],
      },
      {
        category: "Pins",
        presets: [
          { label: "Square Pin", size: "1000 x 1000" },
          { label: "Standard Pin", size: "1000 x 1500" },
          { label: "Long Pin", size: "1000 x 2100" },
          { label: "Carousel Pin", size: "1000 x 1500" },
        ],
      },
      {
        category: "Boards",
        presets: [{ label: "Board Cover", size: "600 x 600" }],
      },
      {
        category: "Ads",
        presets: [
          { label: "Promoted Pin", size: "1000 x 1500" },
          { label: "Promoted Video", size: "1000 x 1500" },
          { label: "Shopping Pin", size: "1000 x 1500" },
        ],
      },
      {
        category: "Stories",
        presets: [{ label: "Story", size: "1080 x 1920" }],
      },
    ],
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    color: "bg-red-700",
    categories: [
      {
        category: "Profile",
        presets: [
          { label: "Profile Picture", size: "800 x 800" },
          { label: "Channel Art", size: "2560 x 1440" },
        ],
      },
      {
        category: "Thumbnails",
        presets: [
          { label: "Video Thumbnail", size: "1280 x 720" },
          { label: "Live Stream Thumbnail", size: "1280 x 720" },
        ],
      },
      {
        category: "Videos",
        presets: [
          { label: "Video Upload", size: "1280 x 720" },
          { label: "Max Video Upload", size: "1920 x 1080" },
        ],
      },
      {
        category: "Ads",
        presets: [
          { label: "Display Ad", size: "300 x 250" },
          { label: "Overlay Ad", size: "468 x 60" },
          { label: "Skippable Ad", size: "1280 x 720" },
          { label: "Non-Skippable Ad", size: "1280 x 720" },
          { label: "Bumper Ad", size: "1280 x 720" },
          { label: "Sponsored Card", size: "740 x 100" },
        ],
      },
    ],
  },
  {
    name: "Snapchat",
    icon: FaSnapchat,
    color: "bg-yellow-500",
    categories: [
      {
        category: "Profile",
        presets: [{ label: "Profile Picture", size: "320 x 320" }],
      },
      {
        category: "Stories",
        presets: [{ label: "Story", size: "1080 x 1920" }],
      },
      {
        category: "Ads",
        presets: [
          { label: "Snap Ad", size: "1080 x 1920" },
          { label: "Collection Ad", size: "1080 x 1920" },
          { label: "Story Ad", size: "1080 x 1920" },
          { label: "Commercial", size: "1080 x 1920" },
        ],
      },
      {
        category: "Geofilters",
        presets: [{ label: "Geofilter", size: "1080 x 2340" }],
      },
    ],
  },
  {
    name: "TikTok",
    icon: FaTiktok,
    color: "bg-black",
    categories: [
      {
        category: "Profile",
        presets: [{ label: "Profile Picture", size: "200 x 200" }],
      },
      {
        category: "Videos",
        presets: [
          { label: "Standard Video", size: "1080 x 1920" },
          { label: "Max Video", size: "1920 x 1080" },
        ],
      },
      {
        category: "Ads",
        presets: [
          { label: "In-Feed Ad", size: "1080 x 1920" },
          { label: "TopView Ad", size: "1080 x 1920" },
          { label: "Brand Takeover Ad", size: "1080 x 1920" },
        ],
      },
      {
        category: "Thumbnails",
        presets: [{ label: "Video Thumbnail", size: "1080 x 1920" }],
      },
    ],
  },
  {
    name: "Reddit",
    icon: FaReddit,
    color: "bg-orange-600",
    categories: [
      {
        category: "Profile",
        presets: [
          { label: "Profile Picture", size: "256 x 256" },
          { label: "Banner Image", size: "1920 x 384" },
        ],
      },
      {
        category: "Posts",
        presets: [
          { label: "Link Post Image", size: "1200 x 628" },
          { label: "Image Post", size: "1200 x 900" },
        ],
      },
      {
        category: "Ads",
        presets: [
          { label: "Image Ad", size: "1200 x 628" },
          { label: "Video Ad", size: "1920 x 1080" },
        ],
      },
      {
        category: "Community",
        presets: [
          { label: "Community Icon", size: "256 x 256" },
          { label: "Community Banner", size: "1920 x 384" },
          { label: "Community Header", size: "4000 x 192" },
          { label: "Mobile Community Banner", size: "1600 x 480" },
        ],
      },
    ],
  },
  {
    name: "Tumblr",
    icon: FaTumblr,
    color: "bg-blue-600",
    categories: [
      {
        category: "Profile",
        presets: [{ label: "Profile Picture", size: "128 x 128" }],
      },
      {
        category: "Header",
        presets: [{ label: "Header Image", size: "3000 x 1055" }],
      },
      {
        category: "Posts",
        presets: [
          { label: "Image Post", size: "1280 x 1920" },
          { label: "Photoset Image", size: "1280 x 1920" },
        ],
      },
      {
        category: "Ads",
        presets: [
          { label: "Sponsored Image", size: "1280 x 1920" },
          { label: "Sponsored Video", size: "1280 x 720" },
        ],
      },
    ],
  },
  {
    name: "Twitch",
    icon: FaTwitch,
    color: "bg-purple-600",
    categories: [
      {
        category: "Profile",
        presets: [
          { label: "Profile Picture", size: "256 x 256" },
          { label: "Cover Image", size: "1200 x 480" },
        ],
      },
      {
        category: "Channel",
        presets: [
          { label: "Channel Banner", size: "1920 x 480" },
          { label: "Video Player Banner", size: "1920 x 1080" },
        ],
      },
      {
        category: "Panels",
        presets: [{ label: "Panel Image", size: "320 x 160" }],
      },
      {
        category: "Thumbnails",
        presets: [{ label: "Video Thumbnail", size: "1280 x 720" }],
      },
      {
        category: "Emotes",
        presets: [
          { label: "Emote", size: "28 x 28" },
          { label: "Emote", size: "56 x 56" },
          { label: "Emote", size: "112 x 112" },
        ],
      },
      {
        category: "Badges",
        presets: [
          { label: "Badge", size: "18 x 18" },
          { label: "Badge", size: "36 x 36" },
          { label: "Badge", size: "72 x 72" },
        ],
      },
    ],
  },
];
