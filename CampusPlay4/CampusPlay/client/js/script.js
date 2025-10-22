document.addEventListener("DOMContentLoaded", function () {
  // --- Backend Data (streamers) ---
  const streamers = [
    {
      id: 1,
      name: "Harshit",
      game: "Clash Royale",
      viewers: "12.8k",
      avatar: "images/download (2).jpeg",
      thumbnail: "images/avatar1.jpeg",
      videoUrl:
        "https://www.youtube.com/embed/-DwaRcz5QvI?autoplay=1&mute=1&controls=0&loop=1&playlist=-DwaRcz5QvI",
    },
    {
      id: 2,
      name: "Ravi",
      game: "Valorant",
      viewers: "6.4k",
      avatar: "images/download (1).jpeg",
      thumbnail: "images/avatar2.jpeg",
      videoUrl: "https://www.youtube.com/embed/h7MYJghRWt0?si=zwYcpJYNrCCWbBDR",
    },
    {
      id: 3,
      name: "Gaurika",
      game: "BGMI",
      viewers: "4.1k",
      avatar: "images/download.jpeg",
      thumbnail: "images/avatar3.jpeg",
      videoUrl: "https://www.youtube.com/embed/f44f7N4RUTk?si=3PbvPXuiYdTkccd1",
    },
  ];

  // --- Element Selectors ---
  const mainStreamIframe = document.getElementById("main-stream-iframe");
  const streamerName = document.getElementById("streamer-name");
  const streamerGame = document.getElementById("streamer-game");
  const streamerAvatar = document.getElementById("streamer-avatar");
  const viewersCount = document.getElementById("viewers-count");
  const sidebarList = document.querySelector(".sidebar-list");
  const loginLink = document.getElementById("login-link");
  const signoutLink = document.getElementById("signout-link");
  const userInitials = document.getElementById("user-initials");
  const userDropdown = document.querySelector(".user-dropdown");
  const joinGameButtons = document.querySelectorAll(".join-game-btn");
  let activeStreamerId = 1;

  // --- Functions ---

  // Update the main video stream
  function updateMainStream(streamer) {
    mainStreamIframe.src = streamer.videoUrl;
    streamerName.textContent = streamer.name;
    streamerGame.textContent = streamer.game;
    streamerAvatar.src = streamer.avatar;
    viewersCount.textContent = `${streamer.viewers} viewers`;
    activeStreamerId = streamer.id;
    renderSidebar();
  }

  // Render the sidebar with streamers
  function renderSidebar() {
    sidebarList.innerHTML = "";
    streamers.forEach((streamer) => {
      const isActive = streamer.id === activeStreamerId;
      const item = document.createElement("li");
      item.className = `sidebar-item ${isActive ? "active" : ""}`;
      item.innerHTML = `
                <img src="${streamer.avatar}" alt="${streamer.name}" class="sidebar-avatar">
                <div class="sidebar-info">
                    <span class="sidebar-name">${streamer.name}</span>
                    <span class="sidebar-game">${streamer.game}</span>
                </div>
                <span class="sidebar-status"></span>
            `;
      item.addEventListener("click", () => updateMainStream(streamer));
      sidebarList.appendChild(item);
    });
  }

  // Check user authentication status
  function checkAuth() {
    // FIX: Use the standardized key 'campusPlayUser'
    const user = localStorage.getItem("campusPlayUser");

    if (user) {
      loginLink.style.display = "none";
      signoutLink.style.display = "block";
      try {
        const userObj = JSON.parse(user);
        if (userObj && userObj.name) {
          // FIX: Create initials from the user's name
          const initials = userObj.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
          userInitials.textContent = initials;
        }
      } catch (e) {
        console.error("Error parsing user data:", e);
        userInitials.textContent = "G"; // Fallback to Guest
      }
    } else {
      loginLink.style.display = "block";
      signoutLink.style.display = "none";
      userInitials.textContent = "G"; // Guest
    }
  }

  // --- Initialize page content ---
  const initialStreamer = streamers.find((s) => s.id === activeStreamerId);
  if (initialStreamer) {
    updateMainStream(initialStreamer);
  }
  renderSidebar();
  checkAuth();

  // --- Event listeners ---

  // User dropdown toggle
  userInitials.addEventListener("click", function (e) {
    e.stopPropagation();
    userDropdown.classList.toggle("open");
  });

  // Hide dropdown clicking outside
  document.addEventListener("click", function () {
    userDropdown.classList.remove("open");
  });

  // FIX: Corrected signout logic
  signoutLink.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("campusPlayUser"); // Remove user data
    localStorage.removeItem("token"); // Also remove the token
    window.location.href = "login.html";
  });

  // Join Game buttons redirect to tournaments page
  joinGameButtons.forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = "tournaments.html";
    });
  });
});
