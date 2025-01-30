function formatFileSize(sizeInBytes) {
    const sizeInKB = sizeInBytes / 1024;
    if (sizeInKB < 1024) {
        return sizeInKB.toFixed(2) + " KB";
    } else {
        return (sizeInKB / 1024).toFixed(2) + " MB";
    }
}

export default formatFileSize