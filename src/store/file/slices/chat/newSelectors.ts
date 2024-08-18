import { FilesStoreState } from '@/store/file/initialState';
import { UPLOAD_STATUS_SET } from '@/types/files/upload';

const chatUploadFileList = (s: FilesStoreState) => s.chatUploadFileList;
const chatRawFileList = (s: FilesStoreState) => s.chatUploadFileList.map((item) => item.file);
const chatUploadFileListHasItem = (s: FilesStoreState) => s.chatUploadFileList.length > 0;

const isUploadingFiles = (s: FilesStoreState) =>
  s.chatUploadFileList.some(
    (file) =>
      // is file status in uploading
      UPLOAD_STATUS_SET.has(file.status) ||
      // or file has tasks but not finish embedding
      (file.tasks && !file.tasks?.finishEmbedding),
  );

export const fileChatSelectors = {
  chatRawFileList,
  chatUploadFileList,
  chatUploadFileListHasItem,
  isUploadingFiles,
};