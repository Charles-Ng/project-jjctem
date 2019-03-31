const createPlayer = (socket, player) => {
  socket.on("connect", () => {
    socket.emit("newPlayer", {
      x: player.sprite.body.x,
      y: player.sprite.body.y,
      angle: player.sprite.rotation,
      playerName: {
        name: String(socket.id),
        x: player.playerName.x,
        y: player.playerName.y
      },
      speed: {
        value: player.speed,
        x: player.speed.x,
        y: player.speed.y
      },
      finsih: player.finsih,
      start: player.start
    });
  });
};

export default createPlayer;
