<h1 align="center">
  Expandit
</h1>
Expandit is a fully functioning web app that allows users to expand images using AI generative fill powered by Cloudinary's API. Users can log in securely through Clerk's API, and choose between three monthly subscription plans managed via Stripe's API.<br/><br/>

All images are stored locally in the user's browser to minimize storage space and ensure privacy. Expandit also features a versatile toolbar with social media presets, enabling users to quickly resize any image for profiles and banners.<br/><br/>

You can view the deployed build at https://acelowder-expandit.netlify.app/

<a href="https://acelowder-expandit.netlify.app/"><img src="example.gif" width="1280"></a>

<div align="right">

[![Netlify Status](https://api.netlify.com/api/v1/badges/857da5bb-0f99-485f-b855-2b951cfdedc4/deploy-status)](https://acelowder-expandit.netlify.app/)

</div>

## Features

- **Drag and Drop Upload**: A simple upload component with drag and drop, copy/paste, and file upload options.
- **AI Image Expansion**: Use Cloudinary's AI generative fill to seamlessly expand images.
- **User Authentication**: Secure login and account management through Clerk's API.
- **Subscription Plans**: Choose between three different monthly plans with payment processing via Stripe.
- **Local Image Storage**: All images are stored in the user's local storage for privacy and space efficiency.
- **Social Media Presets**: A handy toolbar with presets to quickly resize images for various social media platforms.

## Future Plans

If I have the opportunity to enhance this project further, I plan to add the following features:

- **Enhanced Image Editing**: Introduce advanced editing tools like cropping, rotating, and filters.
- **Image Gravity**: Allow users to move the original image within the generative fill space.
- **Remove Development Mode**: Adjust the pricing and remove development mode to make a functioning SaaS.

## Reflections

Working on Expandit was an exciting challenge, especially integrating multiple APIs like Cloudinary, Clerk, and Stripe. Managing image storage locally to ensure privacy while keeping the app responsive and user-friendly was a rewarding experience. If I were to revisit this project, I would focus on optimizing the user interface further and potentially explore additional AI-powered image editing features.
