(function () {
    const getSessionId = () => {
        let sid = localStorage.getItem('stratix_session_id');
        if (!sid) {
            sid = 'sx_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('stratix_session_id', sid);
        }
        return sid;
    };

    // Stratix AI Elite Widget Configuration
    const CONFIG = {
        primaryColor: '#25D366', // Verde WhatsApp
        secondaryColor: '#0B1120', // Azul Medianoche
        botId: document.currentScript ? document.currentScript.getAttribute('data-bot-id') : 'demo',
        sessionId: getSessionId(),
        apiUrl: window.location.origin + '/api/widget/chat',
        leadsUrl: window.location.origin + '/api/leads'
    };

    // Inyección de Estilos de Alta Gama
    const style = document.createElement('style');
    style.innerHTML = `
        #stratix-widget {
            position: fixed;
            bottom: 25px;
            right: 25px;
            z-index: 999999;
            font-family: 'Inter', -apple-system, sans-serif;
        }
        #stratix-button {
            width: 65px;
            height: 65px;
            border-radius: 50%;
            background: ${CONFIG.primaryColor};
            box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border: 2px solid rgba(255,255,255,0.4);
        }
        #stratix-button:hover { transform: scale(1.1) rotate(5deg); }
        #stratix-button svg { width: 35px; height: 35px; color: white; }
        
        #stratix-window {
            position: absolute;
            bottom: 85px;
            right: 0;
            width: 380px;
            height: 600px;
            background: ${CONFIG.secondaryColor};
            border-radius: 24px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.4);
            display: none;
            flex-direction: column;
            overflow: hidden;
            border: 1px solid rgba(212, 175, 55, 0.2);
        }
        #stratix-header {
            padding: 20px;
            background: #060B14;
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(212, 175, 55, 0.1);
        }
        #stratix-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 12px;
            background: ${CONFIG.secondaryColor};
        }
        #stratix-lead-form {
            padding: 30px;
            display: flex;
            flex-direction: column;
            gap: 15px;
            background: ${CONFIG.secondaryColor};
            height: 100%;
            justify-content: center;
        }
        .st-input {
            padding: 12px 16px;
            border: 1px solid rgba(212, 175, 55, 0.1);
            border-radius: 12px;
            font-size: 14px;
            background: rgba(255,255,255,0.03);
            color: white;
            outline: none;
            transition: border 0.3s;
        }
        .st-input:focus { border-color: ${CONFIG.primaryColor}; }
        .st-btn {
            background: ${CONFIG.primaryColor};
            color: ${CONFIG.secondaryColor};
            border: none;
            padding: 14px;
            border-radius: 12px;
            font-weight: 800;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .st-msg {
            max-width: 85%;
            padding: 12px 16px;
            border-radius: 18px;
            font-size: 14px;
            line-height: 1.5;
        }
        .st-msg-bot { background: rgba(255,255,255,0.05); color: white; align-self: flex-start; border-bottom-left-radius: 4px; }
        .st-msg-user { background: ${CONFIG.primaryColor}; color: ${CONFIG.secondaryColor}; align-self: flex-end; border-bottom-right-radius: 4px; font-weight: 600; }
        
        #stratix-input-area {
            padding: 15px;
            background: #060B14;
            border-top: 1px solid rgba(212, 175, 55, 0.1);
            display: flex;
            gap: 10px;
        }
        #stratix-input {
            flex: 1;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(212, 175, 55, 0.1);
            padding: 10px 15px;
            border-radius: 12px;
            color: white;
            outline: none;
        }
        #stratix-send {
            background: ${CONFIG.primaryColor};
            border: none;
            padding: 10px 18px;
            border-radius: 12px;
            cursor: pointer;
            display: flex;
            align-items: center;
        }
    `;
    document.head.appendChild(style);

    // Inyección de HTML
    const container = document.createElement('div');
    container.id = 'stratix-widget';
    container.innerHTML = `
        <div id="stratix-window">
            <div id="stratix-header">
                <div style="display:flex; align-items:center; gap:8px">
                    <img src="/stratix_shield.svg" style="width:20px; height:20px">
                    <span style="font-weight:800; font-size:14px; letter-spacing:0.5px">STRATIX AI ELITE</span>
                </div>
                <span id="stratix-close" style="cursor:pointer; font-size:24px">&times;</span>
            </div>
            
            <div id="stratix-messages" style="display:none">
                <div class="st-msg st-msg-bot">Bienvenido al núcleo de inteligencia. ¿Cómo puedo potenciar tu estrategia hoy?</div>
            </div>

            <form id="stratix-lead-form">
                <div style="font-weight:900; font-size:20px; color:white; margin-bottom:8px">Acceso Exclusivo 👋</div>
                <div style="font-size:13px; color:rgba(255,255,255,0.5); margin-bottom:20px">Identifícate para iniciar la sesión de consultoría IA.</div>
                <input type="text" id="st-name" class="st-input" placeholder="Nombre completo" required>
                <input type="email" id="st-email" class="st-input" placeholder="Correo corporativo" required>
                <input type="tel" id="st-tel" class="st-input" placeholder="WhatsApp (Opcional)">
                <button type="submit" class="st-btn">Iniciar Consultoría</button>
            </form>

            <form id="stratix-input-area" style="display:none">
                <input type="text" id="stratix-input" placeholder="Escribe tu consulta estratégica..." autocomplete="off">
                <button type="submit" id="stratix-send">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                </button>
            </form>
        </div>
        <div id="stratix-button">
            <img src="/stratix_shield.svg" style="width:30px; height:30px">
        </div>
    `;
    document.body.appendChild(container);

    const btn = document.getElementById('stratix-button');
    const win = document.getElementById('stratix-window');
    const close = document.getElementById('stratix-close');
    const leadForm = document.getElementById('stratix-lead-form');
    const chatMessages = document.getElementById('stratix-messages');
    const chatInputArea = document.getElementById('stratix-input-area');
    const input = document.getElementById('stratix-input');

    btn.onclick = () => win.style.display = win.style.display === 'flex' ? 'none' : 'flex';
    close.onclick = () => win.style.display = 'none';

    leadForm.onsubmit = async (e) => {
        e.preventDefault();
        const name = document.getElementById('st-name').value.trim();
        const email = document.getElementById('st-email').value.trim();
        const tel = document.getElementById('st-tel').value.trim();

        if (!name) return;

        try {
            await fetch(CONFIG.leadsUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    phone: tel,
                    botId: CONFIG.botId,
                    sessionId: CONFIG.sessionId,
                    metadata: { source: 'Widget Web', url: window.location.href }
                })
            });
        } catch (err) {
            console.error('Error capturando lead:', err);
        }

        leadForm.style.display = 'none';
        chatMessages.style.display = 'flex';
        chatInputArea.style.display = 'flex';
    };

    chatInputArea.onsubmit = async (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        input.value = '';

        try {
            const res = await fetch(CONFIG.apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: text }],
                    botId: CONFIG.botId,
                    sessionId: CONFIG.sessionId
                })
            });
            const data = await res.json();
            if (data.message) addMessage(data.message.content, 'bot');
        } catch (err) {
            addMessage('Error de conexión estratégica.', 'bot');
        }
    };

    function addMessage(text, side) {
        const div = document.createElement('div');
        div.className = `st-msg st-msg-${side}`;
        div.innerText = text;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
})();