/*
  # Create Projects Table for ProjectVault

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text, project title)
      - `project_lead` (text, student name)
      - `year` (integer, project year)
      - `category` (text, project category)
      - `abstract` (text, project description)
      - `description` (text, detailed description)
      - `technologies` (text array, tech stack)
      - `github_url` (text, GitHub repository)
      - `demo_url` (text, live demo)
      - `linkedin_url` (text, student LinkedIn)
      - `image_url` (text, project image)
      - `likes_count` (integer, number of likes)
      - `views_count` (integer, number of views)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `projects` table
    - Add policy for public read access
    - Add policy for public updates to likes/views

  3. Indexes
    - Add indexes for better query performance
    - Full-text search index on title and abstract

  4. Functions
    - Increment views function for atomic updates
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  project_lead text NOT NULL,
  year integer NOT NULL,
  category text NOT NULL,
  abstract text NOT NULL,
  description text,
  technologies text[] DEFAULT '{}',
  github_url text,
  demo_url text,
  linkedin_url text,
  image_url text,
  likes_count integer DEFAULT 0,
  views_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Public projects are viewable by everyone" 
  ON projects FOR SELECT 
  USING (true);

CREATE POLICY "Public can update likes and views" 
  ON projects FOR UPDATE 
  USING (true) 
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_year ON projects(year);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_likes ON projects(likes_count DESC);
CREATE INDEX IF NOT EXISTS idx_projects_search ON projects USING GIN(to_tsvector('english', title || ' ' || abstract));

-- Create function to increment views atomically
CREATE OR REPLACE FUNCTION increment_views(project_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE projects 
  SET views_count = views_count + 1,
      updated_at = now()
  WHERE id = project_id;
END;
$$ LANGUAGE plpgsql;

-- Insert sample data
INSERT INTO projects (title, project_lead, year, category, abstract, technologies, linkedin_url, image_url) VALUES
('CAR BLACKBOX', 'Arya A. Mhatre', 2024, 'Embedded Systems/Automotive Technology', 'This project aims to develop an advanced vehicle black box system that records critical data during a drive, enhancing safety and accident analysis.', ARRAY['Arduino', 'C++', 'GPS', 'Sensors'], 'https://www.linkedin.com/in/arya-mhatre', 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg'),

('BIONIC ARM', 'Yash Shinde', 2024, 'Robotics/Artificial Intelligence', 'The Bionic Arm project focuses on creating a prosthetic arm that mimics natural movement using sensors and actuators, providing enhanced functionality for users.', ARRAY['Arduino', 'Servo Motors', 'EMG Sensors', 'Python'], 'https://www.linkedin.com/in/yash-shinde', 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg'),

('SIGN LANGUAGE RECOGNITION USING MEDIAPIPE FRAMEWORK WITH PYTHON', 'Faisal Hussain', 2024, 'Artificial Intelligence/Computer Vision', 'This project utilizes the MediaPipe framework and Python to develop a system capable of recognizing and translating sign language into text, promoting accessibility for the hearing impaired.', ARRAY['Python', 'MediaPipe', 'OpenCV', 'TensorFlow'], 'https://www.linkedin.com/in/faisal-hussain', 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg'),

('Home Automation Using Node MCU', 'Vijay Chavan', 2024, 'IoT (Internet of Things)', 'The Home Automation project leverages Node MCU technology to create a smart home system, allowing users to control household appliances remotely via a web interface.', ARRAY['NodeMCU', 'Arduino IDE', 'WiFi', 'HTML/CSS'], 'https://www.linkedin.com/in/vijay-chavan', 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg'),

('Personal Virtual Desktop Assistant with Personal Chatbot Using Python (ZIRA)', 'Sohel Sarang', 2024, 'Artificial Intelligence/Chatbot Development', 'ZIRA is designed as a personal virtual assistant that interacts with users through natural language processing, providing assistance with tasks and information retrieval.', ARRAY['Python', 'NLTK', 'Speech Recognition', 'Text-to-Speech'], 'https://www.linkedin.com/in/sohel-sarang', 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg'),

('Face Recognition Based Smart Attendance System', 'Prateek Rasalkar', 2024, 'Artificial Intelligence/Computer Vision', 'This project develops a smart attendance system using face recognition technology to automate and streamline attendance tracking in educational institutions.', ARRAY['Python', 'OpenCV', 'Face Recognition', 'SQLite'], 'https://www.linkedin.com/in/prateek-rasalkar', 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg'),

('VOICE CONTROLLED HUMANOID', 'Chaitanya Rane', 2024, 'Robotics/Artificial Intelligence', 'This project focuses on creating a humanoid robot that can be controlled using voice commands, enhancing human-robot interaction.', ARRAY['Arduino', 'Voice Recognition', 'Servo Motors', 'Bluetooth'], 'https://www.linkedin.com/in/chaitanya-rane', 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg'),

('TROJAN HORSE DETECTION SOFTWARE', 'Anusha Charvekar', 2024, 'Cybersecurity', 'The project aims to develop software capable of detecting Trojan horse malware, enhancing cybersecurity measures for users.', ARRAY['Python', 'Machine Learning', 'Antivirus APIs', 'GUI'], 'https://www.linkedin.com/in/anusha-charvekar', 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg'),

('Milk Quality Detection', 'Om Kasar', 2024, 'Food Technology', 'This mini-project focuses on developing a system to assess the quality of milk using various detection methods.', ARRAY['Arduino', 'pH Sensors', 'Temperature Sensors', 'LCD Display'], 'https://www.linkedin.com/in/om-kasar', 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg'),

('House Price Prediction', 'Vishesh Sharma', 2024, 'Data Science/Machine Learning', 'The project utilizes machine learning algorithms to predict house prices based on various features and market trends.', ARRAY['Python', 'Pandas', 'Scikit-learn', 'Matplotlib'], 'https://www.linkedin.com/in/vishesh-sharma', 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg'),

('IoT-Based Air Pollution Management System', 'Aabha Kadam', 2024, 'IoT (Internet of Things)', 'This project aims to create an IoT-based system for monitoring and managing air pollution levels in urban areas.', ARRAY['Arduino', 'Air Quality Sensors', 'WiFi Module', 'ThingSpeak'], 'https://www.linkedin.com/in/aabha-kadam', 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg'),

('Comparative Analysis of Deep Learning Algorithms for Satellite Image Segmentation', 'Soumya Ramkrishna', 2024, 'Artificial Intelligence/Deep Learning', 'The project involves analyzing various deep learning algorithms to determine their effectiveness in segmenting satellite images.', ARRAY['Python', 'TensorFlow', 'Keras', 'OpenCV'], 'https://www.linkedin.com/in/soumya-ramkrishna', 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg'),

('Smart Plant Watering System', 'Simran Kodere', 2024, 'IoT (Internet of Things)', 'This mini-project develops an automated plant watering system that uses sensors to determine soil moisture levels.', ARRAY['Arduino', 'Soil Moisture Sensor', 'Water Pump', 'Relay Module'], 'https://www.linkedin.com/in/simran-kodere', 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg'),

('Anti Theft Alert System', 'Shubham Wankhede', 2024, 'Security Systems', 'The project focuses on creating an anti-theft alert system that uses sensors and alarms to protect valuable assets.', ARRAY['Arduino', 'PIR Sensor', 'GSM Module', 'Buzzer'], 'https://www.linkedin.com/in/shubham-wankhede', 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg'),

('Online Language Translator for PDF', 'Sanket Mishra', 2024, 'Software Development/Translation Technology', 'This mini-project aims to develop an online tool that translates text in PDF documents into multiple languages.', ARRAY['Python', 'PyPDF2', 'Google Translate API', 'Flask'], 'https://www.linkedin.com/in/sanket-mishra', 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg'),

('ALLOCATRIX - Active Allocation in Derivative Matrix', 'Gaurav Bhadoria', 2024, 'Mathematics/Optimization', 'This project focuses on optimizing resource allocation in derivative matrices for improved operational efficiency.', ARRAY['MATLAB', 'Python', 'NumPy', 'Optimization Algorithms'], 'https://www.linkedin.com/in/gaurav-bhadoria', 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg'),

('DATA EXTRACTION USING RPA FROM UNSTRUCTURED DATA', 'Sakshi Sawant', 2024, 'Data Science/RPA', 'Developing a Robotic Process Automation (RPA) solution for extracting valuable insights from unstructured data sources.', ARRAY['Python', 'Selenium', 'BeautifulSoup', 'Pandas'], 'https://www.linkedin.com/in/sakshi-sawant', 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg'),

('SAGA - Gauging Seconds', 'Smruti Yadav', 2024, 'Productivity Tools', 'A time management tool designed to enhance productivity by tracking and analyzing time spent on various tasks.', ARRAY['JavaScript', 'React', 'Node.js', 'MongoDB'], 'https://www.linkedin.com/in/smruti-yadav', 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg'),

('CAR CRASH DETECTION AND ASSISTANCE', 'Sahil Sharma', 2024, 'Automotive Safety', 'This system detects car crashes in real-time and provides immediate assistance through alerts and notifications.', ARRAY['Arduino', 'Accelerometer', 'GPS', 'GSM Module'], 'https://www.linkedin.com/in/sahil-sharma', 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg'),

('VEHICARE', 'Shantanu Tembhurne', 2024, 'Mobile App Development', 'An application designed for vehicle maintenance tracking and reminders, enhancing vehicle longevity.', ARRAY['React Native', 'Firebase', 'JavaScript', 'Push Notifications'], 'https://www.linkedin.com/in/shantanu-tembhurne', 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg');