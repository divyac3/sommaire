'use client';

import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MotionDiv, MotionSection } from '@/components/common/motion-wrapper';
import { containerVariants, itemVariants } from '@/utils/constants';

const buttonVariants = {
  scale: 1.05,
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 10,
  },
};

export default function Footer() {
  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      className="w-full py-5 px-6 sm:px-8 lg:px-12"
    > 
      <MotionDiv
        variants={itemVariants}
        className="flex flex-col lg:flex-row items-center justify-between gap-8 max-w-7xl mx-auto w-full"
      >
        {/* Left: Friendly Message */}
        <div className="text-center lg:text-left">
          <p className="text-xl font-bold flex items-center gap-2">
            👋 <span>Let’s Connect</span>
          </p>
          <p className="mx-auto max-w-[700px] text-gray-500 font-medium md:text-l/relaxed lg:text-l/relaxed xl:text-l/relaxed dark:text-gray-400">
            Fast. Smart. Summarized.
          </p>
        </div>

        {/* Center: CTA */}
        {/* <MotionDiv whileHover={buttonVariants} className="text-center">
          <p className="mb-2 text-gray-300 text-sm">Ready to get your summary?</p>
          <Button
            variant="link"
            className="text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-500 px-6 py-3 rounded-full text-sm font-semibold shadow-md transition-all duration-300"
          >
            <Link href="/" className="flex items-center gap-2">
              <Mail size={16} /> 
            </Link>
          </Button>
        </MotionDiv> */}

        {/* Right: Social Icons */}
        <div className="flex items-center gap-4 text-gray-400">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </MotionDiv>

      {/* Bottom: Copyright */}
      <MotionDiv
        variants={itemVariants}
        className="mt-8 pb-2 text-center items-center text-xs text-gray-500"
      >
        © {new Date().getFullYear()} — Built with ❤️ Sommaire.
      </MotionDiv>
    </MotionSection>
  );
}
