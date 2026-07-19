(function () {
    /**
     * STRATIX INTELLIGENCE — ENCAPSULATED SHIELD ENGINE (V46.0)
     * Aislamiento total mediante Shadow DOM para compatibilidad universal.
     */
    
    const script = document.currentScript;
    const botId = script ? script.getAttribute('data-bot-id') : null;
    
    if (!botId) return;

    const APP_URL = window.location.origin.includes('localhost') ? 'http://localhost:3000' : 'https://stratix-intelligence-ia.vercel.app';

    // 1. Crear el Host del Shadow DOM
    const host = document.createElement('div');
    host.id = 'stratix-widget-root';
    host.style.zIndex = '2147483647';
    document.body.appendChild(host);
    const shadow = host.attachShadow({ mode: 'open' });

    // 2. Inyectar Estilos Encapsulados
    const styles = document.createElement('style');
    styles.textContent = `
        :host {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 2147483647;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        #stratix-container {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 20px;
            pointer-events: none;
        }

        #stratix-launcher {
            width: 70px;
            height: 70px;
            background: #060B14;
            border: 2px solid #D4AF37;
            border-radius: 22px;
            cursor: pointer;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            pointer-events: auto;
            overflow: hidden;
            position: relative;
        }

        #stratix-launcher:hover {
            transform: scale(1.05) translateY(-5px);
            box-shadow: 0 15px 50px rgba(0,0,0,0.6), 0 0 30px rgba(212,175,55,0.4);
        }

        #stratix-launcher img {
            width: 32px;
            height: 32px;
            transition: transform 0.4s ease;
        }

        #stratix-launcher:hover img {
            transform: rotate(10deg);
        }

        #stratix-iframe-container {
            width: 420px;
            height: 650px;
            border-radius: 30px;
            overflow: hidden;
            background: #0B1120;
            box-shadow: 0 25px 100px rgba(0,0,0,0.8);
            border: 1px solid rgba(212,175,55,0.1);
            transform: translateY(20px) scale(0.95);
            opacity: 0;
            visibility: hidden;
            transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
            pointer-events: auto;
        }

        #stratix-iframe-container.open {
            transform: translateY(0) scale(1);
            opacity: 1;
            visibility: visible;
        }

        iframe {
            width: 100%;
            height: 100%;
            border: none;
        }

        @media (max-width: 480px) {
            #stratix-iframe-container {
                width: 90vw;
                height: 80vh;
                right: 5vw;
            }
        }
    `;
    shadow.appendChild(styles);

    // 3. Estructura del DOM
    const container = document.createElement('div');
    container.id = 'stratix-container';

    const iframeWrapper = document.createElement('div');
    iframeWrapper.id = 'stratix-iframe-container';
    
    const iframe = document.createElement('iframe');
    iframe.src = `${APP_URL}/widget?bot-id=${botId}`;
    iframe.allow = "clipboard-read; clipboard-write; microphone; camera";
    
    const launcher = document.createElement('div');
    launcher.id = 'stratix-launcher';
    launcher.innerHTML = `<img src="${APP_URL}/stratix_shield.svg" alt="Stratix AI">`;

    iframeWrapper.appendChild(iframe);
    container.appendChild(iframeWrapper);
    container.appendChild(launcher);
    shadow.appendChild(container);

    // 4. Interacción Maestro
    let isOpen = false;

    launcher.onclick = () => {
        isOpen = !isOpen;
        if (isOpen) {
            iframeWrapper.classList.add('open');
            launcher.style.transform = 'scale(0.8) rotate(90deg) opacity(0.5)';
            setTimeout(() => launcher.style.display = 'none', 300);
        }
    };

    window.addEventListener('message', (event) => {
        if (event.data === 'stratix-close') {
            isOpen = false;
            iframeWrapper.classList.remove('open');
            setTimeout(() => {
                launcher.style.display = 'flex';
                setTimeout(() => launcher.style.transform = 'scale(1) rotate(0deg) opacity(1)', 50);
            }, 300);
        }
    });

})();