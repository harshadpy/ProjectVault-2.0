# 🏛️ ProjectVault 
### *Where Academic Projects Come to Life* ⚡

<div align="center">

![Screenshot 2025-06-23 194943](https://github.com/user-attachments/assets/e50fc456-5fd8-45a0-89ff-278317255e6b)


[![Made with React](https://img.shields.io/badge/Made%20with-React-61dafb?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Built with Love](https://img.shields.io/badge/Built%20with-❤️-ff69b4?style=for-the-badge)](https://github.com/harshadpy)
[![Academic Power](https://img.shields.io/badge/Academic-Power-blue?style=for-the-badge&logo=academia&logoColor=white)](https://github.com/harshadpy/ProjectVault)
[![Dark Mode](https://img.shields.io/badge/Dark%20Mode-Enabled-000000?style=for-the-badge&logo=moon&logoColor=white)](https://github.com/harshadpy/ProjectVault)

**🌟 Star this repo if you're ready to revolutionize academic project discovery! 🌟**

[🚀 Live Demo](https://your-demo-link.com) • [📖 Documentation](https://your-docs-link.com) • [🐛 Report Bug](https://github.com/harshadpy/ProjectVault/issues) • [✨ Request Feature](https://github.com/harshadpy/ProjectVault/issues)

</div>

---

## 🎯 What is ProjectVault?

> **Imagine GitHub meets Pinterest meets Academic Excellence** 💫

ProjectVault isn't just another project repository - it's a **game-changing platform** that transforms how students discover, explore, and get inspired by academic projects from Vidyalankar Institute of Technology!

### 🔥 The Problem We're Solving
- 😤 Students struggle to find quality project references
- 📚 Academic projects are scattered and hard to discover  
- 💡 Lack of inspiration for final year projects
- 🤝 No centralized platform to showcase academic excellence

### ⚡ Our Solution
**ProjectVault** = Your academic project discovery engine with superpowers! 🦸‍♂️

---

## ✨ Features That'll Blow Your Mind

<table>
<tr>
<td width="50%">

### 🎨 **Visual Excellence**
- 🌙 **Dark/Light Mode Toggle** - Easy on the eyes
- 📱 **Fully Responsive** - Looks stunning everywhere
- 🎯 **Intuitive Search** - Find anything in seconds
- ❤️ **Like System** - Save your favorites instantly

</td>
<td width="50%">

### 🚀 **Backend Powerhouse**
- 🗄️ **Supabase Database** - Real-time data storage
- ⭐ **Project Rating System** - Rate projects 1-5 stars
- 📊 **Smart Analytics** - Track likes and ratings
- 🔄 **Real-time Updates** - Instant data synchronization
- 🔔 **Toast Notifications** - Instant feedback
- 📸 **Image Carousel** - Beautiful project showcases

</td>
</tr>
</table>

---

## 🎬 Demo Time!

<div align="center">

### 🖥️ Desktop Experience
![image](https://github.com/user-attachments/assets/7fd7c12b-0585-4d86-a8cf-b6fa8a7b0b16)


### 📱 Live Likes and Ratings  
![image](https://github.com/user-attachments/assets/e5e2a43c-d282-4307-8e2d-cd4c18868580)


### 🌙 Dark Mode Glory
![image](https://github.com/user-attachments/assets/2a9ed9c7-fc4c-4dfb-b034-f58e116ad97f)

### 🖥️ Various Categories
![image](https://github.com/user-attachments/assets/5015785e-d294-43c0-8247-0d625d6ce231)

### 📱 Search Filters
![image](https://github.com/user-attachments/assets/d475add1-91d8-4acb-8cf4-075cd8f5f45e)




</div>

---

## 🛠️ Tech Stack That Powers the Magic

<div align="center">

| Frontend | Backend | Styling | Tools | Deployment |
|:--------:|:-------:|:-------:|:-----:|:----------:|
| ![React](https://img.shields.io/badge/React-61dafb?style=for-the-badge&logo=react&logoColor=white) | ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white) | ![Bootstrap](https://img.shields.io/badge/Bootstrap-7952b3?style=for-the-badge&logo=bootstrap&logoColor=white) | ![npm](https://img.shields.io/badge/npm-cb3837?style=for-the-badge&logo=npm&logoColor=white) | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) |

**🚀 Full-Stack Power: React Frontend + Supabase Backend + Real-time Database**

</div>

---

## 🚀 Quick Start Guide

### Prerequisites
Make sure you have these installed:
- 📦 Node.js (v14.0.0 or higher)
- 🔧 npm or yarn
- 🗄️ Supabase account (free tier available)
- ❤️ Love for awesome projects

### 🔧 Supabase Setup
1. Create a new project on [Supabase](https://supabase.com)
2. Set up the following tables in your Supabase dashboard:

```sql
-- Projects table (if storing projects in DB)
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  lead TEXT NOT NULL,
  year INTEGER NOT NULL,
  category TEXT,
  abstract TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Project likes table
CREATE TABLE project_likes (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL,
  user_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(project_id, user_id)
);

-- Project ratings table
CREATE TABLE project_ratings (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL,
  user_id TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(project_id, user_id)
);
```

3. Copy your Supabase URL and anon key from the project settings

### Installation in 4 Simple Steps

```bash
# 1️⃣ Clone this masterpiece
git clone https://github.com/harshadpy/ProjectVault.git

# 2️⃣ Navigate to the project
cd ProjectVault/projectvault

# 3️⃣ Install dependencies
npm install

# 4️⃣ Set up Supabase environment variables
# Create .env file and add your Supabase credentials:
# REACT_APP_SUPABASE_URL=your_supabase_url
# REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 🎉 Launch the Magic

```bash
# Start the development server
npm start

# 🎊 Open http://localhost:3000 and witness the magic!
```

---

## 📁 Project Architecture

```
ProjectVault/
└── projectvault/
    ├── 🏠 public/                     
    │   ├── 📸 screenshots/            # Eye-candy screenshots
    │   └── 🌐 index.html              # Entry point
    ├── 💎 src/                        
    │   ├── 🎯 App.js                  # Main app component
    │   ├── 🎨 App.css                 # Styling magic
    │   ├── 📊 projectsData.js         # Project database
    │   ├── 🗄️ supabaseClient.js       # Supabase configuration
    │   ├── ❤️ LikedProjects.js        # Favorites component
    │   ├── ⭐ RatingSystem.js         # Star rating component
    │   ├── 👥 AboutUsFooter.js        # Footer component
    │   ├── 🎠 CarouselComponent.js    # Image carousel
    │   └── 🚀 index.js                # React entry point
    ├── 🌍 .env                        # Environment variables (Supabase keys)
    ├── 🙈 .gitignore                  
    ├── 📦 package.json                
    └── 📚 README.md                   # You are here!
```

---

## 🎯 Key Features Deep Dive

### 🔍 **Smart Search & Filter System**
```javascript
// Lightning-fast search functionality
const searchResults = projects.filter(project => 
  project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  project.lead.toLowerCase().includes(searchTerm.toLowerCase()) ||
  project.year.toString().includes(searchTerm)
);
```

### ⭐ **Real-time Rating System with Supabase**
```javascript
// Rate projects with real-time database updates
const handleRating = async (projectId, rating) => {
  const { data, error } = await supabase
    .from('project_ratings')
    .upsert({ 
      project_id: projectId, 
      rating: rating,
      user_id: userId 
    });
  
  if (!error) {
    showToast(`Rated ${rating} stars! ⭐`);
    updateProjectRating(projectId, rating);
  }
};
```

### ❤️ **Like System with Supabase Persistence**
```javascript
// Save your favorites with backend persistence
const handleLike = async (projectId) => {
  const { data, error } = await supabase
    .from('project_likes')
    .insert({ project_id: projectId, user_id: userId });
  
  if (!error) {
    setLikedProjects([...likedProjects, projectId]);
    showToast('Project added to favorites! ❤️');
  }
};
```

### 🌙 **Seamless Dark Mode**
```css
/* Smooth theme transitions */
.app {
  transition: all 0.3s ease-in-out;
}

.dark-mode {
  background: linear-gradient(135deg, #0a0e17 0%, #1a1f2e 100%);
  color: #ffffff;
}
```

### 📊 **Real-time Analytics Dashboard**
```javascript
// Track project engagement with Supabase
const getProjectStats = async (projectId) => {
  const { data: likes } = await supabase
    .from('project_likes')
    .select('*')
    .eq('project_id', projectId);
    
  const { data: ratings } = await supabase
    .from('project_ratings')
    .select('rating')
    .eq('project_id', projectId);
    
  return {
    totalLikes: likes?.length || 0,
    averageRating: calculateAverage(ratings),
    totalRatings: ratings?.length || 0
  };
};
```

---

## 📊 Project Stats

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/harshadpy/ProjectVault?style=social)
![GitHub forks](https://img.shields.io/github/forks/harshadpy/ProjectVault?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/harshadpy/ProjectVault?style=social)

**📈 Growing Community • 🔥 Active Development • 💪 Production Ready**

</div>

---

## 🤝 Contributing

We love contributors! Here's how you can make ProjectVault even more awesome:

### 🌟 Ways to Contribute
- 🐛 **Bug Reports** - Help us squash those pesky bugs
- ✨ **Feature Requests** - Share your brilliant ideas
- 📝 **Documentation** - Help others understand the magic
- 💻 **Code Contributions** - Add your coding superpowers
- 🎨 **Design Improvements** - Make it even more beautiful

### 🔄 Contribution Process
1. 🍴 **Fork** the repository
2. 🌿 **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. 💎 **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. 🚀 **Push** to the branch (`git push origin feature/AmazingFeature`)
5. 🎉 **Open** a Pull Request

---

## 🐛 Issues & Support

Having trouble? We've got your back! 💪

### 🆘 Common Issues
- **Port 3000 already in use?** Try `npx kill-port 3000` then `npm start`
- **Dependencies not installing?** Delete `node_modules` and run `npm install` again
- **Build failing?** Make sure you're using Node.js v14+

### 📞 Get Help
- 🐛 [Report a Bug](https://github.com/harshadpy/ProjectVault/issues/new?assignees=&labels=bug&template=bug_report.md&title=)
- ✨ [Request a Feature](https://github.com/harshadpy/ProjectVault/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=)
- 💬 [Join Discussions](https://github.com/harshadpy/ProjectVault/discussions)

---

## 🎉 Success Stories

> *"ProjectVault's new rating system helped me find the highest-rated projects for my research. The Supabase backend makes everything so smooth!"* - **Final Year Student, VIT**

> *"I love how I can rate projects and see real-time analytics. The like system with backend persistence is a game-changer!"* - **Research Scholar**

> *"As a project mentor, the rating and analytics features help me understand which projects resonate most with students."* - **Faculty Member**

> *"The full-stack architecture with React and Supabase makes this platform incredibly reliable and fast!"* - **Computer Science Student**

---

## 📈 Roadmap

### 🎯 **v2.0 - The Future is Now** ✅
- [x] 🗄️ **Supabase Backend Integration** - Real-time database
- [x] ⭐ **Project Rating System** - 1-5 star ratings
- [x] ❤️ **Enhanced Like System** - Backend persistence
- [x] 📊 **Real-time Analytics** - Live project stats
- [ ] 🤖 AI-powered project recommendations
- [ ] 👥 User profiles and authentication
- [ ] 💬 Comments and discussions
- [ ] 🔔 Real-time notifications
- [ ] 📱 Mobile app (React Native)

### 🚀 **v3.0 - The Revolution**
- [ ] 🏆 Gamification system
- [ ] 🤝 Collaboration features
- [ ] 🎓 Integration with academic systems
- [ ] 🌍 Multi-institute support
- [ ] 📊 Project impact metrics
- [ ] 🎨 Advanced customization options

---

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License - Because sharing is caring! ❤️
```

---

## 🎊 Special Thanks

### 💝 Acknowledgments
- 🏫 **Vidyalankar Institute of Technology** - For inspiring this project
- 👥 **React Community** - For the amazing framework
- 🎨 **Bootstrap Team** - For beautiful styling components
- 🌟 **All Contributors** - You make this project awesome!

### 🤝 Connect with the Creator

<div align="center">

**Made with ❤️ by [@harshadpy](https://github.com/harshadpy)**

[![GitHub](https://img.shields.io/badge/GitHub-harshadpy-181717?style=for-the-badge&logo=github)](https://github.com/harshadpy)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077b5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/harshadpy)
[![Twitter](https://img.shields.io/badge/Twitter-Follow-1da1f2?style=for-the-badge&logo=twitter)](https://twitter.com/harshadpy)

</div>

---

<div align="center">

## 🚀 Ready to Transform Academic Project Discovery?

### ⭐ **Star this repo** • 🍴 **Fork it** • 🤝 **Contribute** • 📢 **Share it**

**"Empowering students through accessible academic insights." 🎓**

---

![Visitor Count](https://visitor-badge.laobi.icu/badge?page_id=harshadpy.ProjectVault)
![GitHub last commit](https://img.shields.io/github/last-commit/harshadpy/ProjectVault)
![GitHub repo size](https://img.shields.io/github/repo-size/harshadpy/ProjectVault)

**Made in 🇮🇳 with 💻 and lots of ☕**

</div>
