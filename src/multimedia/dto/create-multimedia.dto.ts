import MultimediaStatusEnum from "src/enums/multimediaStatus.enum";

export class CreateMultimediaDto {
    userId: string;
    topicId: number;
    videoLinkUrl: string;
    createdAt: Date;
    thumbnailUrl: string;
    multimediaTitle: string;
    multimediaDescription: string;
    status: MultimediaStatusEnum;
}
