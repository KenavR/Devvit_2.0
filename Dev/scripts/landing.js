const LandingAnimator = (function initLandingPage(window, document) {
  const discordWidgetSelector = ".discord-widget";
  const userListSelector = ".discord-userlist";
  const userStatusSelector = ".discord-user-status";
  const TEXT_NODE_TYPE = 3;

  const DiscordStatusMapping = {
    "discord-online": "ONLINE",
    "discord-idle": "IDLE",
    "discord-busy": "BUSY",
    undefined: "UNKNOWN"
  };

  function User(username, avatarPath, status) {
    this.username = username;
    this.avatarPath = avatarPath;
    this.status = status;
  }

  function getOnlineUsers() {
    function createUserFromDOM(listItem) {
      function getUsername(listItem) {
        function isTextNode(node) {
          return node.nodeType === TEXT_NODE_TYPE;
        }

        return (
          UTILS.convertNodeListToArray(listItem.childNodes).find(isTextNode)
            .nodeValue || ""
        );
      }

      function getAvatarPath(listItem) {
        return listItem.querySelector("img").src;
      }

      function getStatus(listItem) {
        function getStatusByClass(className) {
          return DiscordStatusMapping[className];
        }

        function isValidStatus(currentClass) {
          return (
            currentClass !== userStatusSelector &&
            DiscordStatusMapping.hasOwnProperty(currentClass)
          );
        }

        return getStatusByClass(
          UTILS.convertClassListToArray(
            listItem.querySelector(userStatusSelector).classList
          ).find(isValidStatus, "")
        );
      }

      return new User(
        getUsername(listItem),
        getAvatarPath(listItem),
        getStatus(listItem)
      );
    }

    const widget = document.querySelector(discordWidgetSelector);
    const userList = UTILS.convertNodeListToArray(
      widget.querySelector(userListSelector).childNodes
    );
    const users = userList.map(createUserFromDOM);
    console.log("WIDGET: ", users);
  }

  function runAnimation() {
    getOnlineUsers();
  }

  function run() {
    // Delay to give the widget time to load
    setTimeout(runAnimation, 1000);
  }

  return {
    run
  };
})(window, document);
