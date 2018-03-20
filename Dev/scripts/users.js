const Users = (function initLandingPage(window, document) {
  const TEXT_NODE_TYPE = 3;

  const discordWidgetSelector = ".discord-widget";
  const userListSelector = ".discord-userlist";
  const userStatusSelector = ".discord-user-status";

  function User(username, avatarPath, status) {
    this.username = username;
    this.avatarPath = avatarPath;
    this.status = status;
  }

  const DiscordStatusMapping = {
    "discord-online": "ONLINE",
    "discord-idle": "IDLE",
    "discord-busy": "BUSY",
    undefined: "UNKNOWN"
  };

  function getOnlineUsers() {
    function createUserFromDOM(listItem) {
      function getUsername(listItem) {
        function isTextNode(node) {
          return node.nodeType === TEXT_NODE_TYPE;
        }

        return (
          Utils.convertNodeListToArray(listItem.childNodes).find(isTextNode)
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
          Utils.convertClassListToArray(
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
    const userList = Utils.convertNodeListToArray(
      widget.querySelector(userListSelector).childNodes
    );
    return userList.map(createUserFromDOM);
  }

  // public API
  return { getOnlineUsers };
})(window, document);
