const users = [];

// socket.id always change

const addUser = (socket_id, name, user_id, room_id) => {
  
  const findUser = users.find((user) => user.room_id === room_id && user.user_id === user_id);
  if (findUser) { return { error: 'User already exists in this room' }; }

  const newuser = {
    socket_id, name, user_id, room_id,
  };
  users.push(newuser);
  //console.log('users list:', users);
  return { newuser };
};

const getUser = (socket_id) => users.find((user) => user.socket_id == socket_id );

const removeUser = (socket_id) => {
  const index = users.findIndex((user) => user.socket_id === socket_id);
  if (index !== -1) {
    return users.splice(index, 1);
  }
};

module.exports = { addUser, getUser, removeUser };
