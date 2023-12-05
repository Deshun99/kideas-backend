import { ForumCategory } from "./entities/forum-category.entity";
import { ForumComment } from "./entities/forum-comment.entity";
import { ForumPost } from "./entities/forum-post.entity";
import { Multimedia } from "./entities/multimedia.entity";
import { TopicCategory } from "./entities/topic-category.entity";
import { TopicComment } from "./entities/topic-comment.entity";
import { Topic } from "./entities/topic.entity";
import { Upvote } from "./entities/upvote.entity";
import { User } from "./entities/user.entity";

export const entityList = [
    User,
    ForumCategory,
    ForumComment,
    ForumPost,
    Multimedia,
    TopicCategory,
    TopicComment,
    Topic,
    Upvote,
]