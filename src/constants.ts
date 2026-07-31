/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  role: string;
  imageUrl?: string;
  createdAt?: any;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

export interface Education {
  degree: string;
  school: string;
  year: string;
}

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "The Classical Brush in AI",
    description: "Infusing traditional painting techniques into AI annotation workflows to improve depth perception and edge accuracy for creative models.",
    tags: ["Fine Arts", "AI Training", "Visual Logic"],
    role: "Project Manager",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "2",
    title: "Frame Mastery Series",
    description: "A collection of hand-drawn character studies applying classical animation principles to modern digital branding.",
    tags: ["Animation", "Illustration", "Craft"],
    role: "Lead Illustrator",
    imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "3",
    title: "Cinematic Motion Logic",
    description: "Applying 12 principles of animation to television graphics, creating fluid and high-impact visual narratives.",
    tags: ["Motion Graphics", "Disney Principles", "After Effects"],
    role: "Animation Expert",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "4",
    title: "Artistic Identity Systems",
    description: "Developing brand identities rooted in commercial painting theory and color psychology.",
    tags: ["Branding", "Fine Art Theory", "UI"],
    role: "Creative Lead",
    imageUrl: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "5",
    title: "Eco-Kinetic Canvas",
    description: "A traditional painting study exploring the reactive speed of nature. This piece demonstrates classical brushwork techniques applied to a vibrant, high-contrast palette.",
    tags: ["Traditional Painting", "Nature Study", "Fine Art"],
    role: "Artisan Painter",
    imageUrl: "https://p0.storage.ais.google.com/ais-pre-hk7rnq3lu32b2spf6w2au2/input_file_0.png"
  },
  {
    id: "6",
    title: "Visual Strategy Hub",
    description: "Leading creative teams through the lens of traditional craftsmanship to ensure digital output retains an 'artisan' feel.",
    tags: ["Strategy", "Team Mastery", "Creativity"],
    role: "Creative Director",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: "DATAMAKER GH",
    role: "PROJECT MANAGER (AI MACHINE LEARNING LEAD)",
    period: "2023 – Present",
    highlights: [
      "Oversee end-to-end AI/ML project lifecycles, leading cross-functional teams to deliver high-precision computer vision and machine learning datasets.",
      "Architect data labeling strategies, quality control protocols, and annotation pipelines ensuring 99%+ model accuracy and SLA compliance.",
      "Direct 50+ AI specialists in data curation, edge-case analysis, and model validation across complex computer vision and generative AI projects.",
      "Optimize machine learning delivery workflows and resource management, bridging artistic precision with technical ML execution."
    ]
  },
  {
    company: "GLOBAL DIGNITY FORUM",
    role: "Lead Storyteller & Designer",
    period: "Volunteer",
    highlights: [
      "Designed visual campaigns using classical illustration styles to convey complex human emotions.",
      "Provided photography and concept art that bridges traditional aesthetics with modern social issues."
    ]
  },
  {
    company: "IMMANUEL BELIEVERS' MINISTRIES",
    role: "Youth Organizer & Chief Graphic Designer",
    period: "Ongoing",
    highlights: [
      "Mentoring youth in artistic mastery and digital tools.",
      "Overseeing all visual communication with a focus on high-fidelity design output."
    ]
  },
  {
    company: "ACURATY GH",
    role: "Data Systems Specialist",
    period: "2022",
    highlights: [
      "Orchestrated the high-precision transition of physical health medical records into secure digital ecosystems.",
      "Maintained rigorous data integrity standards during the conversion of complex hardcopy health claims.",
      "Optimized data entry workflows to ensure rapid and error-free systemic processing."
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    degree: "B. Tech in Animation & Illustration",
    school: "Takoradi Technical University",
    year: "2019-2022"
  },
  {
    degree: "HND in Commercial Arts (Painting option)",
    school: "Takoradi Technical University",
    year: "2016-2019"
  }
];

export const SKILLS = {
  technical: ["Adobe Photoshop", "After Effects", "Adobe Animate", "Figma", "Blender", "TV Paint", "Microsoft Office", "Canva"],
  core: ["Project Planning", "AI Data Annotation", "Graphic Design", "Photography", "Visual Communication", "Team Management"]
};
