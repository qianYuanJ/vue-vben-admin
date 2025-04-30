// utils/emitter.ts
import type { PlatformCoalLocality } from '@vben/types';

import mitt from 'mitt';

type MapPoint = {
  [key: string]: any;
  lat: number;
  lng: number;
};

type Events = {
  'get:coalOrigin': PlatformCoalLocality;
  'get:upload': string;
  mapPointSelected: MapPoint;
  'update:coalOrigin': PlatformCoalLocality;
  'update:upload': any[];
};
export const emitter = mitt<Events>();
