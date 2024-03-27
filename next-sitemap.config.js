/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: "https://scratch-auth-demo-nextjs.vercel.app",
    generateRobotsTxt: true,
    sitemapSize: 5000,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: '/api',
            },
        ],
    },
};