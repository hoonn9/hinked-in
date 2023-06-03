export type PostAuthorType = 'MEMBER' | 'COMPANY';

export interface PostConstructorParam {
  content: string;
  authorType: PostAuthorType;
  authorId: string;
}
