import { FiCode } from 'react-icons/fi';

const LOGOS = [
  { name: 'React', icon: '⚛️' },
  { name: 'Tailwind CSS', icon: '🎨' },
  { name: 'Next.js', icon: '▲' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'Figma', icon: '🎯' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Vite', icon: '⚡' },
  { name: 'Prisma', icon: '🔺' },
  { name: 'Stripe', icon: '💳' },
  { name: 'Vercel', icon: '◆' },
  { name: 'Flutter', icon: '🦋' },
  { name: 'Supabase', icon: '⚡' },
];

export const TechMarquee = () => {
  const doubled = [...LOGOS, ...LOGOS];

  return (
    <section className="py-8 bg-gray-50/80 dark:bg-gray-900/60 border-y border-gray-100 dark:border-gray-800/60 overflow-hidden relative">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />

      <div className="flex items-center justify-center gap-2 mb-4 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
        <FiCode className="text-sm" />
        <span>Built With Industry-Leading Technologies</span>
      </div>

      <div className="animate-marquee flex items-center gap-10 w-max">
        {doubled.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-white/80 dark:bg-gray-800/60 border border-gray-200/60 dark:border-gray-700/40 shadow-xs select-none whitespace-nowrap"
          >
            <span className="text-lg">{logo.icon}</span>
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
              {logo.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
