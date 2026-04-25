import { spawn } from 'child_process';
import { readdirSync, readFileSync } from 'fs';

process.stdin.on('data', (data) => {
  try {
    const rawPayload = data.toString().trim();
    if (!rawPayload) return;
    const message = JSON.parse(rawPayload);
    
    if (message.method === 'initialize') {
      process.stdout.write(JSON.stringify({
        jsonrpc: "2.0", id: message.id,
        result: {
          protocolVersion: "2024-11-05",
          capabilities: { tools: {} },
          serverInfo: { name: "stratix-engine", version: "1.4.0" }
        }
      }) + '\n');
    }

    if (message.method === 'tools/list') {
      process.stdout.write(JSON.stringify({
        jsonrpc: "2.0", id: message.id,
        result: {
          tools: [
            {
              name: "list_project_files",
              description: "Ver archivos en la carpeta de Stratix Intelligence",
              inputSchema: { type: "object", properties: {} }
            },
            {
              name: "read_file_content",
              description: "Leer el contenido de un archivo específico",
              inputSchema: {
                type: "object",
                properties: { path: { type: "string" } },
                required: ["path"]
              }
            }
          ]
        }
      }) + '\n');
    }

    if (message.method === 'tools/call') {
      let text = "";
      if (message.params.name === 'list_project_files') {
        text = "📂 Archivos: " + readdirSync('.').join(', ');
      } else if (message.params.name === 'read_file_content') {
        text = readFileSync(message.params.arguments.path, 'utf8');
      }
      
      process.stdout.write(JSON.stringify({
        jsonrpc: "2.0", id: message.id,
        result: { content: [{ type: "text", text }], isError: false }
      }) + '\n');
    }
  } catch (err) {}
});
setInterval(() => {}, 1000);
