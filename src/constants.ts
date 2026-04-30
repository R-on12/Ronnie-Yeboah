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
    title: "AI Annotation Excellence",
    description: "Led and managed project plans, timelines, and milestones for large-scale AI annotation projects, ensuring 99%+ accuracy.",
    tags: ["Project Management", "AI", "Data Annotation"],
    role: "Project Manager",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "2",
    title: "Digital Illustration Series",
    description: "Created custom illustrations and concept art for social media campaigns and branding initiatives.",
    tags: ["Illustration", "Branding", "Creative"],
    role: "Graphic Designer",
    imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "3",
    title: "Motion Graphics for TV",
    description: "Assisted in the production of dynamic motion graphics for television content and studio operations.",
    tags: ["Motion Graphics", "After Effects", "TV"],
    role: "Intern",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "4",
    title: "Commercial Branding",
    description: "Developed comprehensive brand identity systems for local startups in the tech and hospitality sectors.",
    tags: ["Branding", "UI/UX", "Visual Arts"],
    role: "Creative Lead",
    imageUrl: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "5",
    title: "Character Design Pack",
    description: "A set of high-fidelity character illustrations for an unannounced mobile game project.",
    tags: ["Animation", "Character Design", "Concept Art"],
    role: "Illustrator",
    imageUrl: "https://images.unsplash.com/photo-1541462608141-ad603a1f4967?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "6",
    title: "Social Media Campaign",
    description: "Managed the visual strategy and execution for a humanitarian campaign reaching 1M+ views.",
    tags: ["Social Media", "Strategy", "Graphic Design"],
    role: "Social Media Manager",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: "DATAMAKER GH",
    role: "Project Manager",
    period: "2023 – Present",
    highlights: [
      "Develop and manage project plans, timelines, and milestones for AI annotation projects.",
      "Recruit, train, and supervise annotation specialists to ensure consistent quality output.",
      "Monitor project progress, identify risks, and implement corrective actions."
    ]
  },
  {
    company: "GLOBAL DIGNITY FORUM",
    role: "Graphic Designer & Photographer",
    period: "Volunteer",
    highlights: [
      "Designs graphics for social media, branding, and digital campaigns.",
      "Creates illustrations, promotional designs, and concept art.",
      "Provides photography services including portraits and product shots."
    ]
  },
  {
    company: "GHANA COCOBOD",
    role: "Administrative Assistant",
    period: "2019 – 2020",
    highlights: [
      "Draft official correspondences and internal documents.",
      "Maintained filling systems and tracked source documents.",
      "Assisted with printing and general administrative duties."
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
