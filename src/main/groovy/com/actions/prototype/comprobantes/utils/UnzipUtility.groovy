package com.actions.prototype.comprobantes.utils

import org.apache.commons.io.FileUtils
import org.springframework.web.multipart.MultipartFile

import java.util.zip.ZipEntry
import java.util.zip.ZipInputStream

class UnzipUtility {

    private static final int BUFFER_SIZE = 4096
    File targetDir

    private UnzipUtility(String destDirectory) {
        targetDir = new File(destDirectory)
    }

    public static synchronized UnzipUtility getInstance(String destDirectory) {
        return new UnzipUtility(destDirectory)
    }

    public void unzip(MultipartFile file) {
        ZipInputStream zis = null
        try {
            if (!targetDir.exists()) {
                targetDir.mkdirs()
            }

            zis = new ZipInputStream(new ByteArrayInputStream(file.getBytes()))
            ZipEntry entry

            while ((entry = zis.getNextEntry()) != null) {
                File targetFile = new File(targetDir, entry.getName())
                if (entry.isDirectory()) {
                    targetFile.mkdirs()
                } else {
                    OutputStream output = new FileOutputStream(targetFile)
                    try {
                        byte[] buffer = new byte[BUFFER_SIZE]
                        int size
                        while ((size = zis.read(buffer)) != -1) {
                            output.write(buffer, 0, size)
                        }
                    } finally {
                        output.close()
                    }
                }
                zis.closeEntry()
            }
        } catch(IOException ex) {
            delete()
            throw new Exception()
        } finally {
            if(zis != null) {
                zis.close()
            }
        }
    }

    public void delete() {
        if (targetDir.exists()) {
            FileUtils.deleteDirectory(targetDir)
        }
    }
}
