(function() {
    // Stratix AI Embeddable Widget
    const CONFIG = {
        primaryColor: '#0070FF',
        botId: document.currentScript ? document.currentScript.getAttribute('data-bot-id') : 'demo',
        apiUrl: 'https://stratix-hq.vercel.app/api/widget/chat'
    };

    // Inject styles
    const style = document.createElement('style');
    style.innerHTML = `
        #stratix-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 999999;
            font-family: var(--font-display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif);
        }
        #stratix-button {
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
        #stratix-button:hover { transform: scale(1.1); }
        #stratix-button svg { fill: white; width: 30px; height: 30px; }
        
        #stratix-window {
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
        #stratix-header {
            padding: 15px;
            background: ${CONFIG.primaryColor};
            color: white;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        #stratix-messages {
            flex: 1;
            padding: 15px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 10px;
            background: #f9f9f9;
        }
        #stratix-lead-form {
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            background: white;
            height: 100%;
            justify-content: center;
        }
        .st-input {
            padding: 10px 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 14px;
            outline: none;
        }
        .st-input:focus { border-color: ${CONFIG.primaryColor}; }
        .st-btn {
            background: ${CONFIG.primaryColor};
            color: white;
            border: none;
            padding: 12px;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: opacity 0.2s;
        }
        .st-btn:hover { opacity: 0.9; }
        
        .st-msg {
            max-width: 80%;
            padding: 8px 12px;
            border-radius: 15px;
            font-size: 14px;
            line-height: 1.4;
        }
        .st-msg-bot { background: #eee; align-self: flex-start; border-bottom-left-radius: 0; }
        .st-msg-user { background: ${CONFIG.primaryColor}; color: white; align-self: flex-end; border-bottom-right-radius: 0; }
        
        #stratix-input-area {
            padding: 10px;
            border-top: 1px solid #eee;
            display: flex;
            gap: 5px;
        }
        #stratix-input {
            flex: 1;
            border: 1px solid #ddd;
            padding: 8px 12px;
            border-radius: 20px;
            outline: none;
        }
        #stratix-send {
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
    container.id = 'stratix-widget';
    container.innerHTML = `
        <div id="stratix-window">
            <div id="stratix-header">
                <span>Stratix AI Strategic Support</span>
                <span id="stratix-close" style="cursor:pointer">&times;</span>
            </div>
            
            <div id="stratix-messages" style="display:none">
                <div class="st-msg st-msg-bot">¡Hola! Soy tu asistente de Stratix AI. ¿En qué puedo ayudarte hoy?</div>
            </div>

            <form id="stratix-lead-form">
                <div style="font-weight:bold; font-size:18px; color:#333; margin-bottom:5px">Bienvenido al Ecosistema Stratix 👋</div>
                <div style="font-size:13px; color:#666; margin-bottom:15px">Déjanos tus datos para brindarte una asesoría estratégica personalizada.</div>
                <input type="text" id="st-name" class="st-input" placeholder="Nombre completo" required>
                <input type="email" id="st-email" class="st-input" placeholder="Correo electrónico" required>
                <input type="tel" id="st-tel" class="st-input" placeholder="WhatsApp (opcional)">
                <button type="submit" class="st-btn">Empezar Experiencia</button>
            </form>

            <form id="stratix-input-area" style="display:none">
                <input type="text" id="stratix-input" placeholder="Escribe tu consulta estratégica..." autocomplete="off">
                <button type="submit" id="stratix-send">Ir</button>
            </form>
        </div>
        <div id="stratix-button">
            <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
        </div>
    `;
    document.body.appendChild(container);

    const btn = document.getElementById('stratix-button');
    const win = document.getElementById('stratix-window');
    const close = document.getElementById('stratix-close');
    const leadForm = document.getElementById('stratix-lead-form');
    const chatMessages = document.getElementById('stratix-messages');
    const chatInputArea = document.getElementById('stratix-input-area');
    const form = document.getElementById('stratix-input-area');
    const input = document.getElementById('stratix-input');
    const msgContainer = document.getElementById('stratix-messages');

    let chatHistory = [];
    let leadCaptured = false;
    
    // Session management
    let sessionId = localStorage.getItem('stratix_session_id');
    if (!sessionId) {
        sessionId = 'sess_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('stratix_session_id', sessionId);
    }

    btn.onclick = () => win.style.display = win.style.display === 'flex' ? 'none' : 'flex';
    close.onclick = () => win.style.display = 'none';

    leadForm.onsubmit = async (e) => {
        e.preventDefault();
        const name = document.getElementById('st-name').value;
        const email = document.getElementById('st-email').value;
        const whatsapp = document.getElementById('st-tel').value;

        // Transition to chat UI
        leadForm.style.display = 'none';
        chatMessages.style.display = 'flex';
        chatInputArea.style.display = 'flex';
        leadCaptured = true;

        // Save lead asynchronously
        try {
            const leadApiUrl = CONFIG.apiUrl.replace('/chat', '/lead');
            fetch(leadApiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    botId: CONFIG.botId, 
                    name, 
                    email, 
                    whatsapp,
                    sessionId: sessionId // Link lead to session
                })
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
                    sessionId: sessionId,
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
        div.className = `st-msg st-msg-${side}`;
        div.innerText = text;
        msgContainer.appendChild(div);
        msgContainer.scrollTop = msgContainer.scrollHeight;
        return div;
    }
})();
