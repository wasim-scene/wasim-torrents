const fs = require('fs');
const path = require('path');

function generateIndex(dir, relativePath = '') {
    let content = `<html><body><h1>Index of /torrents - Wasim Encodes - the smallest encodes in the world</h1><ul>`;

    const items = fs.readdirSync(dir, { withFileTypes: true });

    items.forEach(item => {
        const itemPath = path.join(dir, item.name);
        const relativeItemPath = path.join(relativePath, item.name);
        
        if (item.isDirectory()) {
            content += `<li><a href="${relativeItemPath}/">${item.name}/</a></li>`;
        } else {
            content += `<li><a href="${relativeItemPath}">${item.name}</a></li>`;
        }
    });

    content += `</ul></body></html>`;

    return content;
}

const moviesDir = path.join(__dirname, 'torrents');
if (fs.existsSync(moviesDir)) {
    const indexContent = generateIndex(moviesDir, 'torrents');
    fs.writeFileSync('index.html', indexContent);
} else {
    console.error('The /torrents directory does not exist.');
}
