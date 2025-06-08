import { Category } from "./category";

export interface Snippet {
    _id?: string;
    title: string;
    content: string;
    category: string;
    tags: string;
    pinned: boolean;
    type: 'text' | 'link' | 'code' | 'file';
    fileName?: string;
    fileUrl?: string;
}