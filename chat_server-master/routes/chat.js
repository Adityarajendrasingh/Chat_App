import express from "express";
// import {
//   addMembers,
//   deleteChat,
//   getChatDetails,
//   getMessages,
//   getMyChats,
//   getMyGroups,
//   leaveGroup,
//   newGroupChat,
//   removeMember,
//   renameGroup,
//   sendAttachments,
// } from "../controllers/chat.js";
// import {
//   addMemberValidator,
//   chatIdValidator,
//   newGroupValidator,
//   removeMemberValidator,
//   renameValidator,
//   sendAttachmentsValidator,
//   validateHandler,
// } from "../lib/validators.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { addMembers, deleteChat, getChatDetails, getMessages, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMember, renameGroup, sendAttachments } from "../controllers/chat.js";
import { attachmentMulter } from "../middlewares/multer.js";
import { addMemberValidator, chatIdValidator, newGroupValidator, removeMemberValidator, renameValidator, sendAttachmentsValidator, validateHandler } from "../lib/validators.js";
 

const app = express.Router();

// After here user must be logged in to access the routes

app.use(isAuthenticated);
// newGroupValidator(), validateHandler,
 app.post("/new", newGroupValidator(),validateHandler, newGroupChat);

 app.get("/my", getMyChats);
 app.get("/my/groups",getMyGroups)

// app.get("/my/groups", getMyGroups);

 app.put("/addmembers",addMemberValidator(),validateHandler, addMembers);

app.put(
  "/removemember",removeMemberValidator(),validateHandler, removeMember
);

 app.delete("/leave/:id",chatIdValidator(),validateHandler,leaveGroup);

// // Send Attachments attachmentsMulter,
  sendAttachmentsValidator(),
 validateHandler,
 app.post(
  "/message",
  attachmentMulter,
  sendAttachmentsValidator(),
  validateHandler,
  sendAttachments
);


// Get Messages
app.get("/message/:id",chatIdValidator(),validateHandler, getMessages);

// // Get Chat Details, rename,delete
app.route("/:id").get(chatIdValidator(),validateHandler, getChatDetails)
  .put(renameValidator(),validateHandler, renameGroup)
  .delete(chatIdValidator(),validateHandler,deleteChat);

export default app;