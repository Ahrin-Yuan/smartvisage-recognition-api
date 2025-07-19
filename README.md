# 📸 SmartVisage Recognition App — Frontend

**Live App**: [SmartVisage Frontend on Render](https://smartvisage-recognition-react.onrender.com/) 

---

## 📝 Description

**Short version**:  
Face detection app using the **Clarifai machine learning API**, with a **React.js frontend** and **Node.js/Express backend**, connected to a **PostgreSQL database**.

**Full version**:  
SmartVisage is a full-stack face recognition web application that allows users to register, sign in, and submit images to detect human faces using the Clarifai API.  
The frontend is built using **Create React App (CRA)**, styled with **Tachyons**, and connects to a RESTful backend built with **Node.js**, **Express**, and **PostgreSQL**.  
The frontend is **deployed as a static site on Render**.

---

### 📝 Dependencies
* Node v23.11.x
* express v5.1.x
* nodemon v3.1.x
* pg v8.16.x
* knex v3.1.x
* cors v2.8.x
* bcrypt-nodejs v0.0.x
* clarifai-nodejs-grpc v11.5.x
* react v19.1.0
* react-parallax-tilt v1.7.x
* tachyons v4.12.0

---

## 👣 How to Use
Register a new account or sign in.

Paste an image URL containing a face into the input field.

Click the [ Detect ] button.

The app will display the image and highlight the detected face with a bounding box.

The number of image submissions is updated per user.

---


## 📌 Deployment Notice (Free Render Tier)
**EXTRA SIDE NOTE — Render Hosting Disclaimer:**
> This project is hosted on [Render](https://render.com) using the **Free Tier**, which means:

🔄 The site (especially the backend server) may **spin down after periods of inactivity**, causing a short delay (cold start) when it starts back up.

🕒 You might experience a slight loading time **when signing in or registering**, especially if the server has been inactive for a while.

💡 **TIP**: Use [cron-job.org](http://cron-job.org) to ping your backend endpoint regularly and prevent our project from spinning down due to inactivity.

---


## Author

- Ahrin @ Irene
- GitHub
Contact: Open to collaboration and feedback!