import { motion } from 'framer-motion';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

const initialSkillCategories = [
  {
    title: 'Languages',
    skills: [
      { name: 'Python', level: 85 },
      { name: 'C / C++', level: 80 },
      { name: 'Java', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'SQL / HTML / CSS', level: 90 },
    ]
  },
  {
    title: 'Frontend & Backend',
    skills: [
      { name: 'React (Vite)', level: 80 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Node.js / Express', level: 75 },
      { name: 'MongoDB / MySQL', level: 80 },
    ]
  },
  {
    title: 'Tools & Version Control',
    skills: [
      { name: 'Git & GitHub', level: 85 },
      { name: 'MS Excel / Word', level: 95 },
      { name: 'Problem Solving', level: 90 },
    ]
  }
];

export default function Skills() {
  const [skillCategories, setSkillCategories] = useState(initialSkillCategories);

  useEffect(() => {
    const fetchFirestoreSkills = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'skills'));
        const docs = querySnapshot.docs.map(doc => doc.data());
        if (docs.length > 0) {
          // Group by category
          const categoriesMap: { [key: string]: { name: string; level: number }[] } = {};
          
          // Initialize standard groups to ensure clean layout structure
          const targetCategories = ['Languages', 'Frontend & Backend', 'Tools & Version Control'];
          targetCategories.forEach(cat => {
            categoriesMap[cat] = [];
          });

          docs.forEach(docData => {
            const cat = docData.category || 'Others';
            if (!categoriesMap[cat]) {
              categoriesMap[cat] = [];
            }
            categoriesMap[cat].push({
              name: docData.name || '',
              level: Number(docData.level) || 0
            });
          });

          // Format for rendering
          const formatted = Object.keys(categoriesMap)
            .map(title => ({
              title,
              skills: categoriesMap[title]
            }))
            .filter(cat => cat.skills.length > 0);

          if (formatted.length > 0) {
            setSkillCategories(formatted);
          }
        }
      } catch (err) {
        console.error('Error loading custom skills:', err);
      }
    };
    fetchFirestoreSkills();
  }, []);

  return (
    <section id="skills" className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Skills & Expertise</h2>
        <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {skillCategories.map((category) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h3 className="text-xl font-display font-bold text-primary flex items-center justify-between">
              {category.title}
              <Badge variant="outline" className="ml-2">{category.skills.length} Skills</Badge>
            </h3>
            
            <div className="space-y-6">
              {category.skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>{skill.name}</span>
                    <span className="text-primary">{skill.level}%</span>
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                  >
                    <Progress value={skill.level} className="h-2" />
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
