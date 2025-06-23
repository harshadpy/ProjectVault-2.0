export interface Project {
  id: string;
  title: string;
  projectLead: string;
  year: string;
  abstract: string;
  category: string;
  linkedin: string;
}

export const projectsData: Project[] = [
  {
    id: '1',
    title: 'CAR BLACKBOX',
    projectLead: 'Arya A. Mhatre',
    year: '2024',
    abstract: 'This project aims to develop an advanced vehicle black box system that records critical data during a drive, enhancing safety and accident analysis.',
    category: 'Embedded Systems/Automotive Technology',
    linkedin: 'https://www.linkedin.com/in/arya-mhatre'
  },
  {
    id: '2',
    title: 'BIONIC ARM',
    projectLead: 'Yash Shinde',
    year: '2024',
    abstract: 'The Bionic Arm project focuses on creating a prosthetic arm that mimics natural movement using sensors and actuators, providing enhanced functionality for users.',
    category: 'Robotics/Artificial Intelligence',
    linkedin: 'https://www.linkedin.com/in/yash-shinde'
  },
  {
    id: '3',
    title: 'SIGN LANGUAGE RECOGNITION USING MEDIAPIPE FRAMEWORK WITH PYTHON',
    projectLead: 'Faisal Hussain',
    year: '2024',
    abstract: 'This project utilizes the MediaPipe framework and Python to develop a system capable of recognizing and translating sign language into text, promoting accessibility for the hearing impaired.',
    category: 'Artificial Intelligence/Computer Vision',
    linkedin: 'https://www.linkedin.com/in/faisal-hussain'
  },
  {
    id: '4',
    title: 'Home Automation Using Node MCU',
    projectLead: 'Vijay Chavan',
    year: '2024',
    abstract: 'The Home Automation project leverages Node MCU technology to create a smart home system, allowing users to control household appliances remotely via a web interface.',
    category: 'IoT (Internet of Things)',
    linkedin: 'https://www.linkedin.com/in/vijay-chavan'
  },
  {
    id: '5',
    title: 'Personal Virtual Desktop Assistant with Personal Chatbot Using Python (ZIRA)',
    projectLead: 'Sohel Sarang',
    year: '2024',
    abstract: 'ZIRA is designed as a personal virtual assistant that interacts with users through natural language processing, providing assistance with tasks and information retrieval.',
    category: 'Artificial Intelligence/Chatbot Development',
    linkedin: 'https://www.linkedin.com/in/sohel-sarang'
  },
  {
    id: '6',
    title: 'Face Recognition Based Smart Attendance System',
    projectLead: 'Prateek Rasalkar',
    year: '2024',
    abstract: 'This project develops a smart attendance system using face recognition technology to automate and streamline attendance tracking in educational institutions.',
    category: 'Artificial Intelligence/Computer Vision',
    linkedin: 'https://www.linkedin.com/in/prateek-rasalkar'
  },
  {
    id: '7',
    title: 'VOICE CONTROLLED HUMANOID',
    projectLead: 'Chaitanya Rane',
    year: '2024',
    abstract: 'This project focuses on creating a humanoid robot that can be controlled using voice commands, enhancing human-robot interaction.',
    category: 'Robotics/Artificial Intelligence',
    linkedin: 'https://www.linkedin.com/in/chaitanya-rane'
  },
  {
    id: '8',
    title: 'TROJAN HORSE DETECTION SOFTWARE',
    projectLead: 'Anusha Charvekar',
    year: '2024',
    abstract: 'The project aims to develop software capable of detecting Trojan horse malware, enhancing cybersecurity measures for users.',
    category: 'Cybersecurity',
    linkedin: 'https://www.linkedin.com/in/anusha-charvekar'
  },
  {
    id: '9',
    title: 'Milk Quality Detection',
    projectLead: 'Om Kasar',
    year: '2024',
    abstract: 'This mini-project focuses on developing a system to assess the quality of milk using various detection methods.',
    category: 'Food Technology',
    linkedin: 'https://www.linkedin.com/in/om-kasar'
  },
  {
    id: '10',
    title: 'House Price Prediction',
    projectLead: 'Vishesh Sharma',
    year: '2024',
    abstract: 'The project utilizes machine learning algorithms to predict house prices based on various features and market trends.',
    category: 'Data Science/Machine Learning',
    linkedin: 'https://www.linkedin.com/in/vishesh-sharma'
  },
  {
    id: '11',
    title: 'IoT-Based Air Pollution Management System',
    projectLead: 'Aabha Kadam',
    year: '2024',
    abstract: 'This project aims to create an IoT-based system for monitoring and managing air pollution levels in urban areas.',
    category: 'IoT (Internet of Things)',
    linkedin: 'https://www.linkedin.com/in/aabha-kadam'
  },
  {
    id: '12',
    title: 'Comparative Analysis of Deep Learning Algorithms for Satellite Image Segmentation',
    projectLead: 'Soumya Ramkrishna',
    year: '2024',
    abstract: 'The project involves analyzing various deep learning algorithms to determine their effectiveness in segmenting satellite images.',
    category: 'Artificial Intelligence/Deep Learning',
    linkedin: 'https://www.linkedin.com/in/soumya-ramkrishna'
  },
  {
    id: '13',
    title: 'Smart Plant Watering System',
    projectLead: 'Simran Kodere',
    year: '2024',
    abstract: 'This mini-project develops an automated plant watering system that uses sensors to determine soil moisture levels.',
    category: 'IoT (Internet of Things)',
    linkedin: 'https://www.linkedin.com/in/simran-kodere'
  },
  {
    id: '14',
    title: 'Anti Theft Alert System',
    projectLead: 'Shubham Wankhede',
    year: '2024',
    abstract: 'The project focuses on creating an anti-theft alert system that uses sensors and alarms to protect valuable assets.',
    category: 'Security Systems',
    linkedin: 'https://www.linkedin.com/in/shubham-wankhede'
  },
  {
    id: '15',
    title: 'Online Language Translator for PDF',
    projectLead: 'Sanket Mishra',
    year: '2024',
    abstract: 'This mini-project aims to develop an online tool that translates text in PDF documents into multiple languages.',
    category: 'Software Development/Translation Technology',
    linkedin: 'https://www.linkedin.com/in/sanket-mishra'
  },
  {
    id: '16',
    title: 'ALLOCATRIX - Active Allocation in Derivative Matrix',
    projectLead: 'Gaurav Bhadoria',
    year: '2024',
    abstract: 'This project focuses on optimizing resource allocation in derivative matrices for improved operational efficiency.',
    category: 'Mathematics/Optimization',
    linkedin: 'https://www.linkedin.com/in/gaurav-bhadoria'
  },
  {
    id: '17',
    title: 'DATA EXTRACTION USING RPA FROM UNSTRUCTURED DATA',
    projectLead: 'Sakshi Sawant',
    year: '2024',
    abstract: 'Developing a Robotic Process Automation (RPA) solution for extracting valuable insights from unstructured data sources.',
    category: 'Data Science/RPA',
    linkedin: 'https://www.linkedin.com/in/sakshi-sawant'
  },
  {
    id: '18',
    title: 'SAGA - Gauging Seconds',
    projectLead: 'Smruti Yadav',
    year: '2024',
    abstract: 'A time management tool designed to enhance productivity by tracking and analyzing time spent on various tasks.',
    category: 'Productivity Tools',
    linkedin: 'https://www.linkedin.com/in/smruti-yadav'
  },
  {
    id: '19',
    title: 'CAR CRASH DETECTION AND ASSISTANCE',
    projectLead: 'Sahil Sharma',
    year: '2024',
    abstract: 'This system detects car crashes in real-time and provides immediate assistance through alerts and notifications.',
    category: 'Automotive Safety',
    linkedin: 'https://www.linkedin.com/in/sahil-sharma'
  },
  {
    id: '20',
    title: 'VEHICARE',
    projectLead: 'Shantanu Tembhurne',
    year: '2024',
    abstract: 'An application designed for vehicle maintenance tracking and reminders, enhancing vehicle longevity.',
    category: 'Mobile App Development',
    linkedin: 'https://www.linkedin.com/in/shantanu-tembhurne'
  }
];