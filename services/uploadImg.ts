import { supabase } from '@/lib/supabase';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';

export default async function uploadImage(uid: string): Promise<string> {
  if (!uid) return '';

  try {
    // 检查权限
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      console.warn('Media library permissions not granted');
      return '';
    }

    // 选择图片
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8, // 降低质量以减少文件大小，同时保持可接受的图片质量
    });

    if (pickerResult.canceled) return '';

    const asset = pickerResult.assets[0];
    if (!asset) return '';

    const { uri } = asset;
    const fileExt = getFileExtension(uri);
    const mimeType = getMimeType(fileExt);
    const filePath = `${uid}/${Date.now()}.${fileExt}`;

    // 确保文件存在并获取信息
    const fileInfo = await FileSystem.getInfoAsync(uri);
    console.log('File info:', fileInfo);

    if (!fileInfo.exists) {
      console.error('File does not exist:', uri);
      return '';
    }

    // 根据平台选择不同的上传策略
    let fileToUpload;
    
    if (Platform.OS === 'ios') {
      // iOS 特殊处理
      fileToUpload = await prepareFileForUploadiOS(uri, mimeType);
    } else {
      // Android 或 Web
      fileToUpload = await prepareFileForUploadDefault(uri, mimeType);
    }

    // 上传到 Supabase
    const { error: uploadError } = await supabase.storage
      .from('post-image')
      .upload(filePath, fileToUpload, {
        contentType: mimeType,
        upsert: false,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    const { data, error: urlError } = await supabase.storage
      .from('post-image')
      .createSignedUrl(filePath, 60 * 60 * 24 * 365);

    if (urlError) throw new Error(`Failed to get signed URL: ${urlError.message}`);

    return data.signedUrl;
  } catch (error) {
    console.error('Upload process error:', error);
    return '';
  }
}

// 辅助函数：获取文件扩展名
function getFileExtension(uri: string): string {
  const ext = uri.split('.').pop()?.toLowerCase() || 'jpg';
  // 处理特殊情况，如query参数
  return ext.split('?')[0];
}

// 辅助函数：获取MIME类型
function getMimeType(fileExt: string): string {
  const mimeMap: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
  };
  return mimeMap[fileExt] || 'image/jpeg';
}

// iOS 专用文件处理
async function prepareFileForUploadiOS(uri: string, mimeType: string) {
  try {
    // 尝试方法1：使用fetch
    const response = await fetch(uri);
    const blob = await response.blob();
    console.log('Method 1: Using fetch - Blob size:', blob.size);
    if (blob.size > 0) return blob;

    // 如果fetch失败，尝试方法2：使用XMLHttpRequest
    const blobViaXHR = await new Promise<Blob>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => resolve(xhr.response);
      xhr.onerror = () => reject(new Error('XHR failed'));
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send();
    });
    console.log('Method 2: Using XHR - Blob size:', blobViaXHR.size);
    if (blobViaXHR.size > 0) return blobViaXHR;

    // 如果以上两种方法都失败，尝试复制文件到临时位置
    const tempPath = `${FileSystem.cacheDirectory}temp-${Date.now()}.jpg`;
    await FileSystem.copyAsync({ from: uri, to: tempPath });
    
    const fileInfo = await FileSystem.getInfoAsync(tempPath);
    console.log('Method 3: Copied file - Size:', fileInfo.uri);
    
    if (fileInfo.uri ) {
      // 读取文件为Uint8Array
      const fileContent = await FileSystem.readAsStringAsync(tempPath, {
        encoding: FileSystem.EncodingType.Base64,
      });
      
      const uint8Array = Uint8Array.from(atob(fileContent), c => c.charCodeAt(0));
      return new Blob([uint8Array], { type: mimeType });
    }

    throw new Error('All methods failed to prepare file');
  } catch (error) {
    console.error('iOS file preparation error:', error);
    throw error;
  }
}

// 默认文件处理方法
async function prepareFileForUploadDefault(uri: string, mimeType: string) {
  try {
    // 对于Android和Web，直接使用fetch通常就足够了
    const response = await fetch(uri);
    return await response.blob();
  } catch (error) {
    console.error('Default file preparation error:', error);
    
    // 备选方案：复制到临时位置
    const tempPath = `${FileSystem.cacheDirectory}temp-${Date.now()}.jpg`;
    await FileSystem.copyAsync({ from: uri, to: tempPath });
    
    const fileContent = await FileSystem.readAsStringAsync(tempPath, {
      encoding: FileSystem.EncodingType.Base64,
    });
    
    const uint8Array = Uint8Array.from(atob(fileContent), c => c.charCodeAt(0));
    return new Blob([uint8Array], { type: mimeType });
  }
}