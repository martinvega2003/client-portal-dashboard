import React from 'react';

type ButtonVariant = 'filled' | 'outlined' | 'text' | 'link' | 'gradient' | 'glassmorphic';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  textColor?: string; // For text color | e.g. 'text-red-500'
  gradientFrom?: string; // For gradient button | e.g. 'from-blue-400'
  gradientTo?: string; // For gradient button | e.g. 'to-purple-500'
  glassBgColor?: string; // For glassmorphic button | e.g. 'bg-white/30'
}

const Button: React.FC<ButtonProps> = ({
  variant = 'filled',
  children,
  className = '',
  textColor,
  gradientFrom,
  gradientTo,
  glassBgColor,
  ...props
}) => {

  const textColorStyle = textColor ? textColor : 'text-gray-900 dark:text-white';

  const baseStyles =
    'font-semibold transition duration-300 focus:outline-none cursor-pointer';

  const filledStyles =
    'bg-gray-900 dark:bg-white hover:bg-transparent text-white hover:text-gray-900 dark:text-gray-900 dark:hover:text-white border-2 border-gray-900 dark:border-white';

  const outlinedStyles =
    'bg-transparent hover:bg-gray-900 dark:hover:bg-white text-gray-900 hover:text-white dark:text-white dark:hover:text-gray-900 border-2 border-gray-900 dark:border-white';

  const textStyles =
    `bg-transparent border-none shadow-none p-0 m-0 hover:scale-105 ${textColorStyle}`;

  const linkStyles =
    'bg-transparent border-none text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-200';

  const gradientDefault = gradientFrom && gradientTo
    ? `bg-gradient-to-r ${gradientFrom} ${gradientTo}`
    : 'bg-gradient-to-r from-blue-400 to-purple-500 dark:from-gray-700 dark:to-gray-900 btn-gradient-anim';

  const gradientStyles = `${baseStyles} ${gradientDefault} ${textColorStyle} border-none btn-gradient-anim`;

  const glassDefault = glassBgColor
  ? glassBgColor
  : 'bg-gray-900/30 dark:bg-white/30';

  const glassStyles =
    `${baseStyles} ${glassDefault} ${textColorStyle} backdrop-blur-md border border-white/40 dark:border-gray-900/40 text-gray-900 dark:text-white
    transition-all duration-250 ease-out
    hover:-translate-y-0.5 hover:scale-[1.01] hover:backdrop-blur-lg hover:border-white/60 dark:hover:border-gray-900/60 hover:shadow-lg
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25`;

  let styles = '';
  switch (variant) {
    case 'filled':
      styles = `${baseStyles} ${filledStyles}`;
      break;
    case 'outlined':
      styles = `${baseStyles} ${outlinedStyles}`;
      break;
    case 'text':
      styles = `${baseStyles} ${textStyles}`;
      break;
    case 'link':
      styles = `${baseStyles} ${linkStyles}`;
      break;
    case 'gradient':
      styles = `${gradientStyles}`;
      break;
    case 'glassmorphic':
      styles = `${glassStyles}`;
      break;
    default:
      styles = `${baseStyles} ${filledStyles}`;
  }

  return (
    <button className={`${styles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
