import React, { useState, useMemo } from 'react';
import { 
  FiGitCommit, 
  FiCheckCircle, 
  FiClock, 
  FiArrowUpRight, 
  FiSliders,
  FiChevronDown,
  FiChevronUp,
  FiCode
} from 'react-icons/fi';
import changelogData from '../data/changelog.json';
import { sound } from '../utils/sound';
import { toast } from 'react-toastify';

export const ChangelogSection = () => {
  const [selectedTag, setSelectedTag] = useState('All');
  const [expandedVersions, setExpandedVersions] = useState(() => {
    // Expand the latest 2 versions by default
    return ['v2.4.0', 'v2.3.0'];
  });

  const tags = useMemo(() => {
    const list = ['All'];
    changelogData.forEach((item) => {
      if (item.tag && !list.includes(item.tag)) {
        list.push(item.tag);
      }
    });
    return list;
  }, []);

  const filteredReleases = useMemo(() => {
    if (selectedTag === 'All') return changelogData;
    return changelogData.filter((item) => item.tag === selectedTag);
  }, [selectedTag]);

  const toggleExpand = (version) => {
    sound.click();
    setExpandedVersions((prev) =>
      prev.includes(version) ? prev.filter((v) => v !== version) : [...prev, version]
    );
  };

  const handleSubscribeRss = () => {
    sound.click();
    navigator.clipboard.writeText('https://github.com/Atahar-Shihab/DigiTools-Platform/releases.atom');
    toast.success('Changelog RSS feed URL copied to clipboard!', { icon: '📡' });
  };

  return (
    <section id="changelog" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950/60 text-[#8B5CF6] dark:text-purple-300 border border-purple-200 dark:border-purple-800/60 mb-4">
          <FiGitCommit className="text-[#8B5CF6]" />
          <span>Continuous Engineering Delivery</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          Platform Changelog & Release Notes
        </h2>
        <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
          Track our architectural evolution, new digital toolkits, security audits, and continuous performance enhancements shipped directly to production.
        </p>

        {/* Filter Pills & Actions */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                sound.click();
                setSelectedTag(tag);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedTag === tag
                  ? 'bg-[#8B5CF6] text-white shadow-md shadow-purple-500/20'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-purple-300'
              }`}
            >
              <FiSliders size={11} />
              <span>{tag}</span>
            </button>
          ))}

          <button
            onClick={handleSubscribeRss}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 transition-colors flex items-center gap-1 cursor-pointer"
            title="Subscribe via RSS / Atom Feed"
          >
            <span>RSS Feed</span>
            <FiArrowUpRight size={13} />
          </button>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical Center/Left Track Line */}
        <div className="absolute top-4 bottom-4 left-4 sm:left-8 w-0.5 bg-gradient-to-b from-[#8B5CF6] via-indigo-500/50 to-purple-300/20 dark:to-gray-800 pointer-events-none" />

        <div className="space-y-8 sm:space-y-10">
          {filteredReleases.map((release) => {
            const isExpanded = expandedVersions.includes(release.version);

            return (
              <div key={release.version} className="relative pl-12 sm:pl-20 group">
                {/* Timeline Node Icon */}
                <div className="absolute left-2.5 sm:left-6.5 top-1.5 -translate-x-1/2 w-6 h-6 rounded-full bg-white dark:bg-gray-900 border-2 border-[#8B5CF6] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <div className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                </div>

                {/* Release Card */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-lg transition-all">
                  
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-mono text-base font-black text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-xl">
                        {release.version}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${release.tagColor}`}>
                        {release.badge}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                        {release.tag}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <FiClock size={13} />
                        <span>{release.date}</span>
                      </div>
                      <button
                        onClick={() => toggleExpand(release.version)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                        title={isExpanded ? 'Collapse notes' : 'Expand notes'}
                      >
                        {isExpanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="mt-4">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                      {release.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {release.description}
                    </p>
                  </div>

                  {/* Highlights List (Expandable) */}
                  {isExpanded && (
                    <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2.5 animate-fadeIn">
                      <h4 className="text-xs uppercase font-extrabold tracking-wider text-gray-400 flex items-center gap-1.5 mb-2">
                        <FiCode /> Key Enhancements & Milestones:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {release.highlights.map((highlight, hIdx) => (
                          <div
                            key={hIdx}
                            className="flex items-start gap-2.5 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-700 dark:text-gray-300"
                          >
                            <FiCheckCircle className="text-[#8B5CF6] shrink-0 mt-0.5" size={14} />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
