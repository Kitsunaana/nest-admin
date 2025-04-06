export const validateFileFormat = (
  filename: string,
  allowedFileFormats: string[],
) => {
  const fileParts = filename.split('.')
  const extension = fileParts[fileParts.length - 1]

  return allowedFileFormats.includes(extension)
}

export const validateFileSize = (
  fileSizeInBytes: number,
  allowedFileSizeInBytes: number,
) => fileSizeInBytes <= allowedFileSizeInBytes
