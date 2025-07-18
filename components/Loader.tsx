"use client";
import React from 'react';
import { motion } from 'framer-motion';

export interface LoaderProps {
    /**
     * Type of loader animation
     */
    variant?: 'spinner' | 'dots' | 'bars' | 'pulse' | 'ripple';

    /**
     * Size of the loader
     */
    size?: 'sm' | 'md' | 'lg' | 'xl';

    /**
     * Color theme of the loader
     */
    theme?: 'primary' | 'secondary' | 'white' | 'gradient';

    /**
     * Optional loading text
     */
    text?: string;

    /**
     * Show backdrop overlay
     */
    overlay?: boolean;

    /**
     * Custom className for additional styling
     */
    className?: string;

    /**
     * Speed of animation (in seconds)
     */
    speed?: number;
}

const Loader: React.FC<LoaderProps> = ({
    variant = 'spinner',
    size = 'md',
    theme = 'gradient',
    text,
    overlay = false,
    className = '',
    speed = 1
}) => {

    // Size configurations
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
    };

    const textSizes = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl'
    };

    // Color themes
    const colorThemes = {
        primary: 'text-blue-500',
        secondary: 'text-purple-500',
        white: 'text-white',
        gradient: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'
    };

    // Spinner Loader
    const SpinnerLoader = () => (
        <motion.div
            className={`border-2 border-gray-300 border-t-transparent rounded-full ${sizeClasses[size]} ${theme === 'gradient'
                    ? 'border-gray-300/30 border-t-blue-500'
                    : `border-gray-300/30 border-t-current ${colorThemes[theme]}`
                }`}
            animate={{ rotate: 360 }}
            transition={{
                duration: speed,
                repeat: Infinity,
                ease: "linear"
            }}
        />
    );

    // Dots Loader
    const DotsLoader = () => {
        const dotVariants = {
            initial: { y: 0 },
            animate: { y: -10 }
        };

        const dotSize = {
            sm: 'w-1.5 h-1.5',
            md: 'w-2 h-2',
            lg: 'w-3 h-3',
            xl: 'w-4 h-4'
        };

        return (
            <div className="flex space-x-1">
                {[0, 1, 2].map((index) => (
                    <motion.div
                        key={index}
                        className={`rounded-full ${dotSize[size]} ${theme === 'gradient'
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                                : `bg-current ${colorThemes[theme]}`
                            }`}
                        variants={dotVariants}
                        initial="initial"
                        animate="animate"
                        transition={{
                            duration: speed * 0.6,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: index * 0.1
                        }}
                    />
                ))}
            </div>
        );
    };

    // Bars Loader
    const BarsLoader = () => {
        const barVariants = {
            initial: { scaleY: 1 },
            animate: { scaleY: [1, 2, 1] }
        };

        const barWidth = {
            sm: 'w-1',
            md: 'w-1.5',
            lg: 'w-2',
            xl: 'w-3'
        };

        const barHeight = {
            sm: 'h-4',
            md: 'h-6',
            lg: 'h-8',
            xl: 'h-12'
        };

        return (
            <div className="flex items-end space-x-1">
                {[0, 1, 2, 3, 4].map((index) => (
                    <motion.div
                        key={index}
                        className={`rounded-sm ${barWidth[size]} ${barHeight[size]} ${theme === 'gradient'
                                ? 'bg-gradient-to-t from-blue-500 to-purple-500'
                                : `bg-current ${colorThemes[theme]}`
                            }`}
                        variants={barVariants}
                        initial="initial"
                        animate="animate"
                        transition={{
                            duration: speed,
                            repeat: Infinity,
                            delay: index * 0.1
                        }}
                    />
                ))}
            </div>
        );
    };

    // Pulse Loader
    const PulseLoader = () => (
        <motion.div
            className={`rounded-full ${sizeClasses[size]} ${theme === 'gradient'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                    : `bg-current ${colorThemes[theme]}`
                }`}
            animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1]
            }}
            transition={{
                duration: speed,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    );

    // Ripple Loader
    const RippleLoader = () => {
        const rippleSize = {
            sm: 'w-8 h-8',
            md: 'w-12 h-12',
            lg: 'w-16 h-16',
            xl: 'w-20 h-20'
        };

        return (
            <div className={`relative ${rippleSize[size]}`}>
                {[0, 1].map((index) => (
                    <motion.div
                        key={index}
                        className={`absolute inset-0 rounded-full border-2 ${theme === 'gradient'
                                ? 'border-blue-500'
                                : `border-current ${colorThemes[theme]}`
                            }`}
                        animate={{
                            scale: [0, 1],
                            opacity: [1, 0]
                        }}
                        transition={{
                            duration: speed * 2,
                            repeat: Infinity,
                            delay: index * speed,
                            ease: "easeOut"
                        }}
                    />
                ))}
            </div>
        );
    };

    // Select loader component
    const LoaderComponent = () => {
        switch (variant) {
            case 'dots':
                return <DotsLoader />;
            case 'bars':
                return <BarsLoader />;
            case 'pulse':
                return <PulseLoader />;
            case 'ripple':
                return <RippleLoader />;
            default:
                return <SpinnerLoader />;
        }
    };

    // Main loader content
    const loaderContent = (
        <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
            <LoaderComponent />
            {text && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`${textSizes[size]} ${colorThemes[theme]} font-medium text-center`}
                >
                    {text}
                </motion.p>
            )}
        </div>
    );

    // Return with or without overlay
    if (overlay) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            >
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                    {loaderContent}
                </div>
            </motion.div>
        );
    }

    return loaderContent;
};

export default Loader;
