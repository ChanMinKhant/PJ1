// src/Welcome.js
import React from 'react';
import './Welcome.css';

const Welcome = () => {
  return (
    <div className='content'>
      <h1 className='welcomehead'>Welcome to Our Website!</h1>
      <p>
        Your one-stop destination for all your web hosting and file management
        needs! Here are some key features we offer:
      </p>
      <ul>
        <li>
          <h4>Hosting of HTML, CSS, and JavaScript Files</h4>
          <p>
            Upload and host your web projects effortlessly with our reliable
            hosting services. Whether you're a beginner or an experienced
            developer, we provide the platform you need to showcase your work.
          </p>
        </li>
        <li>
          <h4>File Uploading and Sharing</h4>
          <p>
            Seamlessly upload and share files with colleagues, friends, or
            clients. Our intuitive interface makes it easy to organize and
            distribute your files efficiently.
          </p>
        </li>
        <li>
          <h4>URL Shortening</h4>
          <p>
            Simplify and share URLs with our URL shortening feature. Transform
            long, cumbersome links into concise, easy-to-share URLs that are
            perfect for social media, emails, and more.
          </p>
        </li>
        <li>
          <h4>Email Sending</h4>
          <p>
            Communicate effectively with our integrated email sending
            functionality. Whether you're sending updates, newsletters, or exam
            results, our system ensures reliable delivery to your recipients'
            inboxes.
          </p>
        </li>
        <li>
          <h4>Automated Exam Result Distribution</h4>
          <p>
            Say goodbye to manual result distribution! With our advanced system,
            you can upload exam results for different batches or classes with
            just a few clicks. Each student receives their results directly,
            streamlining the process for administrators and students alike.
          </p>
        </li>
      </ul>
      <p>
        Experience the convenience and efficiency of our platform today. Sign up
        now to unlock these powerful features and take your web projects to the
        next level!
      </p>
    </div>
  );
};

export default Welcome;
