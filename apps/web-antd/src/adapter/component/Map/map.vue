<script setup>
import { nextTick, onMounted, ref, watch } from 'vue';

import AMapLoader from '@amap/amap-jsapi-loader';
import {
  AutoComplete,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
} from 'ant-design-vue';

import { emitter } from '#/emitter';

// 初始化经纬度 宽高 层级
const props = defineProps({
  width: {
    type: Number,
    default: 1200,
  },
  height: {
    type: Number,
    default: 600,
  },
  zoom: {
    type: Number,
    default: 12,
  },
  mapDataProps: {
    type: Object,
    default: () => {},
  },
  getPoint: {
    type: Function,
    default: () => {},
  },
  btnvalue: {
    type: String,
    default: () => {
      return '点击此处在地图进行位置选择';
    },
  },
});
const mapSearchSuggestions = ref([]);
emitter.on('update:coalOrigin', (row) => {
  mapData.value = row;
});
window._AMapSecurityConfig = {
  securityJsCode: '8b6339e1fbe696e2d84590ca0e7bb448',
};
const mapData = ref({
  address: '', // 详细地址
  point: '', // 经纬度
  longitude: '109.782473', // 经度
  latitude: '39.608744', // 纬度
  // 省
  province: '',
  // 市
  city: '',
  // 区
  district: '',
});
watch(
  () => props.mapDataProps,
  (val) => {
    for (const key in val) {
      if (!val[key]) return;
      mapData.value[key] = Number(val[key]);
    }
  },
  { deep: true, immediate: true },
);
if (props.mapDataProps?.address) {
  for (const key in props.mapDataProps) {
    mapData.value[key] = Number(props.mapDataProps[key]);
  }
}

let map = null;
const init = () => {
  AMapLoader.load({
    key: '8923749314c6b5715487007b028e3006', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.Scale'], // 需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  })
    .then((AMap) => {
      map = new AMap.Map('map', {
        // 设置地图容器id
        viewMode: '3D', // 是否为3D地图模式
        zoom: 11, // 初始化地图级别
        center: [mapData.value.longitude, mapData.value.latitude], // 初始化地图中心点位置
      });
      // 绑定事件
      map.on('click', clickHandler);
      getAddress(mapData.value.longitude, mapData.value.latitude);
    })
    .catch((error) => {
      console.warn(error);
    });
};
const clickHandler = (e) => {
  getAddress(e.lnglat.getLng(), e.lnglat.getLat());
};
/**
 * 根据用户输入 展示可选地区
 * @param {string} str 当前用户输入
 * @param { Function } cb 渲染回调
 */
function querySearch(str, cb) {
  AMap.plugin(['AMap.PlaceSearch'], () => {
    const placeSearch = new AMap.PlaceSearch({
      pageSize: 10, // 单页显示结果条数
      pageIndex: 1, // 页码
      city: '', // 兴趣点城市
      citylimit: true, // 是否强制限制在设置的城市内搜索
      map, // 展现结果的地图实例
      panel: false, // 参数值为你页面定义容器的 id 值<div id="my-panel"></div>，结果列表将在此容器中进行展示。
      autoFitView: true, // 是否自动调整地图视野使绘制的 Marker 点都处于视口的可见范围
    });
    // 在回调函数中使用插件功能
    placeSearch.search(str, (status, result) => {
      // 查询成功时，result 即对应匹配的 POI 信息
      if (result?.poiList?.pois?.length) {
        mapSearchSuggestions.value = result.poiList.pois.map((item) => {
          return { value: item };
        });
        cb(result.poiList.pois);
      } else {
        cb([]);
      }
    });
  });
}

/**
 * 选择地区
 * @param { Obejct } item
 */
function handleSelect(item) {
  getAddress(item.location.lng, item.location.lat);
  mapSearchSuggestions.value = [];
  emitter.emit('mapPointSelected', item);
}

const getAddress = (lng, lat) => {
  // 使用 clearMap 方法删除所有覆盖物
  map.clearMap();
  const position = new AMap.LngLat(lng, lat); // 传入经纬度
  map.setCenter(position);
  map.setZoom(12);
  // 创建一个 Marker 实例：
  const marker = new AMap.Marker({
    position, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
  });
  // 将创建的点标记添加到已有的地图实例：
  map.add(marker);
  AMap.plugin('AMap.Geocoder', () => {
    const geocoder = new AMap.Geocoder({
      city: mapData.value.adcode, // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
    });
    const lnglat = [lng, lat];
    geocoder.getAddress(lnglat, (status, result) => {
      if (status === 'complete' && result.info === 'OK') {
        // result为对应的地理位置详细信息
        // 保存当前数据
        mapData.value = {
          point: `${lng} , ${lat}`,
          latitude: lat,
          longitude: lng,
          province: result.regeocode.addressComponent.province,
          city: result.regeocode.addressComponent.city,
          district: result.regeocode.addressComponent.district,
          township: result.regeocode.addressComponent.township,
          address: result.regeocode.formattedAddress,
        };
      }
    });
  });
};

const mapShow = ref(false);
const onMapShow = () => {
  mapShow.value = true;
  nextTick(() => {
    init();
  });
};

const onSave = () => {
  if (mapData.value.city === '') {
    mapData.value.city = mapData.value.province;
  }
  mapShow.value = false;
  emitter.emit('mapPointSelected', mapData.value);
};

const onCancel = () => {
  mapShow.value = false;
};

onMounted(() => {
  if (props.mapDataProps) {
    mapData.value = {
      address: '',
      point: `${props.mapDataProps.longitude} , ${props.mapDataProps.latitude}`,
      latitude: props.mapDataProps.latitude,
      longitude: props.mapDataProps.longitude,
      province: props.mapDataProps.province,
      city: props.mapDataProps.city,
      district: props.mapDataProps.district,
    };
  }
});

// 暴露需要的数据
defineExpose({ mapData });
</script>

<template>
  <div>
    <div class="map-wrap" v-if="!mapShow">
      <Button type="primary" @click="onMapShow">{{ btnvalue }}</Button>
    </div>
    <Modal
      v-model:open="mapShow"
      :width="`${width + 48}px`"
      @cancel="onCancel"
      @ok="onSave"
    >
      <Form
        :wrapper-col="{ span: 24, offset: 0 }"
        layout="horizontal"
        label-width="100px"
        :model="mapData"
      >
        <Row>
          <Col :span="12">
            <Form.Item label="详细地址" :wrapper-col="{ span: 20, offset: 0 }">
              <AutoComplete
                v-model:value="mapData.address"
                :options="mapSearchSuggestions"
                placeholder="请输入详细地址"
                @select="handleSelect"
                @search="querySearch"
                allow-clear
              >
                <template #option="{ value: item }">
                  {{ item.address }}
                </template>
              </AutoComplete>
            </Form.Item>
          </Col>
          <Col :span="12">
            <Form.Item label="经纬度" :wrapper-col="{ span: 20, offset: 0 }">
              <Input
                disabled
                placeholder="请选择经纬度"
                :value="mapData.point"
                type="text"
                :readonly="true"
              />
            </Form.Item>
          </Col>
        </Row>

        <div
          id="map"
          :style="{ width: `${width}px`, height: `${height}px` }"
        ></div>
      </Form>
    </Modal>
  </div>
</template>

<style scoped lang="scss">
/* stylelint-disable-next-line selector-class-pattern */
.baidu_map {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000000;
  //   居中
  width: 100%;
  height: 100%;
  background: rgb(0 0 0 / 50%);

  .mask {
    padding: 1em;
    background: #fff;
    border-radius: 10px;
  }
}

.autoAddressClass {
  li {
    .title {
      overflow: hidden;
      line-height: 30px;
      text-overflow: ellipsis;
    }

    .address {
      margin-bottom: 5px;
      font-size: 12px;
      line-height: 1;
      color: #b4b4b4;
    }

    /* stylelint-disable-next-line selector-class-pattern */
    .autoAddressClass_item {
      display: flex;
      align-items: center;
      overflow: hidden;

      .el-icon {
        margin-right: 20px;
      }
    }
  }
}
</style>
<style>
/* stylelint-disable-next-line selector-class-pattern */
.BMap_Marker {
  padding-top: 10px !important;
  padding-left: 5px !important;
}
</style>
