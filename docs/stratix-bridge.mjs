import { readdirSync, readFileSync, writeFileSync } from 'fs';

process.stdin.on('data', (data) => {
  try {
    const message = JSON.parse(data.toString().trim());
    
    if (message.method === 'initialize') {
      process.stdout.write(JSON.stringify({
        jsonrpc: "2.0", id: message.id,
        result: {
          protocolVersion: "2024-11-05",
          capabilities: { tools: {} },
          serverInfo: { name: "stratix-opencode-v2", version: "2.0.0" }
        }
      }) + '\n');
    }

    if (message.method === 'tools/list') {
      process.stdout.write(JSON.stringify({
        jsonrpc: "2.0", id: message.id,
        result: {
          tools: [
            {
              name: "read_logic",
              description: "Lee la lógica de un archivo para análisis OpenCode",
              inputSchema: { type: "object", properties: { path: { type: "string" } }, required: ["path"] }
            },
            {
              name: "write_logic",
              description: "Escribe código optimizado directamente en el proyecto",
              inputSchema: { 
                type: "object", 
                properties: { 
                  path: { type: "string" }, 
                  content: { type: "string" } 
                }, 
                required: ["path", "content"] 
              }
            }
          ]
        }
      }) + '\n');
    }

    if (message.method === 'tools/call') {
      let text = "";
      const { name, arguments: args } = message.params;
      
      try {
        if (name === 'read_logic') {
          text = readFileSync(args.path, 'utf8');
        } else if (name === 'write_logic') {
          writeFileSync(args.path, args.content);
          text = "✅ Código inyectado con éxito en: " + args.path;
        }
      } catch (e) {
        text = "❌ Error de I/O: " + e.message;
      }
      
      process.stdout.write(JSON.stringify({
        jsonrpc: "2.0", id: message.id,
        result: { content: [{ type: "text", text }], isError: false }
      }) + '\n');
    }
  } catch (err) {}
});
setInterval(() => {}, 1000);
