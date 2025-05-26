import type {
  Dictionary,
  RequestDictionaryParams,
  Response,
} from '@vben/types';

import { requestClient } from '#/api/request';

// 建立字典缓存 map
const dictCache = new Map<string, any>();

const defaultValueName = ['dictionary_name', 'dictionary_code'];

const handleOptions = (options: any[], type: number) => {
  const arr: any[] = [];
  if (!options) return arr;
  options.forEach((item) => {
    if (item.nodes && item.nodes.length > 0) {
      arr.push({
        label: item.dictionary_name,
        value: item[defaultValueName[type] ?? 0],
        children: handleOptions(item.nodes, type),
      });
    } else {
      arr.push({
        label: item.dictionary_name,
        value: item[defaultValueName[type] ?? 0],
      });
    }
  });
  return arr;
};

/**
 * @param {string} dictNameOrCode 字典名称 | 字典编码
 * @param {type} type 取返回值的字段   0: dictionary_name ; 1: dictionary_code  默认为0
 * @param {type} typeName 使用字典名称还是字典编码 0: dictionary_name ; 1: dictionary_code  默认为1
 */
const getTradeDictionaryData = (
  dictNameOrCode: string,
  type: 0 | 1 = 0,
  typeName: 0 | 1 = 1,
) => {
  return () => {
    return new Promise((resolve, reject) => {
      // 缓存名字 三个参数拼接
      const cacheName = `${dictNameOrCode}-${type}-${typeName}`;
      if (dictCache.has(cacheName)) {
        resolve(dictCache.get(cacheName));
        return;
      }
      const params =
        typeName === 0
          ? { dictionary_name: dictNameOrCode }
          : { dictionary_code: dictNameOrCode };
      getTradeDictionary(params)
        .then((res: any) => {
          const options = handleOptions(res.data[0]?.nodes, type);
          dictCache.set(cacheName, options);
          resolve(options);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };
};

/**
 * @param {string} dictNameOrCode 字典名称 | 字典编码
 * @param {type} type 取返回值的字段   0: dictionary_name ; 1: dictionary_code  默认为0
 * @param {type} typeName 使用字典名称还是字典编码 0: dictionary_name ; 1: dictionary_code  默认为1
 */
const getBaseDictionaryData = (
  dictNameOrCode: string,
  type: 0 | 1 = 0,
  typeName: 0 | 1 = 1,
) => {
  return () => {
    return new Promise((resolve, reject) => {
      // 缓存名字 三个参数拼接
      const cacheName = `${dictNameOrCode}-${type}-${typeName}`;
      if (dictCache.has(cacheName)) {
        resolve(dictCache.get(cacheName));
        return;
      }
      const params =
        typeName === 0
          ? { dictionary_name: dictNameOrCode }
          : { dictionary_code: dictNameOrCode };
      getBaseDictionary(params)
        .then((res: any) => {
          const options = handleOptions(res.data[0]?.nodes, type);
          dictCache.set(cacheName, options);
          resolve(options);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };
};

/**
 * 获取煤贸字典数据
 * @param data 参数
 */
async function getTradeDictionary(data: RequestDictionaryParams) {
  return requestClient.post<Response<Dictionary[]>>(
    '/tradeDictionary/get_one_tradeDictionary',
    data,
  );
}
/**
 * 获取字典数据
 * @param data 参数
 */
async function getBaseDictionary(data: RequestDictionaryParams) {
  return requestClient.post<Response<Dictionary[]>>(
    '/baseDictionary/get_one_baseDictionary',
    data,
  );
}
export {
  getBaseDictionary,
  getBaseDictionaryData,
  getTradeDictionary,
  getTradeDictionaryData,
};
