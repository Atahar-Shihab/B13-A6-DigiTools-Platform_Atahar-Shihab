import { 
  Code2, 
  Atom, 
  Palette, 
  Layers, 
  FileCode, 
  Layout, 
  Server, 
  Zap, 
  Database, 
  CreditCard, 
  Triangle, 
  Smartphone, 
  Flame 
} from 'lucide-react';

const LOGOS = [
  { name: 'React', icon: Atom, color: 'text-cyan-500' },
  { name: 'Tailwind CSS', icon: Palette, color: 'text-sky-500' },
  { name: 'Next.js', icon: Layers, color: 'text-gray-900 dark:text-white' },
  { name: 'TypeScript', icon: FileCode, color: 'text-blue-500' },
  { name: 'Figma', icon: Layout, color: 'text-purple-500' },
  { name: 'Node.js', icon: Server, color: 'text-emerald-500' },
  { name: 'Vite', icon: Zap, color: 'text-amber-500' },
  { name: 'Prisma', icon: Database, color: 'text-teal-500' },
  { name: 'Stripe', icon: CreditCard, color: 'text-indigo-500' },
  { name: 'Vercel', icon: Triangle, color: 'text-gray-800 dark:text-gray-200' },
  { name: 'Flutter', icon: Smartphone, color: 'text-blue-400' },
  { name: 'Supabase', icon: Flame, color: 'text-emerald-400' },
];

export const TechMarquee = () => {
  const doubled = [...LOGOS, ...LOGOS];

  return (
    <section className="py-8 bg-gray-50/80 dark:bg-gray-900/60 border-y border-gray-100 dark:border-gray-800/60 overflow-hidden relative">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />

      <div className="flex items-center justify-center gap-2 mb-4 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
        <Code2 size={14} className="text-[#8B5CF6]" />
        <span>Built With Industry-Leading Technologies</span>
      </div>

      <div className="animate-marquee flex items-center gap-10 w-max">
        {doubled.map((tech, i) => {
          const Icon = tech.icon;
          return (
            <div
              key={`${tech.name}-${i}`}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-white/80 dark:bg-gray-800/60 border border-gray-200/60 dark:border-gray-700/40 shadow-xs select-none whitespace-nowrap group hover:border-purple-300 dark:hover:border-purple-600 transition-colors"
            >
              <Icon size={18} className={tech.color} />
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
