//Socket
const socket = io();
//Dom element
const $ContainerMsg = $("#ChatContainer"); // Chat container
const $Form = $("#Form"); // The form of username and the message
const $Message = $("#message"); // The message value
const $Username = $("#username"); // The username

socket.on("message:load", (data) => {
  if (data.messages.length - 1 >= 0) {
    $ContainerMsg.html(` `);
    const MSGS = data.messages.sort((a, b) => a.date - b.date); // Sort all elements by the date of create of message

    for (let i = MSGS.length - 1; i >= 0; i--) {
      Load_MSG(MSGS[i]);
    }
  } else {
    $ContainerMsg.html(`<h4 class="text-center mx-2">No messages</h4>`);
  }
});

socket.on("message:loadNew", (data) => {
  $ContainerMsg.html(` `);
  const MSGS = data.messages.sort((a, b) => a.date - b.date); // Sort all elements by the date of create of message

  for (let i = MSGS.length - 1; i >= 0; i--) {
    Load_MSG(MSGS[i]);
  }
});

$Form.submit((e) => {
  e.preventDefault();

  const messageObject = {
    name: $Username.val(),
    content: $Message.val(),
    date: Date.now(),
  };

  $Message.val((n, c) => {
    return "";
  });
  socket.emit("message:add", messageObject);
  console.log(messageObject);
});

async function Load_MSG(data) {
  $ContainerMsg.append(
    `<p class="ms-5 mt-2"><b class="text-bg-dark">${data.name}</b>: ${data.content}</p>`
  );
}
