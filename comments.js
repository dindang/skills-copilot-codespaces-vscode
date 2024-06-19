// Create web server 
// 1. Create a web server
// 2. Listen for incoming requests
// 3. Read the request body
// 4. Parse the request body
// 5. Read the comments from the file
// 6. Add the new comment to the list of comments
// 7. Write the new list of comments to the file
// 8. Respond to the request

// 1. Create a web server
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // 2. Listen for incoming requests
    // 3. Read the request body
    let body = '';
    req.on('data', (chunk) => {
        // 4. Parse the request body
        body += chunk.toString();
    });

    req.on('end', () => {
        // 5. Read the comments from the file
        fs.readFile('./comments.json', (err, data) => {
            if (err) {
                res.statusCode = 500;
                return res.end('Error loading comments');
            }

            let comments = JSON.parse(data);
            // 6. Add the new comment to the list of comments
            comments.push(JSON.parse(body));

            // 7. Write the new list of comments to the file
            fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
                if (err) {
                    res.statusCode = 500;
                    return res.end('Error saving comments');
                }

                // 8. Respond to the request
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(comments));
            });
        });
    });
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});