import TopicStatusEnum from "src/enums/topicStatus.enum";

export class CreateTopicDto {
    userId: string;
    categoryId: number;
    topicTitle: string;
    topicDescription: string;
    createdAt: Date;
    status: TopicStatusEnum;
}
