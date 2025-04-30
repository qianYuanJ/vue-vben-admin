import OSS from 'ali-oss';
import { notification } from 'ant-design-vue';
import md5 from 'js-md5';

import { getOssTokenApi } from '#/api/oss';

let client: OSS;
const localGetOssSecurityToken = async () => {
  const Res: any = await getOssTokenApi();
  if (Res.ok) {
    client = new OSS({
      // Bucket所在地域
      region: 'oss-cn-beijing',
      // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）
      accessKeyId: Res.data.accessKeyId,
      accessKeySecret: Res.data.accessKeySecret,
      // 从STS服务获取的安全令牌（SecurityToken）。
      stsToken: Res.data.securityToken,
      // 填写Bucket名称
      bucket: 'rt-rongmeibao',
      refreshSTSToken: async () => {
        if (new Date().getTime >= Res.data.endTime) {
          const _datas: any = await getOssTokenApi();
          return {
            accessKeyId: _datas.data.accessKeyId,
            accessKeySecret: _datas.data.accessKeySecret,
            stsToken: _datas.data.securityToken,
          };
        } else {
          return {
            accessKeyId: Res.data.accessKeyId,
            accessKeySecret: Res.data.accessKeySecret,
            stsToken: Res.data.securityToken,
          };
        }
      },
      // 刷新临时访问凭证的时间间隔，单位为毫秒（30分钟重新获取 stsToken）
      // refreshSTSTokenInterval: 1800000, 60 3000
      refreshSTSTokenInterval: 1000,
    });
    return true;
  } else {
    // console.log('=====444======')
    notification.error({
      message: '异常提示',
      description: Res.msg,
    });
    // console.log('======555=====')
  }
};

let errorCount = 0;

const multipartUpload = (
  file: File,
  type: string,
  call: (res: any) => void,
  onProgress?: (percent: number) => void,
) => {
  return new Promise((s) => {
    multipartUploadSource(file, type, onProgress)
      .then((res) => {
        call(res);
      })
      .catch(() => {
        errorCount += 1;
        if (errorCount > 2) {
          localGetOssSecurityToken();
          notification.error({
            message: '异常提示',
            description: '上传失败,请重新加载页面后重新上传！',
          });
        } else {
          localGetOssSecurityToken().then((_) => {
            multipartUploadSource(file, type, onProgress)
              .then((res) => {
                errorCount = 0;
                s(res);
              })
              .catch(() => {
                errorCount += 1;
                notification.error({
                  message: '异常提示',
                  description: '上传失败,请重新加载页面后重新上传！',
                });
              });
          });
        }
      });
  });
};

async function multipartUploadSource(
  file: File,
  type: string,
  onProgress?: (percent: number) => void,
) {
  const path = createUploadCatalogue(type, file.name);
  if (typeof path === 'string') {
    const result: any = await client.multipartUpload(`${path}`, file, {
      progress(p, __) {
        // 暂不处理 checkpoint;
        onProgress?.(Math.floor(p * 100));
      },
      parallel: 4,
      partSize: 1024 * 1024,
      mime: file.type,
    });
    if (result.res.status === 200) {
      return {
        url: `${result.name}`,
      };
    }
  }
}

const getOssPreviewUrl = (originUrl: string) => {
  const filename = originUrl.split('/').pop() || '';
  const response = {
    'content-disposition': 'inline',
  };

  return client.signatureUrl(filename, { response });
};

export { getOssPreviewUrl, localGetOssSecurityToken, multipartUpload };

// 生成 oss 上传目录
const getMd5 = (str: string) => {
  (md5 as any)(str);
  const hash = (md5 as any).create();
  hash.update(str);
  return hash.hex();
};
const zeroFill = (i: number) => {
  if (i >= 0 && i <= 9) return `0${i}`;
  return i;
};
const createUploadCatalogue = (type: string, fileName: string) => {
  if (!['file', 'image', 'video'].includes(type)) return new Error('类型错误');

  const date = new Date(); // 当前时间
  const _index = fileName.lastIndexOf('.');
  if (_index === -1) return new Error('文件后缀名异常');

  const _fileName = fileName.slice(0, _index); // 文件名
  const suffix = fileName.slice(Math.max(0, _index)); // 文件后缀

  // 文件名加密规则：文件名 + 时间戳（到毫秒）+ 1000 随机数
  const md5FileName = getMd5(
    `${_fileName}${date.valueOf()}${Math.random() * 1000}`,
  );
  const year = date.getFullYear();
  const month = zeroFill(date.getMonth() + 1); // 月
  const day = zeroFill(date.getDate()); // 日

  return `trade-platform-web/${year}${month}${day}/${md5FileName}${suffix}`;
};

// 调用方法
// <el-upload
// action=""
// :headers="headers"
// :show-file-list="false"
// :on-success="handleAvatarSuccess"
// :on-error="handleAvatarError"
// :before-upload="beforeAvatarUpload"
// :auto-upload="true"
// :http-request="handerRequest"

// const handerRequest = (option) => {
// 	var obj = option.file.name
// 	var index = obj.lastIndexOf('.')
// 	obj = obj.substring(index, obj.length)
// 	multipartUpload(option.file, option.filename, (res) => {
// 	  if (res.url) {
// 		imageUrls.value.push(res.url)
// 		props.setFormValues(props.imageField, arrayToStr(imageUrls.value))
// 	  }
// 	})
//   }
