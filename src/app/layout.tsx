import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS
config.autoAddCss = false; // Disable the automatic CSS injection

export const metadata: Metadata = {
	title: {
		template: '%s | Scratch Auth Demo for Next.js',
		default: 'Scratch Auth Demo for Next.js'
	},
	description: "Scratch Auth is a simple OAuth service for Scratch. It provides a straightforward API for developers, and a smooth login experience for end users.",

	generator: "Next.js",
	metadataBase: new URL('https:/scratch-auth-demo-ts.vercel.app'),

	// manifest: "/webmanifest.json",

	appleWebApp: { capable: true, title: "Scratch Auth Demo for Next.js", statusBarStyle: "black-translucent" },
	verification: { "me": "https://github.com/Fun117" },
	publisher: "Vercel",
	creator: "Fun117",
	authors: [{ name: "Fun117", url: "https://github.com/Fun117" }],

	category: "Scratch Auth Demo for Next.js",
	classification: "Scratch Auth Demo for Next.js",
	keywords: "fun117,Scratch,Auth,ScratchAuth",

	applicationName: "Scratch Auth Demo for Next.js",
	openGraph: {
		type: "website",
		url: "https://scratch-auth-demo-ts.vercel.app/",
		title: "Scratch Auth Demo for Next.js",
		description: "Scratch Auth is a simple OAuth service for Scratch. It provides a straightforward API for developers, and a smooth login experience for end users.",
		siteName: "Scratch Auth Demo for Next.js",
	},

	bookmarks: "https://scratch-auth-demo-ts.vercel.app/"
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`w-screen ${inter.className}`}>{children}</body>
		</html>
	);
}
