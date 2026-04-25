import('child_process').then(cp => cp.spawn('ollama', ['serve'], { stdio: 'inherit' }));
