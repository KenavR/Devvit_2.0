const LandingAnimator = (function initLandingPage(window, document) {
  const landingPageSelector = ".landing";
  console.log("USers: ", Users);

  const avatarSize = { width: 40, height: 40 };
  const avatarClass = "user-avatar";
  const avatarHiddenClass = "hidden";
  const scaleUpClass = "animation-scale-up";
  const scaleDownClass = "animation-scale-up";

  const ElementCache = {
    landingPage: document.querySelector(landingPageSelector)
  };

  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  function AnimatedAvatar(user, parent) {
    const self = this;
    self.user = user;
    self.parent = parent;
    self.element = _createAnimatedAvatar(user);
    self.isOnScreen = false;

    function _createAnimatedAvatar(user) {
      const avatarImgNode = document.createElement("img");
      avatarImgNode.src = user.avatarPath;
      const avatarNode = document.createElement("div");
      avatarNode.className = [avatarClass, scaleUpClass].join(" ");
      avatarNode.appendChild(avatarImgNode);
      return avatarNode;
    }

    function _animateOut() {
      self.element.classList.add(scaleDownClass);
      setTimeout(_removeFromDOM, 1000);
    }

    function _removeFromDOM() {
      if (self.isOnScreen) {
        self.parent.removeChild(self.element);
        self.isOnScreen = false;
      }
    }

    function appendToDOM() {
      function getRandomCoords() {
        var posx = (
          Math.random() *
          (parent.offsetWidth - avatarSize.width)
        ).toFixed();
        var posy = (
          Math.random() *
          (parent.offsetHeight - avatarSize.height)
        ).toFixed();

        return new Point(posx, posy);
      }
      self.isOnScreen = true;
      const randomCoords = getRandomCoords();
      self.element.style["left"] = [randomCoords.x, "px"].join("");
      self.element.style["top"] = [randomCoords.y, "px"].join("");
      self.parent.appendChild(self.element);
      setTimeout(_animateOut, 10000);
    }

    // public API
    return {
      appendToDOM
    };
  }

  function startAnimation() {
    function createAnimatedAvatars(user) {
      return new AnimatedAvatar(user, ElementCache.landingPage);
    }

    function getRandomOffScreenAvatar(avatars) {
      function isOffScreen(avatar) {
        return !avatar.isOnScreen;
      }
      const offScreenAvatars = avatars.filter(isOffScreen);
      return offScreenAvatars[
        Math.floor(Math.random() * offScreenAvatars.length)
      ];
    }

    function animateRandomAvatar(avatars) {
      getRandomOffScreenAvatar(avatars).appendToDOM();
    }

    const users = Users.getOnlineUsers();
    const animatedAvatars = users.map(createAnimatedAvatars);

    setInterval(
      avatars => requestAnimationFrame(animateRandomAvatar.bind(this, avatars)),
      1000,
      animatedAvatars
    );
  }

  function run() {
    // Delay to give the widget time to load
    setTimeout(() => requestAnimationFrame(startAnimation), 1000);
  }

  return { run };
})(window, document);
