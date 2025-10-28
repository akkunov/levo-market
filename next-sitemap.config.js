/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://levo.kg',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    changefreq: 'daily',
    priority: 0.8,
    exclude: ['/admin/*', '/api/*'],
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/' },
            { userAgent: 'Googlebot', allow: '/' },
        ],
    },
};
