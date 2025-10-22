/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://levo.kg',  // твой домен
    generateRobotsTxt: true,     // создаёт robots.txt автоматически
    sitemapSize: 5000,
    changefreq: 'daily',
    priority: 0.7,
    exclude: ['/admin/*', '/api/*', '/server/*'],
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://levo.kg/sitemap-0.xml',
        ],
    },
}
