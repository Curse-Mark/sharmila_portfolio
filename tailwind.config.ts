
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			// Add the duration-1500 class to the transitionDuration object
			transitionDuration: {
				'1500': '1500ms',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			perspective: {
				'1000': '1000px'
			},
			rotate: {
				'y-3': 'rotateY(3deg)',
				'y-6': 'rotateY(6deg)',
				'y-12': 'rotateY(12deg)',
				'y-180': 'rotateY(180deg)',
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"float": {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" },
				},
				"pulse-subtle": {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0.8" },
				},
				"spin-slow": {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(360deg)" },
				},
				"bounce-subtle": {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-5px)" },
				},
				"flip": {
					"0%": { transform: "rotateY(0deg)" },
					"100%": { transform: "rotateY(180deg)" },
				},
				"shimmer": {
					"0%": { backgroundPosition: "-500px 0" },
					"100%": { backgroundPosition: "500px 0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"float": "float 5s ease-in-out infinite",
				"pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
				"spin-slow": "spin-slow 8s linear infinite",
				"bounce-subtle": "bounce-subtle 3s ease-in-out infinite",
				"flip": "flip 0.6s ease-in-out",
				"shimmer": "shimmer 2s infinite linear",
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'shimmer': 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)',
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addUtilities }: { addUtilities: Function }) {
			addUtilities({
				'.perspective-1000': {
					perspective: '1000px'
				},
				'.rotate-y-3': {
					transform: 'rotateY(3deg)'
				},
				'.rotate-y-6': {
					transform: 'rotateY(6deg)'
				},
				'.rotate-y-12': {
					transform: 'rotateY(12deg)'
				},
				'.rotate-y-180': {
					transform: 'rotateY(180deg)'
				},
				'.preserve-3d': {
					transformStyle: 'preserve-3d'
				},
				'.backface-hidden': {
					backfaceVisibility: 'hidden'
				},
				'.card-3d-effect': {
					transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
					'&:hover': {
						transform: 'translateY(-10px) rotateY(6deg)',
						boxShadow: '0 15px 30px -5px rgba(0, 0, 0, 0.1)'
					}
				},
				'.glass-effect': {
					background: 'rgba(255, 255, 255, 0.1)',
					backdropFilter: 'blur(10px)',
					borderRadius: 'var(--radius)',
					border: '1px solid rgba(255, 255, 255, 0.2)'
				},
				'.flip-card-inner': {
					transition: 'transform 0.6s',
					transformStyle: 'preserve-3d',
					position: 'relative'
				},
				'.flip-card-front, .flip-card-back': {
					position: 'absolute',
					width: '100%',
					height: '100%',
					backfaceVisibility: 'hidden'
				},
				'.flip-card-back': {
					transform: 'rotateY(180deg)'
				},
				'.hover-shadow-grow': {
					transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
					'&:hover': {
						transform: 'scale(1.05)',
						boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
					}
				}
			})
		}
	],
} satisfies Config;
