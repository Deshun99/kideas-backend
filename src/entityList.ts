import { Multimedia } from "./entities/multimedia.entity";
import { Category } from "./entities/category.entity";
import { Comment } from "./entities/comment.entity";
import { Topic } from "./entities/topic.entity";
import { User } from "./entities/user.entity";
import { ChatMessage } from "./entities/chat-message.entity";
import { Chat } from "./entities/chat.entity";

export const entityList = [
    User,
    Multimedia,
    Category,
    ChatMessage,
    Chat,
    Comment,
    Topic,
]