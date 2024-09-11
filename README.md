<h1 align="center">
  Expandit
</h1>

<a href="https://expandit.site/"><img src="/readme/header.png" width="1280" alt="Project Banner"></a>

<div align="center">
  <a href="https://react.dev/"><img src="/readme/icons/react.png" width="48" height="48" alt="React"></a>&nbsp;
  <a href="https://www.typescriptlang.org/"><img src="/readme/icons/typescript.png" width="48" height="48" alt="Typescript"></a>&nbsp;
  <a href="https://nextjs.org/"><img src="/readme/icons/next.png" width="48" height="48" alt="Next"></a>&nbsp;
  <a href="https://tailwindcss.com/"><img src="/readme/icons/tailwind.png" width="48" height="48" alt="Tailwind"></a>&nbsp;
  <a href="https://cloudinary.com/"><img src="/readme/icons/cloudinary.png" width="48" height="48" alt="Cloudinary"></a>&nbsp;
  <a href="https://www.mongodb.com/"><img src="/readme/icons/mongo.png" width="48" height="48" alt="MongoDB"></a>&nbsp;
  <a href="https://clerk.com/"><img src="/readme/icons/clerk.png" width="48" height="48" alt="Clerk"></a>&nbsp;
  <a href="https://stripe.com/"><img src="/readme/icons/stripe.png" width="48" height="48" alt="Stripe"></a>&nbsp;
</div>

## Overview

<p>Expandit (https://expandit.site) is a free Software-as-a-Service (SaaS) web application that allows users to upload and expand images using AI. The goal was to create a useful tool that people would be willing to pay for, while also showcasing my ability to build a fully functional, mobile-friendly web app.</p>

<br>
<p align="center">Click <a href="https://expandit.site/" >here</a> to check it out!</p>
<div align="center"><a href="https://expandit.site/" ><img src="/readme/generate.png" width="420" alt="Generate Button"></a></div>

<br><br><br><a href="https://expandit.site/"><img src="/readme/example.png" width="1280" alt="Example"></a>

## How it Works

<h4 align="center">Image Expanding Tool</h4>

<p>The core functionality of Expandit revolves around expanding images. It features a simple upload system that allows users to drag and drop image files or paste images directly into the app. The images are stored in local storage to increase performance and allow users to edit old images without having to reupload them. Users can adjust the width and height of each image or select a social media preset for quick resizing. When you click the generate button, Expandit will send your image to Cloudinary's servers along with the new dimensions. Once the web app receives a new image from Cloudinary's api, the app allows users to download the expanded image and spend credits for higher-quality downloads.</p>

<h4 align="center">Demo Navbar</h4>

<p>The navbar showcases the integration of SaaS features such as user authentication and credit purchases. Users are able to sign up and log in through Clerk's authentication API. Once the user logs in, a webhook creates a user profile in a MongoDB database, where credits and purchased images are tracked. The site also features a working checkout flow (in test mode), where you can simulate a purchase using the following test card:</p>
<ul>
  <li>Card Number: 2424 2424 2424 2424</li>
  <li>Expiry: 02/42</li>
  <li>CVC: 424</li>
</ul>

<br><br><a href="https://expandit.site/"><img src="/readme/footer.png" width="1280" alt="Footer Image"></a>
