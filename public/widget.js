(function() {
    // ChatGenius Embeddable Widget
    const CONFIG = {
        primaryColor: '#4f7df5',
        botId: document.currentScript ? document.currentScript.getAttribute('data-bot-id') : 'demo',
        apiUrl: 'http://localhost:3000/api/widget/chat' // Change to production URL later
    };

    // Inject styles
    const style = document.createElement('style');
    style.innerHTML = `
        #chatgenius-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 999999;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        #chatgenius-button {
            width: 60px;
            height: 60px;
            border-radius: 30px;
            background: ${CONFIG.primaryColor};
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        #chatgenius-button:hover { transform: scale(1.1); }
        #chatgenius-button svg { fill: white; width: 30px; height: 30px; }
        
        #chatgenius-window {
            position: absolute;
            bottom: 80px;
            right: 0;
            width: 350px;
            height: 500px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            display: none;
            flex-direction: column;
            overflow: hidden;
            border: 1px solid #eee;
        }
        #chatgenius-header {
            padding: 15px;
            background: ${CONFIG.primaryColor};
            color: white;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        #chatgenius-messages {
            flex: 1;
            padding: 15px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 10px;
            background: #f9f9f9;
        }
        #chatgenius-lead-form {
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            background: white;
            height: 100%;
            justify-content: center;
        }
        .cg-input {
            padding: 10px 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 14px;
            outline: none;
        }
        .cg-input:focus { border-color: ${CONFIG.primaryColor}; }
        .cg-btn {
            background: ${CONFIG.primaryColor};
            color: white;
            border: none;
            padding: 12px;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: opacity 0.2s;
        }
        .cg-btn:hover { opacity: 0.9; }
        
        .cg-msg {
            max-width: 80%;
            padding: 8px 12px;
            border-radius: 15px;
            font-size: 14px;
            line-height: 1.4;
        }
        .cg-msg-bot { background: #eee; align-self: flex-start; border-bottom-left-radius: 0; }
        .cg-msg-user { background: ${CONFIG.primaryColor}; color: white; align-self: flex-end; border-bottom-right-radius: 0; }
        
        #chatgenius-input-area {
            padding: 10px;
            border-top: 1px solid #eee;
            display: flex;
            gap: 5px;
        }
        #chatgenius-input {
            flex: 1;
            border: 1px solid #ddd;
            padding: 8px 12px;
            border-radius: 20px;
            outline: none;
        }
        #chatgenius-send {
            background: ${CONFIG.primaryColor};
            border: none;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);

    // Create container
    const container = document.createElement('div');
    container.id = 'chatgenius-widget';
    container.innerHTML = `
        <div id="chatgenius-window">
            <div id="chatgenius-header">
                <span>ChatGenius Support</span>
                <span id="chatgenius-close" style="cursor:pointer">&times;</span>
            </div>
            
            <div id="chatgenius-messages" style="display:none">
                <div class="cg-msg cg-msg-bot">¡Hola! ¿En qué puedo ayudarte hoy?</div>
            </div>

            <form id="chatgenius-lead-form">
                <div style="font-weight:bold; font-size:18px; color:#333; margin-bottom:5px">Bienvenido 👋</div>
                <div style="font-size:13px; color:#666; margin-bottom:15px">Déjanos tus datos para brindarte una mejor atención.</div>
                <input type="text" id="cg-name" class="cg-input" placeholder="Nombre completo" required>
                <input type="email" id="cg-email" class="cg-input" placeholder="Correo electrónico" required>
                <input type="tel" id="cg-tel" class="cg-input" placeholder="WhatsApp (opcional)">
                <button type="submit" class="cg-btn">Empezar Chat</button>
            </form>

            <form id="chatgenius-input-area" style="display:none">
                <input type="text" id="chatgenius-input" placeholder="Escribe tu duda..." autocomplete="off">
                <button type="submit" id="chatgenius-send">Ir</button>
            </form>
        </div>
        <div id="chatgenius-button">
            <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
        </div>
    `;
    document.body.appendChild(container);

    const btn = document.getElementById('chatgenius-button');
    const win = document.getElementById('chatgenius-window');
    const close = document.getElementById('chatgenius-close');
    const leadForm = document.getElementById('chatgenius-lead-form');
    const chatMessages = document.getElementById('chatgenius-messages');
    const chatInputArea = document.getElementById('chatgenius-input-area');
    const form = document.getElementById('chatgenius-input-area');
    const input = document.getElementById('chatgenius-input');
    const msgContainer = document.getElementById('chatgenius-messages');

    let chatHistory = [];
    let leadCaptured = false;

    btn.onclick = () => win.style.display = win.style.display === 'flex' ? 'none' : 'flex';
    close.onclick = () => win.style.display = 'none';

    leadForm.onsubmit = async (e) => {
        e.preventDefault();
        const name = document.getElementById('cg-name').value;
        const email = document.getElementById('cg-email').value;
        const whatsapp = document.getElementById('cg-tel').value;

        // Transition to chat UI
        leadForm.style.display = 'none';
        chatMessages.style.display = 'flex';
        chatInputArea.style.display = 'flex';
        leadCaptured = true;

        // Save lead asynchronously
        try {
            fetch('http://localhost:3000/api/widget/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ botId: CONFIG.botId, name, email, whatsapp })
            });
        } catch(e) {}
    };

    form.onsubmit = async (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if(!text) return;

        // Add user message
        addMessage(text, 'user');
        input.value = '';
        chatHistory.push({ role: 'user', content: text });

        // Loading state
        const loading = addMessage('...', 'bot');

        try {
            const res = await fetch(CONFIG.apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    botId: CONFIG.botId,
                    messages: chatHistory
                })
            });
            const data = await res.json();
            loading.remove();
            
            if(data.message) {
                addMessage(data.message.content, 'bot');
                chatHistory.push(data.message);
            }
        } catch(err) {
            loading.innerText = 'Error de conexión.';
        }
    };

    function addMessage(text, side) {
        const div = document.createElement('div');
        div.className = `cg-msg cg-msg-${side}`;
        div.innerText = text;
        msgContainer.appendChild(div);
        msgContainer.scrollTop = msgContainer.scrollHeight;
        return div;
    }
})();
