/*
 * @Author: 王明龙
 * @Date: 2021-11-22
 * @Description: 看板刷新
 */

import { useEffect } from "react";

export default function useRefresh(callBack: any): any {
  useEffect(() => {
   const time =  setInterval(() => {
      callBack();
    },60000)
    return () => {
      clearInterval(time)
    };
  }, []);
  return [];
}
