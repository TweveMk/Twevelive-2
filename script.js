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
  // ... (other channels, unchanged from original)
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

// Online movies (fixed "Heard of State" URL)
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

// Add logos to channels
const channelsWithLogos = channels.map(ch => ({
  ...ch,
  logo: specialLogos[ch.name] || mainLogo
}));

// Initialize everything after DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  const videoElement = document.getElementById('video');
  const pipButton = document.getElementById('pipButton');
  const videoContainer = document.getElementById('videoContainer');
  const channelListElement = document.getElementById('channelListLive');
  const btnLive = document.getElementById('btnLive');
  const btnMovies = document.getElementById('btnMovies');
  const liveSearch = document.getElementById('liveSearch');
  const clearSearch = document.getElementById('clearSearch');
  const noResults = document.getElementById('noResults');
  let currentQuery = "";

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
        drm: {
          clearKeys: clearKeys
        }
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