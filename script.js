// Main logo
const mainLogo = "https://i.ibb.co/1t83h0Dn/x.jpg";

// Special logos
const specialLogos = {
  "Sony Max": "https://i.ibb.co/tpnRRNfn/x.jpg",
  "Sinema Zetu": "https://i.ibb.co/yFyd9pF2/x.jpg",
  "Azam Sports 1": "https://i.ibb.co/B24B9Qvp/x.jpg",
  "Al Jazeera": "https://i.ibb.co/Jwd8zGXb/x.jpg",
  "Azam Sports 4": "https://i.ibb.co/BKgbYmg8/x.jpg",
  "Wasafi": "https://i.ibb.co/LDXL5qWY/x.jpg",
  "Azam Two": "https://i.ibb.co/9HzfkSh7/x.jpg",
  "Azam Sports 2": "https://i.ibb.co/5CB8LHv/x.jpg",
  "UTV": "https://i.ibb.co/1GjLZkq2/x.jpg",
  "Azam One": "https://i.ibb.co/NdR0tdJz/x.jpg"
};

// Channel list
const channels = [
  {
    name: "AMC",
    src: "https://dash2.antik.sk/stream/nvidia_amc/playlist_cenc.mpd",
    key: "11223344556677889900112233445566:4b80724d0ef86bcb2c21f7999d67739d",
    drm: "clearkey",
    category: "Movies"
  },
  {
    name: "AXN",
    src: "https://qp-pldt-live-grp-06-prod.akamaized.net/out/u/cg_axn_sd.mpd",
    key: "fd5d928f5d974ca4983f6e9295dfe410:3aaa001ddc142fedbb9d5557be43792f",
    drm: "clearkey",
    category: "Movies"
  },
  {
    name: "ASTRO PL 1",
    src: "https://get.perfecttv.net/jwt.mpd?username=vip_3klp0es8&password=wg3piwEs&channel=epl1hd",
    key: "1090bef3275b45d188200b828fe30527:43eff6a8da896a34056f339ec9562045",
    drm: "clearkey",
    category: "Sports"
  },
  {
    name: "ASTRO PL 2",
    src: "", // Will be dynamically set
    key: "4ecad9adae8f44f0b1c8bf5c492da613:43ac85382893194802f0d34dbf71059e",
    drm: "clearkey",
    category: "Sports"
  },
  // ... (other channels unchanged)
  {
    name: "TNT SPORTS 3 BACKUP",
    src: "https://ottb.live.cf.ww.aiv-cdn.net/lhr-nitro/live/clients/dash/enc/lsdasbvglv/out/v1/bb548a3626cd4708afbb94a58d71dce9/cenc.mpd",
    key: "4e993aa8c1f295f8b94e8e9e6f6d0bfe:86a1ed6e96caab8eb1009fe530d2cf4f",
    drm: "clearkey",
    category: "Sports"
  }
];

// Download-only movies
const downloadMovies = [
  {
    name: "Ghost",
    icon: "https://i.ibb.co/CK8rY52s/x.jpg",
    download: "https://drive.google.com/file/d/1OQ32dEF7eQnCtNVnx2M_V3iMqh6jH9p8/view?usp=drive_link",
    tags: ["HD", "Action"]
  },
  {
    name: "John Luther",
    icon: "https://i.ibb.co/0pbndhSQ/x.jpg",
    download: "https://drive.google.com/file/d/1qPAeFr1gVVPeKvxf7WN13vmTVez4tzt7/view?usp=drive_link",
    tags: ["HD", "Thriller"]
  }
];

// Online movies
const onlineMovies = [
  {
    name: "Deep cover",
    icon: "https://i.ibb.co/TMdkCYhb/x.jpg",
    src: "https://vz-1bb50f2e-8ea.b-cdn.net/6ae044c0-692f-40bd-95c5-0c99ab30f27a/playlist.m3u8",
    tags: ["HD", "Action"]
  },
  {
    name: "SuperMan (Imetafsiriwa)",
    icon: "https://i.ibb.co/zhZY2mC0/x.jpg",
    src: "https://vz-1bb50f2e-8ea.b-cdn.net/90a38928-5c11-4526-ba09-02a02b5dbc85/playlist.m3u8",
    tags: ["HD", "Action"]
  },
  {
    name: "Off the Grind",
    icon: "https://i.ibb.co/KpYny5HT/x.jpg",
    src: "https://vz-1bb50f2e-8ea.b-cdn.net/bb20ea3c-7f75-499c-9e92-eb0ac3ae1a2d/playlist.m3u8",
    tags: ["HD", "Drama"]
  },
  {
    name: "THUNDERBOLTS",
    icon: "https://i.ibb.co/mCYRvz1Q/x.jpg",
    src: "https://vz-1bb50f2e-8ea.b-cdn.net/6f50dd95-476a-489a-9e85-3347c57e5586/playlist.m3u8",
    tags: ["HD", "Action"]
  },
  {
    name: "Heard of State",
    icon: "https://i.ibb.co/xKY7mg0m/x.jpg",
    src: "https://vz-1bb50f2e-8ea.b-cdn.net/6f50dd95-476a-489a-9e85-3347c57e5586/playlist.m3u8",
    tags: ["HD", "Drama"]
  },
  {
    name: "SHADOW FORCE",
    icon: "https://i.ibb.co/ZpJtxPVm/x.jpg",
    src: "https://vz-1bb50f2e-8ea.b-cdn.net/bde45d25-32bb-44cc-b00b-945ea7423c7d/playlist.m3u8",
    tags: ["HD", "Action"]
  }
];

// User and payment status
const user = JSON.parse(localStorage.getItem('user') || '{}');
const phoneNumber = user.phoneNumber || 'guest';
const channelsWithLogos = channels.map(ch => ({
  ...ch,
  logo: specialLogos[ch.name] || mainLogo,
  src: ch.name === 'ASTRO PL 2' ? `https://get.perfecttv.net/jwt.mpd?username=${encodeURIComponent(phoneNumber)}&password=pass123&channel=epl2hd` : ch.src
}));

// Initialize everything after DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  // Check login status
  if (!user.loggedIn) {
    window.location.href = 'login.html';
    return;
  }

  const videoElement = document.getElementById('video');
  const pipButton = document.getElementById('pipButton');
  const videoContainer = document.getElementById('videoContainer');
  const channelListElement = document.getElementById('channelListLive');
  const btnLive = document.getElementById('btnLive');
  const btnMovies = document.getElementById('btnMovies');
  const liveSearch = document.getElementById('liveSearch');
  const clearSearch = document.getElementById('clearSearch');
  const noResults = document.getElementById('noResults');
  const userPhone = document.getElementById('userPhone');
  const logoutButton = document.getElementById('logoutButton');
  const paymentModal = document.getElementById('paymentModal');
  const paymentForm = document.getElementById('paymentForm');
  const payBtn = document.getElementById('payBtn');
  const phoneInput = document.getElementById('phoneNumber');
  const messageContainer = document.getElementById('messageContainer');
  const closeBtn = document.querySelector('.close');
  let currentQuery = "";
  let pollingInterval = null;

  // Display user phone number
  userPhone.textContent = phoneNumber;

  // Handle logout
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
  });

  // Payment modal functions
  function showModal() {
    paymentModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    phoneInput.value = phoneNumber;
    phoneInput.focus();
  }

  function hideModal() {
    paymentModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    resetForm();
  }

  function resetForm() {
    paymentForm.reset();
    phoneInput.value = phoneNumber;
    setPayButtonState(false);
    clearMessages();
    clearInterval(pollingInterval);
  }

  closeBtn.addEventListener('click', hideModal);
  window.addEventListener('click', (event) => {
    if (event.target === paymentModal) {
      hideModal();
    }
  });

  // Phone number formatting
  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) value = value.slice(0, 10);
    if (value.length > 0 && !value.startsWith('0')) value = '0' + value.slice(0, 9);
    e.target.value = value;
  });

  // Payment handling
  paymentForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const phoneNumber = phoneInput.value.trim();
    if (!validatePhoneNumber(phoneNumber)) {
      showMessage('Tafadhali ingiza namba ya simu sahihi (mf. 06XXXXXXXX)', 'error');
      return;
    }
    setPayButtonState(true);
    clearMessages();
    try {
      const formData = new FormData();
      formData.append('action', 'pay');
      formData.append('phoneNumber', phoneNumber);
      formData.append('amount', '2000');
      const response = await fetch('https://your-server.com/payment.php', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (result.success) {
        showMessage(result.message, 'success');
        showPaymentWaiting(result.order_id);
        startPaymentPolling(result.order_id);
      } else {
        showMessage(result.message || 'Malipo yameshindwa. Jaribu tena.', 'error');
        setPayButtonState(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      showMessage('Tatizo la mtandao. Tafadhali angalia muunganisho wako.', 'error');
      setPayButtonState(false);
    }
  });

  function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^0[67][0-9]{8}$/;
    return phoneRegex.test(phoneNumber);
  }

  function setPayButtonState(loading) {
    const btnText = payBtn.querySelector('.btn-text');
    const spinner = payBtn.querySelector('.loading-spinner');
    if (loading) {
      payBtn.disabled = true;
      btnText.style.display = 'none';
      spinner.style.display = 'block';
    } else {
      payBtn.disabled = false;
      btnText.style.display = 'block';
      spinner.style.display = 'none';
    }
  }

  function showMessage(text, type = 'info') {
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    messageContainer.appendChild(message);
    setTimeout(() => {
      if (message.parentNode) {
        message.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => message.remove(), 300);
      }
    }, 5000);
  }

  function clearMessages() {
    messageContainer.innerHTML = '';
  }

  function showPaymentWaiting(orderId) {
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `
      <div style="text-align: center; padding: 40px;">
        <img src="https://8upload.com/image/6892195a262d1/a18af4d9d5fa27b3877bd41464115320.png" alt="TWEVE LIVE Logo" class="mx-auto mb-4 h-12">
        <div class="waiting-spinner"></div>
        <h2 style="color: #22d3ee; margin: 20px 0;">Endelea Kulipia...</h2>
        <p style="color: #cbd5e1; margin-bottom: 20px;">Tafadhali kamilisha malipo kwa simu yako</p>
        <div class="waiting-steps" style="margin: 30px 0; text-align: left; max-width: 300px; margin: 30px auto;">
          <div class="step">📱 Angalia simu yako kwa USSD prompt</div>
          <div class="step">💳 Ingiza PIN yako kukamilisha malipo</div>
          <div class="step">⏳ Inasubiri uthibitisho...</div>
        </div>
        <button onclick="cancelPayment()" style="background: #6c757d; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 20px;">
          Ghairi
        </button>
      </div>
    `;
  }

  function showPaymentSuccess(orderId) {
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `
      <div style="text-align: center; padding: 40px;">
        <img src="https://8upload.com/image/6892195a262d1/a18af4d9d5fa27b3877bd41464115320.png" alt="TWEVE LIVE Logo" class="mx-auto mb-4 h-12">
        <div style="width: 80px; height: 80px; background: #28a745; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
          <span style="color: white; font-size: 40px;">✓</span>
        </div>
        <h2 style="color: #28a745; margin-bottom: 15px;">Malipo Yamekamilika!</h2>
        <p style="color: #cbd5e1;">Umejiunga na TWEVE LIVE. Tazama sasa!</p>
        <p style="font-size: 0.9rem; color: #64748b; margin-bottom: 20px;">Order ID: ${orderId}</p>
        <button onclick="window.location.reload()" style="background: #22d3ee; color: black; border: none; padding: 15px 30px; border-radius: 8px; cursor: pointer;">
          Tazama Sasa
        </button>
      </div>
    `;
  }

  function showPaymentFailed() {
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `
      <div style="text-align: center; padding: 40px;">
        <img src="https://8upload.com/image/6892195a262d1/a18af4d9d5fa27b3877bd41464115320.png" alt="TWEVE LIVE Logo" class="mx-auto mb-4 h-12">
        <div style="width: 80px; height: 80px; background: #dc3545; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
          <span style="color: white; font-size: 40px;">✗</span>
        </div>
        <h2 style="color: #dc3545; margin-bottom: 15px;">Malipo Yameshindwa</h2>
        <p style="color: #cbd5e1; margin-bottom: 20px;">Malipo yako hayakupokelewa.</p>
        <button onclick="resetPaymentForm()" style="background: #22d3ee; color: black; border: none; padding: 15px 30px; border-radius: 8px; cursor: pointer;">
          Jaribu Tena
        </button>
      </div>
    `;
  }

  function showPaymentTimeout(orderId) {
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `
      <div style="text-align: center; padding: 40px;">
        <img src="https://8upload.com/image/6892195a262d1/a18af4d9d5fa27b3877bd41464115320.png" alt="TWEVE LIVE Logo" class="mx-auto mb-4 h-12">
        <div style="width: 80px; height: 80px; background: #ffc107; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
          <span style="color: white; font-size: 40px;">⏰</span>
        </div>
        <h2 style="color: #ffc107; margin-bottom: 15px;">Muda wa Malipo Umeisha</h2>
        <p style="color: #cbd5e1; margin-bottom: 20px;">Bado tunasubiri uthibitisho wa malipo.</p>
        <p style="font-size: 0.9rem; color: #64748b; margin-bottom: 20px;">Order ID: ${orderId}</p>
        <div style="display: flex; gap: 10px; justify-content: center;">
          <button onclick="continuePolling('${orderId}')" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
            Endelea Kusubiri
          </button>
          <button onclick="resetPaymentForm()" style="background: #6c757d; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
            Anza Upya
          </button>
        </div>
      </div>
    `;
  }

  function continuePolling(orderId) {
    showPaymentWaiting(orderId);
    startPaymentPolling(orderId);
  }

  function cancelPayment() {
    clearInterval(pollingInterval);
    window.location.reload();
  }

  function resetPaymentForm() {
    clearInterval(pollingInterval);
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `
      <span class="close">&times;</span>
      <div class="modal-header">
        <img src="https://8upload.com/image/6892195a262d1/a18af4d9d5fa27b3877bd41464115320.png" alt="TWEVE LIVE Logo" class="mx-auto mb-4 h-12">
        <h2>Lipia TZS 2,000 Ili Kuendelea</h2>
        <p>Tazama channel zote na sinema bila kikomo!</p>
      </div>
      <form id="paymentForm" class="payment-form">
        <div class="form-group">
          <label for="phoneNumber">Namba ya Simu yenye Hela</label>
          <div class="phone-input">
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Jaza namba ya simu (mf. 06XXXXXXXX)"
              pattern="^0[67][0-9]{8}$"
              minlength="10"
              maxlength="10"
              inputmode="numeric"
              value="${phoneNumber}"
              required
            >
          </div>
          <small class="input-help">Ingiza namba ya simu ya mtandao unaotumia</small>
        </div>
        <div class="amount-info">
          <div class="amount-row">
            <span>TWEVE LIVE</span>
            <span class="amount">TZS 2,000</span>
          </div>
        </div>
        <button type="submit" class="pay-btn" id="payBtn">
          <span class="btn-text">Lipia Sasa</span>
          <div class="loading-spinner" style="display: none;"></div>
        </button>
      </form>
    `;
    const newCloseBtn = document.querySelector('.close');
    newCloseBtn.addEventListener('click', hideModal);
    const newPaymentForm = document.getElementById('paymentForm');
    newPaymentForm.addEventListener('submit', paymentForm.addEventListener);
  }

  function startPaymentPolling(orderId) {
    let pollCount = 0;
    const maxPolls = 60; // 5 minutes (5 seconds × 60)
    pollingInterval = setInterval(async () => {
      pollCount++;
      try {
        const response = await fetch(`https://your-server.com/check_status.php?order_id=${orderId}&format=json`);
        const result = await response.json();
        if (result.status === 'success' && result.payment_status === 'COMPLETED') {
          clearInterval(pollingInterval);
          localStorage.setItem('user', JSON.stringify({ ...user, paid: true, orderId }));
          showPaymentSuccess(orderId);
          setTimeout(() => window.location.reload(), 2000);
        } else if (result.status === 'success' && result.payment_status === 'FAILED') {
          clearInterval(pollingInterval);
          showPaymentFailed();
        } else if (pollCount >= maxPolls) {
          clearInterval(pollingInterval);
          showPaymentTimeout(orderId);
        }
      } catch (error) {
        console.error('Polling error:', error);
        if (pollCount >= maxPolls) {
          clearInterval(pollingInterval);
          showPaymentTimeout(orderId);
        }
      }
    }, 5000);
  }

  // Check Picture-in-Picture support
  if (!document.pictureInPictureEnabled) {
    pipButton.style.display = 'none';
  }

  // Picture-in-Picture toggle
  pipButton.addEventListener('click', async () => {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture().catch(error => {
        console.error('Error exiting PiP mode: ', error);
      });
    } else {
      await videoElement.requestPictureInPicture().catch(error => {
        console.error('Error entering PiP mode: ', error);
      });
    }
  });

  // Initialize Shaka Player
  shaka.polyfill.installAll();
  if (!shaka.Player.isBrowserSupported()) {
    console.error('Browser not supported by Shaka Player.');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'text-red-500 text-center p-4';
    errorDiv.textContent = 'Blausa yako haiungi mkono Shaka Player.';
    videoContainer.appendChild(errorDiv);
    return;
  }

  const player = new shaka.Player(videoElement);
  const ui = new shaka.ui.Overlay(player, videoContainer, videoElement);
  ui.configure({
    overflowMenuButtons: ['quality', 'language', 'captions', 'playback_rate', 'cast']
  });

  async function loadMedia(media) {
    if (!user.paid) {
      showModal();
      return;
    }
    const placeholder = document.getElementById('placeholder');
    const loading = document.getElementById('loading');
    const errorMessage = document.createElement('div');
    errorMessage.className = 'text-red-500 text-center p-4';
    placeholder.classList.add('hidden');
    loading.classList.remove('hidden');
    videoContainer.classList.remove('hidden');
    videoContainer.classList.add('active');
    try {
      await player.attach(videoElement);
      const clearKeys = {};
      if (media.key) {
        if (media.key.includes(',')) {
          media.key.split(',').forEach(keyPair => {
            const [keyId, key] = keyPair.split(':');
            clearKeys[keyId] = key;
          });
        } else {
          const [keyId, key] = media.key.split(':');
          clearKeys[keyId] = key;
        }
      } else if (media.drm === 'clearkey') {
        console.warn(`No DRM key for ${media.name}. Playing without DRM.`);
        player.configure({ drm: {} });
      }
      player.configure({
        drm: { clearKeys: clearKeys }
      });
      await player.load(media.src);
      videoElement.play().catch(error => console.warn("Autoplay failed: User interaction needed", error));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Error loading video:", error);
      errorMessage.textContent = `Imeshindwa kupakia ${media.name}. Jaribu channel nyingine.`;
      videoContainer.appendChild(errorMessage);
    } finally {
      loading.classList.add('hidden');
    }
  }

  function populateLiveChannels(query = "") {
    const q = query.trim().toLowerCase();
    channelListElement.innerHTML = "";
    const filtered = channelsWithLogos.filter(ch => {
      const name = ch.name?.toLowerCase() || "";
      const cat = (ch.category || "").toLowerCase();
      return name.includes(q) || cat.includes(q);
    });
    if (filtered.length === 0) {
      noResults.classList.remove('hidden');
      return;
    } else {
      noResults.classList.add('hidden');
    }
    filtered.forEach((ch) => {
      const div = document.createElement('div');
      div.className = 'channel bg-gray-700 rounded-xl p-3 cursor-pointer text-center shadow-md hover:shadow-xl transition';
      div.innerHTML = `
        <img src="${ch.logo}" alt="${ch.name} channel logo" class="mb-2 mx-auto border-2 border-white shadow" loading="lazy">
        <p class="text-sm font-semibold truncate">${ch.name}</p>
        <p class="text-[10px] text-slate-300 mt-1">${ch.category || 'Live'}</p>
      `;
      div.addEventListener('click', () => {
        document.querySelectorAll('#channelListLive .channel').forEach(c => c.classList.remove('active'));
        div.classList.add('active');
        loadMedia(ch);
      });
      channelListElement.appendChild(div);
    });
  }

  function populateDownloadMovies() {
    const row = document.getElementById("downloadMoviesRow");
    row.innerHTML = "";
    downloadMovies.forEach(m => {
      const card = document.createElement("div");
      card.className = "movie-card";
      card.innerHTML = `
        <img src="${m.icon}" alt="${m.name} poster" loading="lazy">
        <div class="movie-info">
          ${m.tags && m.tags.length ? m.tags.map(t => `<span class='badge'>${t}</span>`).join('') : ""}
          <h3 class="mt-2 font-semibold text-sm">${m.name}</h3>
          <div class="mt-3 flex gap-2">
            <a href="${m.download}" target="_blank" rel="noopener" class="flex-1 text-center bg-cyan-400 text-black font-semibold py-2 rounded-xl hover:bg-cyan-300 transition" download>
              ⬇️ Download
            </a>
          </div>
        </div>
      `;
      card.querySelector('a').addEventListener('click', (e) => {
        if (!user.paid) {
          e.preventDefault();
          showModal();
        }
      });
      row.appendChild(card);
    });
  }

  function populateOnlineMovies() {
    const row = document.getElementById("onlineMoviesRow");
    row.innerHTML = "";
    onlineMovies.forEach(m => {
      const card = document.createElement("div");
      card.className = "movie-card";
      card.innerHTML = `
        <img src="${m.icon}" alt="${m.name} poster" loading="lazy">
        <div class="movie-info">
          ${m.tags && m.tags.length ? m.tags.map(t => `<span class='badge'>${t}</span>`).join('') : ""}
          <h3 class="mt-2 font-semibold text-sm">${m.name}</h3>
          <div class="mt-3 flex gap-2">
            <button class="flex-1 text-center bg-green-500 text-white font-semibold py-2 rounded-xl hover:bg-green-400 transition">
              ▶️ Play Now
            </button>
          </div>
        </div>
      `;
      card.querySelector('button').addEventListener('click', () => {
        loadMedia(m);
      });
      row.appendChild(card);
    });
  }

  function showPage(page) {
    const live = document.getElementById("livePage");
    const moviesPage = document.getElementById("moviesPage");
    const playerBox = document.getElementById("videoContainer");
    live.classList.add("hidden");
    moviesPage.classList.add("hidden");
    btnLive.classList.remove("active");
    btnMovies.classList.remove("active");
    btnLive.setAttribute('aria-pressed', 'false');
    btnMovies.setAttribute('aria-pressed', 'false');
    if (page === "live") {
      live.classList.remove("hidden");
      playerBox.classList.add("hidden");
      btnLive.classList.add("active");
      btnLive.setAttribute('aria-pressed', 'true');
      liveSearch.focus();
    } else if (page === "movies") {
      moviesPage.classList.remove("hidden");
      playerBox.classList.add("hidden");
      btnMovies.classList.add("active");
      btnMovies.setAttribute('aria-pressed', 'true');
    }
  }

  // Search handler with debounce
  let searchTimer;
  liveSearch.addEventListener('input', (e) => {
    clearTimeout(searchTimer);
    currentQuery = e.target.value || "";
    searchTimer = setTimeout(() => populateLiveChannels(currentQuery), 100);
  });

  // Clear search
  clearSearch.addEventListener('click', () => {
    liveSearch.value = "";
    currentQuery = "";
    populateLiveChannels();
    liveSearch.focus();
  });

  // Navigation
  btnLive.addEventListener('click', () => showPage('live'));
  btnMovies.addEventListener('click', () => showPage('movies'));

  // Initialize
  populateLiveChannels();
  populateDownloadMovies();
  populateOnlineMovies();
  showPage('live');
});