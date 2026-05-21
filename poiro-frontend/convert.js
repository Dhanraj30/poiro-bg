const fs = require('fs');

function convertHtmlToJsx(inputFile, outputFile, componentName) {
  let html = fs.readFileSync(inputFile, 'utf8');

  // Extract body content (between <body...> and </body>)
  let bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  if (!bodyMatch) {
    console.log('No body found in', inputFile);
    return;
  }
  let body = bodyMatch[1];

  // Remove script tags
  body = body.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Convert class to className
  body = body.replace(/class=/g, 'className=');
  
  // Convert for to htmlFor
  body = body.replace(/for=/g, 'htmlFor=');

  // Self close img and input
  body = body.replace(/<img([^>]*?)(?:\/?)>/g, '<img$1 />');
  body = body.replace(/<input([^>]*?)(?:\/?)>/g, '<input$1 />');

  // Remove HTML comments
  body = body.replace(/<!--[\s\S]*?-->/g, '');

  // Fix style attributes
  body = body.replace(/style="([^"]*)"/g, (match, p1) => {
    if (p1.includes('font-variation-settings')) {
      return `style={{ fontVariationSettings: '${p1.replace('font-variation-settings:', '').replace(';', '').trim()}' }}`;
    }
    if (p1.includes('width:')) {
       return `style={{ width: '${p1.replace('width:', '').replace(';', '').trim()}' }}`;
    }
    return match;
  });

  const component = `import { Link, useNavigate } from 'react-router-dom';

export function ${componentName}() {
  const navigate = useNavigate();
  return (
    <div className="bg-background font-body-md text-on-background selection:bg-primary selection:text-on-primary">
      ${body}
    </div>
  );
}
`;

  fs.writeFileSync(outputFile, component);
  console.log(outputFile, 'generated');
}

convertHtmlToJsx('landing.html', 'src/pages/LandingPage.tsx', 'LandingPage');
convertHtmlToJsx('lobby.html', 'src/pages/LobbyPageNew.tsx', 'LobbyPageNew');
