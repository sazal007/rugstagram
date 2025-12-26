import React from "react";

const SocialIcons: React.FC = () => {
  return (
    <div className="flex items-center space-x-3">
      <SocialIconWrapper href="#">
        <FacebookIcon />
      </SocialIconWrapper>
      <SocialIconWrapper href="#">
        <InstagramIcon />
      </SocialIconWrapper>
    </div>
  );
};

const SocialIconWrapper: React.FC<{
  href: string;
  children: React.ReactNode;
}> = ({ href, children }) => (
  <a
    href={href}
    className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-700 dark:text-white hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white transition-all duration-300"
  >
    {children}
  </a>
);

// Custom SVG Icons to match the thin stroke style in the image more closely than standard libraries might

const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default SocialIcons;
